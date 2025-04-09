"use client";
import useAppStore from "@/Store/Store";
import {
  GET_PATCH_USER_DATA,
  GET_REFRESH_API,
  PATCH_USER_DATA,
} from "@/api/urls/urls";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import {
  SET_KYC_PATH,
  bankOptions,
  kycOptions,
  ownHouseDocOptions,
  parentsOptions,
  rentHouseDocOptions,
  selfEmployeeOptions,
} from "@/utils/Constants";
import makeGetRequest from "@/utils/makeGetRequest";
import makePatchRequest from "@/utils/makePatchRequest";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const KycContext = createContext();

const Layout = ({ children }) => {
  const { setUserDataAndToken } = useAppStore();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const step = parseInt(useParams()?.step);
  const router = useRouter();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const userToken = getCookie("user_token");
  //   if (!userToken) {
  //     router.push("/");
  //   }
  // }, []);

  const { isLoading, mutate } = useMutation(
    (body) => makePatchRequest(PATCH_USER_DATA, body),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: [GET_PATCH_USER_DATA] });
        // if (step > 1 && step <= 3) setStep("next");
        if (step == 4) {
          router.push("/kyc/success/");
        } else {
          setStep("next");
        }

        // console.log("response", res);
      },
      onError: (error) => {
        const firstErrKey = Object.keys(error?.response?.data?.data)?.[0];
        toast.error(
          error?.response?.data?.data?.[firstErrKey]?.[0] ||
            "Something went wrong"
        );
      },
    }
  );

  const { data, isLoading: initialIsLoading } = useQuery(
    [GET_PATCH_USER_DATA],
    () => makeGetRequest(GET_PATCH_USER_DATA),
    {
      onSuccess: (res) => {
        res.lift_availability = res?.lift_availability?.toString();
        res.phone_number = res?.phone_number?.slice(3);
        res.alternative_phone_number = res?.alternative_phone_number?.slice(3);
        res.parent_relationship = parentsOptions?.filter(
          (f) => f?.value == res?.parent_relationship
        )?.[0];
        res.parent_phone_number = res?.parent_phone_number?.slice(3);
        res.house_owner_mobile = res?.house_owner_mobile?.slice(3);
        res.own_house_proof_id_type = ownHouseDocOptions?.filter(
          (f) => f?.value == res?.own_house_proof_id_type
        )?.[0];
        res.rent_house_proof_id_type = rentHouseDocOptions?.filter(
          (f) => f?.value == res?.rent_house_proof_id_type
        )?.[0];
        res.bank_name = bankOptions?.filter(
          (f) => f?.value == res?.bank_name
        )?.[0];
        res.self_employee_id_type = selfEmployeeOptions?.filter(
          (f) => f?.value == res?.self_employee_id_type
        )?.[0];

        if (res?.kyc_type == "aadhaar") {
          res.kyc_type = "aadhaar";
        } else {
          res.kyc_type = kycOptions?.filter(
            (f) => f?.value == res?.kyc_type
          )?.[0];
        }

        // res.personal_whatsapp_enabled = res?.personal_whatsapp_enabled?.toString();
        // res.alternate_whatsapp_enabled = res?.alternate_whatsapp_enabled?.toString();

        setFormData(res);

        if (res?.steps_completed == 4) {
          router.push("/kyc/success/");
        } else {
          step > 1 && step <= 3;
          router.push(SET_KYC_PATH(res?.steps_completed + 1));
        }
      },
      onError: (err) => {
        const errStatus = err?.response?.status;
        if ([403]?.includes(errStatus)) router.push("/");
      },
    }
  );

  // console.log("formData", formData);

  const setStep = (type) => {
    if (type == "next")
      router.push(SET_KYC_PATH(step + 1), undefined, { shallow: true });
    if (type == "previous")
      router.push(SET_KYC_PATH(step - 1), undefined, { shallow: true });
  };

  const contextValue = {
    formData,
    setFormData,
    setStep,
    step,
    mutate,
    error,
    setError,
    isLoading,
  };

  return (
    <div>
      <KycContext.Provider value={contextValue}>
        <LoaderLayout height={80} isLoading={initialIsLoading}>
          {children}
        </LoaderLayout>
      </KycContext.Provider>
    </div>
  );
};

export default Layout;
