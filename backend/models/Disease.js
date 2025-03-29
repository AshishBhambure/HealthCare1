const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    disease_name: {
        type: String,
        required: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    clerk_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clerk',
    },
    date: {
        type: Date,
        default: Date.now
    },
    medicines: [{
        type: String,
    }],
    previous_medicines: [{
        type: [String], // Stores arrays of medicines from previous updates
        date: { type: Date, default: Date.now }
    }],
    recommendation: {
        type: String,
    },
    previous_recommendations: [{
        recommendation: String,
        date: { type: Date, default: Date.now }
    }],
    cured: {
        type: Boolean,
        default: false
    },
    commited: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Disease', DiseaseSchema);
