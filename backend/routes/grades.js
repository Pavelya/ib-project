const express = require("express");
const router = express.Router();
const db = require("../db/database");

// Ensure the table exists
db.run(
  `CREATE TABLE IF NOT EXISTS user_data (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     field_of_study TEXT NOT NULL,
     location TEXT NOT NULL,
     overall_score INTEGER NOT NULL,
     subject_scores TEXT NOT NULL,
     tok_score INTEGER NOT NULL,
     ee_score INTEGER NOT NULL
   )`,
  (err) => {
    if (err) {
      console.error("Error ensuring table 'user_data' exists:", err.message);
    } else {
      console.log("Table 'user_data' is ready.");
    }
  }
);

// API to handle grades submission
router.post("/", async (req, res) => {
  try {
    const { fieldOfStudy, location, overallScore, subjectScores, tokScore, eeScore } = req.body;

    if (
      !fieldOfStudy ||
      !location ||
      overallScore == null ||
      !subjectScores ||
      tokScore == null ||
      eeScore == null
    ) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    // Insert data into the database
    db.run(
      `INSERT INTO user_data (field_of_study, location, overall_score, subject_scores, tok_score, ee_score) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [fieldOfStudy, location, overallScore, JSON.stringify(subjectScores), tokScore, eeScore],
      function (err) {
        if (err) {
          console.error("Error inserting data:", err.message);
          return res.status(500).send({ message: "Error storing data." });
        }

        res.status(200).send({ message: "Data successfully stored.", id: this.lastID });
      }
    );
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send({ message: "Internal server error." });
  }
});

// API to handle grades retrieval
router.get("/", (req, res) => {
  db.all(`SELECT * FROM user_data`, (err, rows) => {
    if (err) {
      console.error("Error retrieving data:", err.message);
      return res.status(500).send({ message: "Error retrieving data." });
    }
    res.status(200).send(rows);
  });
});

module.exports = router;
