"use client";

import React, { useContext, useEffect, useState } from "react";
import AppImage from "../../Image/AppImage";
import { PayrentzWhiteRedLogo, ExitIcon } from "@/Icons";
import Text from "../../Text/Text";
import AppLink from "@/components/Link/AppLink";
import { ClipLoader } from "react-spinners";
import { DashboardContext } from "../SmallLayoutComponent";

function DashboardSidebarMob({
  dashboardData,
  closeSidebar,
  onMenuClick,
  active,
}) {
  const { mutate, isLoading } = useContext(DashboardContext);

  const handleClick = (type) => {
    // console.log("Clicked:", type);
    // console.log("Active:", active);

    if (onMenuClick) {
      onMenuClick(type);
    }
    if (closeSidebar) {
      closeSidebar(type);
    }
  };

  const deleteUser = () => {
    mutate({});
  };

  return (
    <div className="bg-[#2B5CAB] pt-[15px] pb-[36px] fixed top-0 bottom-0 left-0">
      <AppLink link={"/"}>
        <AppImage
          src={PayrentzWhiteRedLogo}
          alt="payrentz-logo"
          className="mx-[42px] mb-[10px] ml-[20px] cursor-pointer"
        />
      </AppLink>

      <div className="flex flex-col justify-between h-[100%]">
        <div>
          {dashboardData?.map((item) => (
            <div
              key={item?.icon}
              onClick={() => handleClick(item?.type)}
              className={`flex items-center mt-[2px] whitespace-nowrap pl-[20px] pr-[57px] cursor-pointer ${
                active === item?.type ? "bg-[#182433] bg-opacity-40" : ""
              } hover:opacity-40 hover:bg-[#182433] rounded-[10px] pt-[10px] pb-[9px]`}
            >
              <AppImage src={item?.icon} alt="logo" className="" />
              <Text className={"text-[#FFFFFF] font-bold pl-[20px]"}>
                {item?.title}
              </Text>
            </div>
          ))}
        </div>
        <div
          onClick={() => deleteUser()}
          className="border-t-2 cursor-pointer border-[#FFFFFF] mx-[26px]"
        >
          <div className="flex justify-between hover:bg-[#182433] hover:opacity-40 hover:rounded-[10px] px-[20px] pb-[31px] pt-[25px]">
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

export default DashboardSidebarMob;
