import { DotIcon } from "@/Icons";
import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import React from "react";
function UserdashboadProfileTab({
  userDetails,
  handleTabClick,
  tab,
  setTab,
  isEditOn,
  setIsEditOn,
  handleSubmit,
  userUpdateIsLoading,
}) {
  return (
    <div className="flex justify-between mt-[35px]">
      <div className="md:flex grid grid-cols-1 items-center !w-fit gap-[10px] md:gap-[20px]">
        {userDetails?.map((item, index) => (
          <div
            key={index}
            className={`relative text-[#858585] md:text-[18px] font-medium px-[8px] py-[7px] cursor-pointer !w-fit ${
              tab === item?.type
                ? "font-semibold text-[#ED1F28] userdashboard-profile-selected-tab"
                : ""
            }`}
            onClick={() => handleTabClick(item?.type)}
          >
            <Text>{item?.name}</Text>
            {item?.isActionRequired ? (
              <AppImage
                className="absolute top-[-3px] right-[5px] text-[30px] text-appRed"
                src={DotIcon}
              />
            ) : null}
          </div>
        ))}
      </div>
      {tab == userDetails?.[0]?.type ? (
        <div className="flex items-end">
          {isEditOn ? (
            <div className="flex md:gap-[10px]">
              <AppButton
                onClick={() => handleSubmit()}
                text={"Save"}
                variant={"red"}
                className={"!font-medium !text-[12px] md:!text-[16px]"}
                isLoading={userUpdateIsLoading}
              />
              <AppButton
                onClick={() => window.location.reload()}
                text={"Cancel"}
                variant={"white"}
                className={"!font-medium !text-[12px] md:!text-[16px]"}
              />
            </div>
          ) : (
            <AppButton
              onClick={() => setIsEditOn(true)}
              text={"Edit Profile"}
              variant={"red"}
              className={"!font-medium !text-[12px] md:!text-[16px]"}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
export default UserdashboadProfileTab;
