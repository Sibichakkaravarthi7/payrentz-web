import { BlackSubscriptionIcon, RedArrowIcon, SubscriptionIcon } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import React from "react";
import SubscriptionCarousel from "./SubscriptionCarousel";
import AppButton from "@/components/Button/AppButton";
import AppLink from "@/components/Link/AppLink";
import makeGetRequest from "@/utils/makeGetRequest";
import { GET_USER_RECENT_SUBSCRIPTIONS } from "@/api/urls/urls";
import { useQuery } from "react-query";
import LoaderLayout from "@/components/Layout/LoaderLayout";

function TotalSubscription() {
  const { data: subscriptionList, isLoading: subscriptionIsLoading } = useQuery(
    [GET_USER_RECENT_SUBSCRIPTIONS],
    () =>
      makeGetRequest(GET_USER_RECENT_SUBSCRIPTIONS, {
        // status: tab,
      }),
    {
      onSuccess: (res) => {
        console.log("subscription data", res);
      },
    }
  );

  const total = subscriptionList?.data?.count;

  return (
    <div className="bg-[#FFFFFF] shadow-md rounded-[10px] pb-[13px]">
      <div className="flex items-center gap-[10px] pl-[25px] pb-[20px] border-b-2 pt-[21px]">
        <AppImage src={BlackSubscriptionIcon} alt="subscription-icon" />
        <Text className={"font-bold"}>
          My Subscriptions ({total ? total : 0})
        </Text>
      </div>

      <LoaderLayout
        height={20}
        wrapperClassname={"py-[20px]"}
        isLoading={subscriptionIsLoading}
      >
        {total > 0 ? (
          <>
            <div className="pt-[20px] pl-[25px] pr-[33px]">
              <SubscriptionCarousel
                subscriptions={subscriptionList?.data?.results?.map((m) => ({
                  category: m?.variant_detail?.identity,
                  subCategory: m?.product_detail?.identity || "-",
                  subscriptionStatus: m?.status,
                }))}
              />
              <AppLink link={"/dashboard/subscriptions"}>
                <div className="flex gap-[10px] mt-[5px] items-center justify-end cursor-pointer">
                  <Text className={"text-[#ED1F28] text-[12px] font-medium"}>
                    View Subscriptions
                  </Text>
                  <div className="bg-[#ED1F28] bg-opacity-[0.1] rounded-[50%] p-[5px]">
                    <AppImage src={RedArrowIcon} alt="arrow-icon" />
                  </div>
                </div>
              </AppLink>
            </div>
          </>
        ) : (
          <div className="pt-[20px] pl-[30px] pr-[33px]">
            <Text className={"text-[#858585] text-[12px]"}>
              No subscriptions
            </Text>
          </div>
        )}
      </LoaderLayout>
    </div>
  );
}

export default TotalSubscription;
