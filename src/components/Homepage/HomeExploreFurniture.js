import React from "react";
import AppImage from "../Image/AppImage";
import { ComfortAndConvenience, GirlOnChair } from "@/Icons";

const HomeExploreFurniture = () => {
  return (
    <>
      <div className="flex max-w-[1135px] w-full  md:gap-[75px] mt-[20px] md:mt-[20px] mb-[20px] md:mb-[50px] mx-auto">
        <AppImage
          src={ComfortAndConvenience || GirlOnChair}
          loading="lazy"
          alt="comfort-and-convenience"
          srcSet={ComfortAndConvenience || GirlOnChair}
        />
      </div>
    </>
  );
};

export default HomeExploreFurniture;
