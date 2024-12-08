import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const StreamPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamingError, setStreamingError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string>("Baik");
  const [saran, setSaran] = useState<string>("Pastikan posisi tubuh tegak dan mata sejajar dengan layar.");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setDiagnosis("Baik");
      setSaran("Pastikan posisi tubuh tegak dan mata sejajar dengan layar.");
      setIsStreaming(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setStreamingError("Failed to access camera. Please check permissions.");
    }
  };

  const stopStreaming = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
  };

  // Fungsi untuk kembali ke halaman utama
  const handleBack = () => {
    navigate("/"); // Ganti dengan path halaman utama Anda
  };

  return (
    <div
      id="stream-result-container"
      className="flex flex-col justify-center items-center min-h-screen bg-[#f7ebd2] py-5"
    >
      <div className="flex flex-row gap-10 w-full max-w-7xl mx-auto justify-center items-start">
        {/* Stream Box - Kiri */}
        <div
          id="video-stream"
          className="flex flex-col items-center p-5 rounded-lg shadow-lg text-center bg-[#fcf5e6] w-2/3"
        >
          <h2 className="text-2xl font-bold text-[#333] mb-5">Live Streaming</h2>
          <div className="stream-box mb-7 rounded-lg overflow-hidden bg-[#fcf5e6] w-full h-[450px]">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted
              playsInline
              style={{
                backgroundColor: isStreaming ? "transparent" : "#f7ebd2",
              }}
            />
          </div>

          {/* Tombol kontrol streaming di dalam box video */}
          <div className="controls flex justify-center gap-5 mt-4 w-full">
            {!isStreaming ? (
              <button
                onClick={startStreaming}
                className="group flex h-min items-left disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-violet-500 border-b-violet-700 disabled:border-0 disabled:bg-violet-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-violet-800 active:text-gray-300 focus-visible:outline-violet-500 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900"
              >
                Mulai Streaming
              </button>
            ) : (
              <button
                onClick={stopStreaming}
                className="group flex h-min items-left disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-violet-500 border-b-violet-700 disabled:border-0 disabled:bg-violet-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-violet-800 active:text-gray-300 focus-visible:outline-violet-500 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900"
              >
                Hentikan Streaming
              </button>
            )}
          </div>
        </div>

        {/* Kotak Output dan Saran - Kanan */}
        <div className="flex flex-col justify-start bg-[#fcf5e6] p-5 rounded-lg shadow-lg w-1/3 h-[450px]">
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-xl font-semibold text-[#333] mb-3">Diagnosis</h3>
              <div className={`p-3 rounded-lg ${diagnosis === "Baik" ? "bg-green-100" : "bg-red-100"}`}>
                <p className="text-lg">{diagnosis}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#333] mb-3">Saran Posisi Duduk</h3>
              <div className="p-3 rounded-lg bg-yellow-100">
                <p className="text-lg">{saran}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol "Back" untuk kembali ke halaman utama */}
      <div className="mt-4">
        <button
          onClick={handleBack}
          className="group flex h-min items-left disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-violet-500 border-b-violet-700 disabled:border-0 disabled:bg-violet-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-violet-800 active:text-gray-300 focus-visible:outline-violet-500 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900"
        >
          Kembali ke Halaman Utama
        </button>
      </div>

      {/* Pesan Error */}
      {streamingError && <p className="text-red-500 mt-4">{streamingError}</p>}
    </div>
  );
};

export default StreamPage;
