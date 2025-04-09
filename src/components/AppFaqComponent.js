import React from "react";
import Text from "./Text/Text";
import AppImage from "./Image/AppImage";
import { RightArrow } from "@/Icons";

const AppFaqComponent = ({ id, title, answer }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`toggle-${id}`}
        name={`toggle-${id}`}
        className="hidden acc-input"
      />
      <label
        htmlFor={`toggle-${id}`}
        className=" font-semibold text-appBlue acc-label"
      >
        <div className="py-[10px] flex justify-between gap-[10px] md:gap-[20px] w-full">
          <Text className={"text-[14px] md:text-[18px] font-bold"}>
            {title}
          </Text>
          <AppImage
            className="acc-icon"
            src={RightArrow}
            alt="arrow"
            loading="lazy"
          />
        </div>
      </label>
      <div className="acc-answer mt-[10px] text-[12px] md:text-[16px] font-medium">
        {answer}
      </div>
    </div>
  );
};

export default AppFaqComponent;
