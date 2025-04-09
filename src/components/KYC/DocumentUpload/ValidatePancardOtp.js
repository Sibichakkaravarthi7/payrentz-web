import { TickIcon } from "@/Icons";
import {
  GET_CREDIT_REPORT,
  GET_PATCH_USER_DATA,
  GET_REFRESH_API,
  POST_SEND_PAN_OTP,
  POST_VERIFY_PAN,
} from "@/api/urls/urls";
import AppButton from "@/components/Button/AppButton";
import AppImage from "@/components/Image/AppImage";
import AppInput from "@/components/Input/AppInput";
import Text from "@/components/Text/Text";
import VerifiedTag from "@/components/VerifiedTag";
import makeGetRequest from "@/utils/makeGetRequest";
import makePostRequest from "@/utils/makePostRequest";
import { makeRequest } from "@/utils/makeRequest";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

function ValidatePancardOtp({
  formData,
  setError,
  verified,
  setDocVerify,
  disabled = false,
  isUserProfilePage = false,
  panName,
}) {
  console.log(verified);
  const [sendOtp, setSentOtp] = useState(verified);
  const [otp, setOtp] = useState("");
  const [validateOtp, setValidateOtp] = useState(false);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const [getCredit, setGetCredit] = useState(false);

  const { data: getCreditData, isLoading: getCreditIsLoading } = useQuery(
    [GET_CREDIT_REPORT],
    () => makeGetRequest(GET_CREDIT_REPORT),
    {
      onSuccess: (res) => {
        console.log("res", res);
      },
      onError: (err) => {
        console.log("err", err);
      },
      enabled: getCredit,
    }
  );

  const {
    isLoading: IsLoading,
    mutate,
    data,
  } = useMutation((body) => makePostRequest(POST_SEND_PAN_OTP, body), {
    onSuccess: (res) => {
      setSentOtp(true);
      console.log("res", res);
    },
    onError: (err) => {
      console.log("error", err);
      toast.error(
        err?.response?.data?.data?.message ||
          err?.response?.data?.message ||
          "Something went wrong!"
      );
    },
  });

  const { isLoading: verifyIsLoading, mutate: verifyOtp } = useMutation(
    (body) => makePostRequest(POST_VERIFY_PAN, body),
    {
      onSuccess: (res) => {
        setGetCredit(true);
        if (isUserProfilePage) toast.success("KYC validated Successfully");
        setDocVerify((prv) => ({ ...prv, credit_score_status: true }));
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

  const handleVerifyPancard = () => {
    // console.log("aadhaar_number", formData?._number);
    if (formData?.pan_id == null || formData?.pan_id == "") {
      setError({
        pan_id: { message: "Enter a valid value" },
        pan_name: { message: "Enter a valid value" },
      });
      return;
    } else {
      setSended(true);
      mutate({
        unique_id: formData?.pan_id,
        pan_name: panName || formData?.pan_name,
      });
    }
  };

  const handleVerifyPancard1 = () => {
    // console.log("aadhaar_number", formData?.kyc_number);
    if (formData?.pan_id == null || formData?.pan_id == "") {
      setError({
        pan_id: { message: "Enter a valid value" },
      });
      return;
    } else {
      mutate({
        pan_id: formData?.pan_id,
      });
    }
  };

  // console.log("verifieddd", verified);
  // console.log("sended", sended);

  return (
    <div>
      {!sendOtp ? (
        <>
          <AppButton
            disabled={disabled}
            text={"Get OTP"}
            variant={"red"}
            onClick={() => handleVerifyPancard()}
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
                  {sended ? (
                    <div className="flex gap-[10px]">
                      <div className="cursor-pointer underline  ">
                        OTP Sent!
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Text>
              </div>
              <AppButton
                text={"Validate OTP"}
                variant={"red"}
                className={"whitespace-nowrap"}
                onClick={() =>
                  verifyOtp({
                    otp: otp,
                    unique_id: formData?.pan_id,
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

export default ValidatePancardOtp;
