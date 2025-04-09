"use client"
import { SuccessImage } from "@/Icons";
import AppModal from "@/components/Modal/AppModal";
import CommonSuccessComponent from "@/components/successPage/CommonSuccessComponent";
import useModal from "@/utils/hooks/useModal";
import React from "react";

const page = () => {
 
  return (
    <div>
      <CommonSuccessComponent
        img={SuccessImage}
        title={"Yay! Your payment is successful."}
        description={"Please complete your KYC to schedule delivery."}
        btnText={"Start your KYC"}
        onClick={"/kyc/1"}
      />
    </div>
  );
};

export default page;
