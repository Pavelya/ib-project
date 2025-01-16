import React from "react";
import "./Location.css";

const Location = ({
  selectedLocation,
  setSelectedLocation,
  goToNextStep,
  goToPreviousStep,
}) => {
  const locations = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "Australia",
    "New Zealand",
    "Israel",
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleNextClick = () => {
    if (selectedLocation) {
      goToNextStep();
    } else {
      alert("Please select a location.");
    }
  };

  return (
    <div className="location-container">
      <div className="progress-bar">
        <span>Step 2/3</span>
        <div className="progress-bar-indicator">
          <div className="progress-step active"></div>
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
        </div>
      </div>
      <h1 className="heading">Where do you prefer to study?</h1>
      <div className="locations-cloud">
        {locations.map((location, index) => (
          <button
            key={index}
            className={`location-tag ${
              selectedLocation === location ? "selected" : ""
            }`}
            onClick={() => handleLocationSelect(location)}
          >
            {location}
          </button>
        ))}
      </div>
      <div className="actions">
        <button className="back-button" onClick={goToPreviousStep}>
          Back to Fields
        </button>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Location;
