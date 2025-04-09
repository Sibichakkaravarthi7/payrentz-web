import React from "react";
import Text from "./Text/Text";

const TestimonialComponent = ({ quote = "", name = "", rentingSince = "" }) => {
  return (
    <div className="flex flex-col justify-between gap-[15px] md:gap-[20px]  text-white ps-[25px] md:ps-[30px] md:h-[310px]">
      <Text
        className={
          "text-[16px]  md:text-xl font-medium text-center md:text-left"
        }
      >{`“${quote}”`}</Text>
      <div className="text-center md:text-left">
        <Text className={"text-[16px] md:text-[24px] capitalize"}>{name}</Text>
        {rentingSince ? (
          <Text className={"text-[12px] md:text-[16px] mt-[3px] capitalize"}>
            {rentingSince}
          </Text>
        ) : null}
      </div>
    </div>
  );
};

export default TestimonialComponent;
