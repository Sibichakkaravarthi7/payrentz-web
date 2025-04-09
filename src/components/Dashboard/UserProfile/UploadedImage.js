import { CancelRedIcon } from "@/Icons";
import AppFileIcon from "@/components/AppFileIcon";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import React from "react";

function UploadedImage({ file }) {
  const showFileName = (val) => {
    const ext = val?.split(".")?.pop();
    let fileName = val?.split("/")?.pop();
    fileName =
      fileName?.length > 10 ? fileName?.slice(0, 10) + "..." : fileName;

    return fileName + "." + ext;
  };
  return (
    <div className="bg-[#FFFFFF] shadow-md rounded-[5px] py-[9px] w-[80px] md:w-[100px]">
      <div className="px-[21px] mb-[7px] flex items-center justify-center"></div>
      <div className="flex justify-between px-[6px] items-center flex-col">
        <AppFileIcon hideCloseButton file={file?.file} />
        <div>
          <Text
            className={"text-[#2B5CAB] text-[10px] text-center font-medium"}
          >
            {showFileName(file?.file)}
          </Text>
          {/* <Text className={"text-[#858585] text-[8px] mt-[6px] font-medium"}>{fileSize}</Text> */}
        </div>
        {/* <div>
            <AppImage src={CancelRedIcon} alt="cancel-icon" />
          </div> */}
      </div>
    </div>
  );
}

export default UploadedImage;
