import AppButton from "@/components/Button/AppButton";
import React, { useState } from "react";
import AppImage from "@/components/Image/AppImage";
import { TickIcon } from "@/Icons";
import Text from "@/components/Text/Text";
import VerifiedTag from "@/components/VerifiedTag";

function VerifyButton({ verified, handleClick, isLoading }) {
  return (
    <div>
      {!verified ? (
        <>
          <AppButton
            text={"Validate"}
            variant={"red"}
            onClick={() => handleClick()}
            isLoading={isLoading}
          />
        </>
      ) : (
        <VerifiedTag />
      )}
    </div>
  );
}

export default VerifyButton;
