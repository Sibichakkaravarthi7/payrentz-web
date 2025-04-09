"use client";

import { CameraIcon, SelfieIcon } from "@/Icons";
import { userDataContext } from "@/app/dashboard/user-profile/page";
import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import useReupload from "@/utils/hooks/useRepload";
import useUploadToS3 from "@/utils/hooks/useUploadToS3";
import React, { useCallback, useContext, useRef, useState } from "react";
import Webcam from "react-webcam";

function ReuploadProfilePic() {
  const webcamRef = useRef(null);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [camErr, setCamErr] = useState(null);
  const [url, setUrl] = useState(null);
  const [showCam, setShowCam] = useState(false);

  const { userData, mutate, profilePictureMutate, isLoading } =
    useContext(userDataContext);

  const onImageUploadSuccess = (res) => {
    // console.log("ressss", res);
    mutate({
      profile_pic: res?.data?.id,
      profile_pic_verify: "pending",
      // steps_completed: step,
    });
  };

  const handleUploadToS3 = async (res) => {
    const file = new FormData();
    const base64Response = await fetch(url);
    const blob = await base64Response.blob();
    file.append("file", blob, "selfie-pic.png");

    // console.log("blooob", blob);
    uploadToS3(file);
  };

  // const { uploadToS3, s3IsLoading } = useReupload(
  //   "customer-profile",
  //   onImageUploadSuccess,
  //   undefined,
  //   false
  // );

  const { uploadToS3, s3IsLoading } = useReupload(
    "customer-profile",
    onImageUploadSuccess,
    undefined,
    undefined,
    undefined,
    false
  );

  const videoConstraints = {
    width: 200,
    facingMode: "user",
  };

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef?.current?.getScreenshot();

    setUrl(imageSrc);
  }, [webcamRef]);

  // console.log("Image url", url);

  return (
    <div className="fade-in">
      {showCam ? (
        <>
          {url ? (
            <>
              <div className="border w-[200px] h-[200px] rounded-[100px] mb-[27px] overflow-hidden">
                <AppImage
                  src={url}
                  className="object-cover w-full h-full"
                  alt="captured-image"
                />
              </div>
              <div className="flex gap-[10px]">
                <div className="flex justify-center w-full">
                  <AppButton
                    className={"text-[18px] font-bold px-[20px]"}
                    text={"Retake"}
                    variant={"redOutline"}
                    onClick={() => setUrl(null)}
                  />
                </div>
                <div className="flex justify-center w-full">
                  <AppButton
                    onClick={() => handleUploadToS3()}
                    isLoading={isLoading}
                    className={"text-[18px] font-bold px-[20px]"}
                    text={"Submit"}
                    variant={"red"}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  videoConstraints={videoConstraints}
                  mirrored={true}
                  screenshotFormat="image/png"
                  onUserMedia={(e) => {
                    setIsVideoOn(true);
                  }}
                  onUserMediaError={(e) => {
                    setCamErr(
                      "Grant camera permission inorder to capture the photo"
                    );
                    console.log("Error", e);
                  }}
                />
                {camErr ? (
                  <Text className={"mt-[10px] font-[500] text-appRed"}>
                    {camErr}
                  </Text>
                ) : null}
                <div
                  onClick={() =>
                    isVideoOn ? capturePhoto() : setShowCam(true)
                  }
                  className="flex bg-[#2B5CAB] cursor-pointer px-[20px] rounded-[34px] mt-[33px] mb-[27px] py-[10px] gap-[10px]"
                >
                  <AppImage
                    src={CameraIcon}
                    alt={"camera-icon"}
                    className="max-w-[20px]"
                  />
                  <Text className={"text-[#FFFFFF] text-[18px] font-bold"}>
                    {isVideoOn ? "Capture" : "Take a Selfie"}
                  </Text>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <AppImage
              src={SelfieIcon}
              alt={"selfie-icon"}
              className="max-w-[170px]"
            />
            <div
              onClick={() => {
                setShowCam(true);
              }}
              className="flex cursor-pointer bg-[#2B5CAB] px-[20px] rounded-[34px] mt-[33px] mb-[27px] py-[10px] gap-[10px]"
            >
              <AppImage
                src={CameraIcon}
                alt={"camera-icon"}
                className="max-w-[20px]"
              />
              <Text className={"text-[#FFFFFF] text-[18px] font-bold"}>
                Take a Selfie
              </Text>
            </div>
            {/* <AppTooltip className={"ml-[10px]"} comment={"Take a selfie to update kyc"} /> */}
          </div>
        </>
      )}
      {/* 
      {url ? (
        <div className="flex gap-[10px]">
          <div className="flex justify-center w-full">
            <AppButton
              className={"text-[18px] font-bold px-[20px]"}
              text={"Retake"}
              variant={"redOutline"}
              onClick={() => setUrl(null)}
            />
          </div>
          <div className="flex justify-center w-full">
            <AppButton
              className={"text-[18px] font-bold px-[20px]"}
              text={"Submit"}
              variant={"red"}
            />
          </div>
        </div>
      ) : null} */}
    </div>
  );
}

export default ReuploadProfilePic;
