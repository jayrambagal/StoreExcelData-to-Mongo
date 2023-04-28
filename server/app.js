const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config();
const { ExcelDataPost } = require("./controllers/index");
const path = require("path");
const app = express();

// ******************* Middlewares *********************************************8
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ************************** STORE DATA USING MULTER *****************************************
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// *************************** ROUTES *********************************************************
app.post("/upload", upload.single("fileUpload"), ExcelDataPost);
app.get("/", (req, res) => {
  return res.render("homepage");
});
app.get("/end", (req, res) => {
  return res.render("end");
});

//  ******************* MONGOOSE and SERVER SETUP *********************************************
const port = process.env.Port || 5001
mongoose.set("strictQuery", false);
mongoose
  .connect(
    process.env.MongoUrl,
    {}
  )
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
