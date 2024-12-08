import React from "react";
import { motion } from "framer-motion";
import { Reveal } from "../animate/Reveal";

const DashboardMonitoring: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen mt-">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <header className="p-6">
            <h1 className="text-3xl font-bold mt-6 text-center">
              Monitoring Postur Tubuh
            </h1>
          </header>
        </Reveal>

        {/* Main Content */}
        <main className="pt-6 pb-6">
          {/* Dashboard Monitoring */}
          <Reveal>
            <section className=" bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <Reveal>
                <h2 className="text-2xl font-semibold mb-4">
                  Dashboard Monitoring Postur
                </h2>
              </Reveal>

              {/* Status Postur */}
              <div className="mb-6">
                <Reveal>
                  <h3 className="text-xl font-medium">
                    Status Postur Saat Ini
                  </h3>
                </Reveal>

                <Reveal>
                  <p className="text-lg mt-2">
                    Postur Anda saat ini:
                    <span className="font-bold text-green-500">Baik</span>
                  </p>
                </Reveal>

                <Reveal>
                  <p className="text-sm mt-1">Durasi: 2 Jam 30 Menit</p>
                </Reveal>
              </div>

              {/* Waktu Postur */}
              <div className="mb-6">
                <Reveal>
                  <h3 className="text-xl font-medium">Waktu Postur</h3>
                </Reveal>

                <Reveal>
                  <p className="text-sm mt-2">
                    Postur baik telah dipertahankan selama 2 Jam 30 Menit.
                  </p>
                </Reveal>
              </div>

              {/* Pengingat */}
              <div className="mb-6">
                <Reveal>
                  <h3 className="text-xl font-medium">Pengingat</h3>
                </Reveal>

                <Reveal>
                  <p className="text-sm mt-2">
                    Jangan lupa untuk sesekali memperbaiki posisi duduk Anda
                    agar tetap sehat!
                  </p>
                </Reveal>
              </div>
            </section>
          </Reveal>

          {/* Riwayat Postur */}
          <Reveal>
            <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <Reveal>
                <h2 className="text-2xl font-semibold mb-4">Riwayat Postur</h2>
              </Reveal>

              {/* Table Riwayat */}
              <div className="overflow-x-auto">
                <Reveal>
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="px-4 py-2 text-left">Tanggal</th>
                        <th className="px-4 py-2 text-left">Status Postur</th>
                        <th className="px-4 py-2 text-left">Durasi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-600">
                        <td className="px-4 py-2">2024-12-05 08:00</td>
                        <td className="px-4 py-2">Buruk</td>
                        <td className="px-4 py-2">30 Menit</td>
                      </tr>
                      <tr className="border-b border-gray-600">
                        <td className="px-4 py-2">2024-12-04 14:00</td>
                        <td className="px-4 py-2">Baik</td>
                        <td className="px-4 py-2">1 Jam 15 Menit</td>
                      </tr>
                      <tr className="border-b border-gray-600">
                        <td className="px-4 py-2">2024-12-03 10:30</td>
                        <td className="px-4 py-2">Buruk</td>
                        <td className="px-4 py-2">45 Menit</td>
                      </tr>
                    </tbody>
                  </table>
                </Reveal>
              </div>
            </section>
          </Reveal>

          {/* Grafik Postur */}
          <Reveal>
            <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <Reveal>
                <h2 className="text-2xl font-semibold mb-4">Grafik Postur</h2>
              </Reveal>

              {/* Dummy Grafik */}
              <Reveal>
                <div className="bg-gray-700 w-full h-64 flex justify-center items-center text-xl font-bold text-gray-400">
                  [Grafik Postur Tubuh]
                </div>
              </Reveal>

              <Reveal>
                <p className="text-sm mt-2 text-center">
                  Visualisasi grafik postur tubuh berdasarkan data yang
                  tercatat.
                </p>
              </Reveal>
            </section>
          </Reveal>
        </main>
      </div>
    </div>
  );
};

export default DashboardMonitoring;
