const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    sex: {
        type: String,
        // required: true,
        enum: ['Male', 'Female', 'Other']
    },
    age: {
        type: Number,
        // required: true
    },
    marital_status: {
        type: String,
        // required: true,
        enum: ['Single', 'Married', 'Divorced', 'Widowed']
    },
    contact_number: {
        type: String,
        // required: true,
        // unique: true
    },
    emergency_contact: {
        type: String,
        required: false
    },
    address: {
        type: String,
        // required: true
    },
    blood_group: {
        type: String,
        required: false,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    photo: {
        type: String,
        required: false
    },
    id_proof: {
        type: String,
        // required: true,
        // enum: ['Aadhar', 'PAN']
    },
    role:{
        type: String,
        default:"patient"
    }
});

module.exports = mongoose.model('Patient', PatientSchema);