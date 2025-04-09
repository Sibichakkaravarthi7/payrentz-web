import React, { useContext, useEffect, useState } from "react";
import VerifyButton from "./VerifyButton";
import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppSelect from "@/components/Select/AppSelect";
import Text from "@/components/Text/Text";
import { KycContext } from "@/app/(kycLayout)/kyc/layout";
import { useMutation } from "react-query";
import makePostRequest from "@/utils/makePostRequest";
import { POST_VERIFY_BANK } from "@/api/urls/urls";
import { bankOptions } from "@/utils/Constants";
import toast from "react-hot-toast";
import bank from "ifsc/src/node/bank";



function BankDetailsVerification({ setDocVerify, docVerify }) {
  const { formData, setFormData, error, setError, mutate, isLoading } =
    useContext(KycContext);
  const [bankInfo, setBankInfo] = useState({name: "", branch: ""})

  const ifsc = require("ifsc")

  const handleInputChange = (e) => {
    setFormData((prv) => ({ ...prv, [e?.target?.name]: e?.target?.value }));
  };

  const { isLoading: bankIsLoading, mutate: verifyBank } = useMutation(
    (body) => makePostRequest(POST_VERIFY_BANK, body),
    {
      onSuccess: (res) => {
        setDocVerify((prv) => ({ ...prv, bank: true }));
      },
      onError: (err) => {
        toast.error(err?.response?.data?.data?.message || "Something went wrong!");
      },
    }
  );

  const handleVerifyBank = () => {
    const err = {};

    if (["", null]?.includes(formData?.account_number)) {
      err.account_number = { message: "Enter a valid value" };
    }

    if (["", null]?.includes(formData?.ifsc_code)) {
      err.ifsc_code = { message: "Enter a valid value" };
    }

    if (["", null, undefined]?.includes(formData?.bank_name)) {
      err.bank_name = { message: "Enter a valid value" };
    }

    if (["", null]?.includes(formData?.bank_branch)) {
      err.bank_branch = { message: "Enter a valid value" };
    }

    if (["", null]?.includes(formData?.account_holder_name)) {
      err.account_holder_name = { message: "Enter a valid value" };
    }

    setError(err);
    if (Object.keys(err)?.length > 0) {
      return;
    } else {
      verifyBank({
        bank_account_number: formData?.account_number,
        ifsc: formData?.ifsc_code,
        bank_name: formData?.bank_name,
        bank_branch: formData?.bank_branch,
        account_holder_name: formData?.account_holder_name,
      });
    }
  };

  useEffect(() => {
    if (ifsc?.validate && formData?.ifsc_code) { // Check if validate and ifsc_code exist
      if (ifsc.validate(formData?.ifsc_code)) { // Validate ifsc_code
        ifsc.fetchDetails(formData?.ifsc_code)
          .then(function(res) {
            setBankInfo({
              name: res?.BANK,
              branch: res?.BRANCH
            })
            setFormData((prev) => ({...prev, bank_name: res?.BANK, bank_branch: res?.BRANCH}))
            // console.log("Bank details", res, bankInfo);
          })
          .catch(function(error) {
            console.error("Error fetching bank details", error);
            setBankInfo({name:"", branch: ""})
            setFormData((prev) => ({ ...prev, bank_name: "", bank_branch: "" }));
          });
      }
    }
  }, [ifsc, formData?.ifsc_code]);


  return (
    <div>
      <div className="flex mb-[20px] md:mb-[30px] mt-[20px] md:mt-[40px]">
        <div className="col-span-1">
          <Text
            className={
              "text-[#ED1F28] whitespace-nowrap text-[12px] md:text-[18px] font-semibold"
            }
          >
            Bank Account Details
          </Text>
        </div>
        <div className="w-full ml-[9px] col-span-5 border-[#858585] border-dashed border-b-2 md:mb-[10px] mb-[5px]"></div>
      </div>
      <div className="grid grid-flow-row gap-[20px] md:gap-[46px] md:grid-cols-6">
        <div className="col-span-2">
          <LabelWrapper
            label={"IFSC code *"}
            className={"relative"}
            labelClassName={"document-label-position !pb-[0px]"}
            wrapperClassName={"wrapper-position"}
          >
            <AppInput
              className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
              type="input"
              placeholder={"Enter IFSC Code"}
              name={"ifsc_code"}
              value={formData}
              onChange={(e) => handleInputChange(e)}
              readOnly={docVerify?.bank}
              isError={error}
              maxLength={20}
            />
          </LabelWrapper>
        </div>
        <div className="col-span-2">
          <LabelWrapper
            label={"Bank Name *"}
            className={"relative"}
            labelClassName={"document-label-position !pb-[0px]"}
            wrapperClassName={"wrapper-position"}
          >
            <AppInput
              className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
              type="input"
              placeholder={"Enter Bank Name"}
              name={"bank_name"}
              value={formData}
              onChange={(e) => handleInputChange(e)}
              isError={error}
              maxLength={20}
              readOnly={docVerify?.bank || bankInfo}
            />
          </LabelWrapper>
        </div>
        <div className="col-span-2">
          <LabelWrapper
            label={"Bank Branch *"}
            className={"relative"}
            labelClassName={"document-label-position !pb-[0px]"}
            wrapperClassName={"wrapper-position"}
          >
            <AppInput
              className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
              type="input"
              placeholder={"Enter Bank Branch"}
              name={"bank_branch"}
              value={formData}
              onChange={(e) => handleInputChange(e)}
              readOnly={docVerify?.bank || bankInfo}
              isError={error}
            />
          </LabelWrapper>
        </div>
       
        {/* <div className="col-span-2">
          <AppSelect
            placeholder={"Select Bank"}
            label={"Select Bank *"}
            labelClassName={"!z-[3]"}
            options={bankOptions}
            className={"!text-[16px] z-[2]"}
            classNamePrefix={"kyc-select"}
            name={"bank_name"}
            value={formData}
            onChange={(e) =>
              setFormData((prv) => ({
                ...prv,
                bank_name: e,
              }))
            }
            isError={error}
            dontAlterOptions
            readOnly={docVerify?.bank}
          />
        </div> */}
      </div>
      <div className="grid grid-flow-row gap-[20px] md:gap-[46px] md:grid-cols-6 mt-[25px]">
      
        <div className="col-span-2">
          <LabelWrapper
            label={"Account Number *"}
            className={"relative"}
            labelClassName={"document-label-position !pb-[0px]"}
            wrapperClassName={"wrapper-position"}
            isTooltipNeeded={true}
            tooltipComment={
              "Capturing Account details helps to process all credits including refunds faster."
            }
            tooltipClassName={"z-[1]"}
          >
            <AppInput
              className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
              type="input"
              placeholder={"Enter Account Number"}
              name={"account_number"}
              value={formData}
              onChange={(e) => handleInputChange(e)}
              isError={error}
              maxLength={20}
              readOnly={docVerify?.bank}
            />
          </LabelWrapper>
        </div>
        <div className="col-span-2">
          <LabelWrapper
            label={"Account Holder's Name *"}
            className={"relative"}
            labelClassName={"document-label-position !pb-[0px]"}
            wrapperClassName={"wrapper-position"}
          >
            <AppInput
              className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
              type="input"
              placeholder={"Enter Account Holder's Name"}
              name={"account_holder_name"}
              value={formData}
              onChange={(e) => handleInputChange(e)}
              isError={error}
              readOnly={docVerify?.bank}
            />
          </LabelWrapper>
        </div>
        <div className="flex items-center">
          <VerifyButton
            isLoading={bankIsLoading}
            handleClick={handleVerifyBank}
            verified={docVerify?.bank}
          />
        </div>
      </div>
    </div>
  );
}

export default BankDetailsVerification;
