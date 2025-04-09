import Text from "@/components/Text/Text";
import React, { useState } from "react";
import LabelWrapper from "../LabelWrapper";
import AppButton from "@/components/Button/AppButton";
import AppInput from "@/components/Input/AppInput";

const GetNameAndEmail = ({
  handleNewCustomerData,
  formData,
  setFormData,
  loading,
}) => {
  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData?.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: { message: "Enter a valid email address" },
      }));
      return false;
    }
    return true;
  };

  const validateName = () => {
    const nameRegex = /^[A-Za-z\s]*$/;
    if (!nameRegex.test(formData?.first_name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        first_name: { message: "Enter a name without numbers and characters" },
      }));
      return false;
    }
    return true;
  };
  const isBtnDisabled = !(
    formData?.first_name?.length > 1 && formData?.email?.length > 5
  );
  // console.log(
  //   "((formData?.first_name?.length > 1) && (formData?.email?.length > 5))",
  //   formData?.first_name?.length > 1 && formData?.email?.length > 5
  // );
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate name fields
    if (name === "first_name") {
      const isAlphabeticWithSpaces = /^[A-Za-z\s]*$/.test(value);
      if (!isAlphabeticWithSpaces && value !== "") {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex justify-center flex-col md:items-start items-center gap-[20px] md:gap-[30px]">
      <Text className={"font-bold text-[18px] md:text-[24px] text-appRed"}>
        Let’s get you started!
      </Text>
      <div className="w-full flex gap-[12px] md:gap-[20px] flex-col">
        <LabelWrapper label={"Enter your name*"} className={"w-full"}>
          <AppInput
            className="!bg-white border border-[#E6E7E9] rounded-[5px]"
            placeholder={"Name"}
            name="first_name"
            value={formData?.first_name}
            rawInput={true}
            isError={errors?.first_name}
            onChange={(e) => handleInputChange(e)}
          />
        </LabelWrapper>
        <LabelWrapper label={"Enter your email ID*"} className={"w-full"}>
          <AppInput
            onChange={(e) => handleInputChange(e)}
            type="email"
            name={"email"}
            value={formData}
            isError={errors}
            className="!bg-white border border-[#E6E7E9] rounded-[5px]"
            placeholder={"youremail@example.com"}
            // handleEnterClick={
            //   isBtnDisabled ? undefined : () => handleNewCustomerData()
            // }
          />
        </LabelWrapper>
      </div>

      <AppButton
        wrapperClassName={"w-full md:w-fit"}
        className={"w-full"}
        text={"Continue"}
        variant={"red"}
        onClick={() =>
          isBtnDisabled || !validateName() || !validateEmail()
            ? null
            : handleNewCustomerData()
        }
        disabled={isBtnDisabled}
        isLoading={loading}
      />
    </div>
  );
};

export default GetNameAndEmail;
