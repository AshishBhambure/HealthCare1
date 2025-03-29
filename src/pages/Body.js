import { motion } from "framer-motion";
import React from "react";
import { FaUserMd, FaHeartbeat, FaHospital } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import logo from "../Assist/Hospital_Logo.jpg";

import s1 from "../components/Assist/Slider-1.png"
import s2 from "../components/Assist/Slider-2.png"
import s3 from "../components/Assist/Slider-3.webp"
import s4 from "../components/Assist/Slider-5.jpg";
import s5 from "../components/Assist/Slider-6.jpeg";

const images = [s1, s2,s3 ,s4 , s5];


const Body = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 relative overflow-hidden">

      <motion.h1
        className="text-center text-5xl sm:text-6xl font-extrabold text-gray-800 drop-shadow-lg mb-[70px] mt-[40px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Revolutionizing Healthcare, One Click at a Time
      </motion.h1>







      <div className="w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden mb-[200px] border-4 border-black">
  <Carousel
    showArrows={false}
    showThumbs={false}
    autoPlay
    infiniteLoop
    interval={3000}
    showStatus={false}
  >
    {images.map((img, index) => (
      <div key={index} className="h-[400px] flex justify-center items-center bg-gray-100">
        <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
      </div>
    ))}
  </Carousel>
</div>





    <motion.p
  className="text-center text-lg sm:text-xl text-red-500 max-w-3xl leading-relaxed px-6 bg-gray-100 p-6 rounded-lg shadow-lg font-bold italic"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
>
  *Revolutionizing Healthcare: Real-time records, instant prescriptions, and complete medical history.*
</motion.p>







      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
        {/* Doctor's Appointment */}
        <Link to="/find-doctor">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 border border-blue-300 hover:shadow-xl transition-all">
            <FaUserMd className="text-blue-600 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 text-center">Doctor</h2>
            <p className="text-gray-600 text-sm mt-2 font-bold text-center"> See all information about Doctors </p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"> See Doctor </button>
          </div>
        </Link>

        {/* Health Packages */}
        <Link to="/login">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 border border-green-300 hover:shadow-xl transition-all">
            <FaHeartbeat className="text-green-600 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 text-center">Get a Report</h2>
            <p className="text-gray-600 text-sm mt-2 font-bold text-center">Easily access all reports</p>
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105">View Reports</button>
          </div>
        </Link>

        {/* Find a Hospital */}
        <Link to="/find-hospital">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 border border-purple-300 hover:shadow-xl transition-all">
            <FaHospital className="text-purple-600 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 text-center">Find a Hospital</h2>
            <p className="text-gray-600 text-sm mt-2 font-bold text-center">Locate the nearest hospitals easily.</p>
            <button className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105">Search Now</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Body;