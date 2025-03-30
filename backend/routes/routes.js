const express = require("express");
// const hospitalLogin = require("../controllers/auth")
const { appAdminPatientLogin, hospitalLogin, appAdminPatientSignup, hospitalSignup, login, signUp, registerClerk, registerDoctor } = require("../controllers/auth");
const { updateDoctorProfile,updateHospitalProfile, updatePatientProfile} = require("../controllers/updateProfiles");
const { addDisease, updateDisease, deleteDisease, getDiseasesForPatient } = require("../controllers/Disease");
const {getAllClerksDoctorsPatientsOfHospital, deleteDoctor, deleteClerk, getAllDoctorsHospital}  = require("../controllers/Hospitals");
const { getPatientDetailsByMobile } = require("../controllers/Patient");
// const {registerClerk} = require("../controllers/auth")
const {getDoctorDetails} = require("../controllers/getDoctorById");
const getAllHospitals = require("../controllers/getAllHospital");


const router = express.Router();


router.post('/getDiseasesForPatient/:patient_id',getDiseasesForPatient)


// Hospital Login Route
router.post("/hospital/login", hospitalLogin);
router.post("/hospital/signup",hospitalSignup);

//Update
router.post("/updateHospitalProfile/:hospitalId",updateHospitalProfile);
router.post("/updatePatientProfile/:patientId",updatePatientProfile);
router.post("/updateDoctorProfile/:id",updateDoctorProfile);

// register CLERK AND DOCTORS
router.post("/hospital/:hospitalId/register-clerk",registerClerk)
router.post("/hospital/:hospitalId/register-Doctor",registerDoctor)

//AUTH
router.post("/login", login);
router.post("/signup", signUp);

//DISEASE
router.post('/addDisease',addDisease);
router.post('/updateDisease/:disease_id',updateDisease);
router.post('/deleteDisease/:disease_id',deleteDisease);


// GET ALL HOSPITAL DOCTORS, PATIENTS, CLERKS
router.post("/getAllClerksDoctorsPatientsOfHospital/:hospitalId",getAllClerksDoctorsPatientsOfHospital)

//
router.post("/getPatientDetailByMobileNo",getPatientDetailsByMobile);
router.post('/deleteDoctor',deleteDoctor);
router.post('/deleteClerk',deleteClerk);

//getdoctorbyid
router.post('/getDoctorDetails',getDoctorDetails);
router.post('/getAllDoctorsHospital/:hospitalId',getAllDoctorsHospital);


router.get('/getAllHospitals', getAllHospitals);

module.exports = router;