const readExcelFile = require("read-excel-file/node");
const { ExcelData } = require("../model/dataModel");
const { Emp } = require("../model/empSchema");
const xlsx = require("xlsx")
const async = require("async")

// ******************************* Post the excel data to mongoDB ***************************************************************
exports.ExcelDataPost = async (req, res) => {
  try{
    if (req.file == undefined) {
          return res.status(400).send("Please upload an excel file!");
        }

    // reading the excel file
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet);

    // use of aync.eachSeries (storing data one by one)
    async.eachSeries(rows, async function(row, callback) {

      const userExist = await Emp.findOne({ Email: row['Email'] });

      // handling the duplication of data ( avoid duplicate data to store)
      if(!userExist){
        const document = new Emp({         
          CandidateName:row['Name of the Candidate'],
          Email:row['Email'],
          MobileNo:row['Mobile No.'],
          DateofBirth:row['Date of Birth'],
          WorkExperience:row['Work Experience'],
          ResumeTitle:row['Resume Title'],
          CurrentLocation:row['Current Location'],
          PostalAddress:row['Postal Address'],
          CurrentEmployer:row['Current Employer'],
          CurrentDesignation:row['Current Designation'],
          });
    
          // Storing all data to mongoDb
          try {
              await document.save();
              console.log(`Document with id ${document._id} saved successfully`);
            } catch (err) {
              console.error(`Error saving document: ${err}`);
            }

      // if duplicate email found then skip the row (skip the hole data values) *****************
      }else{
        console.log(`Found Duplicate mail ${row["Email"]}`);
      }

      //  callback
    }, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('All documents inserted successfully');
      }
    });
      return res.status(200).redirect("/end");

  }catch(error){
    res.send("error in reading file")
    console.log(error);
  }
  return;
};



// ********************* Data will be store in MongoDb array format **********************************************************
exports.excelDataExtractor = async (req, res) => {
  try{
    if (req.file == undefined) {
          return res.status(400).send("Please upload an excel file!");
        }
    // reading the excel file
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet);

    // use of aync.eachSeries
    async.eachSeries(rows, async function(row, callback) {

      const userExist = await ExcelData.findOne({ Email: row['Email'] });
      
      // handling the duplication of data ( avoid duplicate data to store)
      if(!userExist){
        const document = new ExcelData({row});
      // Storing all data to mongoDb
      try {
          await document.save();
          console.log(`Document with id ${document._id} saved successfully`);
        } catch (err) {
          console.error(`Error saving document: ${err}`);
        }
      }
      
    }, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('All documents inserted successfully');
      }
    });
      return res.status(200).redirect("/end");
  }catch(error){
    res.send("error in reading file")
    console.log(error);
  }
  return;
};