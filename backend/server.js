import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "transitissue_db"
})

db.connect((err) => {
    if (err) {
      console.error("Error connecting to database: " + err.message);
    } else {
      console.log("Connected to database");
    }
  });

app.post("/submit-issue", (req, res) => {
    const { uniqueId, selectedIssue, selectedDate, selectedStation, description, file } = req.body;
    const sql = "INSERT INTO reportissue (ComplaintId, IssueType, Date, StationName, Description, Attachment) VALUES (?, ?, ?, ?, ?, ?)";
  
    db.query(sql, [uniqueId, selectedIssue, selectedDate, selectedStation, description, file], (err) => {
      if (err) {
        console.error("Error inserting data into database: " + err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Data inserted successfully");
        res.json({ success: true });
      }
    });
  });

app.get("/", (re, res) => {
    return res.json("From backend side");
})

app.listen(5174, () => {
    console.log("Server listening on port 5174");
})


