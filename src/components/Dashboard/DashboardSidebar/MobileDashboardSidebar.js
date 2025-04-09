import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import AppImage from "@/components/Image/AppImage";
import { PayrentzLogo } from "@/Icons";
import DashboardSidebarMob from "./DashboardSidebarMob";

const MobileDashboardSidebar = ({ isOpen, closeSidebar, dashboardData, active, onMenuClick }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={closeSidebar}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed h-full w-64 bg-white top-0 left-0 transform transition-transform ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        {/* <div className=" px-[20px] py-[22px] mb-5">
          <AppImage src={PayrentzLogo} />
        </div> */}
        {/* Sidebar content */}
        {/* {console.log("dashboarData", dashboardData)} */}
        <DashboardSidebarMob closeSidebar={closeSidebar}  dashboardData={dashboardData} onMenuClick={onMenuClick} active={active} />
      </div>
    </>
  );
};

export default MobileDashboardSidebar;
