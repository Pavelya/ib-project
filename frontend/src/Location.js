import React, { useState } from "react";
import "./Location.css";

const Location = ({ goToNext }) => {
  const [location, setLocation] = useState("");

  const locations = [
    "United States",
    "Canada",
    "United Kingdom",
    "Netherlands",
    "Australia",
    "Singapore",
    "Hong Kong",
    "India",
    "South Korea",
    "Japan",
    "Spain",
    "Germany",
    "New Zealand",
    "Italy",
    "Norway",
    "Denmark",
    "Switzerland",
    "Finland",
    "Ireland",
    "Egypt",
    "United Arab Emirates",
    "France",
    "Poland",
    "Belgium",
    "Lebanon",
    "Austria",
    "South Africa",
  ];

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      alert("Please select a location");
      return;
    }
    goToNext();
  };

  return (
    <div className="location-container">
      {/* Logout Button */}
      <button
        className="logout-button"
        onClick={() => window.location.reload()} // Example of logout handler
      >
        Logout
      </button>

      {/* Progress Bar */}
      <div className="progress-bar">
        <span>Step 2/3</span>
        <div className="progress-bar-indicator">
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
        </div>
      </div>

      {/* Heading */}
      <h1 className="heading">Where do you prefer to study?</h1>

      {/* Location Options */}
      <div className="locations-cloud">
        {locations.map((item, index) => (
          <button
            key={index}
            className={`location-tag ${location === item ? "selected" : ""}`}
            onClick={() => handleLocationSelect(item)}
          >
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
          className={`action-button next ${location ? "enabled" : "disabled"}`}
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Location;
