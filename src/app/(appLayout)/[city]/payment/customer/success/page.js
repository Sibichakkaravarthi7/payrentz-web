import { SuccessImage } from "@/Icons";
import CommonSuccessComponent from "@/components/successPage/CommonSuccessComponent";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonSuccessComponent
        img={SuccessImage}
        title={"Yay! Your payment is successful."}
        description={"Explore your dashboard for additional details"}
        btnText={"Go to Dashboard"}
        onClick={"/dashboard/"}
      />
    </div>
  );
};

export default page;
