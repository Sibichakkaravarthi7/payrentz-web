import AppButton from "@/components/Button/AppButton";
import AppInput from "@/components/Input/AppInput";
import AppLabel from "@/components/Label/AppLabel";
import LabelWrapper from "@/components/Login/LabelWrapper";
import { Label } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";
import toast from "react-hot-toast";
import { getCurrentDate } from "@/utils/Constants";
import AppTooltip from "@/components/Tooltip/AppTooltip";

function BasicForm() {
  const {
    formData,
    setFormData,
    setStep,
    step,
    error,
    setError,
    mutate,
    isLoading,
  } = useContext(KycContext);
  const [pincodeInfo, setPincodeInfo] = useState({ city: "", state: "" });
  const query = require("india-pincode-search");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    // Check if the input is for first name or last name
    if (name === "last_name" || name === "first_name") {
      // Check if the input is a valid alphabetic string
      const isAlphabeticWithSpaces = /^[A-Za-z\s]*$/.test(value);
      // If the input is not alphabetic, don't update the form data
      if (!isAlphabeticWithSpaces && value !== "") {
        return;
      }
      // Otherwise, update the form data
      validatedValue = value;
    }
    setFormData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));
  };

  const handleCheckboxChange = (f) => {
    const { name, value, type, checked } = f?.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleValidation = () => {
    const err = {};
    const checkList = [
      "first_name",
      "phone_number",
      "alternative_phone_number",
      "email",
      "date_of_birth",
      "floor_number",
      "address_line1",
      "address_line2",
      "address_city",
      "address_state",
      // "pincode",
      "location_link",
      "lift_availability",
    ];

    checkList?.map((m) => {
      // console.log(m, formData?.[m]);
      if ([null, "", undefined]?.includes(formData?.[m])) {
        err[m] = { message: "Enter a valid value" };
      }
    });

    if (
      formData?.alternate_whatsapp_enabled == true &&
      [null, undefined, ""]?.includes(formData?.alternative_phone_number)
    ) {
      err.alternative_phone_number = { message: "Enter a valid value" };
    }

    //Check if phone number and alternate phone number are same
    if (formData?.phone_number === formData?.alternative_phone_number) {
      err.alternative_phone_number = {
        message: "Phone number and alternate phone number cannot be the same",
      };
      err.phone_number = {
        message: "Phone number and alternate phone number cannot be the same",
      };
      toast.error("Phone number and alternate phone number cannot be the same");
    }

    if ([null, undefined, ""]?.includes(formData?.last_name)) {
      err.last_name = { message: "Enter a valid value" };
    }

    //last name Regex
    const nameRegex = /^[A-Za-z\s]*$/;
    if (!nameRegex.test(formData?.last_name)) {
      err.last_name = {
        message: "Enter a name without numbers and characters",
      };
    }

    //Google maps validation
    const urlRegex =
      /\b(?:https?|ftp):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/%=~_|]/;
    if (!urlRegex.test(formData?.location_link)) {
      err.location_link = {
        message: "Enter a valid link e.g(https://www.google.com/maps/..)",
      };
    }

    // Date of Birth validation
    const currentDate = new Date();
    const dob = new Date(formData?.date_of_birth);
    const sixteenYearsAgo = new Date();
    sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 17);

    if (dob > currentDate || dob > sixteenYearsAgo) {
      err.date_of_birth = {
        message: "Date of birth must be above 16 years",
      };
    }

    setError(err);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData?.email)) {
      err.email = { message: "Enter a valid email address" };
    }

    if (Object.keys(err)?.length > 0) {
      return false;
    } else {
      if (
        formData?.personal_whatsapp_enabled == false &&
        formData?.alternate_whatsapp_enabled == false
      ) {
        setError({
          personal_whatsapp_enabled: {
            message: "  ",
          },
          alternate_whatsapp_enabled: {
            message: "  ",
          },
        });
        toast.error(
          "Please select a mobile number as the preferred WhatsApp contact"
        );
        return false;
      }
      return true;
    }
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      mutate({
        steps_completed: step,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        phone_number: `+91${formData?.phone_number}`,
        alternative_phone_number: formData?.alternative_phone_number
          ? `+91${formData?.alternative_phone_number}`
          : null,
        email: formData?.email,
        date_of_birth: formData?.date_of_birth,
        floor_number: formData?.floor_number,
        address_line1: formData?.address_line1,
        address_line2: formData?.address_line2,
        address_city: formData?.address_city,
        address_state: formData?.address_state,
        pincode: formData?.pincode,
        location_link: formData?.location_link,
        lift_availability: formData?.lift_availability == "true" ? true : false,
        alternate_whatsapp_enabled: formData?.alternate_whatsapp_enabled,
        personal_whatsapp_enabled: formData?.personal_whatsapp_enabled,
      });
      // console.log("Mutated basic step");
      // setStep("next");
    }
  };

  useEffect(() => {
    if (Object.keys(error)?.length > 0) {
      const errorElements = document.getElementsByName(Object.keys(error)?.[0]);
      const firstErrorElement = errorElements?.[0];
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [error]);

  useEffect(() => {
    if (formData?.pincode || formData?.pincode?.length === 6) {
      // console.log("Pincode:", formData?.pincode);
      const result = query.search(formData?.pincode?.toString());
      // console.log("Search result:", result);
      if (result.length > 0) {
        const { city, state } = result[0];
        setPincodeInfo({ city, state });
        setFormData((prev) => ({
          ...prev,
          address_city: city,
          address_state: state,
        }));
      } else {
        setPincodeInfo({ city: "", state: "" });
        setFormData((prev) => ({
          ...prev,
          address_city: "",
          address_state: "",
        }));
      }
    }
  }, [formData?.pincode]);

  // console.log("error", error);

  return (
    <div className="flex flex-col flex-1 gap-[16px] md:gap-[32px] fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[30px]">
        <LabelWrapper
          label={"First Name*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            name="first_name"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px]  mt-[10px]"
            placeholder={"Pre-filled"}
          />
        </LabelWrapper>
        <LabelWrapper
          label={"Last Name*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            type="input"
            name="last_name"
            isError={error}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px]  mt-[10px]"
            placeholder={"Enter"}
            value={formData}
            onChange={(e) => handleInputChange(e)}
          />
        </LabelWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[30px]">
        <div className="flex flex-col col-span-1">
          <div className="flex items-center">
            <Label className="text-[12px] md:text-[13px]  font-semibold">
              Mobile Number
              <span className="text-[#ED1F28]">*</span>
            </Label>
            <AppInput
              type="checkbox"
              name="personal_whatsapp_enabled"
              checked={formData?.personal_whatsapp_enabled}
              isError={error}
              id="mobile"
              // value={"true"}
              onChange={(e) => handleCheckboxChange(e)}
              wrapperClassName="!w-fit"
              className="!w-[20px] ml-[11px] h-[20px]"
            />

            <AppLabel
              text={"Whatsapp enabled"}
              htmlFor={"mobile"}
              className={
                "whitespace-nowrap font-medium cursor-pointer text-[12px] md:!text-[13px] ml-[20px]"
              }
            />
            <AppTooltip
              comment={
                "To provide updates related to delivery, service, offers and other important communication on WhatsApp"
              }
              className={"ml-[10px]"}
            />
          </div>
          <AppInput
            name="phone_number"
            value={formData}
            isError={error}
            isPhoneNumber={"true"}
            onChange={(e) => handleInputChange(e)}
            className="pl-[40px] !text-[16px] py-[12px] border border-[#E6E7E9] rounded-[5px]  mt-[10px]"
            placeholder={"Pre-filled"}
            maxLength={10}
          />
        </div>
        <div className="flex flex-col col-span-1">
          <div className="flex items-center">
            <Label className="text-[12px] md:text-[13px]  font-semibold">
              Alternate Mobile
              <span className="text-[#ED1F28]">*</span>
            </Label>
            <AppInput
              type="checkbox"
              name="alternate_whatsapp_enabled"
              id="alternate"
              checked={formData?.alternate_whatsapp_enabled}
              isError={error}
              // value={"true"}
              onChange={(e) => handleCheckboxChange(e)}
              wrapperClassName="!w-fit"
              className="!w-[20px] ml-[11px] h-[20px]"
            />
            <AppLabel
              text={"Whatsapp enabled"}
              htmlFor={"alternate"}
              className={
                "whitespace-nowrap font-medium cursor-pointer text-[12px] md:!text-[13px] ml-[20px]"
              }
            />
            <AppTooltip
              comment={
                "To ensure delivery of all communication in case the primary number is not reachable, especially at the time of service or delivery."
              }
              className={"ml-[10px]"}
            />
          </div>
          <AppInput
            name={"alternative_phone_number"}
            isError={error}
            className="pl-[40px] !text-[16px] py-[12px] border border-[#E6E7E9] rounded-[5px]  mt-[10px]"
            placeholder={"Enter"}
            value={formData}
            isPhoneNumber={"true"}
            onChange={(e) => handleInputChange(e)}
            maxLength={10}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[30px]">
        <LabelWrapper
          label={"Email*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            type="input"
            name="email"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px] mt-[10px]"
            placeholder={"Pre-filled"}
          />
        </LabelWrapper>
        <LabelWrapper
          label={"Date of Birth*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            type="date"
            name="date_of_birth"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            max={getCurrentDate()}
            className="pl-[10px] !text-[16px] py-[12px] border border-[#E6E7E9] rounded-[5px]  mt-[10px]"
            placeholder={"dd-mm-yyyy"}
          />
        </LabelWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[30px] ">
        <LabelWrapper
          label={"Floor No*"}
          className={"relative"}
          labelClassName={"!pb-[0px]  label-position"}
        >
          <AppInput
            type="number"
            name="floor_number"
            isError={error}
            value={formData}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px]  mt-[10px]"
            placeholder={"Pre-filled"}
            disabled={true}
          />
        </LabelWrapper>
        <LabelWrapper
          label={"Lift Availability*"}
          labelClassName={"!pb-[0px] !text-[13px]"}
          // isTooltipNeeded={true}
          tooltipComment={
            "To plan necessary resources for delivery. Lifting charges per floor (if lift not accessible) will apply for all deliveries beyond first floor."
          }
        >
          <div className="flex flex-col md:flex-row gap-[10px] md:gap-[20px]">
            <div className="flex items-center mt-[10px] md:mt-[20px]">
              <AppInput
                checked={formData.lift_availability == "true"}
                id={"true"}
                name="lift_availability"
                value={"true"}
                onChange={(e) => handleInputChange(e)}
                type="radio"
                className="border rounded-[25px] !w-[25px] !h-[25px] "
                wrapperClassName="!w-fit"
                disabled={true}
              />
              <AppLabel
                text={"Yes, Lift is available"}
                htmlFor={"true"}
                className={
                  "whitespace-nowrap ml-[20px] font-medium cursor-pointer text-[14px] md:!text-[16px] "
                }
              />
            </div>
            <div className="flex items-center mt-[10px] md:mt-[20px]">
              <AppInput
                checked={formData.lift_availability == "false"}
                type="radio"
                id={"false"}
                name="lift_availability"
                onChange={(e) => handleInputChange(e)}
                value={"false"}
                className="border rounded-[25px] !w-[25px] !h-[25px] "
                wrapperClassName="!w-fit"
                disabled={true}
              />
              <AppLabel
                text={"No, Lift is not available"}
                htmlFor={"false"}
                className={
                  "whitespace-nowrap ml-[20px] font-medium cursor-pointer text-[14px] md:!text-[16px]"
                }
              />
            </div>
          </div>
        </LabelWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[30px]">
        <LabelWrapper
          label={"Address Line 1*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            type="input"
            name="address_line1"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px] mt-[10px]"
            placeholder={"Pre-filled"}
          />
        </LabelWrapper>
        <LabelWrapper
          label={"Address Line 2*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            type="input"
            name="address_line2"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px]  mt-[10px]"
            placeholder={"Pre-filled"}
          />
        </LabelWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[30px]">
        <LabelWrapper
          label={"Pincode*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            type="input"
            name="pincode"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px] mt-[10px]"
            placeholder={"Pre-filled"}
            maxLength={6}
          />
        </LabelWrapper>
        <LabelWrapper
          label={"City*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            type="input"
            name="address_city"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px]  mt-[10px]"
            placeholder={"Pre-filled"}
          />
        </LabelWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[30px]">
        <LabelWrapper
          label={"State*"}
          className={"relative"}
          labelClassName={"!pb-[0px] label-position"}
        >
          <AppInput
            type="input"
            name="address_state"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px]  mt-[10px]"
            placeholder={"Pre-filled"}
          />
        </LabelWrapper>
        <LabelWrapper
          label={"Google Map Location Link*"}
          className={"relative"}
          labelClassName={"!pb-[0px] whitespace-nowrap document-label-position"}
          wrapperClassName={"wrapper-position mt-[7px] !top-[-8px]"}
          isTooltipNeeded={true}
          tooltipComment={
            "Go to Google maps -> Search delivery Location -> Copy and paste location link here."
          }
          tooltipClassName={"z-[1]"}
        >
          <AppInput
            type="input"
            name="location_link"
            value={formData}
            isError={error}
            onChange={(e) => handleInputChange(e)}
            className="pl-[10px] !text-[16px] py-[12px] border rounded-[5px] mt-[10px]"
            placeholder={"e.g., https://goo.gl/maps/sample_location"}
          />
        </LabelWrapper>
        <div className="flex justify-end w-full items-end">
          <AppButton
            text={"Submit"}
            variant={"red"}
            className={"px-[20px]"}
            isLoading={isLoading}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicForm;
