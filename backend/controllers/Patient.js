const Disease = require("../models/Disease");
const Patient = require("../models/Patient");


module.exports.getPatientDetailsByMobile = async (req, res) => {
  try {
    const { mobileNo } = req.body;

    if (!mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required."
      });
    }

    
    const patient = await Patient.findOne({ mobileNo });
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found , Or Check The Mobile Number"
      });
    }

    const diseases = await Disease.find({ patient_id: patient._id })
    .populate({
      path: "doctor_id",
      populate: {
        path: "hospital", 
      },
    });
    return res.status(200).json({
      success: true,
      patient,
      diseases
    });
  } catch (e) {
    console.error("Error occurred", e);
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};
