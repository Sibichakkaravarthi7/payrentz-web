import React, { useContext, useEffect, useState } from "react";
import UserDashboardInput from "./UserDashboardInput";
import { userDataContext } from "@/app/dashboard/user-profile/page";
import KycStatusBox from "./KycStatusBox";
import VerifyButton from "@/components/KYC/DocumentUpload/VerifyButton";
import makePostRequest from "@/utils/makePostRequest";
import {
  GET_PATCH_USER_DATA,
  GET_REFRESH_API,
  POST_VERIFY_BANK,
} from "@/api/urls/urls";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import ReasonBox from "./ReasonBox";

function BankDetails({ docVerify, setDocVerify }) {
  const { userData, setUserData, setError } = useContext(userDataContext);
  const status = userData?.bank_kyc_verified;
  const [bankInfo, setBankInfo] = useState({ name: "", branch: "" });
  const queryClient = useQueryClient();
  const reason = userData?.bank_reupload_reason;

  const { isLoading: bankIsLoading, mutate: verifyBank } = useMutation(
    (body) => makePostRequest(POST_VERIFY_BANK, body),
    {
      onSuccess: (res) => {
        toast.success("KYC validated Successfully");
        queryClient.invalidateQueries({ queryKey: [GET_PATCH_USER_DATA] });
        queryClient.invalidateQueries({ queryKey: [GET_REFRESH_API] });
        // setDocVerify((prv) => ({ ...prv, bank: true }));
      },
      onError: (err) => {
        const key = Object.keys(err?.response?.data?.data)?.[0];
        toast.error(err?.response?.data?.data?.message || "Something went wrong!");
        // toast.error(
        //   key
        //     ? `${key?.replaceAll("_", " ")}: ${err?.response?.data?.data?.[key]}`
        //     : err?.response?.data?.data || "Something went wrong!"
        // );
      },
    }
  );

  const ifsc = require("ifsc");

  const handleVerifyBank = () => {
    const err = {};

    if (["", null]?.includes(userData?.account_number)) {
      err.account_number = { message: "Enter a valid value" };
    }

    if (["", null]?.includes(userData?.ifsc_code)) {
      err.ifsc_code = { message: "Enter a valid value" };
    }

    if (["", null, undefined]?.includes(userData?.bank_name)) {
      err.bank_name = { message: "Enter a valid value" };
    }

    if (["", null]?.includes(userData?.bank_branch)) {
      err.bank_branch = { message: "Enter a valid value" };
    }

    if (["", null]?.includes(userData?.account_holder_name)) {
      err.account_holder_name = { message: "Enter a valid value" };
    }

    // console.log("where");

    setError(err);
    if (Object.keys(err)?.length > 0) {
      // console.log("where 1", err);
      return;
    } else {
      //Mutate values

      verifyBank({
        bank_account_number: userData?.account_number,
        ifsc: userData?.ifsc_code,
        bank_name: userData?.bank_name,
        bank_branch: userData?.bank_branch,
        account_holder_name: userData?.account_holder_name,
      });
    }
  };

  useEffect(() => {
    if (ifsc?.validate && userData?.ifsc_code) {
      // Check if validate and ifsc_code exist
      if (ifsc.validate(userData?.ifsc_code)) {
        // Validate ifsc_code
        ifsc
          .fetchDetails(userData?.ifsc_code)
          .then(function (res) {
            setBankInfo({
              name: res?.BANK,
              branch: res?.BRANCH,
            });
            setUserData((prev) => ({
              ...prev,
              bank_name: res?.BANK,
              bank_branch: res?.BRANCH,
            }));
            // console.log("Bank details", res, bankInfo);
          })
          .catch(function (error) {
            console.error("Error fetching bank details", error);
            setBankInfo({ name: "", branch: "" });
            setUserData((prev) => ({
              ...prev,
              bank_name: "",
              bank_branch: "",
            }));
          });
      }
    }
  }, [ifsc, userData?.ifsc_code]);
  return (
    <div>
      <div className="bg-[#FFFFFF] !h-[100%] mt-[30px] pl-[30px] pr-[31px] pb-[21px] pt-[33px] fade-in">
        <div className="mb-5">
          {reason ? <ReasonBox reason={reason} /> : null}
          <KycStatusBox status={status} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px] mb-[30px]">
          <UserDashboardInput
            label={"IFSC Code *"}
            name={"ifsc_code"}
            readOnly={userData?.bank_kyc_verified != "reupload"}
            placeholder={"Enter IFSC"}
          />
          <UserDashboardInput
            label={"Account Number *"}
            name={"account_number"}
            readOnly={userData?.bank_kyc_verified != "reupload"}
            placeholder={"Enter Account Number"}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px] mb-[30px]">
          <UserDashboardInput
            label={"Bank Name *"}
            name={"bank_name"}
            placeholder={"Auto-fill"}
            readOnly
            // readOnly={userData?.bank_kyc_verified != "reupload"}
          />
          <UserDashboardInput
            label={"Branch *"}
            name={"bank_branch"}
            placeholder={"Auto-fill"}
            readOnly
            // readOnly={userData?.bank_kyc_verified != "reupload"}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px] mb-[30px]">
          <UserDashboardInput
            label={"Account Holder Name *"}
            name={"account_holder_name"}
            placeholder={"Enter Account Holder Name"}
            // readOnly
            // readOnly={userData?.bank_kyc_verified != "reupload"}
          />
        </div>
        <div className="flex justify-end">
          {userData?.bank_kyc_verified == "reupload" ? (
            <VerifyButton
              isLoading={bankIsLoading}
              handleClick={handleVerifyBank}
              // verified={docVerify?.bank}
            />
          ) : null}
        </div>

        {/* <div className="!h-[100%]">
          <LabelWrapper
            label={"Upload ID *"}
            labelClassName={"!text-[16px] !font-medium"}
            className={"md:w-[49%] h-[100%]"}
          >
            <UploadedImagesWrapper />
          </LabelWrapper>
        </div> */}
      </div>
    </div>
  );
}

export default BankDetails;
