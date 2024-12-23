from flask import Flask, Response, jsonify
import cv2
import numpy as np
from flask_cors import CORS
import mediapipe as mp
import joblib
import firebase_admin
from firebase_admin import credentials, db
import pandas as pd
import urllib.request

app = Flask(__name__)
CORS(app)

# Inisialisasi Mediapipe
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

# Load model klasifikasi
model = joblib.load("kelainan_tulang_classify.pkl")["Logistic Regression"]

# Firebase setup
if not firebase_admin._apps:
    cred = credentials.Certificate("posture-chek-firebase-adminsdk-iifln-9602cfe38c.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://posture-chek-default-rtdb.asia-southeast1.firebasedatabase.app/'
    })

# Referensi ke database Firebase
ref = db.reference('/')

# Kolom untuk data pose
num_coords = 33
kolom = ['x{}'.format(i) for i in range(num_coords)] + \
        ['y{}'.format(i) for i in range(num_coords)] + \
        ['z{}'.format(i) for i in range(num_coords)] + \
        ['v{}'.format(i) for i in range(num_coords)]

# URL video streaming
url = 'http://192.168.179.201/cam-hi.jpg'

# Global variable for streaming control
is_streaming = True

def generate_frames():
    """Mengambil frame dari URL, memprosesnya dengan Mediapipe, dan mengembalikan hasilnya ke klien."""
    global is_streaming

    with mp_holistic.Holistic(min_detection_confidence=0.3, min_tracking_confidence=0.3) as holistic:
        while is_streaming:
            try:
                # Ambil gambar dari URL
                img_resp = urllib.request.urlopen(url)
                imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
                frame = cv2.imdecode(imgnp, -1)

                # Ubah warna ke RGB untuk Mediapipe
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                image.flags.writeable = False

                # Proses dengan Mediapipe
                results = holistic.process(image)

                # Ubah kembali ke BGR untuk OpenCV
                image.flags.writeable = True
                image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

                # Gambar landmark pose
                if results.pose_landmarks:
                    mp_drawing.draw_landmarks(
                        image,
                        results.pose_landmarks,
                        mp_holistic.POSE_CONNECTIONS,
                        mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=4),
                        mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                    )

                    # Ekstrak landmark
                    pose_landmarks = results.pose_landmarks.landmark
                    pose_row = list(np.array([[lmk.x, lmk.y, lmk.z, lmk.visibility] for lmk in pose_landmarks]).flatten())

                    # Konversi ke DataFrame
                    data_dict = {kol: [val] for kol, val in zip(kolom, pose_row)}
                    pose_df = pd.DataFrame(data_dict)

                    # Prediksi model
                    result_predict = model.predict(pose_df)[0]
                    proba = model.predict_proba(pose_df)[0]

                    # Simpan ke Firebase
                    ref.set(data_dict)

                    # Tampilkan hasil prediksi di frame
                    cv2.putText(image, f'CLASS: {result_predict}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)
                    cv2.putText(image, f'PROB: {max(proba):.2f}', (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)

                # Encode frame sebagai JPEG
                _, buffer = cv2.imencode('.jpg', image)
                frame = buffer.tobytes()

                # Kirim frame ke klien
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

            except Exception as e:
                print(f"Error saat memproses frame: {e}")
                break


@app.route('/video_feed')
def video_feed():
    """Endpoint untuk memulai streaming video."""
    global is_streaming
    is_streaming = True
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/stop_feed', methods=['POST'])
def stop_feed():
    """Endpoint untuk menghentikan streaming video."""
    global is_streaming
    is_streaming = False
    return jsonify({"message": "Streaming dihentikan"}), 200


if __name__ == '__main__':
    app.run(port=8080, debug=True)
