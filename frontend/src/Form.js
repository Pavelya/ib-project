import React, { useState } from "react";
import "./Form.css";

const Form = ({ fieldOfStudy, location }) => {
  const [formData, setFormData] = useState({
    overallScore: "",
    subjects: Array(6).fill({ name: "", score: "" }),
    tokScore: "",
    eeScore: "",
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedSubjects = [...formData.subjects];
      updatedSubjects[index] = { ...updatedSubjects[index], [name]: value };
      setFormData({ ...formData, subjects: updatedSubjects });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5008/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldOfStudy,
          location,
          overallScore: formData.overallScore,
          tokScore: formData.tokScore,
          eeScore: formData.eeScore,
          subjects: formData.subjects,
        }),
      });

      if (response.ok) {
        alert("Grades submitted successfully!");
        setFormData({
          overallScore: "",
          subjects: Array(6).fill({ name: "", score: "" }),
          tokScore: "",
          eeScore: "",
        });
      } else {
        alert("Failed to submit grades.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting grades.");
    }
  };

  return (
    <div className="form-container">
      <h1>Enter Your IB Grades</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Field of Study:</label>
          <p>{fieldOfStudy}</p>
        </div>
        <div>
          <label>Location:</label>
          <p>{location}</p>
        </div>
        <div className="section">
          <label>Overall IB Score:</label>
          <input
            type="number"
            name="overallScore"
            placeholder="e.g. 36"
            value={formData.overallScore}
            onChange={handleChange}
          />
        </div>
        <div className="section">
          <h2>Subject Scores</h2>
          {formData.subjects.map((subject, index) => (
            <div className="subject-row" key={index}>
              <input
                type="text"
                name="name"
                placeholder={`Subject ${index + 1}`}
                value={subject.name}
                onChange={(e) => handleChange(e, index)}
              />
              <input
                type="number"
                name="score"
                placeholder="Score (1-7)"
                value={subject.score}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          ))}
        </div>
        <div className="section">
          <h2>TOK and EE Points</h2>
          <div className="tok-ee-row">
            <input
              type="number"
              name="tokScore"
              placeholder="TOK Score (0-3)"
              value={formData.tokScore}
              onChange={handleChange}
            />
            <input
              type="number"
              name="eeScore"
              placeholder="EE Score (0-3)"
              value={formData.eeScore}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
