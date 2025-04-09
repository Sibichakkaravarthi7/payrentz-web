"use client";

import React, { useContext } from "react";
import AppLabel from "@/components/Label/AppLabel";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppInput from "@/components/Input/AppInput";
import UploadedImagesWrapper from "./UploadedImagesWrapper";
import AppSelect from "@/components/Select/AppSelect";
import UserDashboardInput from "./UserDashboardInput";
import { userDataContext } from "@/app/dashboard/user-profile/page";
import { ownHouseDocOptions, selfEmployeeOptions } from "@/utils/Constants";
import DocumnetReuploadHandler from "./DocumnetReuploadHandler";
import Text from "@/components/Text/Text";
import KycStatusBox from "./KycStatusBox";
import ReasonBox from "./ReasonBox";

function ProfessionalDetails() {
  const { handleInputChange, error, userData } = useContext(userDataContext);
  const status = userData?.professional_kyc_verified;
  const reason = userData?.professional_reupload_reason;

  const professionalType = [
    {
      value: "student",
      label: "Student",
    },
    {
      value: "working_professional",
      label: "Working Professional",
    },
    {
      value: "self_employed",
      label: "Self Employed",
    },
  ];

  const returnFieldsBasedOnProfession = (occ) => {
    if (occ == "student")
      return (
        <>
          <UserDashboardInput
            readOnly
            label={"Parent Name *"}
            name={"parent_name"}
          />
          <UserDashboardInput
            readOnly
            label={"Relationship with Parent *"}
            name={"parent_relationship"}
          />
        </>
      );

    if (occ == "working_professional")
      return (
        <>
          <UserDashboardInput
            label={"Company Name *"}
            name={"company_name"}
            readOnly
          />
          <UserDashboardInput
            label={"Designation *"}
            name={"designation"}
            readOnly
          />
        </>
      );
    if (occ == "self_employed")
      return (
        <>
          <UserDashboardInput
            label={"Support Document Type *"}
            options={selfEmployeeOptions}
            name={"self_employee_id_type"}
            dontAlterOptions
            labelWidth="100%"
            type="select"
            readOnly
          />
        </>
      );
  };

  return (
    <div>
      <div className="bg-[#FFFFFF] !h-[100%] mt-[30px] pl-[30px] pr-[31px] pb-[21px] pt-[33px] fade-in gap-[22px] md:gap-[30px] flex flex-col ">
        <div className="mb-5">
          {reason ? <ReasonBox reason={reason} /> : null}
          <KycStatusBox status={status} />
        </div>

        <UserDashboardInput
          label={"Profession *"}
          name={"occupation"}
          radioArr={professionalType}
          labelWidth="100%"
          type="radio"
          gridCols="3"
          readOnly
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px]">
          {returnFieldsBasedOnProfession(userData?.["occupation"])}
        </div>

        {/* Supporting doc */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px]">
          <LabelWrapper
            label={"Upload ID *"}
            labelClassName={"!text-[16px] !font-medium"}
            className={"w-[100%] h-[100%]"}
          >
            <UploadedImagesWrapper name="professional_document" />
          </LabelWrapper>
        </div> */}
        <div className="flex !h-[100%] gap-[10px]">
          {userData?.professional_kyc_verified == "reupload" ? (
            <DocumnetReuploadHandler
              folderName={"professional-kyc"}
              keyToSet={"professional_document"}
            />
          ) : (
            <LabelWrapper
              label={"Upload ID *"}
              labelClassName={"!text-[16px] !font-medium"}
              className={"md:w-[49%] h-[100%]"}
            >
              <UploadedImagesWrapper name="professional_document" />
            </LabelWrapper>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfessionalDetails;
