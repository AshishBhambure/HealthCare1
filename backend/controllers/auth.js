const express = require('express');
const Hospital = require("../models/Hospital");
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');
const AppAdmin = require('../models/AppAdmin');
const Clerk = require('../models/Clerk');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken')


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports.login = async (req, res) => {
    try {
        const { mobileNo, password, role } = req.body;

        if (!mobileNo || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let user;
        if (role === 'patient') {
            user = await Patient.findOne({ mobileNo });
        } else if (role === 'appadmin') {
            user = await AppAdmin.findOne({ mobileNo });
        } else if (role === 'clerk') {
            user = await Clerk.findOne({ mobileNo });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ mobileNo });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) {
            return res.status(400).json({ message: 'Login Failed, Invalid Mobile Number' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Login Failed, Incorrect Password' });
        }

        const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '10d' });
        
        return res.status(200).json({ 
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} Login Successful`,
            token,
            user,
            success:true
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.signUp = async (req, res) => {
    try {
        const { mobileNo, password, role } = req.body;

       

        if (!mobileNo || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let existingUser, newUser;
        if (role === 'patient') {
            existingUser = await Patient.findOne({ mobileNo });
            if (existingUser) return res.status(400).json({ message: 'Patient already exists' });
            newUser = new Patient({ mobileNo, password: hashedPassword });
        } else if (role === 'appadmin') {
            existingUser = await AppAdmin.findOne({ mobileNo });
            if (existingUser) return res.status(400).json({ message: 'Admin already exists' });
            newUser = new AppAdmin({ mobileNo, password: hashedPassword });
        } else if (role === 'clerk') {
            existingUser = await Clerk.findOne({ mobileNo });
            if (existingUser) return res.status(400).json({ message: 'Clerk already exists' });
            newUser = new Clerk({ mobileNo, password: hashedPassword });
        } else if (role === 'doctor') {
            const hospital = req.body.hospital;
            existingUser = await Doctor.findOne({ mobileNo });
            if (existingUser) return res.status(400).json({ message: 'Doctor already exists' });
            newUser = new Doctor({ mobileNo, password: hashedPassword,hospital });
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }
        // console.log("Before");
        await newUser.save();
        // console.log("After");
        return res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully` , success:true });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports.hospitalLogin = async (req, res) => {
    try {
        const { license_no, password } = req.body;

        // Validate input
        if (!license_no || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if hospital exists
        const hospital = await Hospital.findOne({ license_no });
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: hospital._id, license_no: hospital.license_no },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        res.status(200).json({ message: "Login successful", token ,user:hospital});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports.hospitalSignup = async (req, res) => {
    try {
        const { name, license_no, password, mobileNo } = req.body;
        console.log(req.body);

        // Check if all fields are provided
        if (!name || !license_no || !password || !mobileNo) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if hospital already exists
        const existingHospital = await Hospital.findOne({ license_no });
        if (existingHospital) {
            return res.status(400).json({ message: 'Hospital already registered' });
        }

        // Hash password
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new hospital
        const newHospital = new Hospital({
            name:name,
            license_no,
            password: hashedPassword,
            mobileNo: mobileNo
        });

        await newHospital.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newHospital._id, license_no: newHospital.license_no },
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
        );

        return res.status(201).json({ message: 'Signup successful', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};


// Create Clerk


module.exports.registerClerk = async (req, res) => {
    try {
        const { name, mobileNo, password, hospitalId } = req.body;

        // Validate required fields
        if (!name || !mobileNo || !password || !hospitalId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the clerk already exists
        const existingClerk = await Clerk.findOne({ mobileNo });
        if (existingClerk) {
            return res.status(400).json({ message: "Clerk already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new clerk
        const newClerk = new Clerk({
            name,
            mobileNo,
            password: hashedPassword,
            hospital: hospitalId,
        });

        // Save the clerk
        await newClerk.save();

        // Push Clerk ID into the hospital's clerks array
        const updatedHospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            { $push: { clerks: newClerk._id } },
            { new: true }
        );

        if (!updatedHospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        return res.status(201).json({
            message: "Clerk registered successfully",
            clerk: newClerk,
            hospital: updatedHospital,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports.registerDoctor = async (req, res) => {
    try {
        const { name, mobileNo, password, specialization, hospitalId } = req.body;

        
        if (!name || !mobileNo || !password || !specialization || !hospitalId) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const existingDoctor = await Doctor.findOne({ mobileNo });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newDoctor = new Doctor({
            name,
            mobileNo,
            password: hashedPassword,
            specialization,
            hospital: hospitalId,
        });
        // Save the doctor
        await newDoctor.save();

        // Push Doctor ID into the hospital's doctors array
        const updatedHospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            { $push: { doctors: newDoctor._id } },
            { new: true }
        );

        if (!updatedHospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        return res.status(201).json({
            message: "Doctor registered successfully",
            doctor: newDoctor,
            hospital: updatedHospital,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
