import React, { useState } from "react";
import GetPhoneNumberStep from "./steps/GetPhoneNumberStep";
import VerifyOTPStep from "./steps/VerifyOTPStep";
import GetNameAndEmail from "./steps/GetNameAndEmail";

const LoginStepsContainer = ({
  formData,
  setFormData,
  handleInputChange,
  step,
  setStep,
  handleValidatePhoneNumber,
  loading,
  handleValidateOTP,
  handleNewCustomerData,
}) => {
  const stepsArr = [
    {
      comp: (
        <GetPhoneNumberStep
          handleInputChange={handleInputChange}
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          handleValidatePhoneNumber={handleValidatePhoneNumber}
          loading={loading}
        />
      ),
    },
    {
      comp: (
        <VerifyOTPStep
          handleInputChange={handleInputChange}
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
          loading={loading}
          handleValidateOTP={handleValidateOTP}
          resendOTP={handleValidatePhoneNumber}
        />
      ),
    },
    {
      comp: (
        <GetNameAndEmail
          formData={formData}
          handleNewCustomerData={handleNewCustomerData}
          setFormData={setFormData}
          setStep={setStep}
          loading={loading}
        />
      ),
    },
  ];
  return <div>{stepsArr?.[step]?.comp}</div>;
};

export default LoginStepsContainer;
