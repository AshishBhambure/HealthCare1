const express = require('express');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const Patient = require('../models/Patient');
const mongoose = require('mongoose')
const { uploadImageToCloudinary } = require('../utils/imageUploader');


module.exports.updateDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findById(doctorId);
        console.log("Doctor ID received:", doctorId);

        
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found", success: false });
        }
        
        
        const { name, contact, year_of_experience, degree, specialization, mobileNo } = req.body;
        console.log("sdsdjjjjjjjjjjjjjjjjjjjjjjjj",req.files)
        
        if (req.files) {
            if (req.files.doctor_license) {
                const response = await uploadImageToCloudinary(req.files.doctor_license,"HealthCare");
                doctor.doctor_license = response.secure_url;
            }
            if (req.files.image) {
                const response = await uploadImageToCloudinary(req.files.image,"HealthCare");
                doctor.image = response.secure_url;
            }
        }
        
        
        
        if (name) doctor.name = name;
        if (contact) doctor.contact = contact;
        if (year_of_experience) doctor.year_of_experience = year_of_experience;
        if (degree) doctor.degree = degree;
        if (specialization) doctor.specialization = specialization;
        if (mobileNo) doctor.mobileNo = mobileNo;
        
        
        await doctor.save();

        return res.status(200).json({ message: "Profile updated successfully", success: true, doctor });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
    }
};


module.exports.updateHospitalProfile = async (req, res) => {
    try {
        const { hospitalId } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ message: "Invalid hospital ID format" });
        }

        let updates = req.body;
        console.log("Updating hospital profile with:", updates);

        // Fetch the existing hospital document
        let hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        // Exclude `password` from updates if it's not provided
        if (!updates.password) {
            delete updates.password;
        }

        // Handle multiple images upload for `photo`
        if (req.files && req.files.photo) {
            let uploadedImages = [];
            const photoFiles = Array.isArray(req.files.photo) ? req.files.photo : [req.files.photo];

            for (let file of photoFiles) {
                const response = await uploadImageToCloudinary(file, "HealthCare/Hospital");
                uploadedImages.push(response.secure_url);
            }

            hospital.photo = [...(hospital.photo || []), ...uploadedImages];
        }

        // Handle multiple file uploads for `certifications`
        if (req.files && req.files.certifications) {
            let uploadedCertifications = [];
            const certificationFiles = Array.isArray(req.files.certifications) 
                ? req.files.certifications 
                : [req.files.certifications];

            for (let file of certificationFiles) {
                const response = await uploadImageToCloudinary(file, "HealthCare/Hospital/Certifications");
                uploadedCertifications.push(response.secure_url);
            }

            hospital.certifications = [...(hospital.certifications || []), ...uploadedCertifications];
        }

        // Update hospital details
        hospital.set(updates);

        await hospital.save();

        return res.status(200).json({ message: "Hospital profile updated successfully", hospital });
    } catch (err) {
        console.error("Error updating hospital profile:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


module.exports.updatePatientProfile = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ message: 'Invalid patient ID format' });
        }

        let updates = req.body;

        // Check if the patient exists
        let patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Handle profile picture upload if provided
        if (req.files && req.files.id_proof) {
            const response = await uploadImageToCloudinary(req.files.id_proof, "HealthCare/Patients");
            updates.id_proof = response.secure_url;
        }

        // Update patient details
        patient.set(updates);
        await patient.save();

        return res.status(200).json({ message: 'Patient profile updated successfully', patient });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
