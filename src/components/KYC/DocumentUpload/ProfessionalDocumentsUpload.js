import { KycContext } from "@/app/(kycLayout)/kyc/layout";
import AppUpload from "@/components/FileUpload/AppUpload";
import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import Text from "@/components/Text/Text";
import React, { useContext } from "react";
import { parentsOptions, selfEmployeeOptions } from "@/utils/Constants";

function ProfessionalDocumentsUpload() {
  const { formData, setFormData, error, setError, mutate, isLoading } =
    useContext(KycContext);

  const handleInputChange = (e) => {
    setFormData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));
  };

  return (
    <div>
      <div className="flex mb-[20px] md:mb-[30px] mt-[20px] md:mt-[40px]">
        <div className="col-span-1">
          <Text
            className={
              "text-[#ED1F28] whitespace-nowrap text-[12px] md:text-[18px] font-semibold"
            }
          >
            Professional Details
          </Text>
        </div>
        <div className="w-full ml-[9px] col-span-5 border-[#858585] border-dashed border-b-2 mb-[5px] md:mb-[10px]"></div>
      </div>
      <div className="grid grid-flow-row gap-[20px] md:gap-[45px] md:grid-cols-6 items-center">
        <Text
          className={
            "col-span-2 text-[12px] md:text-[16px] flex items-end font-medium text-[#1D1D1D]"
          }
        >
          {formData?.occupation == "student" ? (
            "Student ID"
          ) : formData?.occupation == "working_professional" ? (
            "Office ID"
          ) : (
            <LabelWrapper className={"w-full !mt-[-8px]"} label={""}>
              <AppSelect
                name="self_employee_id_type"
                placeholder="Select Support Document"
                label={"Support Document *"}
                labelClassName={"!z-[8]"}
                isError={error}
                value={formData}
                options={selfEmployeeOptions}
                onChange={(e) =>
                  setFormData((prv) => ({
                    ...prv,
                    self_employee_id_type: e,
                  }))
                }
                className={"!text-[16px] z-[7]"}
                dontAlterOptions
              />
            </LabelWrapper>
          )}
        </Text>
        <div className="col-span-2 max-w-[370px]">
          <AppUpload
            keyToSet={"professional_document"}
            folderName={"professional-kyc"}
            state={formData}
            setState={setFormData}
            isError={error}
          />
        </div>
        {["student", "working_professional"]?.includes(formData?.occupation) ? (
          <div className="col-span-2">
            <LabelWrapper
              label={
                formData?.occupation == "working_professional"
                  ? "Company Name *"
                  : "Institute Name *"
              }
              className={"relative"}
              labelClassName={"document-label-position !pb-[0px]"}
              wrapperClassName={"wrapper-position"}
              isTooltipNeeded={
                formData?.occupation == "working_professional" 
                ? true : false}
              tooltipComment={
                formData?.occupation == "working_professional" 
                ? "To profile and approve KYC faster"
                : ""}
              tooltipClassName={"z-[1]"}
            >
              <AppInput
                className="!text-[16px] w-[100%] border rounded-[5px] py-[12px] pl-[10px]"
                type="input"
                placeholder={
                  formData?.occupation == "working_professional"
                    ? "Enter Company Name"
                    : "Enter Institution Name"
                }
                name={
                  formData?.occupation == "student"
                    ? "institute_name"
                    : "company_name"
                }
                isError={error}
                onChange={(e) => handleInputChange(e)}
                value={formData}
              />
            </LabelWrapper>
          </div>
        ) : null}
      </div>
      {formData?.occupation == "student" ? (
        <div className="flex flex-col md:flex-row w-full gap-[20px] md:gap-[45px] mt-[25px]">
          <LabelWrapper
            labelClassName={"document-label-position !pb-[0px]"}
            wrapperClassName={"wrapper-position"}
            className={"w-full relative"}
            label={"Parent Name *"}
          >
            <AppInput
              name="parent_name"
              placeholder="Enter Parent's Name"
              className="app-form-input app-input py-[12px]"
              onChange={(e) => handleInputChange(e)}
              isError={error}
              value={formData}
            />
          </LabelWrapper>
          <LabelWrapper className={"w-full !mt-[-8px]"} label={""}>
            <AppSelect
              name="parent_relationship"
              placeholder="Select Relationship with Parent"
              className={"app-form-input, z-[7]"}
              classNamePrefix={"kyc-select"}
              label={"Select your Relationship *"}
              labelClassName={"z-[8]"}
              isError={error}
              value={formData}
              options={parentsOptions}
              onChange={(e) =>
                setFormData((prv) => ({
                  ...prv,
                  parent_relationship: e,
                }))
              }
              // className={"!text-[16px]"}
              dontAlterOptions
            />
          </LabelWrapper>
          <LabelWrapper
            className={"w-full relative"}
            label={"Parent's Phone Number *"}
            labelClassName={"document-label-position !pb-[0px]"}
            wrapperClassName={"wrapper-position"}
          >
            <AppInput
              name="parent_phone_number"
              placeholder="Enter Parent's Phone Number"
              className="app-form-input app-input pl-[40px] py-[12px]"
              prefixClassname={"!top-[28%]"}
              onChange={(e) => handleInputChange(e)}
              isPhoneNumber={"true"}
              isError={error}
              value={formData}
              maxLength={10}
            />
          </LabelWrapper>
        </div>
      ) : null}

      {formData?.occupation == "working_professional" ? (
        <div className="flex w-full gap-[20px] md:gap-[45px] mt-[25px]">
          <LabelWrapper
            className={"w-full relative"}
            label={"Designation *"}
            labelClassName={"document-label-position !pb-[0px]"}
            wrapperClassName={"wrapper-position"}
          >
            <AppInput
              name="designation"
              placeholder="Enter Designation"
              className="app-form-input py-[12px] text-black"
              onChange={(e) => handleInputChange(e)}
              isError={error}
              value={formData}
            />
          </LabelWrapper>
        </div>
      ) : null}
    </div>
  );
}

export default ProfessionalDocumentsUpload;
