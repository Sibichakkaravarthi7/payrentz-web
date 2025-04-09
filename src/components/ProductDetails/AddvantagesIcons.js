import { circleIcons, iconsArr } from "@/utils/Constants";
import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import AppLink from "../Link/AppLink";

function AddvantagesIcons() {
  return (
    <div className="grid grid-cols-5 place-content-center mt-[20px] text-center">
      {iconsArr?.map((items) => (
        <AppLink
          key={items?.id}
          target={"_blank"}
          link={"/about-us#payrentz-promise"}
        >
          <div className="text-center flex flex-col items-center">
            <AppImage
              src={items?.image}
              className="w-[44px] md:w-[70px] col-span-1 h-[44px] md:h-[70px]"
              loading="lazy"
            />
            <Text className={"text-[10px] md:text-[11px] mt-[10px] mb-[30px]"}>
              {items?.text}
            </Text>
          </div>
        </AppLink>
      ))}
    </div>
  );
}

export default AddvantagesIcons;
