import React from "react";
import AppImage from "../Image/AppImage";
import { LocationModalPic } from "@/Icons";
import ChooseLocation from "../LocationModal/ChooseLocation";
import CloseButton from "../CloseButton";

const LocationModal = ({ onClose, cityData }) => {
  return (
    <div className="rounded-[20px] normal-variant-numeric">
      <div className="flex gap-[63px] items-center">
        <AppImage
          width={444}
          height={318}
          className="hidden md:block max-w-[444px]"
          src={LocationModalPic}
          loading="lazy"
        />
        <div className="w-full">
          <ChooseLocation cityData={cityData} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
