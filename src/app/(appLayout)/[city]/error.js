"use client";
import { WebsiteUnderMaintenance } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
// import AppLink from "@/components/Link/AppLink";
import Text from "@/components/Text/Text";
import React, { useEffect } from "react";

const Error = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center flex-col h-[80vh] px-[30px]">
      <AppImage
        className="w-ful max-w-[400px]"
        src={WebsiteUnderMaintenance}
        loading="lazy"
      />
      <Text className={"font-bold text-[18px] md:text-[20px]"}>
        Oops, something went wrong!
      </Text>
      <Text className={"text-[18px] font-[500] mt-1"}>
        Please
        <span
          role="button"
          onClick={() => window.location.reload()}
          className={
            "cursor-pointer gap-[10px] text-[#ED1F28]  hover:text-appBlue items-center mt-[10px]"
          }
        >
          <button>reload this page</button>
          {/* <AppImage className="w-[16px]" src={LeftArrowIcon} />  */}
        </span>
        or check your internet connection
      </Text>
    </div>
  );
};

export default Error;
