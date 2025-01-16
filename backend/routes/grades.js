const express = require('express');
const router = express.Router();
const db = require('./database');

// API to handle grades submission
router.post('/api/grades', async (req, res) => {
    try {
        const { fieldOfStudy, location, overallScore, subjectScores, tokScore, eeScore } = req.body;

        // Insert data into the database
        await db.query(
            `INSERT INTO user_data (field_of_study, location, overall_score, subject_scores, tok_score, ee_score) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [fieldOfStudy, location, overallScore, JSON.stringify(subjectScores), tokScore, eeScore]
        );

        res.status(200).send({ message: 'Data successfully stored.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error storing data.' });
    }
});

module.exports = router;
