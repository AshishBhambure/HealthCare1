const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const Clerk = require("../models/Clerk");
const Patient = require("../models/Patient");

module.exports.getAllClerksDoctorsPatientsOfHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;

        if (!hospitalId) {
            return res.status(400).json({ message: "Hospital ID is required" });
        }

        const hospital = await Hospital.findById(hospitalId).populate('patients doctors clerks');
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        return res.status(200).json({
            message: "Hospital details fetched successfully",
            hospital
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.deleteDoctor = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        const doctor = await Doctor.findByIdAndDelete(_id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        return res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.deleteClerk = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ message: "Clerk ID is required" });
        }

        const clerk = await Clerk.findByIdAndDelete(_id);
        if (!clerk) {
            return res.status(404).json({ message: "Clerk not found" });
        }

        return res.status(200).json({ message: "Clerk deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getAllDoctorsHospital = async(req,res)=>{
    try{
      const hospitalId = req.params.hospitalId;
      const doctors = await Doctor.find({ hospital: hospitalId });

      return res.status(200).json({
        success:true,
        doctors
      });
      
    }
    catch(e){
    // console.log(" Response :: ")
    return res.status(500).json({
        sucess:false,
        messgae:e.message
    })
    }
}
