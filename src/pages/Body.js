import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaUserMd, FaHeartbeat, FaHospital, FaArrowRight, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/Assist/Hospital_Logo.jpg";

import s1 from "../components/Assist/Slider-1.webp";
import s2 from "../components/Assist/Slider-2.png";
import s3 from "../components/Assist/Slider-3.webp";
import s4 from "../components/Assist/Slider-5.jpg";
import s5 from "../components/Assist/Slider-6.jpeg";

const images = [s1, s2, s3, s4, s5];

const Body = () =>{
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateHero, setAnimateHero] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
    setAnimateHero(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.1, 0.9, 0.2, 1]
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 relative">


      {/* Hero Section with Video/Image Background */}
      <div className="relative h-screen overflow-hidden">
        {/* Hero Background with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            key={currentSlide}
            src={images[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,56,202,0.1),transparent_50%)]"></div>
          <div className="hidden md:block absolute -bottom-10 -left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block mb-4">Healthcare</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                Reimagined
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-blue-100 max-w-2xl mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Experience healthcare without boundaries. Your health data, appointments, and medical expertise—all in one secure platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <button 
               onClick={()=>navigate('/login')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Get Started
              </button>
              {/* <button className="bg-transparent border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More
              </button> */}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
          >
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
              <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      {/* <div className="relative z-10">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl -mt-20 p-6 md:p-8 border border-indigo-100">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    type="text"
                    placeholder="Search for doctors, specialties, or treatments"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select className="px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                  <option>All Specialties</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                  <option>Oncology</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          {/* <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">A new approach to healthcare</h2>
            <p className="text-lg text-gray-600">Experience seamless healthcare management with real-time records, instant prescriptions, and complete medical history at your fingertips.</p>
          </motion.div> */}

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Doctor Card */}
            {/* <motion.div
              className="relative group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl group-hover:translate-y-1 transition-all duration-300">
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6">
                    <FaUserMd className="text-blue-600 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Find a Doctor</h3>
                  <p className="text-gray-600 mb-8">
                    Connect with top-rated specialists based on your unique health needs. Filter by specialty, availability, and patient ratings.
                  </p>
                  <Link to="/login" className="inline-flex items-center text-blue-600 font-medium group">
                    <span className="group-hover:mr-2 transition-all">Find Specialists</span>
                    <FaArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                  </Link>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 flex justify-between items-center">
                  <div>
                    <span className="text-blue-600 text-xl font-bold">2,500+</span>
                    <p className="text-gray-600 text-sm">Healthcare Providers</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div> */}

            {/* Reports Card */}
            {/* <motion.div
              className="relative group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl group-hover:translate-y-1 transition-all duration-300">
                <div className="h-1 w-full bg-gradient-to-r from-green-600 to-teal-600"></div>
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-green-600/10 flex items-center justify-center mb-6">
                    <FaHeartbeat className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Health Records</h3>
                  <p className="text-gray-600 mb-8">
                    Access your complete medical history, test results, and treatment plans in one secure location. Share with providers instantly.
                  </p>
                  <Link to="/login" className="inline-flex items-center text-green-600 font-medium group">
                    <span className="group-hover:mr-2 transition-all">Access Records</span>
                    <FaArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                  </Link>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 flex justify-between items-center">
                  <div>
                    <span className="text-green-600 text-xl font-bold">100%</span>
                    <p className="text-gray-600 text-sm">Secure & Encrypted</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-green-600/30 transition-all">
                    View Reports
                  </button>
                </div>
              </div>
            </motion.div> */}

            {/* Hospital Card */}
            {/* <motion.div
              className="relative group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl group-hover:translate-y-1 transition-all duration-300">
                <div className="h-1 w-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-6">
                    <FaHospital className="text-purple-600 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Find a Hospital</h3>
                  <p className="text-gray-600 mb-8">
                    Locate top-rated medical facilities near you with real-time availability, specialties, and patient reviews.
                  </p>
                  <Link to="/login" className="inline-flex items-center text-purple-600 font-medium group">
                    <span className="group-hover:mr-2 transition-all">Find Facilities</span>
                    <FaArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                  </Link>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 flex justify-between items-center">
                  <div>
                    <span className="text-purple-600 text-xl font-bold">500+</span>
                    <p className="text-gray-600 text-sm">Partner Facilities</p>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-600/30 transition-all">
                    Search Now
                  </button>
                </div>
              </div>
            </motion.div> */}
          </div>

          
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi02aDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div> */}

        {/* <div className="container mx-auto px-6 relative"> */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"> */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-bold text-white mb-2">98.7%</h3>
              <p className="text-blue-200">Patient Satisfaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-white mb-2">24/7</h3>
              <p className="text-blue-200">Support Available</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-4xl font-bold text-white mb-2">15M+</h3>
              <p className="text-blue-200">Registered Users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-4xl font-bold text-white mb-2">5.2M</h3>
              <p className="text-blue-200">Appointments Monthly</p>
            </motion.div> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}

      {/* Testimonials Section */}
      
      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-white/5 transform -skew-x-12"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to experience the future of healthcare?</h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of patients and providers who are already transforming their healthcare experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
               onClick={()=>navigate('signup')}
               
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-blue-500/30 transition-all">
                Create Account
              </button>
              {/* <button className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all">
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;