const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

// Connect to the database
const db = new sqlite3.Database("./db/database.db");

// API endpoint to submit grades
router.post("/", (req, res) => {
  const { overallScore, tokScore, eeScore, subjects } = req.body;

  // Convert subjects array to a JSON string for storage
  const subjectsJSON = JSON.stringify(subjects);

  db.run(
    `INSERT INTO grades (overall_score, tok_score, ee_score, subjects) VALUES (?, ?, ?, ?)`,
    [overallScore, tokScore, eeScore, subjectsJSON],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to insert grades." });
      }
      res.status(201).json({ message: "Grades submitted successfully!" });
    }
  );
});

// API endpoint to get all grades
router.get("/", (req, res) => {
  db.all("SELECT * FROM grades", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Failed to retrieve grades." });
    }
    res.status(200).json(rows);
  });
});

module.exports = router;
