import { TickIcon } from "@/Icons";
import {
  GET_PATCH_USER_DATA,
  GET_REFRESH_API,
  POST_SEND_AADHAAR_OTP,
  POST_VERIFY_AADHAAR_OTP,
} from "@/api/urls/urls";
import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import AppInput from "@/components/Input/AppInput";
import Text from "@/components/Text/Text";
import VerifiedTag from "@/components/VerifiedTag";
import makePostRequest from "@/utils/makePostRequest";
import { makeRequest } from "@/utils/makeRequest";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

function ValidatAadhareOtp({
  formData,
  setError,
  verified,
  setDocVerify,
  disabled = false,
  isUserProfilePage = false,
}) {
  const [sendOtp, setSentOtp] = useState(verified);
  const [otp, setOtp] = useState("");
  const [validateOtp, setValidateOtp] = useState(false);
  const queryClient = useQueryClient();
  const [seconds, setSeconds] = useState(45);
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(true);

  const {
    isLoading: IsLoading,
    mutate,
    data,
  } = useMutation((body) => makePostRequest(POST_SEND_AADHAAR_OTP, body), {
    onSuccess: (res) => {
      setSentOtp(true);
    },
    onError: (err) => {
      // console.log("errr is ", err);
      toast.error(
        err?.response?.data?.data?.message ||
          err?.response?.data?.message ||
          "Something went wrong!"
      );
    },
  });

  const { isLoading: verifyIsLoading, mutate: verifyOtp } = useMutation(
    (body) => makePostRequest(POST_VERIFY_AADHAAR_OTP, body),
    {
      onSuccess: (res) => {
        if (isUserProfilePage) toast.success("KYC validated Successfully");
        setDocVerify((prv) => ({ ...prv, kyc_verification_status: true }));
        queryClient.invalidateQueries({ queryKey: [GET_PATCH_USER_DATA] });
        queryClient.invalidateQueries({ queryKey: [GET_REFRESH_API] });
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.data?.message ||
            err?.response?.data?.data ||
            "Something went wrong!" ||
            err?.response?.data?.message
        );
      },
    }
  );

  const handleVerifyAadhaar = () => {
    // console.log("aadhaar_number", formData?.kyc_number);
    if (formData?.kyc_number == null || formData?.kyc_number == "") {
      setError({
        kyc_number: { message: "Enter a valid value" },
      });
      return;
    } else {
      mutate({
        aadhaar_number: formData?.kyc_number,
      });
    }
  };

  const handleVerifyAadhaar1 = () => {
    // console.log("aadhaar_number", formData?.kyc_number);
    if (formData?.kyc_number == null || formData?.kyc_number == "") {
      setError({
        kyc_number: { message: "Enter a valid value" },
      });
      return;
    } else {
      setSended(false);
      mutate({
        aadhaar_number: formData?.kyc_number,
      });
    }
  };

  // console.log("verifieddd", verified);
  // console.log("sended", sended);

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

  return (
    <div>
      {!sendOtp ? (
        <>
          <AppButton
            disabled={disabled}
            text={"Get OTP"}
            variant={"red"}
            onClick={() => handleVerifyAadhaar()}
            isLoading={IsLoading}
          />
        </>
      ) : (
        <div>
          {!verified ? (
            <div className="flex items-center gap-[20px]">
              <div className="md:mt-[25px]">
                <AppInput
                  className="!text-[16px] border rounded-[5px] py-[12px] pl-[10px]"
                  type="input"
                  placeholder={"Enter OTP"}
                  name={"otp"}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Text
                  className={
                    "text-[#858585] text-[8px] md:text-[12px] font-medium mt-[6px] md:mt-[10px]"
                  }
                >
                  {seconds > 0 ? (
                    `Resend OTP in ${"00:" + seconds}`
                  ) : sended ? (
                    <div className="flex gap-[10px]">
                      <div className="cursor-pointer underline  ">
                        OTP Sent!
                      </div>
                      <div
                        className="cursor-pointer underline text-appBlue font-medium "
                        onClick={() => setSentOtp(false)}
                      >
                        Re Enter Aadhaar ?
                      </div>
                    </div>
                  ) : (
                    <div className="cursor-pointer underline">OTP Sent!</div>
                  )}
                </Text>
              </div>
              <AppButton
                text={"Validate OTP"}
                variant={"red"}
                className={"whitespace-nowrap"}
                onClick={() =>
                  verifyOtp({
                    aadhaar_number: formData?.kyc_number,
                    request_id: data?.data?.request_id,
                    otp: otp,
                  })
                }
                isLoading={verifyIsLoading}
                disabled={otp == ""}
              />
            </div>
          ) : (
            <VerifiedTag />
          )}
        </div>
      )}
    </div>
  );
}

export default ValidatAadhareOtp;
