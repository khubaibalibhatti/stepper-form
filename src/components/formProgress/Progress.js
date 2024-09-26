import React from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import "../formProgress/progress.css"; // Import the CSS file

const Progress = () => {
  const { step } = useSelector((state) => state.form);
  const steps = [1, 2, 3]; // Assuming 3 steps

  return (
    <div className="step-indicator">
      {steps.map((stepNumber) => (
        <div key={stepNumber} className="step-item">
          {step > stepNumber ? (
            <FaCheckCircle className="completed" />
          ) : (
            <span className={`step-number ${step === stepNumber ? "active" : ""}`}>
              {stepNumber}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Progress;
