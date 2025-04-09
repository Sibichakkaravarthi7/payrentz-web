"use client";
import React from "react";
import AppImage from "../Image/AppImage";
import Text from "../Text/Text";
import AppButton from "../Button/AppButton";
import { useRouter } from "next/navigation";
import useModal from "@/utils/hooks/useModal";
import AppModal from "../Modal/AppModal";
import KycInstructionModal from "./KycInstructionModal";

const CommonSuccessComponent = ({
  img,
  title,
  description,
  btnText,
  onClick,
}) => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useModal();
  // console.log("onclick function", onClick);

  return (
    <div className="flex justify-center items-center h-[80vh] px-[10px] flex-col pb-[10px] md:pb-[20px]">
      <AppImage className="w-full max-w-[390px]" src={img} loading="lazy" />
      <Text
        className={
          "text-[25px] md:text-[30px] font-[700] mt-[25px] md:mt-[30px] text-center "
        }
      >
        {title}
      </Text>
      <Text
        className={
          "text-[17px] md:text-[20px] font-[700] text-[#858585] my-[10px] text-center "
        }
      >
        {description}
      </Text>
      <AppButton
        variant={"red"}
        text={btnText}
        onClick={() => (onClick == "/kyc/1" ? onOpen() : router.push(onClick))}
      />
      <AppModal
        maxWidth="50vw"
        className="modal-image-view-kyc p-[0px] md:pt-[0px] bg-[#302d2d]"
        bodyClassName="py-[0px] px-[0px] !h-[400px] bg-white relative shadow-2xl rounded-[10px]"
        isOpen={isOpen}
        onClose={onClose}
        dismissible={true}
      >
        <KycInstructionModal onClose={onClose} onClick={onClick} />
      </AppModal>
    </div>
  );
};

export default CommonSuccessComponent;
