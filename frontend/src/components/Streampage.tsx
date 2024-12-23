import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StreamPage = () => {
  const navigate = useNavigate();
  const [streamingError, setStreamingError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string>("Buruk");
  const [saran, setSaran] = useState<string>(
    "Pastikan posisi tubuh tegak dan mata sejajar dengan layar."
  );
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [videoSource, setVideoSource] = useState<string>(
    "http://localhost:8080/video_feed"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fungsi untuk mengambil data dari Flask API
  const fetchDiagnosis = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_diagnosis");
      if (!response.ok) {
        throw new Error("Gagal mengambil data diagnosis");
      }
      const data = await response.json();
      setDiagnosis(data.diagnosis); // Update state diagnosis
      setSaran(data.saran); // Update state saran
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      setStreamingError("Gagal mengambil data diagnosis.");
    }
  };

  // Panggil fetchDiagnosis saat komponen pertama kali dirender
  useEffect(() => {
    fetchDiagnosis();
  }, []);

  const stopStreaming = async () => {
    setIsLoading(true);
    setStreamingError(null); // Reset error state
    try {
      const response = await fetch("http://localhost:8080/stop_feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghentikan streaming.");
      }

      const result = await response.json();
      console.log(result.message);
      setIsStreaming(false);
    } catch (error) {
      console.error("Error stopping streaming:", error);
      setStreamingError("Gagal menghentikan streaming.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 w-full z-50 h-[100vh] bg-first-bg">
      {/* Navbar */}
      <nav className="bg-transparent shadow-lg w-full">
        <div className="border-b mx-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold font-text text-heading-clr">
                  Posture Check
                </h1>
              </div>
              <button
                onClick={handleBack}
                className="my-8 group flex items-center justify-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 ring-none rounded-full shadow-lg font-semibold py-2 px-4 font-dm text-sm xs:text-base bg-btn-clr text-body-clr font-heading tracking-widest transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-[-3deg] hover:bg-second-bg">
                Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <div
          id="stream-result-container"
          className="flex flex-col items-center">
          <div className="flex flex-row gap-10 w-full max-w-7xl mx-auto justify-center items-start px-4">
            {/* Stream Box - Kiri */}
            <div
              id="video-stream"
              className="flex flex-col items-center p-6 rounded-lg shadow-lg text-center bg-gray-800 w-2/3 h-[80vh]">
              <h2 className="font-text text-heading-clr text-2xl font-bold mb-5">
                Live Streaming
              </h2>
              <div className="stream-box mb-2 rounded-lg overflow-hidden bg-transparant w-full h-[450px] border-2 border-heading-clr">
                {isStreaming ? (
                  <img
                    src={videoSource}
                    alt="Live Streaming"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="font-text text-body-clr w-full h-full bg-gray-300 flex justify-center items-center rounded-lg">
                    <p>Menunggu streaming...</p>
                  </div>
                )}
              </div>

              {/* Tombol kontrol streaming */}
              <div className="controls flex justify-center gap-5 mt-4 w-full">
                {!isStreaming ? (
                  <button
                    onClick={() => setIsStreaming(true)}
                    disabled={isLoading}
                    className="mt-1 group flex items-center justify-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 ring-none rounded-full shadow-lg font-semibold py-3 px-6 font-dm text-sm sm:text-base bg-btn-clr text-body-clr font-heading tracking-widest transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-[-3deg] hover:bg-second-bg">
                    Mulai Streaming
                  </button>
                ) : (
                  <button
                    onClick={stopStreaming}
                    disabled={isLoading}
                    className="mt-1 group flex items-center justify-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 ring-none rounded-full shadow-lg font-semibold py-3 px-6 font-dm text-sm sm:text-base bg-btn-clr text-body-clr font-heading tracking-widest transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-[-3deg] hover:bg-second-bg">
                    {isLoading ? "Menghentikan..." : "Hentikan Streaming"}
                  </button>
                )}
              </div>
            </div>

            {/* Kotak Output dan Saran - Kanan */}
            <div className="flex flex-col justify-start bg-gray-800 p-5 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 h-[80vh]">
              {/* Section: Diagnosis */}
              <div className="font-text mt-10">
                <h3 className="text-xl font-semibold text-heading-clr mb-3">
                  Diagnosis
                </h3>
                <div
                  className={`p-3 rounded-lg ${
                    diagnosis === "Baik" ? "bg-green-200" : "bg-red-200"
                  }`}>
                  <p className="text-lg">{diagnosis}</p>
                </div>
              </div>

              {/* Section: Sitting Position Suggestions */}
              <div className="font-text mt-6">
                <h3 className="text-xl font-semibold text-heading-clr">
                  Saran Posisi Duduk
                </h3>
                <div className="mt-2 p-3 rounded-lg bg-yellow-100">
                  <p className="text-lg">{saran}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pesan Error */}
        {streamingError && (
          <p className="text-red-500 mt-4">{streamingError}</p>
        )}
      </main>
    </div>
  );
};

export default StreamPage;
