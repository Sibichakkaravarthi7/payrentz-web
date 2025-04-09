"use client";

import Text from "@/components/Text/Text";
import React, { useState } from "react";
import PersonDetails from "./PersonDetails";
import KycDetails from "./KycDetails";
import ResidencyDetails from "./ResidencyDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import BankDetails from "./BankDetails";
import AppButton from "@/components/Button/AppButton";
import UserdashboadProfileTab from "./UserdashboadProfileTab";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import UserProfileMobileDropdown from "./UserProfileMobileDropdown";
import PanDetail from "./PanDetail";

function UserProfile({
  userData,
  error,
  setError,
  initialIsLoading,
  isEditOn,
  setIsEditOn,
  handleSubmit,
  userUpdateIsLoading,
  refetch,
}) {
  const [tab, setTab] = useState("personal");
  const [docVerify, setDocVerify] = useState({
    bank: userData?.bank_kyc_verified == "verified" ? true : false,
    kyc_verification_status:
      userData?.kyc_verification_status == "verified" ? true : false,
  });

  const userDetails = [
    {
      name: "Personal Information",
      type: "personal",
      isActionRequired:
        userData?.kyc_verification_status == "reupload" ? true : false,
    },
    {
      name: "KYC Details",
      type: "kyc",
      isActionRequired:
        userData?.kyc_verification_status == "reupload" ? true : false,
    },
    {
      name: "PAN Details",
      type: "kyc-pan",
      isActionRequired:
        userData?.kyc_pan_verification_status == "reupload" ? true : false,
    },
    {
      name: "Residence Details",
      type: "residency",
      isActionRequired:
        userData?.residency_kyc_verified == "reupload" ? true : false,
    },
    {
      name: "Professional Details",
      type: "profession",
      isActionRequired:
        userData?.professional_kyc_verified == "reupload" ? true : false,
    },
    {
      name: "Bank Details",
      type: "bank",
      isActionRequired:
        userData?.bank_kyc_verified == "reupload" ? true : false,
    },
  ];

  const handleTabClick = (type) => {
    setTab(type);
    // console.log("user profile data", userData);
  };

  return (
    <div className="mt-[10px] md:mt-0 normal-variant-numeric">
      <Text className={"text-[28px] font-bold"}>User Profile</Text>
      <div>
        <div className="md:hidden">
          <UserProfileMobileDropdown
            handleTabClick={handleTabClick}
            userData={userData}
            userDetails={userDetails}
            setTab={setTab}
            tab={tab}
            setIsEditOn={setIsEditOn}
            isEditOn={isEditOn}
            handleSubmit={handleSubmit}
            userUpdateIsLoading={userUpdateIsLoading}
          />
        </div>
        <div className="hidden md:block">
          <UserdashboadProfileTab
            userDetails={userDetails}
            handleTabClick={handleTabClick}
            tab={tab}
            setTab={setTab}
            setIsEditOn={setIsEditOn}
            isEditOn={isEditOn}
            handleSubmit={handleSubmit}
            userUpdateIsLoading={userUpdateIsLoading}
          />
        </div>
      </div>
      <LoaderLayout height={50} isLoading={initialIsLoading}>
        {tab === "personal" && <PersonDetails />}

        {tab === "kyc" && (
          <KycDetails docVerify={docVerify} setDocVerify={setDocVerify} />
        )}
        {tab === "kyc-pan" && (
          <PanDetail docVerify={docVerify} setDocVerify={setDocVerify} />
        )}
        {tab === "residency" && <ResidencyDetails />}

        {tab === "profession" && <ProfessionalDetails />}

        {tab === "bank" && (
          <BankDetails docVerify={docVerify} setDocVerify={setDocVerify} />
        )}
      </LoaderLayout>
    </div>
  );
}

export default UserProfile;
