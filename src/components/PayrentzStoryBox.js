import React from "react";
import AppImage from "./Image/AppImage";
import AppLink from "./Link/AppLink";
import Text from "./Text/Text";

export const PayrentzStoryBox = ({
  image,
  link = "",
  title,
  description,
  createdOn,
  tag,
}) => {
  return (
    <AppLink className="w-full max-w-[701px] flex" link={link}>
      <AppImage
        className="w-[49%] max-h-[396px]"
        src={image}
        loading="lazy"
        alt="image"
      />
      <div className="bg-[#f3f7ff] flex items-center relative">
        <div className="flex flex-col gap-[10px] md:gap-[20px] px-[25px]">
          <Text
            className={
              "text-[14px] md:text-[22px] font-extrabold text-[#0A2D45] capitalize"
            }
          >
            {title}
          </Text>
          <Text
            className={"text-[8px] md:text-[16px] text-[#505050] capitalize"}
          >
            {description}
          </Text>
          <Text
            className={
              "text-[8px] mt-[10px] md:mt-[0] md:text-[12px] text-[#707070]"
            }
          >
            {createdOn}
          </Text>
        </div>
        <Text
          className={
            "absolute top-0 right-0 text-white bg-appBlue py-[7px] md:py-[12px] w-[61px] md:w-[116px] font-semibold text-[8px] md:text-[16px] text-center capitalize"
          }
        >
          {tag}
        </Text>
      </div>
    </AppLink>
  );
};
