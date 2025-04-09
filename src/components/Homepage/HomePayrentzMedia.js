import React from "react";
import Text from "../Text/Text";
import { PayrentzStoryBox } from "../PayrentzStoryBox";
import { Media1, Media2 } from "@/Icons";
import AppButton from "../Button/AppButton";

const HomePayrentzMedia = () => {
  return (
    <div className="mt-[50px]">
      <Text
        className={
          "text-[18px] md:text-[28px] font-extrabold text-center text-appBlue mb-[18px] md:mb-[53px]"
        }
        as="h2"
      >
        Payrentz Media
      </Text>
      <div className="flex flex-col md:flex-row gap-x-[39px] gap-y-[10px] justify-center">
        <PayrentzStoryBox
          image={Media1}
          title={
            "Innovative Ecommerce Rental Solutions Redefining Online Shopping"
          }
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          }
          createdOn={"August 30, 2023"}
          tag={"In The News"}
        />
        <PayrentzStoryBox
          image={Media2}
          title={
            "Innovative Ecommerce Rental Solutions Redefining Online Shopping"
          }
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
          }
          createdOn={"August 30, 2023"}
          tag={"Blog"}
        />
      </div>
      <div className="flex justify-center mt-[30px] hidden md:flex">
        <AppButton variant={"red"} link={"#"} text={"See all posts"} />
      </div>
    </div>
  );
};

export default HomePayrentzMedia;
