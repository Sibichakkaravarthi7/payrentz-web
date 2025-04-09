"use client";

import Text from "@/components/Text/Text";
import React, { useEffect, useState } from "react";
import TotalSubscription from "./TotalSubscription";
import TotalInvoices from "./TotalInvoices";
import AppImage from "@/components/Image/AppImage";
import { DashboardCarousel, OfferTagIcon } from "@/Icons";
import TotalTickets from "./TotalTickets";
import AppButton from "@/components/Button/AppButton";
import AppLink from "@/components/Link/AppLink";
import useAppStore from "@/Store/Store";
import DashboardBanner from "./DashboardBanner";
import DashboardOffers from "./DashboardOffers";
import { getGreeting } from "@/utils/Constants";

function Dashboard() {
  const { user_data } = useAppStore();
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const today = new Date();

    setCurrentDate(today);
  }, []);

  const dayOfWeek = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  // console.log("userdata", user_data);
  return (
    <div className="md:pl-[14px]">
      <div className="pb-[30px] mt-[10px] md:mt-0">
        <Text className={"text-[28px] font-bold"}>
          {getGreeting()}, {user_data?.first_name}!
        </Text>
        {currentDate && (
          <>
            <Text
              className={"text-[12px] font-normal text-[#2D2D2D] mt-[10px]"}
            >
              {/* 11 January 2024, Thursday */}
              {currentDate.toDateString().slice(3)}, {dayOfWeek(currentDate)}
            </Text>
          </>
        )}
      </div>

      <DashboardBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
        <div className="flex flex-col gap-[20px]">
          <TotalSubscription />
          <TotalInvoices />
        </div>
        <DashboardOffers />
      </div>
      <TotalTickets />
    </div>
  );
}

export default Dashboard;
