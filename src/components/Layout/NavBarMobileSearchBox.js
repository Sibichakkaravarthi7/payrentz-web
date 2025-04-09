import React from "react";
import dynamic from "next/dynamic";

const DynamicNewNavSearchBar = dynamic(() =>
  import("@/components/Search/NewNavSearchBar")
);

const NavBarMobileSearchBox = () => {
  return (
    <div className="block lg:hidden bg-white p-[10px] pt-[0px]">
      <DynamicNewNavSearchBar />
    </div>
  );
};

export default NavBarMobileSearchBox;
