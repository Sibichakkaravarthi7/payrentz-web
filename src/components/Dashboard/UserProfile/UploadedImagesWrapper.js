import React, { useContext } from "react";
import UploadedImage from "./UploadedImage";
import { DummyImage } from "@/Icons";
import { userDataContext } from "@/app/dashboard/user-profile/page";

function UploadedImagesWrapper({ name = "" }) {
  const { handleInputChange, error, userData } = useContext(userDataContext);
  const uploadedImages = userData?.[name];

  // console.log("uploadedImages", name)

  return (
    <div className=" md:grid grid-cols-4 flex flex-wrap  gap-[10px] px-[11px] border border-dashed rounded-[5px]">
      {uploadedImages?.map((item) => (
        <UploadedImage key={item?.file} file={item} />
      ))}
    </div>
  );
}

export default UploadedImagesWrapper;
