const express = require("express");
const mysql = require("mysql2");
var cors = require("cors");
const bodyParser = require("body-parser");

// Create the Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the MySQL database
const mysqlConfig = {
  host: "db",
  port: "3306",
  user: "admin",
  password: "password",
  database: "JobList",
};

let con = null;
const databaseInit = () => {
  con = mysql.createConnection(mysqlConfig);
  con.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      return;
    }
    console.log("Connected to the database");
  });
};

// GET request
app.get("/job", (req, res) => {
  // If we aren't connected, connect.
  if (con == null) databaseInit();
  con.query("SELECT * FROM Jobs", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(results);
    }
  });
});

// POST request
app.post("/job", (req, res) => {
  // If we aren't connected, connect.
  if (con == null) databaseInit();
  console.log(req.body);
  if (req.body.jobid) {
    con.query(
      "INSERT INTO Jobs (Job_ID, Job_Desc, Due_Date, Address_) VALUES (?, ?, ?, ?)",
      [req.body.jobid, req.body.jobdesc, req.body.duedate, req.body.address],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error retrieving data from database");
        } else {
          res.json(results);
        }
      }
    );
  } else {
    // if no jobid is provided
    con.query(
      "INSERT INTO Jobs (Job_Desc, Due_Date, Address_) VALUES (?, ?, ?)",
      [req.body.jobdesc, req.body.duedate, req.body.address],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error retrieving data from database");
        } else {
          res.json(results);
        }
      }
    );
  }
});

// Start the server
app.listen(80, () => {
  console.log("Server running on port 80");
});
