"use client";

import React, { useContext } from "react";
import { UserBlack } from "@/Icons";
import { Label } from "flowbite-react";
import AppLink from "@/components/Link/AppLink";
import AppSelect from "@/components/Select/AppSelect";
import AppImage from "@/components/Image/AppImage";
import AppInput from "@/components/Input/AppInput";
import AppLabel from "@/components/Label/AppLabel";
import LabelWrapper from "@/components/Login/LabelWrapper";
import Text from "@/components/Text/Text";
import UserDashboardInput from "./UserDashboardInput";
import { userDataContext } from "@/app/dashboard/user-profile/page";
import KycStatusBox from "./KycStatusBox";
import ReasonBox from "./ReasonBox";
import ReuploadProfilePic from "./ReuploadProfilePic";

function PersonDetails() {
  const { userData, error, setError, handleInputChange, isEditOn } =
    useContext(userDataContext);
  const status = userData?.profile_pic_verify;
  // const reason = userData?.kyc_reupload_reason;

  const genderArr = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  const maritalArr = [
    {
      value: "single",
      label: "Single",
    },
    {
      value: "married",
      label: "Married",
    },
  ];
  const liftArr = [
    {
      value: "true",
      label: "Yes",
    },
    {
      value: "false",
      label: "No",
    },
  ];
  // console.log("userdataaavhbjcvd", userData);

  return (
    <div>
      <div className="bg-[#FFFFFF] !h-[100%] mt-[30px] pl-[30px] pr-[31px] py-[54px] fade-in">
        {/* <div className="flex justify-between mb-5">
          {reason ? <ReasonBox reason={reason} /> : null}
          <KycStatusBox status={status} />
        </div> */}
        <KycStatusBox status={status} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px] mb-[30px]">
          <UserDashboardInput
            label={"First Name*"}
            name={"first_name"}
            readOnly={!isEditOn}
            isError={error}
          />
          <UserDashboardInput
            label={"Last Name"}
            name={"last_name"}
            readOnly={!isEditOn}
            isError={error}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-[30px]">
          <div className="grid grid-cols-1 gap-[30px]">
            <UserDashboardInput
              label={"E-Mail *"}
              name={"email"}
              type="email"
              readOnly={!isEditOn}
              isError={error}
              // readOnly
            />
            <UserDashboardInput
              label={"Phone Number *"}
              name={"phone_number"}
              type="tel"
              readOnly={!isEditOn}
              isError={error}
              // readOnly
            />
            <UserDashboardInput
              label={"Alternate Phone Number *"}
              name={"alternative_phone_number"}
              type="tel"
              readOnly={!isEditOn}
              isError={error}
            />
            <UserDashboardInput
              label={"Gender"}
              name={"gender"}
              radioArr={genderArr}
              type="radio"
              readOnly={!isEditOn}
              isError={error}
            />
            <UserDashboardInput
              label={"Marital Status"}
              name={"martial_status"}
              radioArr={maritalArr}
              type="radio"
              readOnly={!isEditOn}
              isError={error}
            />
          </div>
          <div className="flex mt-[20px] md:mt-0 justify-center md:justify-end">
            <div className="flex flex-col items-center">
              {userData?.profile_pic_verify == "reupload" && isEditOn ? (
                <>
                  <ReuploadProfilePic />
                </>
              ) : userData?.profile_pic ? (
                <div className="border w-[200px] h-[200px] rounded-[100px] mb-[27px] overflow-hidden">
                  <AppImage
                    src={userData?.profile_pic?.file}
                    className="object-cover w-full h-full"
                    alt="captured-image"
                    // width={200}
                    // height={200}
                  />
                </div>
              ) : (
                <>
                  <AppImage
                    src={UserBlack}
                    alt={"selfie-icon"}
                    className="max-w-[170px]"
                  />
                </>
              )}

              {/* <div className=" bg-[#2B5CAB] px-[20px] rounded-[5px] mt-[33px] md:mb-[27px] py-[10px] gap-[10px]">
                <Text className={"text-[#FFFFFF] text-[18px] font-bold"}>
                  Change Profile Selfie
                </Text>
              </div> */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px] mb-[30px]">
          <UserDashboardInput
            label={"Address Line 1 *"}
            name={"address_line1"}
            readOnly={!isEditOn}
            isError={error}
          />
          <UserDashboardInput
            label={"Address Line 2 *"}
            name={"address_line2"}
            readOnly={!isEditOn}
            isError={error}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[20px] mb-[30px]">
          {/* <LabelWrapper
            label={"City *"}
            labelClassName={"!text-[16px] !font-medium"}
            className={"w-[100%]"}
          >
            <AppSelect placeholder={""} className={"user-select"} />
          </LabelWrapper> */}
          <UserDashboardInput
            label={"Lift is available"}
            name={"lift_availability"}
            type="radio"
            radioArr={liftArr}
            readOnly={!isEditOn}
            isError={error}
          />
          <UserDashboardInput
            label={"Floor No"}
            name={"floor_number"}
            readOnly={!isEditOn}
            isError={error}
            options={[
              { id: "0", identity: "0" },
              { id: "1", identity: "1" },
              { id: "2", identity: "2" },
              { id: "3", identity: "3" },
            ]}
            labelWidth={"100%"}
            type={
              isEditOn
                ? String(userData?.lift_availability) === "true"
                  ? "text"
                  : "select"
                : "text"
            }
          />
          <UserDashboardInput
            label={"City *"}
            name={"address_city"}
            readOnly={!isEditOn}
            isError={error}
          />
          <UserDashboardInput
            label={"State *"}
            name={"address_state"}
            readOnly={!isEditOn}
            isError={error}
          />
        </div>
        <div className="grid grid-cols-1 gap-[20px] w-full md:grid-cols-2 mb-[30px]">
          <UserDashboardInput
            label={"Pincode *"}
            isError={error}
            name={"pincode"}
          />
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <Label className="text-[16px] font-medium">
                Google Map Location Link (Residential)*
              </Label>
            </div>
            <AppInput
              type="input"
              wrapperClassName="ticket-input"
              className="pl-[10px] ticket-input !text-[16px] py-[8px] border rounded-[5px] mt-[10px]"
              placeholder={"Eg. https://maps.app.goo.gl/examplelocation"}
              name={"location_link"}
              value={userData}
              isError={error}
              onChange={(e) => handleInputChange(e)}
              readOnly={!isEditOn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;
