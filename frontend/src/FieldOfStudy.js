import React from "react";
import "./FieldOfStudy.css";

const FieldOfStudy = ({ selectedField, setSelectedField, goToNextStep }) => {
  const fields = [
    "Arts and Humanities",
    "Business and Management",
    "Engineering and Technology",
    "Health and Medicine",
    "Natural Sciences",
    "Social Sciences",
    "Mathematics and Statistics",
  ];

  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  const handleNextClick = () => {
    if (selectedField) {
      goToNextStep();
    } else {
      alert("Please select a field of study.");
    }
  };

  return (
    <div className="field-of-study-container">
      <div className="progress-bar">
        <span>Step 1/3</span>
        <div className="progress-bar-indicator">
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
          <div className="progress-step"></div>
        </div>
      </div>
      <h1 className="heading">What are your preferred fields of study?</h1>
      <div className="fields-grid">
        {fields.map((field, index) => (
          <button
            key={index}
            className={`field-button ${
              selectedField === field ? "selected" : ""
            }`}
            onClick={() => handleFieldSelect(field)}
          >
            {field}
          </button>
        ))}
      </div>
      <div className="actions">
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FieldOfStudy;
