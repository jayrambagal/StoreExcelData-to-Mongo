const mongoose = require("mongoose")
const idvalidator = require("mongoose-id-validator");

// ******************* This Model used for when unknown excel file ****************************** 
const excelDataSchema = new mongoose.Schema({
    data:{
      type: Array,
    }
})
excelDataSchema.plugin(idvalidator);
const ExcelData = mongoose.model('excelData',excelDataSchema)
exports.ExcelData = ExcelData