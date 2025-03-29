const mongoose = require('mongoose');

const AppAdminSchema = new mongoose.Schema({
    mobileNo:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"appadmin"
    }
});

module.exports = mongoose.model('AppAdmin', AppAdminSchema);
