 const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    certifications: [{
        type: String,  // Image URLs or file paths
        required: false
    }],
    address: {
        type: String,
        // required: true
    },

    location: {

        coordinates: {
            type: [Number], // Array of [longitude, latitude]
        }
    },
    owner_name: {
        type: String,
    },
    license_no: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    working_hours: {
        type: String,  // E.g., "9:00 AM - 6:00 PM"
    },
    working_days: [{
        type: String,  // E.g., ["Monday", "Tuesday"]
    }],

    mobileNo: {
        type: String,  // Array of contact numbers
        required: true
    },
    speciality: [{
        type: String,  // Specialties like Eye, Heart, Neuro
    }],
    photo: [{
        type: String,  // Images of the hospital
        required: false
    }],
    type: {
        type: String,
        enum: ['For Males', 'For Females', 'For Children'],
    },
    owned_by: {
        type: String,
        enum: ['Govt', 'Private'],
    },
    beds: {
        type: Number,
    },
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        // required: false
    }],
    clerks: [{
        type:mongoose.Schema.Types.ObjectId,
       ref:"Clerk",       
    }],
    patients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
    }],
    is_approved: {
        type: Boolean,
        default: false,
    },
    role:{
        type:String,
        default:"hospital"
    }
});


// HospitalSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Hospital', HospitalSchema);
