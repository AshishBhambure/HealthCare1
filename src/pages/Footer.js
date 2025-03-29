import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 sm:px-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-5 gap-8">
        {/* About Us */}
        <div>
          <h2 className="font-bold text-lg mb-3">About Us</h2>
          <ul className="space-y-2">
            <li><Link to="#">About CityCare Hospital</Link></li>
            <li><Link to="#">Leadership</Link></li>
            <li><Link to="#">Newsroom</Link></li>
            <li><Link to="#">Awards</Link></li>
            <li><Link to="#">Community Services</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Use</Link></li>
            <li><Link to="#">Blogs</Link></li>
            <li><Link to="#">Technology</Link></li>
          </ul>
        </div>

        {/* Specialties */}
        <div>
          <h2 className="font-bold text-lg mb-3">Specialties</h2>
          <ul className="space-y-2">
            <li><Link to="#">Cancer Hospital</Link></li>
            <li><Link to="#">Orthopaedic Hospital</Link></li>
            <li><Link to="#">Neurology Hospital</Link></li>
            <li><Link to="#">Heart Hospital</Link></li>
            <li><Link to="#">Urology Hospital</Link></li>
            <li><Link to="#">Gastroenterology Hospital</Link></li>
            <li><Link to="#">Bone Marrow Transplant Hospital</Link></li>
            <li><Link to="#">Kidney Treatment Hospital</Link></li>
            <li><Link to="#">Liver Transplant Hospital</Link></li>
          </ul>
        </div>

        {/* Sub Specialties */}
        <div>
          <h2 className="font-bold text-lg mb-3">Sub Specialties</h2>
          <ul className="space-y-2">
            <li><Link to="#">Breast Cancer Program</Link></li>
            <li><Link to="#">Hip Replacement Unit</Link></li>
            <li><Link to="#">Neuro-Endoscopy Surgery Unit</Link></li>
            <li><Link to="#">Internal Medicine</Link></li>
            <li><Link to="#">Kidney Transplant Unit</Link></li>
            <li><Link to="#">Hair Transplant Clinic</Link></li>
            <li><Link to="#">Diabetes</Link></li>
            <li><Link to="#">Medical Oncology</Link></li>
            <li><Link to="#">Sports Injury Unit</Link></li>
          </ul>
        </div>

        {/* Find a Doctor */}
        <div>
          <h2 className="font-bold text-lg mb-3">Find a Doctor</h2>
          <ul className="space-y-2">
            <li><Link to="#">Orthopaedic Doctor</Link></li>
            <li><Link to="#">Oncologist</Link></li>
            <li><Link to="#">Cardiologist</Link></li>
            <li><Link to="#">Gynecologist</Link></li>
            <li><Link to="#">Pulmonologist</Link></li>
            <li><Link to="#">Nephrologist</Link></li>
            <li><Link to="#">General Surgeon</Link></li>
            <li><Link to="#">Gastroenterologist</Link></li>
            <li><Link to="#">Endocrinologist</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="#">Find a Doctor</Link></li>
            <li><Link to="#">Get a Second Opinion</Link></li>
            <li><Link to="#">Treatment & Conditions</Link></li>
            <li><Link to="#">Make an Enquiry</Link></li>
            <li><Link to="#">Academics</Link></li>
            <li><Link to="#">Patient Testimonials</Link></li>
            <li><Link to="#">STENT Pricing</Link></li>
            <li><Link to="#">TKR Implant Pricing</Link></li>
            <li><Link to="#">Feedback</Link></li>
            <li><Link to="#">Transplant Data</Link></li>
          </ul>
          <div className="mt-4 font-bold">Download App</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;