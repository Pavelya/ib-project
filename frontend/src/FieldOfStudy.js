import React, { useState } from "react";
import "./FieldOfStudy.css";

const FieldOfStudy = ({ goToNext }) => {
  const [field, setField] = useState("");

  const fields = [
    "Arts and Humanities",
    "Business and Management",
    "Engineering and Technology",
    "Health and Medicine",
    "Natural Sciences",
    "Social Sciences",
    "Mathematics and Statistics",
  ];

  const handleFieldSelect = (selectedField) => {
    setField(selectedField);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!field) {
      alert("Please select a field of study");
      return;
    }
    goToNext();
  };

  return (
    <div className="field-of-study-container">
      {/* Logout Button */}
      <button
        className="logout-button"
        onClick={() => window.location.reload()} // Example of logout handler
      >
        Logout
      </button>

      {/* Progress Bar */}
      <div className="progress-bar">
        <span>Step 1/3</span>
        <div className="progress-bar-indicator">
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
          <div className="progress-step"></div>
        </div>
      </div>

      {/* Heading */}
      <h1 className="heading">What are your preferred fields of study?</h1>

      {/* Field of Study Options */}
      <div className="fields-grid">
        {fields.map((item, index) => (
          <button
            key={index}
            className={`field-button ${field === item ? "selected" : ""}`}
            onClick={() => handleFieldSelect(item)}
          >
            <span className="field-icon">🎓</span>
            {item}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button
          className="action-button"
          onClick={() => window.location.reload()}
        >
          Start Over
        </button>
        <button
          className={`action-button next ${field ? "enabled" : "disabled"}`}
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FieldOfStudy;
