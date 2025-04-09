import { TickIcon } from "@/Icons";
import React from "react";
import AppImage from "./Image/AppImage";
import Text from "./Text/Text";

const VerifiedTag = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="flex items-center justify-center w-[20px] h-[20px] rounded-[50%] bg-[green]">
        <AppImage
          src={TickIcon}
          alt="tick-icon"
          className="w-[15px] h-[15px]"
          loading="lazy"
        />
      </div>
      <Text className={"text-[green] font-semibold"}>Verified !</Text>
    </div>
  );
};

export default VerifiedTag;
