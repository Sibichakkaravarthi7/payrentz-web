import React from "react";
import NewNavSearchBar from "./Search/NewNavSearchBar";
import dynamic from "next/dynamic";

const DynamicNewNavSearchBar = dynamic(() =>
  import("@/components/Search/NewNavSearchBar")
);

const NavSerachBar = () => {
  return (
    // <div className="flex relative w-full w-[100px]  md:w-[372px] xl:w-[372px]  flex-1">
    //   <AppInput placeholder={"Search"} className="nav-search" />
    //   <div className="absolute right-5 top-[14px]"><AppImage src={SearchIcon} /></div>
    // </div>
    <DynamicNewNavSearchBar />
  );
};

export default NavSerachBar;
