import React from "react";
import { Link } from "react-router-dom"; // Menggunakan Link untuk navigasi
import { motion } from "framer-motion";
import { Reveal } from "../animate/Reveal";

const Hero = () => {
  return (
    <section className="bg-first-bg relative" id="Hero">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center lg:h-[90vh] justify-between">
          {/*--------------- Home ---------------*/}
          <div className="md:w-[70%] mb-8 md:mb-0 flex flex-col space-y-4 px-6 lg:mt-0 mt-10">
            <Reveal>
              <p className="text-font-clr font-medium md:text-2xl text-xl mb-4 font-poppins">
                IOT X Machine Learning
              </p>
            </Reveal>

            <Reveal>
              <h1 className="font-extrabold text-font-clr tracking-normal text-7xl lg:leading-snug font-poppins">
                Sistem Pendeteksi Postur Tubuh
              </h1>
            </Reveal>

            <Reveal>
              <p className="text-font-clr font-medium md:text-lg text-base font-poppins">
                Dengan sistem ini, Anda dapat memantau dan memperbaiki posisi
                duduk Anda untuk menjaga kesehatan tubuh.
              </p>
            </Reveal>

            {/*--------------- Button Left ---------------*/}
            <Reveal>
              <div className="flex justify-start gap-x-6 dark:text-white">
                <Link
                  to="/stream"
                  className="mt-5 group flex items-center justify-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 ring-none rounded-lg shadow-lg font-semibold py-3 px-6 font-dm text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900 transform transition-transform duration-300 ease-in-out hover:scale-100"
                >
                  Periksa Sekarang
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
