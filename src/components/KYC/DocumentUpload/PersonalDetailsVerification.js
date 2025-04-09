import React, { useContext } from "react";
// import VerifyButton from "./VerifyButton";
import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import Text from "@/components/Text/Text";
import ValidatAadhareOtp from "./ValidatAadhareOtp";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";
import makePostRequest from "@/utils/makePostRequest";
import { POST_OTHER_KYC } from "@/api/urls/urls";
import { useMutation } from "react-query";
// import AppLabel from "@/components/Label/AppLabel";
// import AppSelect from "@/components/Select/AppSelect";
// import { kycOptions } from "@/utils/Constants";
import toast from "react-hot-toast";
import ValidatePancardOtp from "./ValidatePancardOtp";

function PersonalDetailsVerification({
  docVerify,
  setDocVerify,
  showOtherKycs,
  setShowOtherKycs,
  isPanOk,
  setIsPanOk,
  panName,
  setPanName,
}) {
  const { formData, setFormData, error, setError, mutate, isLoading } =
    useContext(KycContext);

  const panValidation =
    /^[a-zA-Z]{3}[PFCAHTBLJGpfcahtbljg][a-zA-Z]{1}[0-9]{4}[a-zA-Z]$/;

  const handleInputChange = (e) => {
    setFormData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));
  };

  const handleInputChangeForPan = (e) => {
    setFormData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));

    console.log(e?.target?.value, panValidation.test(e?.target?.value));
    if (panValidation.test(e?.target?.value)) {
      setIsPanOk(false);
    } else {
      setIsPanOk(true);
    }
  };

  // API to verify other kyc documents
  const { isLoading: otherKycIsLoading, mutate: verifyOtherKyc } = useMutation(
    (body) => makePostRequest(POST_OTHER_KYC, body),
    {
      onSuccess: (res) => {
        setDocVerify((prv) => ({ ...prv, kyc_verification_status: true }));
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.data?.message || "Something went wrong!"
        );
      },
    }
  );

  // Validation for other kyc fields
  // const handleVerifyOtherKyc = () => {
  //   const obj = {};

  //   if ([undefined, null, ""]?.includes(formData?.kyc_type?.value))
  //     obj.kyc_type = { message: "Select a valid value" };
  //   if ([undefined, null, ""]?.includes(formData?.kyc_number))
  //     obj.kyc_number = { message: "Enter a valid value" };
  //   if (["passport"]?.includes(formData?.kyc_type?.value)) {
  //     if ([undefined, null, ""]?.includes(formData?.passport_expiry_date))
  //       obj.passport_expiry_date = { message: "Enter a valid value" };
  //   }

  //   setError(obj);

  //   if (Object.keys(obj)?.length == 0) {
  //     return true;
  //   }
  //   return false;
  // };

  // This fn will mutate appropriate fields for the type of KYC
  // const handleOtherKycSubmit = () => {
  //   if (handleVerifyOtherKyc()) {
  //     if (
  //       ["license", "passport", "voter-id", "pan"]?.includes(
  //         formData?.kyc_type?.value
  //       )
  //     ) {
  //       const dataToPost = {
  //         kyc_type: formData?.kyc_type?.value,
  //         kyc_number: formData?.kyc_number?.toUpperCase(),
  //         passport_expiry_date: formData?.passport_expiry_date
  //           ?.split("-")
  //           ?.reverse()
  //           ?.join("/"),
  //       };
  //       // console.log("MUTATE......", dataToPost);

  //       verifyOtherKyc(dataToPost);
  //     }
  //   }
  // };

  // console.log("selected option", formData);
  // console.log("error", error);
  // console.log("watch", formData);

  return (
    <div>
      <div className="flex mb-[20px] md:mb-[30px]">
        <div className="col-span-1">
          <Text
            className={
              "text-[#ED1F28] whitespace-nowrap text-[12px] md:text-[18px] font-semibold"
            }
          >
            Personal Details
          </Text>
        </div>
        <div className="w-full ml-[9px] col-span-5 border-[#858585] border-dashed border-b-2 md:mb-[10px] mb-[5px]"></div>
      </div>
      <div className="grid grid-flow-row gap-[20px] md:gap-[46px] md:grid-cols-6 items-center pb-[20px]">
        <Text
          className={
            "col-span-2 text-[12px] md:text-[16px] flex items-end font-medium text-[#1D1D1D]"
          }
        >
          Aadhaar
        </Text>
        <div className="col-span-2">
          <LabelWrapper
            label={"Aadhaar Number *"}
            labelClassName={"document-label-position !pb-[0px]"}
            className={"relative"}
            wrapperClassName={"wrapper-position"}
          >
            {/* This aadhaar field will become readonly when either the kyc is verified OR other kyc option is checked */}
            <AppInput
              className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
              type="input"
              placeholder={"Enter Aadhaar Number"}
              name={"kyc_number"}
              onChange={(e) => handleInputChange(e)}
              rawInput={showOtherKycs}
              isError={showOtherKycs ? "" : error}
              value={showOtherKycs ? "" : formData}
              readOnly={docVerify?.kyc_verification_status || showOtherKycs}
              maxLength={12}
            />
          </LabelWrapper>
        </div>

        {/* It will become verified when the kyc is verified AND the kyc type is Aadhaar  */}
        <div className="col-span-2 flex items-center">
          <ValidatAadhareOtp
            setForm
            disabled={showOtherKycs}
            verified={
              docVerify?.kyc_verification_status &&
              formData?.kyc_type == "aadhaar"
            }
            setDocVerify={setDocVerify}
            setError={setError}
            formData={formData}
          />
        </div>
      </div>

      {/* <div className="grid grid-flow-row gap-[20px] md:gap-[46px] md:grid-cols-6 items-center mt-[25px]">
        <Text
          className={
            "col-span-2 text-[12px] md:text-[16px] flex items-end font-medium text-[#1D1D1D]"
          }
        >
          Pan Card
        </Text>
        <div className="col-span-2">
          <LabelWrapper
            label={"Pan Card Number *"}
            labelClassName={"document-label-position !pb-[0px]"}
            className={"relative"}
            wrapperClassName={"wrapper-position"}
          >
            <AppInput
              className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
              type="input"
              placeholder={"Enter Pan Card Number"}
              name={"pan_id"}
              onChange={(e) => handleInputChangeForPan(e)}
              // rawInput={showOtherKycs}
              isError={error}
              value={formData}
              readOnly={docVerify?.credit_score_status}
              maxLength={10}
            />
            <Text
              className={
                "text-[#858585] text-[8px] md:text-[12px] font-medium mt-[6px] md:mt-[10px]"
              }
            >
              {" "}
              Enter PAN Number In Correct Order To Get OTP <br />{" "}
              <span>Eg :( AAAAA1111A )</span>{" "}
            </Text>

            <LabelWrapper
              label={"Enter Your Name As In PAN Card *"}
              labelClassName={"document-label-position !pb-[0px]"}
              className={"relative mt-[20px] "}
              wrapperClassName={"wrapper-position"}
            >
              <AppInput
                className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
                type="input"
                placeholder={"Enter Your Name"}
                name={"pan_name"}
                onChange={(e) => {
                  setPanName(e?.target?.value);
                  handleInputChange(e);
                }}
                // rawInput={showOtherKycs}
                isError={error}
                // value={formData}
                readOnly={docVerify?.credit_score_status}
                // maxLength={10}
              />
            </LabelWrapper>
          </LabelWrapper>
        </div>

        <div className="col-span-2 flex items-center">
          <ValidatePancardOtp
            setForm
            disabled={showOtherKycs || isPanOk || panName == ""}
            verified={docVerify?.credit_score_status}
            setDocVerify={setDocVerify}
            setError={setError}
            formData={formData}
            panName={panName}
          />
        </div>
      </div> */}

      {/* Once verified "Other Kyc checkbox" will be disabled, and will have a default value based on the kyc type (checked if other kyc)  */}
      {/* {!docVerify?.aadhaar ? (
        <div className="flex gap-[20px] mt-[20px] items-center">
          <AppInput
            disabled={docVerify?.kyc_verification_status}
            type="checkbox"
            name=""
            isError={error}
            id="no_aadhaar"
            wrapperClassName="!w-fit"
            className="!w-[20px] ml-[11px] h-[20px]"
            onChange={(e) => {
              setFormData((p) => ({ ...p, kyc_number: "" }));
              setShowOtherKycs(e?.target?.checked);
            }}
            checked={showOtherKycs}
          />
          <AppLabel
            text={"I don't have an Aadhaar"}
            htmlFor={"no_aadhaar"}
            className={
              `whitespace-nowrap font-medium cursor-pointer text-[14px] md:!text-[16px] ml-[0px] ${docVerify?.kyc_verification_status ? "text-[#858585]" : ""}`
            }
          />
        </div>
      ) : null} */}

      {showOtherKycs ? (
        <>
          {/* <div className="mt-[39px] mb-[33px]">
            <Text className={"text-[18px] md:text-[24px] font-bold"}>
              If you dont have any of the above mentioned documents, please
              select a document and enter details
            </Text>
          </div> */}
          {/* <div className="flex mb-[10px] md:mb-[30px] mt-[20px] md:mt-[40px]">
            <div className="col-span-1">
              <Text
                className={
                  "text-[#ED1F28] whitespace-nowrap text-[12px] md:text-[18px] font-semibold"
                }
              >
                Other KYC Documents
              </Text>
            </div>
            <div className="w-full ml-[9px] col-span-5 border-[#858585] border-dashed border-b-2 mb-[5px] md:mb-[10px]"></div>
          </div>
          <div className="grid grid-flow-row gap-[20px] md:gap-[46px] md:grid-cols-6 mt-[30px] items-center">
            <div className="col-span-2">
              <AppSelect
                placeholder={"Select Document"}
                name={"kyc_type"}
                label={"Other docs"}
                value={formData}
                isError={error}
                className={"!text-[16px] z-[9]"}
                labelClassName={"!z-[10]"}
                dontAlterOptions
                options={kycOptions}
                onChange={(e) => setFormData((p) => ({ ...p, kyc_type: e }))}
                readOnly={docVerify?.kyc_verification_status}
              />
            </div>
            <div className="col-span-2">
              <LabelWrapper
                label={"Document ID/No*"}
                className={"relative"}
                labelClassName={
                  "!pb-[0px] !top-[-4px] whitespace-nowrap document-label-position"
                }
                wrapperClassName={"wrapper-position"}
              >
                <AppInput
                  name={"kyc_number"}
                  className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px] capitalize"
                  type="input"
                  placeholder={"Enter Document ID or Number"}
                  onChange={(e) => handleInputChange(e)}
                  isError={error}
                  value={formData}
                  readOnly={docVerify?.kyc_verification_status}
                />
              </LabelWrapper>
            </div>
            <div className="col-span-2 flex flex-col md:flex-row gap-[20px] md:gap-[46px]">
              {formData?.kyc_type?.value === "passport" &&
              !docVerify?.kyc_verification_status ? (
                <LabelWrapper
                  label={"Expiry date*"}
                  className={"relative"}
                  labelClassName={
                    "!pb-[0px] !top-[-4px] document-label-position whitespace-nowrap"
                  }
                  wrapperClassName={"wrapper-position"}
                >
                  <AppInput
                    name={"passport_expiry_date"}
                    className="!text-[16px] border border-[#E6E7E9] rounded-[5px] py-[12px] pl-[10px]"
                    type="date"
                    placeholder={""}
                    onChange={(e) => handleInputChange(e)}
                    isError={error}
                    value={formData}
                    readOnly={docVerify?.kyc_verification_status}
                  />
                </LabelWrapper>
              ) : null}

              <div className="flex items-center">
                <VerifyButton
                  handleClick={() => handleOtherKycSubmit()}
                  verified={docVerify?.kyc_verification_status}
                  isLoading={otherKycIsLoading}
                />
              </div>
            </div>
          </div> */}
        </>
      ) : null}
    </div>
  );
}

export default PersonalDetailsVerification;
