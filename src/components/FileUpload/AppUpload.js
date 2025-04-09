"use client";

import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import AppImage from "../Image/AppImage";
import { FileUploadIcon } from "@/Icons";
import Text from "../Text/Text";
import useUploadToS3 from "@/utils/hooks/useUploadToS3";
import AppFileIcon from "../AppFileIcon";
import { ClipLoader } from "react-spinners";

const fileTypes = ["JPG", "PNG", "GIF", "HEIF", "SVG", "PDF", "JPEG"];

function AppUpload({
  folderName,
  state,
  setState,
  keyToSet = "",
  isError,
  className = "",
  ...others
}) {
  //   const [file, setFile] = useState(null);

  const onImageUploadSuccess = (res) => {
    // console.log("res", res);
    setState((prv) => ({
      ...prv,
      [keyToSet]: [...(state?.[keyToSet] || []), res?.data],
    }));
  };

  const { uploadToS3, s3IsLoading } = useUploadToS3(
    folderName,
    onImageUploadSuccess
  );

  const handleChange = (file) => {
    const form = new FormData();
    // console.log("normal filleeee", file);
    form.append("file", file);
    uploadToS3(form);
  };

  const onRemove = (ind) => {
    const imgs = [...state?.[keyToSet]];
    imgs?.splice(ind, 1);
    setState((prv) => ({
      ...prv,
      [keyToSet]: imgs,
    }));
  };
  // console.log("isError?.[keyToSet]", isError?.[keyToSet], keyToSet);
  return (
    <div
      className={`relative border-2 border-[#DBDBDB] border-dashed 
    rounded-[5px] py-[6px] px-[5px] md:px-[7px] flex items-center app-file-upload ${
      isError?.[keyToSet] ? "border-appRed" : ""
    }`}
    >
      <FileUploader
        handleChange={handleChange}
        name={keyToSet}
        types={fileTypes}
        maxSize={30}
        {...others}
        // dropMessageStyle={{ backgroundColor: "#ED1F28", opacity: "1", flex: 1 }}
      >
        <div className="flex gap-[10px] cursor-pointer">
          <div className="col-span-1 flex items-center justify-center">
            <AppImage src={FileUploadIcon} alt="file-upload-icon" />
          </div>
          <div className="col-span-2 text-center">
            <Text
              className={"text-[11px] font-medium mt-[2px] whitespace-nowrap"}
            >
              Drop file to attach, or{" "}
              <span className="text-[#ED1F28]">browse</span>
            </Text>
            <Text
              className={
                "text-[6px] font-medium whitespace-nowrap text-[#858585] mt-[3px]"
              }
            >
              PDF, JPG, PNG (Max 30 mb)
            </Text>
          </div>
        </div>
      </FileUploader>
      <div>
        {state?.[keyToSet]?.length > 0 ? (
          <div className="flex gap-[10px]">
            {state?.[keyToSet]?.map((m, ind) => (
              <AppFileIcon
                onRemove={onRemove}
                file={m?.file}
                key={m?.file}
                ind={ind}
              />
            ))}
            {s3IsLoading ? (
              <div className="py-[3px]">
                <ClipLoader size={"18px"} color={"#2B5CAB"} />
              </div>
            ) : null}
          </div>
        ) : null}
        {s3IsLoading && state?.[keyToSet]?.length == 0 ? (
          <ClipLoader size={"18px"} color={"#2B5CAB"} />
        ) : null}
      </div>
      {isError?.[keyToSet] ? (
        <Text
          className={
            "text-appRed text-[8px] md:text-[12px] absolute bottom-[13px] md:bottom-[-18px]"
          }
        >
          {isError?.[keyToSet]?.message || "Enter a valid data"}
        </Text>
      ) : null}
    </div>
  );
}

export default AppUpload;
