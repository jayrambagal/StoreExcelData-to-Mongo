const readExcelFile = require("read-excel-file/node");
const { ExcelData } = require("../model/dataModel");
const { Emp } = require("../model/empSchema");

// ******************************* Post the excel data to mongoDB ***************************************************************
exports.ExcelDataPost = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    readExcelFile(req.file.path)
      .then(async (rows) => {
        var data = [];
        for (let i = 1; i < rows.length; i++) {
          data = rows[i];

          const userExist = await Emp.findOne({ Email: data[1] });
          if (!userExist) {
            try {
              let empData = new Emp({
                CandidateName: data[0],
                Email: data[1],
                MobileNo: data[2],
                DateofBirth: data[3],
                WorkExperience: data[4],
                ResumeTitle: data[5],
                CurrentLocation: data[6],
                PostalAddress: data[7],
                CurrentEmployer: data[8],
                CurrentDesignation: data[9],
              });
              await empData.save();
            } catch (ex) {
              res.status(400).send(ex.message);
            }
          }
        }
        return res.status(200).redirect("/end");
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Failed to read the uploaded excel file!",
          error: error.message,
        });
      });
  } catch (ex) {
    res.status(500).send(ex.message);
  }
  return;
};

// ********************* when Unknown file is uploaded this route will be used **********************************************************
exports.excelDataExtractor = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    readExcelFile(req.file.path)
      .then(async (rows) => {
        var data = [];
        for (let i = 0; i < rows.length; i++) {
          data.push(rows[i].Email);
          console.log(data[i][1]);
        }
        for (let i = 0; i < data.length; i++) {
          try {
            let excelData = new ExcelData({ data: data[i] });
            await excelData.save();
          } catch (ex) {
            res.status(400).send(ex.message);
          }
        }
        return res.status(200).redirect("/end");
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Failed to read the uploaded excel file!",
          error: error.message,
        });
      });
  } catch (ex) {
    res.status(500).send(ex.message);
  }
  return;
};
