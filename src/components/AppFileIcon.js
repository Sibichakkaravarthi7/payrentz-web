import React from "react";
import AppImage from "./Image/AppImage";
import CloseButton from "./CloseButton";
import { FileIcon } from "@/Icons";

const AppFileIcon = ({ file, onRemove, ind, hideCloseButton = false }) => {
  return (
    <div className="rounded-[5px] px-[4px] py-[5px] relative">
      {!hideCloseButton ? (
        <CloseButton
          onClick={() => onRemove(ind)}
          className={"w-fit p-[4px] rounded-[100%]"}
          height="7"
          width="7"
        />
      ) : null}
      <AppImage
        onClick={() => window.open(file)}
        className="w-full max-w-[25px] cursor-pointer"
        src={FileIcon}
        loading="lazy"
        alt="file-icon"
      />
    </div>
  );
};

export default AppFileIcon;
