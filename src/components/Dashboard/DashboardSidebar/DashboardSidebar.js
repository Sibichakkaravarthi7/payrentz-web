"use client";
import React, { useContext } from "react";
import AppImage from "../../Image/AppImage";
import { PayrentzWhiteRedLogo, ExitIcon, DotIcon } from "@/Icons";
import Text from "../../Text/Text";
import AppLink from "@/components/Link/AppLink";
import { ClipLoader } from "react-spinners";
import { DashboardContext } from "../SmallLayoutComponent";
import useAppStore from "@/Store/Store";

function DashboardSidebar({
  dashboardData,
  onMenuClick,
  active,
  reupload_pending = false,
}) {
  const { mutate, isLoading } = useContext(DashboardContext);

  const { city } = useAppStore();
  const handleClick = (type) => {
    // console.log("Clicked:", type);
    // console.log("Active:", active);

    if (onMenuClick) {
      onMenuClick(type);
    }
  };

  const deleteUser = () => {
    mutate({});
  };

  return (
    <div className="bg-[#2B5CAB] hidden md:block min-w-[317px] pt-[34px] pb-[36px] z-[9] fixed top-0 bottom-0 left-0">
      <AppLink link={`/${city}`}>
        <AppImage
          src={PayrentzWhiteRedLogo}
          alt="payrentz-logo"
          className="mx-[78px] mb-[60px] cursor-pointer"
        />
      </AppLink>

      <div className="flex flex-col justify-between h-[90%]">
        <div>
          {dashboardData?.map((item) => (
            <div
              key={item?.icon}
              onClick={() => handleClick(item?.type)}
              className={`flex items-center mt-[15px] px-[44px] cursor-pointer ${
                active === item?.type ? "bg-[#182433] bg-opacity-40" : ""
              } hover:opacity-40 hover:bg-[#182433] rounded-[10px] pt-[12px] pb-[9px]`}
            >
              <AppImage src={item?.icon} alt="logo" />
              <Text className={"text-[#FFFFFF] font-bold pl-[20px] relative "}>
                {item?.title}
                {reupload_pending && item?.type == "user-profile" ? (
                  <AppImage
                    className="absolute left-[-7px] top-[-9px]"
                    src={DotIcon}
                  />
                ) : null}
              </Text>
            </div>
          ))}
        </div>
        <div
          onClick={() => deleteUser()}
          className=" cursor-pointer border-t-2 border-[#FFFFFF] mx-[26px] "
        >
          <div className="flex justify-between hover:bg-[#182433] hover:opacity-40 hover:rounded-[10px] px-[20px] py-[20px] my-[10px]">
            <Text className={"text-[#FFFFFF] font-bold"}>Log Out</Text>
            {isLoading ? (
              <ClipLoader size={"12px"} color={"#2B5CAB"} />
            ) : (
              <AppImage src={ExitIcon} alt="logout-logo" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
