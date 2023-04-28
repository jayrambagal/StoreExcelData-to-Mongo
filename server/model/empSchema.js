const mongoose = require("mongoose")

const empSchema =  mongoose.Schema({
    CandidateName:String,
    Email:String,
    MobileNo:String,
    DateofBirth:String,
    WorkExperience:String,
    ResumeTitle:String,
    CurrentLocation:String,
    PostalAddress:String,
    CurrentEmployer:String,
    CurrentDesignation:String,
})

const Emp = mongoose.model("empdata", empSchema);
exports.Emp = Emp;