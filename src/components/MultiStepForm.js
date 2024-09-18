import React from "react";
import { useSelector } from "react-redux";
import Step1 from "../components/formStep/Step1";
import Step2 from "../components/formStep/Step2";
import Step3 from "../components/formStep/Step3";
const MultiStepForm = () => {
  const step = useSelector((state) => state.form.step);
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  return <div>{renderStep()}</div>;
};

export default MultiStepForm;
