import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StreamPage = () => {
  const navigate = useNavigate();
  const [streamingError, setStreamingError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string>("Baik");
  const [saran, setSaran] = useState<string>(
    "Pastikan posisi tubuh tegak dan mata sejajar dengan layar."
  );
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [videoSource, setVideoSource] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // State untuk loading spinner

  useEffect(() => {
    setVideoSource("http://localhost:8080/video_feed");
  }, []);

  const startStreaming = async () => {
    setIsLoading(true);
    setStreamingError(null); // Reset error state
    try {
      const response = await fetch("http://localhost:8080/start_stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal memulai streaming.");
      }

      const result = await response.json();
      console.log(result.message);
      setIsStreaming(true);
    } catch (error) {
      console.error("Error starting streaming:", error);
      setStreamingError("Gagal memulai streaming.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopStreaming = async () => {
    setIsLoading(true);
    setStreamingError(null); // Reset error state
    try {
      const response = await fetch("http://localhost:8080/stop_stream", {
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
    <div className="fixed top-0 w-full z-50 h-[100vh] bg-body-clr">
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
              className="font-text text-heading-clr flex items-center justify-center rounded-lg font-bold py-2 px-4 bg-violet-500 hover:bg-violet-600 transition-colors">
              Kembali ke Home
            </button>
          </div>
        </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12">
        <div
          id="stream-result-container"
          className="flex flex-col items-center">
          <div className="flex flex-row gap-10 w-full max-w-7xl mx-auto justify-center items-start px-4">
            {/* Stream Box - Kiri */}
            <div
              id="video-stream"
              className="flex flex-col items-center p-5 rounded-lg shadow-lg text-center bg-gray-800 w-2/3 h-[80vh]">
              <h2 className="font-text text-heading-clr text-2xl font-bold mb-5">
                Live Streaming
              </h2>
              <div className="stream-box mb-7 rounded-lg overflow-hidden bg-[#fcf5e6] w-full h-[450px]">
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
                    onClick={startStreaming}
                    disabled={isLoading}
                    className="font-text text-heading-clr group flex items-center justify-center rounded-lg shadow-lg font-semibold py-2 px-4 bg-violet-500 disabled:opacity-50">
                    {isLoading ? "Memulai..." : "Mulai Streaming"}
                  </button>
                ) : (
                  <button
                    onClick={stopStreaming}
                    disabled={isLoading}
                    className="font-text text-heading-clr group flex items-center justify-center rounded-lg shadow-lg font-semibold py-2 px-4 bg-violet-500 disabled:opacity-50">
                    {isLoading ? "Menghentikan..." : "Hentikan Streaming"}
                  </button>
                )}
              </div>
            </div>

            {/* Kotak Output dan Saran - Kanan */}
            <div className="flex flex-col justify-start bg-gray-800 p-5 rounded-lg shadow-lg w-1/3 h-[80vh]">
              <div className="flex flex-col gap-5">
                <div className="font-text">
                  <h3 className="text-xl font-semibold text-[#333] mb-3">
                    Diagnosis
                  </h3>
                  <div
                    className={`p-3 rounded-lg ${
                      diagnosis === "Baik" ? "bg-green-100" : "bg-red-100"
                    }`}>
                    <p className="text-lg">{diagnosis}</p>
                  </div>
                </div>

                <div className="font-text">
                  <h3 className="text-xl font-semibold text-[#333] mt-10">
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
        </div>
      </main>
    </div>
  );
};

export default StreamPage;
