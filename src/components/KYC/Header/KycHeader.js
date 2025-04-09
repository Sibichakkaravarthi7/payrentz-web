"use client";
import { PayrentzLogo, ProfileIcon } from "@/Icons";
import useAppStore from "@/Store/Store";
import { GET_REFRESH_API } from "@/api/urls/urls";
import AppImage from "@/components/Image/AppImage";
import AppLink from "@/components/Link/AppLink";
import Text from "@/components/Text/Text";
import { clearUserCookies } from "@/utils/Constants";
import makeGetRequest from "@/utils/makeGetRequest";
import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

const KycHeader = () => {
  const { user_data } = useAppStore();
  // console.log("user_data", user_data);
  const trimedData = user_data?.first_name?.substring(0, 8)?.concat("...");
  const { setUserDataAndToken, setLocation } = useAppStore();
  const router = useRouter();

  const { isLoading: refreshIsLoading } = useQuery(
    [GET_REFRESH_API],
    () => makeGetRequest(GET_REFRESH_API),
    {
      onSuccess: (res) => {
        setUserDataAndToken({
          user_data: res?.data,
          token: res?.data?.token,
          kyc_step_completed: res?.data?.kyc_step_completed,
        });
        setLocation({
          pincode: res?.data?.pincode,
          city: res?.data?.city,
        });
        if (res?.data?.is_lead) router.push("/");
        // console.log("is lead", res?.data?.is_lead);
      },
      onError: (err) => {
        // console.log("NAV REFRESH API FAILED", err);
        const errStatus = err?.response?.status;
        if ([403]?.includes(errStatus)) {
          clearUserCookies();
          router.push("/");
          window.location.reload();
        }
      },
      retry: 0,
    }
  );

  return (
    <div className="w-full sticky bg-[#F3F7FF] z-[10] top-0">
      <div className="flex justify-between max-w-[1332px] mx-auto px-[20px] py-[28px]">
        <AppImage src={PayrentzLogo} loading="lazy" />
        <AppLink link={"/dashboard"}>
          <div className="bg-appRed w-fit px-[15px] py-[6px] rounded-[20px] flex gap-[10px]">
            <AppImage src={ProfileIcon} loading="lazy" />
            <Text className={"text-sm font-bold text-white cursor-pointer"}>
              {user_data?.first_name?.length > 8
                ? trimedData
                : user_data?.first_name}
            </Text>
          </div>
        </AppLink>
      </div>
    </div>
  );
};

export default KycHeader;
