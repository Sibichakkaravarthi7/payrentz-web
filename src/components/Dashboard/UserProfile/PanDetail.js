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
import ValidatePancardOtp from "@/components/KYC/DocumentUpload/ValidatePancardOtp";

function PanDetail({ docVerify, setDocVerify }) {
  const queryClient = useQueryClient();
  const { userData, setError, error, handleInputChange } =
    useContext(userDataContext);
  const status = userData?.kyc_pan_verification_status;
  const reason = userData?.kyc_pan_reupload_reason;

  // API to verify other kyc documents
  const { isLoading: otherKycIsLoading, mutate: verifyOtherKyc } = useMutation(
    (body) => makePostRequest(POST_OTHER_KYC, body),
    {
      onSuccess: (res) => {
        toast.success("PAN validated successfullly");
        queryClient.invalidateQueries({ queryKey: [GET_PATCH_USER_DATA] });
        queryClient.invalidateQueries({ queryKey: [GET_REFRESH_API] });
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.data?.message || "Something went wrong!"
        );
      },
    }
  );

  const handleVerifyOtherKyc = () => {
    const obj = {};

    if ([undefined, null, ""]?.includes(userData?.pan_id))
      obj.pan_id = { message: "Enter a valid value" }; 
    
    if ([undefined, null, ""]?.includes(userData?.pan_name))
      obj.pan_name = { message: "Enter a valid value" }; 

    setError(obj);

    if (Object.keys(obj)?.length == 0) {
      return true;
    }
    return false;
  };

  const handleOtherKycSubmit = () => {
    if (handleVerifyOtherKyc()) {
      const dataToPost = {
        pan_id: userData?.pan_id,
        pan_name: userData?.pan_name,
      };
      // console.log("MUTATE......", dataToPost);

      //Mutate values - verifyOtherKyc

      verifyOtherKyc(dataToPost);
    }
  };
  return (
    <div>
      <div className="bg-[#FFFFFF] !h-[100%] mt-[30px] pl-[30px] pr-[31px] pb-[44px] pt-[39px] fade-in">
        <div className="mb-5">
          {reason ? <ReasonBox reason={reason} /> : null}
          <KycStatusBox status={status} />
        </div>
        <div className="grid grid-cols-1 gap-[20px] mb-[30px]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <UserDashboardInput
              label={"PAN Number *"}
              name={"pan_id"}
              readOnly={userData?.kyc_pan_verification_status != "reupload"}
              inputClassName="uppercase"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
            <div className="col-span-1">
              <UserDashboardInput
                readOnly={userData?.kyc_pan_verification_status != "reupload"}
                label={"Name On PAN Card*"}
                name={"pan_name"}
                inputClassName="uppercase"
              />
            </div>
            <div className="col-span-1 md:ml-[30px] mt-[30px] md:mt-0 flex gap-[30px]">
              <div className="flex items-end justify-end mt-[30px]">
                {userData?.kyc_pan_verification_status == "reupload" ? (
                  // <ValidatAadhareOtp
                  //   formData={userData}
                  //   verified={
                  //     docVerify?.kyc_verification_status &&
                  //     userData?.kyc_type == "aadhaar"
                  //   }
                  //   setDocVerify={setDocVerify}
                  //   setError={setError}
                  //   userData={userData}
                  //   isUserProfilePage
                  // />
                  <ValidatePancardOtp
                    formData={userData}
                    verified={docVerify?.credit_score_status}
                    setDocVerify={setDocVerify}
                    setError={setError}
                    userData={userData}
                    isUserProfilePage
                    // panName={panName}
                  />
                ) : null}
              </div>
              {/* <div className="flex items-end justify-center">
                {userData?.kyc_pan_verification_status == "reupload" ? (
                  <VerifyButton
                    handleClick={() => handleOtherKycSubmit()}
                    // verified={docVerify?.kyc_verification_status}
                    isLoading={otherKycIsLoading}
                  />
                ) : null}
              </div> */}
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

export default PanDetail;
