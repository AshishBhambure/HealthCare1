const Doctor = require('../models/Doctor');

module.exports.getDoctorDetails = async (req, res) => {
    try {
        const { doctorId } = req.body;

        // Find the doctor by ID
        const doctor = await Doctor.findById(doctorId).populate('hospital', 'name address'); // Populate hospital details

        // Check if doctor exists
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        return res.status(200).json({ message: "Doctor details retrieved successfully", doctor });
    } catch (err) {
        console.error("Error fetching doctor details:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
