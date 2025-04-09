import React, { useContext } from "react";
import VerifyButton from "./VerifyButton";
import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import Text from "@/components/Text/Text";
import ValidatAadhareOtp from "./ValidatAadhareOtp";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";
import makePostRequest from "@/utils/makePostRequest";
import { POST_OTHER_KYC } from "@/api/urls/urls";
import { useMutation } from "react-query";
import AppLabel from "@/components/Label/AppLabel";
import AppSelect from "@/components/Select/AppSelect";
import { kycOptions } from "@/utils/Constants";
import toast from "react-hot-toast";
import ValidatePancardOtp from "./ValidatePancardOtp";

function PanDetailsVerification({
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
  const handleVerifyOtherKyc = () => {
    const obj = {};

    if ([undefined, null, ""]?.includes(formData?.kyc_type?.value))
      obj.kyc_type = { message: "Select a valid value" };
    if ([undefined, null, ""]?.includes(formData?.kyc_number))
      obj.kyc_number = { message: "Enter a valid value" };
    if (["passport"]?.includes(formData?.kyc_type?.value)) {
      if ([undefined, null, ""]?.includes(formData?.passport_expiry_date))
        obj.passport_expiry_date = { message: "Enter a valid value" };
    }

    setError(obj);

    if (Object.keys(obj)?.length == 0) {
      return true;
    }
    return false;
  };

  // This fn will mutate appropriate fields for the type of KYC
  const handleOtherKycSubmit = () => {
    if (handleVerifyOtherKyc()) {
      if (
        ["license", "passport", "voter-id", "pan"]?.includes(
          formData?.kyc_type?.value
        )
      ) {
        const dataToPost = {
          kyc_type: formData?.kyc_type?.value,
          kyc_number: formData?.kyc_number?.toUpperCase(),
          passport_expiry_date: formData?.passport_expiry_date
            ?.split("-")
            ?.reverse()
            ?.join("/"),
        };
        // console.log("MUTATE......", dataToPost);

        verifyOtherKyc(dataToPost);
      }
    }
  };
 
  return (
    <div>
      <div className="flex mb-[20px] md:mb-[30px]">
        <div className="col-span-1">
          <Text
            className={
              "text-[#ED1F28] whitespace-nowrap text-[12px] md:text-[18px] font-semibold"
            }
          >
            PAN Details
          </Text>
        </div>
        <div className="w-full ml-[9px] col-span-5 border-[#858585] border-dashed border-b-2 md:mb-[10px] mb-[5px]"></div>
      </div>

      <div className="grid grid-flow-row gap-[20px] md:gap-[46px] md:grid-cols-6 items-center mt-[25px]">
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
      </div>

 
    </div>
  );
}

export default PanDetailsVerification;
