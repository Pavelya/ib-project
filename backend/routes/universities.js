const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../db/database");

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Add a new university
router.post("/", upload.single("logo"), (req, res) => {
  const { name, location } = req.body;
  const logoPath = req.file ? req.file.path : null;

  // Insert into database
  const query = `INSERT INTO universities (name, location, logo) VALUES (?, ?, ?)`;
  db.run(query, [name, location, logoPath], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Failed to add university." });
    }
    res.status(201).json({ message: "University added successfully!" });
  });
});

// Get all universities
router.get("/", (req, res) => {
  db.all("SELECT * FROM universities", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Failed to retrieve universities." });
    }
    res.json(rows);
  });
});

module.exports = router;
