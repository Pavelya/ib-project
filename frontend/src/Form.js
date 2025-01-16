import React, { useState } from "react";
import "./Form.css";

const Form = ({ selectedField, selectedLocation, goBack }) => {
  const [overallScore, setOverallScore] = useState("");
  const [subjectScores, setSubjectScores] = useState(
    Array.from({ length: 6 }, () => ({ subject: "", score: "" }))
  );
  const [tokScore, setTokScore] = useState("");
  const [eeScore, setEeScore] = useState("");

  const handleScoreChange = (index, field, value) => {
    const updatedScores = [...subjectScores];
    if (field === "subject") {
      updatedScores[index].subject = value;
    } else if (field === "score") {
      // Allow only numbers within the range 1–7
      const filteredValue = value.replace(/[^0-9]/g, "");
      const score = parseInt(filteredValue, 10);
      if (!isNaN(score) && score >= 1 && score <= 7) {
        updatedScores[index].score = filteredValue;
      } else if (filteredValue === "") {
        updatedScores[index].score = "";
      }
    }
    setSubjectScores(updatedScores);
  };

  const handleSubmit = () => {
    // Validate overall score
    const overall = parseInt(overallScore, 10);
    if (isNaN(overall) || overall < 0 || overall > 45) {
      alert("Please enter a valid overall IB score (0–45).");
      return;
    }

    // Validate TOK and EE scores
    const tok = parseInt(tokScore, 10);
    const ee = parseInt(eeScore, 10);
    if (
      isNaN(tok) ||
      tok < 0 ||
      tok > 3 ||
      isNaN(ee) ||
      ee < 0 ||
      ee > 3
    ) {
      alert("Please enter valid TOK and EE scores (0–3).");
      return;
    }

    // Check subject scores
    const invalidScores = subjectScores.some(
      (entry) => entry.subject.trim() === "" || isNaN(parseInt(entry.score, 10))
    );
    if (invalidScores) {
      alert("Please ensure all subject names and scores (1–7) are filled out correctly.");
      return;
    }

    // If all validations pass, process the data
    console.log({
      overallScore,
      subjectScores,
      tokScore,
      eeScore,
      selectedField,
      selectedLocation,
    });
    alert("Form submitted successfully!");
  };

  return (
    <div className="form-container">
      <div className="progress-bar">
        <span>Step 3/3</span>
        <div className="progress-bar-indicator">
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
        </div>
      </div>
      <h1 className="heading">Enter Your IB Grades</h1>
      <div className="field-display">
        <p>
          <strong>Field of Study:</strong> {selectedField || "Not Selected"}
        </p>
        <p>
          <strong>Location:</strong> {selectedLocation || "Not Selected"}
        </p>
      </div>

      <div className="form-fields">
        <div className="form-group">
          <label>Overall IB Score:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="e.g. 36"
            className="overall-score-input"
            value={overallScore}
            onChange={(e) =>
              setOverallScore(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
        </div>

        <h2 className="section-heading">Subject Scores</h2>
        {subjectScores.map((entry, index) => (
          <div className="subject-row" key={index}>
            <input
              type="text"
              placeholder={`e.g. Subject ${index + 1}`}
              className="subject-input"
              value={entry.subject}
              onChange={(e) =>
                handleScoreChange(index, "subject", e.target.value)
              }
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Score (1–7)"
              className="score-input"
              value={entry.score}
              onChange={(e) =>
                handleScoreChange(index, "score", e.target.value)
              }
            />
          </div>
        ))}

        <h2 className="section-heading">TOK and EE Points</h2>
        <div className="tok-ee-row">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="TOK Score (0–3)"
            className="tok-ee-input"
            value={tokScore}
            onChange={(e) =>
              setTokScore(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="EE Score (0–3)"
            className="tok-ee-input"
            value={eeScore}
            onChange={(e) =>
              setEeScore(e.target.value.replace(/[^0-9]/g, ""))
            }
          />
        </div>
      </div>

      <div className="actions">
        <button className="back-button" onClick={goBack}>
          Locations
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Get Results
        </button>
      </div>
    </div>
  );
};

export default Form;
