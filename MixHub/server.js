const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const recordRoutes = express.Router();
const users = require("./routes/api/users");
const axios = require('axios');
const multer = require('multer');
const path = require("path");

//save files to filesystem
const fs = require("fs");

let Record = require("./models/Record");

const app = express();

app.use('/uploads', express.static('uploads'))

/**
 ... express.js boilerplate
 routes, middlewares, helpers, loggers, etc
**/

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

// express route where we receive files from the client
// passing multer middleware
app.post('/files', upload.single('file'), (req, res) => {
 const file = req.file; // file passed from client
 const meta = req.body; // all other values passed from the client, like name, etc..
 console.log("File: " + file);
 console.log("Posted to files");
 const tempPath = req.file.path;
 console.log(req.file.filename);
 const targetPath = path.join(__dirname, "./uploads/" + req.file.filename);

 fs.rename(tempPath, targetPath, err => {
     if (err) return handleError(err, res);

     res
       .status(200)
       .contentType("text/plain")
       .send({message: req.file.filename})
       .end("File uploaded!");
   });
});


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
//cors
app.use(cors())
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // Passport middleware
  app.use(passport.initialize());
  // Passport config
  require("./config/passport")(passport);
  // Routes
  app.use("/api/users", users);

recordRoutes.route("/").get(function(req, res) {
  Record.find(function(err, records) {
    if (err) {
      console.log(err);
    } else {
      res.json(records);
    }
  });
});

recordRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Record.findById(id, function(err, record) {
    res.json(record);
  });
});

recordRoutes.route("/add").post(function(req, res) {
  let record = new Record(req.body);
  record.save()
      .then( record => {
        res.status(200).json({"record": "record added successfully"});
      })
      .catch(err => {
        res.status(400).send("adding new records failed");
      });
});

recordRoutes.route("/update/:id").post(function(req, res) {
  console.log(req);
  Record.findById(req.params.id, function(err, record) {
  if (!record)
     res.status(404).send("data is not found");
     else
     record.record_title= req.body.record_title;
     record.record_artist= req.body.record_artist;
     record.record_description= req.body.record_description;
     record.record_price= req.body.record_price;
     record.record_genre= req.body.record_genre;
     record.record_size= req.body.record_size;
     record.record_type= req.body.record_type;
     record.record_image= req.body.record_image;

     record.save().then(record => {
       res.json("record updated");
     })
     .catch(err => {
       res.status(400).send("Update not possible");
     });
   });
});

recordRoutes.route("/delete/:id").delete(function(req, res) {
  console.log(req);
  let id = req.params.id;
  Record.findByIdAndDelete(id, (err) =>{
    if(err){
        console.log(err);
    }
 })
});

app.use("/records", recordRoutes);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running... on port ${port} !`));
