import React, { useState } from "react";
import FieldOfStudy from "./FieldOfStudy";
import Location from "./Location";
import Form from "./Form";
import "./App.css";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedField, setSelectedField] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const resetSelection = () => {
    setSelectedField("");
    setSelectedLocation("");
    setCurrentStep(1);
  };

  return (
    <div className="app">
      {currentStep === 1 && (
        <FieldOfStudy
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          goToNextStep={goToNextStep}
        />
      )}
      {currentStep === 2 && (
        <Location
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
        />
      )}
      {currentStep === 3 && (
        <Form
          selectedField={selectedField}
          selectedLocation={selectedLocation}
          goBack={goToPreviousStep}
          resetSelection={resetSelection}
        />
      )}
    </div>
  );
};

export default App;
