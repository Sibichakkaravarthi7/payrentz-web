import React, { useContext } from "react";
import AppLabel from "@/components/Label/AppLabel";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppInput from "@/components/Input/AppInput";
import UploadedImagesWrapper from "./UploadedImagesWrapper";
import UserDashboardInput from "./UserDashboardInput";
import { userDataContext } from "@/app/dashboard/user-profile/page";
import { ownHouseDocOptions, rentHouseDocOptions } from "@/utils/Constants";
import AppButton from "@/components/Button/AppButton";
import DocumnetReuploadHandler from "./DocumnetReuploadHandler";
import Text from "@/components/Text/Text";
import KycStatusBox from "./KycStatusBox";
import ReasonBox from "./ReasonBox";

function ResidencyDetails() {
  const { handleInputChange, error, userData } = useContext(userDataContext);
  const status = userData?.residency_kyc_verified;
  const reason = userData?.residency_reupload_reason;
  const residencyArr = [
    {
      value: "own_house",
      label: "Own House",
    },
    {
      value: "rental_house",
      label: "Rental House",
    },
  ];

  return (
    <div>
      <div className="bg-[#FFFFFF] !h-[100%] mt-[30px] pl-[30px] pr-[31px] pb-[21px] pt-[33px] fade-in gap-[22px] md:gap-[30px] flex flex-col ">
        <div className="mb-5">
          {reason ? <ReasonBox reason={reason} /> : null}
          <KycStatusBox status={status} />
        </div>
        <UserDashboardInput
          label={"Reidency Type *"}
          name={"residency_type"}
          radioArr={residencyArr}
          type="radio"
          readOnly
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px]">
          {userData?.residency_type == "rental_house" ? (
            <>
              {/* <UserDashboardInput
                label={"House Owner Name *"}
                name={"house_owner_name"}
                readOnly
              />
              <UserDashboardInput
                label={"House Owner Phone *"}
                name={"house_owner_mobile"}
                readOnly
              /> */}
              {/* <input
                value={"Rental Agreement/Utility Bills/Others"}
                wrapperClassName="user-input"
                className={`border user-input !text-[16px] py-[8px] pl-[10px] border-[#E6E7E9] rounded-[5px] w-full app-input`}
                // onChange={(e) => handleInputChange(e)}
              /> */}
              <UserDashboardInput
              label={"Support Document Type *"}
              options={rentHouseDocOptions}
              name={"rent_house_proof_id_type"}
              dontAlterOptions
              labelWidth="100%"
              type="select"
              readOnly={userData?.residency_kyc_verified != "reupload"}
            />
            </>
          ) : (
            <UserDashboardInput
              label={"Support Document Type *"}
              options={ownHouseDocOptions}
              name={"own_house_proof_id_type"}
              dontAlterOptions
              labelWidth="100%"
              type="select"
              readOnly={userData?.residency_kyc_verified != "reupload"}
            />
          )}
        </div>
        <div className="flex !h-[100%] gap-[10px]">
          {userData?.residency_kyc_verified == "reupload" ? (
            <DocumnetReuploadHandler
              keyToSet={"residency_documents"}
              folderName={"residency-kyc"}
            />
          ) : (
            <LabelWrapper
              label={"Upload ID *"}
              labelClassName={"!text-[16px] !font-medium"}
              className={"md:w-[49%] h-[100%]"}
            >
              <UploadedImagesWrapper name="residency_documents" />
            </LabelWrapper>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResidencyDetails;
