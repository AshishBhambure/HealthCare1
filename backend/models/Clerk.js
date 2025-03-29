const mongoose = require('mongoose');

const ClerkSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId
    },
    id_number: {
        type: String,
        // required: true
    },
    role:{
        type:String,
        default:"clerk"
    }
});

module.exports = mongoose.model('Clerk', ClerkSchema);
