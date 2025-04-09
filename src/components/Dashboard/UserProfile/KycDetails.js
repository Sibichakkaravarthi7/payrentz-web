import AppInput from "@/components/Input/AppInput";
import LabelWrapper from "@/components/Login/LabelWrapper";
import React, { useContext } from "react";
import UploadedImagesWrapper from "./UploadedImagesWrapper";
import UserDashboardInput from "./UserDashboardInput";
import Text from "@/components/Text/Text";
import { userDataContext } from "@/app/dashboard/user-profile/page";
import KycStatusBox from "./KycStatusBox";
import { kycOptions } from "@/utils/Constants";
import VerifyButton from "@/components/KYC/DocumentUpload/VerifyButton";
import ValidatAadhareOtp from "@/components/KYC/DocumentUpload/ValidatAadhareOtp";
import { useMutation, useQueryClient } from "react-query";
import makePostRequest from "@/utils/makePostRequest";
import {
  GET_PATCH_USER_DATA,
  GET_REFRESH_API,
  POST_OTHER_KYC,
} from "@/api/urls/urls";
import toast from "react-hot-toast";
import ReasonBox from "./ReasonBox";

function KycDetails({ docVerify, setDocVerify }) {
  const queryClient = useQueryClient();
  const { userData, setError, error, handleInputChange } =
    useContext(userDataContext);
  const status = userData?.kyc_verification_status;
  const reason = userData?.kyc_reupload_reason

  // API to verify other kyc documents
  const { isLoading: otherKycIsLoading, mutate: verifyOtherKyc } = useMutation(
    (body) => makePostRequest(POST_OTHER_KYC, body),
    {
      onSuccess: (res) => {
        toast.success("KYC validated successfullly");
        queryClient.invalidateQueries({ queryKey: [GET_PATCH_USER_DATA] });
        queryClient.invalidateQueries({ queryKey: [GET_REFRESH_API] });
      },
      onError: (err) => {
        toast.error(err?.response?.data?.data?.message || "Something went wrong!");
      },
    }
  );


  const handleVerifyOtherKyc = () => {
    const obj = {};

    if ([undefined, null, ""]?.includes(userData?.kyc_type?.value))
      obj.kyc_type = { message: "Select a valid value" };
    if ([undefined, null, ""]?.includes(userData?.kyc_number))
      obj.kyc_number = { message: "Enter a valid value" };
    if (["passport"]?.includes(userData?.kyc_type?.value)) {
      if ([undefined, null, ""]?.includes(userData?.passport_expiry_date))
        obj.passport_expiry_date = { message: "Enter a valid value" };
    }

    setError(obj);

    if (Object.keys(obj)?.length == 0) {
      return true;
    }
    return false;
  };

  const handleOtherKycSubmit = () => {
    if (handleVerifyOtherKyc()) {
      if (
        ["license", "passport", "voter-id", "pan"]?.includes(
          userData?.kyc_type?.value
        )
      ) {
        const dataToPost = {
          kyc_type: userData?.kyc_type?.value,
          kyc_number: userData?.kyc_number?.toUpperCase(),
          passport_expiry_date: userData?.passport_expiry_date
            ?.split("-")
            ?.reverse()
            ?.join("/"),
        };
        // console.log("MUTATE......", dataToPost);

        //Mutate values - verifyOtherKyc

        verifyOtherKyc(dataToPost);
      }
    }
  };
  return (
    <div>
      <div className="bg-[#FFFFFF] !h-[100%] mt-[30px] pl-[30px] pr-[31px] pb-[44px] pt-[39px] fade-in">
      <div className="mb-5">
          {
            reason ? <ReasonBox reason={reason} /> : null
          }
          <KycStatusBox status={status} />
        </div>
        <div className="grid grid-cols-1 gap-[20px] mb-[30px]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <UserDashboardInput
              label={"KYC Document *"}
              options={kycOptions}
              name={"kyc_type"}
              dontAlterOptions
              labelWidth="100%"
              type="select"
              readOnly={userData?.kyc_verification_status != "reupload"}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="col-span-1">
              <UserDashboardInput
                readOnly={userData?.kyc_verification_status != "reupload"}
                label={"Document No./ID*"}
                name={"kyc_number"}
                inputClassName="uppercase"
              />
            </div>
            <div className="col-span-1 md:ml-[30px] mt-[30px] md:mt-0 flex gap-[30px]">
              {userData?.kyc_verification_status == "reupload" ? (
                <>
                  {userData?.kyc_type?.value === "passport" &&
                  !docVerify?.kyc_verification_status ? (
                    <div className="flex items-end">
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
                          value={userData}
                          readOnly={docVerify?.kyc_verification_status}
                        />
                      </LabelWrapper>
                    </div>
                  ) : null}
                </>
              ) : null}

              {userData?.kyc_type?.value == "aadhaar" ? (
                <div className="flex items-end justify-end mt-[30px]">
                  {userData?.kyc_verification_status == "reupload" ? (
                    <ValidatAadhareOtp
                      formData={userData}
                      verified={
                        docVerify?.kyc_verification_status &&
                        userData?.kyc_type == "aadhaar"
                      }
                      setDocVerify={setDocVerify}
                      setError={setError}
                      userData={userData}
                      isUserProfilePage
                    />
                  ) : null}
                </div>
              ) : null}

              {userData?.kyc_type?.value != "aadhaar" ? (
                <div className="flex items-end justify-center">
                  {userData?.kyc_verification_status == "reupload" ? (
                    <VerifyButton
                      handleClick={() => handleOtherKycSubmit()}
                      // verified={docVerify?.kyc_verification_status}
                      isLoading={otherKycIsLoading}
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          {/* <div className="!h-[100%]">
            <LabelWrapper 
                label={"Upload ID *"}
                labelClassName={"!text-[16px] !font-medium"}
                className={"w-[100%] h-[100%]"}
            >
                <UploadedImagesWrapper />
            </LabelWrapper>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default KycDetails;
