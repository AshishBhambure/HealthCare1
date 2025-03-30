const express = require('express');
const mongoose = require('mongoose');
const Disease = require('../models/Disease');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const Clerk = require('../models/Clerk');

module.exports.addDisease = async (req, res) => {
    try {
         const mobileNo = req.body.mobileNo;
         const patient = await Patient.findOne({mobileNo: mobileNo});
         if(!patient){
            return res.status(400).json({message: "Mobile Number Not Registered yet !! ",success:false});
         }
         const patient_id = patient._id;

        const { disease_name , doctor_id, clerk_id, medicines, recommendation } = req.body;
        console.log("Doctor Id" , doctor_id);
        console.log("clerk id",clerk_id)
        let hospital_id;

        
        if (!doctor_id && !clerk_id) {
            return res.status(400).json({ message: "Either a doctor or a clerk must add the disease." });
        }

        if (doctor_id) {
            const doctor = await Doctor.findById(doctor_id).select('hospital');
            if (doctor) hospital_id = doctor.hospital;
        } else if (clerk_id) {
            const clerk = await Clerk.findById(clerk_id).select('hospital');
            if (clerk) hospital_id = clerk.hospital;
        }

        if (!hospital_id) {
            return res.status(404).json({ message: "Hospital not found for the provided doctor or clerk." });
        }

        console.log("Hospital Id ", hospital_id)

        // Find the hospital
        const hospital = await Hospital.findById(hospital_id);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }

        // Push patient into hospital.patients array if not already present
        if (!hospital.patients.includes(patient_id)) {
            hospital.patients.push(patient_id);
            await hospital.save();
        }
        
        const newDisease = new Disease({
            disease_name,
            patient_id,
            doctor_id,
            clerk_id,
            medicines,
            recommendation,
        });



        await newDisease.save();
        res.status(201).json({ message: "Disease record added successfully", disease: newDisease });

    } catch (error) {
        console.log("Error ", error)
        res.status(500).json({ message: "Error adding disease", error: error.message });
    }

}

module.exports.updateDisease = async (req, res) => {
    try {
        const { disease_id } = req.params; // Extract disease_id from URL params
        const { disease_name, doctor_id, clerk_id, medicines, recommendation, cured, commited } = req.body;

        const updatedDisease = await Disease.findByIdAndUpdate(
            disease_id,
            {
                disease_name,
                doctor_id,
                clerk_id,
                medicines,
                recommendation,
                cured,
                commited
            },
            { new: true } 
        );
        

        if (!updatedDisease) {
            return res.status(404).json({ message: "Disease not found", success: false });
        }

        res.status(200).json({ message: "Disease updated successfully", disease: updatedDisease });

    } catch (error) {
        res.status(500).json({ message: "Error updating disease", error: error.message });
    }
};

module.exports.deleteDisease = async (req, res) => {
    try {
        const { disease_id } = req.params; // Extract disease_id from URL params

        const deletedDisease = await Disease.findByIdAndDelete(disease_id);

        if (!deletedDisease) {
            return res.status(404).json({ message: "Disease not found", success: false });
        }

        res.status(200).json({ message: "Disease deleted successfully", success: true });

    } catch (error) {
        res.status(500).json({ message: "Error deleting disease", error: error.message });
    }
};

module.exports.getDiseasesForPatient = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const diseases = await Disease.find({ patient_id })
            .populate('patient_id', 'name mobileNo')
            .populate('doctor_id', 'name specialization hospital')
            .populate('clerk_id', 'name mobileNo')
            .populate({
                path: 'doctor_id',
                populate: { path: 'hospital', select: 'name address' }
            })
            .exec();

        if (!diseases.length) {
            return res.status(404).json({ message: "No diseases found for this patient", success: false });
        }

        res.status(200).json({ diseases, success: true });
    } catch (error) {
        res.status(500).json({ message: "Error fetching diseases", error: error.message });
    }
};



