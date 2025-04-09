import React from "react";
import NavMenuLinks from "./Layout/NavMenuLinks";
import AppImage from "./Image/AppImage";
import { PayrentzLogo, PayrentzWhiteRedLogo } from "@/Icons";

const MobileSidebar = ({ isOpen, closeSidebar }) => {
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
        className={`fixed bg-[#ffffff] h-full w-64 top-0 left-0 transform transition-transform ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className=" px-[30px] flex py-[22px] mb-3">
          <AppImage src={PayrentzLogo} loading="lazy" alt="logo" />
        </div>
        {/* Sidebar content */}
        <NavMenuLinks closeSidebar={closeSidebar} />
      </div>
    </>
  );
};

export default MobileSidebar;
