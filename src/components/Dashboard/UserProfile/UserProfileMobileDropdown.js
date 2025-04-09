import { DotIcon } from "@/Icons";
import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import AppSelect from "@/components/Select/AppSelect";
import React from "react";
import Select, { components } from "react-select";

function UserProfileMobileDropdown({
  userData,
  userDetails,
  handleTabCLick,
  tab,
  setTab,
  setIsEditOn,
  handleSubmit,
  userUpdateIsLoading,
  isEditOn,
}) {
  const userDetailsOptions = userDetails?.map((detail) => {
    var isActionRequired = false;
    if (detail?.type === "residency") {
      isActionRequired = userData?.residency_kyc_verified === "reupload";
    } else if (detail?.type === "profession") {
      isActionRequired = userData?.professional_kyc_verified === "reupload";
    }

    return {
      label: detail?.name,
      id: detail?.type,
      value: detail?.type,
      isActionRequired: isActionRequired,
    };
  });

  const customOptionComp = ({ children, ...props }) => {
    const { isActionRequired } = props?.data;
    return (
      <components.Option {...props}>
        <div className="flex gap-[10px] md:gap-[15px] items-center">
          {
            <div>
              <span className="">{children}</span>
              {/* <span className="text-[10px] capitalize font-[500]">
                in {type}
              </span> */}
            </div>
          }
          {isActionRequired ? (
              <div className="flex justify-start">
                <AppImage
                  className="text-appRed"
                  src={DotIcon}
                />
              </div>
          ) : null
        }
        </div>
      </components.Option>
    );
  };

  // console.log("mobile dropdown", userDetailsOptions);
  // console.log("tab selection", tab);
  // console.log(
  //   "action required or not",
  //   userDetailsOptions?.map((option) => option?.isActionRequired)
  // );


  return (
    <div className="mt-[35px]">
      <div className="relative">
        <Select
          options={userDetailsOptions}
          placeholder={"Personal Information"}
          onChange={(value) => setTab(value?.value)}
          components={{ Option: customOptionComp }}
        />{" "}
        {/* {userDetailsOptions?.map((option) =>
          option?.isActionRequired ? (
            <>
              <div className="flex justify-start">
                <AppImage
                  key={option?.id}
                  className="absolute top-[6px] left-[6px] text-[30px] text-appRed"
                  src={DotIcon}
                />
              </div>
            </>
          ) : null
        )} */}
      </div>

      {tab == userDetails?.[0]?.type ? (
        <div className="flex justify-end mt-[10px] items-end">
          {isEditOn ? (
            <div className="flex gap-[10px]">
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

export default UserProfileMobileDropdown;
