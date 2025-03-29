const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    contact: [{
        type: String,
        // required: true
    }],
    year_of_experience: {
        type: Number,
        // required: true
    },
    degree: [{
        type: String,
        // required: true
    }],
    specialization : [{
        type: String,
        // required: true
    }],
    image: {
        type: String,
        required: false
    },
    doctor_license: {
        type: String,
        // required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    role:
    {
        type:String,
        default:"doctor"
    },
    mobileNo: {
        type: String,
        required: true
    },
    password:
    {
        type:String,
        required:true
    },

});

module.exports = mongoose.model('Doctor', DoctorSchema);