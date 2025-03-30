const Hospital = require("../models/Hospital");

const getAllHospitals = async (req, res) => {
    try {
        console.log("deepakkkkkkkkkkkkkkkkkkkkkkkkkkk")
        const hospitals = await Hospital.find();
        res.status(200).json({
            success: true,
            count: hospitals.length,
            data: hospitals
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching hospitals",
            error: error.message
        });
    }
};

module.exports = getAllHospitals;