"use client";

import {
  AirConditionerSquare,
  ImagePlaceholder,
  WashingMachineSquare,
} from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import React, { useState } from "react";
import AppDropdown from "../Dropdown";
import SubscriptionCard from "../SubscriptionCard";
import ClosedSubscriptionCard from "../ClosedSubscriptionCard";
import { useQuery } from "react-query";
import { USER_SUBSCRIPTION_DATA } from "@/api/urls/urls";
import makeGetRequest from "@/utils/makeGetRequest";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import { convertToPrice } from "@/utils/Constants";
import PaginationComponent from "../Invoices/PaginationComponent";

function Subscription() {
  const [tab, setTab] = useState("active");
  const [count, setCount] = useState({ active: 0, inactive: 0 });
  const [page, setPage] = useState(1);

  const { data: subList, isLoading: subIsLoading } = useQuery(
    [USER_SUBSCRIPTION_DATA, tab, page],
    () =>
      makeGetRequest(USER_SUBSCRIPTION_DATA, {
        status: tab,
        page,
      }),
    {
      onSuccess: (res) => {
        // console.log("subscription data", res?.data);
        setCount((prv) => ({ ...prv, [tab]: res?.data?.count }));
        // console.log("subscription stored data", count, tab);
      },
    }
  );

  // console.log("subList", subList?.data?.next, subList?.data?.previous);

  // const activeDetailsLength =
  //   subList?.data?.count > 0 ? subList?.data?.count : "0";

  // const closedDetailslength =
  // subList?.data?.count > 0 ? subList?.data?.count : "0";

  const activeDetailsLength = tab === "active" ? subList?.data?.count : "0";

  const closedDetailslength = tab === "inactive" ? subList?.data?.count : "0";

  const subscriptions = [
    {
      title: "Active Subscriptions",
      type: "active",
      category: ["Appliances", "Furnitures", "Fitness Equipments", "Pakages"],
      complaints: count?.active,
    },
    {
      title: "Closed Subsciptions",
      type: "inactive",
      complaints: count?.inactive,
    },
  ];

  const formatDateString = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    const option = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-us", option);
  };

  const handleClick = (type) => {
    // console.log("Clicked type:", type);
    setTab(type);
  };

  const activeSubscription = subscriptions?.find(
    (item) => item?.type == "active"
  );

  return (
    <div className="md:pl-[14px]">
      <Text className={"text-[28px] font-bold mt-[10px] md:mt-0 mb-[30px]"}>
        My Subscriptions
      </Text>
      <div className="flex gap-[41px] cursor-pointer border-b-2 border-[#DBDBDB]">
        {subscriptions?.map((item) => (
          <div
            key={item?.type}
            className={`flex gap-1 transition ease-in-out pb-[10px] border-b-[3px] duration-300 ${
              tab === item?.type ? "border-b-[3px] border-[#ED1F28]" : ""
            }`}
            onClick={() => handleClick(item?.type)}
          >
            <Text
              className={`font-normal transition ease-in-out text-[12px] md:text-[16px] text-[#858585] duration-300 ${
                tab === item?.type ? "font-semibold text-[#ED1F28]" : ""
              }`}
            >
              {item?.title}
            </Text>
            <div className="px-[6px] py-[3px] rounded-[1px] bg-[#DBDBDB] ">
              <Text className={"text-[12px] text-[#858585] font-normal"}>
                {item?.complaints || "0"}
              </Text>
            </div>
          </div>
        ))}
      </div>
      {/*  Table Body */}
      <div>
        <LoaderLayout height={50} isLoading={subIsLoading}>
          {subList?.data?.count > 0 ? (
            <div>
              {/* <div className="mt-[21px] cursor-pointer flex gap-[10px] md:gap-[20px]">
              {activeSubscription?.category?.map((category) => (
                <div
                  key={category}
                  className="bg-[#FFFFFF] py-[8px] whitespace-nowrap rounded-[33px] shadow-md px-[10px] md:px-[18px]"
                >
                  <Text className={"text-[10px] md:text-[12px] font-semibold"}>
                    {category}
                  </Text>
                </div>
              ))}
            </div> */}
              {subList?.data?.results?.map((item) => (
                <SubscriptionCard
                  key={item?.variant_detail?.id}
                  img={item?.variant_detail?.image_detail[0]?.file || ImagePlaceholder}
                  deposit={convertToPrice(item?.refundable_amount || 0)}
                  name={item?.variant_detail?.identity}
                  rent={
                    item?.rent_amount
                      ? convertToPrice(item?.rent_amount || 0)
                      : "-"
                  }
                  tenure={item?.tenure || "-"}
                  color={item?.product_detail?.color_of_product || "-"}
                  currentSub={item?.status}
                  productId={`${item?.product_detail?.payrentz_sl_no || "-"}`}
                  brandDetail={`${item?.product_detail?.brand_detail?.identity || "-"}`}
                  model={item?.product_detail?.brand_model || "-"}
                  // style={item?.style || "-"}
                />
              ))}
              <div>
        <PaginationComponent
          page={page}
          setPage={setPage}
          count={subList?.data?.count}
          next={subList?.data?.next}
          prv={subList?.data?.previous}
          countPerPage={24}
        />
      </div>
            </div>
          ) : (
            <div className="pt-[21px] pl-[30px] pr-[33px]">
              {tab === "active" ? (
                <>
                  <Text className={"text-[#858585] text-[16px]"}>
                    No Active subscriptions
                  </Text>
                </>
              ) : (
                <>
                  <Text className={"text-[#858585] text-[16px]"}>
                    No Closed subscriptions
                  </Text>
                </>
              )}
            </div>
          )}
        </LoaderLayout>
      </div>
    </div>
  );
}

export default Subscription;
