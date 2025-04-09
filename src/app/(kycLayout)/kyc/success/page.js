import { SuccessImage } from "@/Icons";
import CommonSuccessComponent from "@/components/successPage/CommonSuccessComponent";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonSuccessComponent
        img={SuccessImage}
        title={"Thanks for completing your KYC!"}
        description={
          "Your products will be delivered within 24 hours, after approval of KYC."
        }
        btnText={"Go to Dashboard"}
        onClick={"/dashboard"}
      />
    </div>
  );
};

export default page;
