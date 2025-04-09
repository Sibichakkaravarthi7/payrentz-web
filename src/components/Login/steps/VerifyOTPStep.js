import Text from "@/components/Text/Text";
import React, { useEffect, useState } from "react";
import LabelWrapper from "../LabelWrapper";
import AppButton from "@/components/Button/AppButton";
import AppInput from "@/components/Input/AppInput";
import AppImage from "@/components/Image/AppImage";
import { PenIcon } from "@/Icons";
import GoogleReCaptcha from "@/components/Thirdparty/GoogleReCaptcha";

const VerifyOTPStep = ({
  setStep,
  formData,
  setFormData,
  loading,
  resendOTP,
  handleValidateOTP,
  handleInputChange,
}) => {
  const [seconds, setSeconds] = useState(45);
  const [resendTimer, setResendTimer] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaErr, setCaptchaErr] = useState("");
  // const counter = useRef(45);

  const handleResetNumber = async () => {
    await resendOTP();
    setStep(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const editPhoneNumber = (
    <div className="flex items-center gap-[5px]">
      <Text
        className={"text-[#858585] text-[8px] md:text-[12px] font-medium"}
      >{`Sent to +91 ${formData?.phone}`}</Text>
      <AppImage
        className="cursor-pointer"
        onClick={() => setStep(0)}
        src={PenIcon}
        loading="lazy"
      />
    </div>
  );

  return (
    <div className="flex justify-center flex-col md:items-start items-center gap-[20px] md:gap-[30px]">
      <Text className={"font-bold text-[18px] md:text-[24px] text-appRed"}>
        Verify with OTP
      </Text>
      <div className="w-full">
        <LabelWrapper
          label={"Enter OTP"}
          className={"w-full"}
          secondaryLabel={editPhoneNumber}
        >
          <AppInput
            autoFocus={true}
            name={"otp"}
            className="!bg-white border border-[#E6E7E9] rounded-[5px]"
            placeholder={"Enter 6-digit OTP"}
            onChange={(e) => handleInputChange(e)}
            onKeyDownCapture={(e) =>
              e.key === "Enter" ? handleValidateOTP() : null
            }
          />
        </LabelWrapper>
        <Text
          className={
            "text-[#858585] text-[8px] md:text-[12px] font-medium mt-[6px] md:mt-[10px]"
          }
        >
          {seconds > 0 ? (
            `Resend OTP in ${"00:" + seconds}`
          ) : (
            <div
              className="cursor-pointer underline"
              onClick={async () => handleResetNumber()}
            >
              Resend OTP
            </div>
          )}
        </Text>
      </div>
      <GoogleReCaptcha
        setCaptchaValue={setCaptchaValue}
        error={captchaErr}
        setCaptchaErr={setCaptchaErr}
      />
      <AppButton
        wrapperClassName={"w-full md:w-fit"}
        className={"w-full"}
        text={"Submit"}
        variant={"red"}
        onClick={() => {
          captchaValue
            ? handleValidateOTP()
            : setCaptchaErr("Please verify you are not bot!!!");
        }}
        isLoading={loading}
        disabled={formData?.otp?.length != 6}
      />
    </div>
  );
};

export default VerifyOTPStep;
