"use client";

import React, { useState } from "react";
import {
  CartIcon,
  HamMenuIcon,
  NotificationIcon,
  PayrentzLogo,
  PayrentzWhiteRedLogo,
  ProfileIcon,
} from "@/Icons";
import Link from "next/link";
import AppContainer from "@/components/Container/AppContainer";
import AppImage from "@/components/Image/AppImage";
import AppLink from "@/components/Link/AppLink";
import AppButton from "@/components/Button/AppButton";
import MobileDashboardSidebar from "../DashboardSidebar/MobileDashboardSidebar";
import useAppStore from "@/Store/Store";
import Text from "@/components/Text/Text";
import NotificationModal from "../Dashboard/NotificationModal";
import { useQuery } from "react-query";
import { GET_APP_NOTIFICATIONS } from "@/api/urls/urls";
import makeGetRequest from "@/utils/makeGetRequest";

function MobDashboardNavbar({ dashboardData, active, onMenuClick }) {
  const { user_data } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const trimedData = user_data?.first_name?.substring(0, 8)?.concat("...");

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const { data: notificationData, isLoading: isNotificationsLoading } =
    useQuery(
      [GET_APP_NOTIFICATIONS],
      () => makeGetRequest(GET_APP_NOTIFICATIONS),
      {
        onSuccess: (res) => {
          console.log("notifications dattatssd", res);
        },
      }
    );

  return (
    <div className="bg-white block xl:hidden md:px-[19px] py-[20px]">
      <AppContainer>
        <div className="flex justify-between">
          <div className="flex gap-[18px] object-none">
            <AppImage
              src={HamMenuIcon}
              className="max-w-[114px] md:max-w-[122px]"
              onClick={() => setIsOpen(true)}
            />
            <AppLink link={"/"}>
              <AppImage
                src={PayrentzLogo}
                className="max-w-[114px] md:max-w-[122px] object-none"
              />
            </AppLink>
          </div>
          <div className="flex gap-[19px] items-center">
            <div className="flex items-center relative justify-center cursor-pointer w-[35px] h-[35px] bg-[#FFFFFF] rounded-[50%]">
              <AppImage
                src={NotificationIcon}
                alt="notification-icon"
                onClick={() => setIsNotificationOpen(true)}
              />
              <Text
            className={`notification-count ${
              notificationData?.data?.count === 0 ? "bg-gray" : "bg-appRed"
            }`}
          >
            {notificationData?.data?.count}
          </Text>
            </div>
            <AppLink link={"/dashboard/user-profile"}>
              <div className="bg-appRed w-fit px-[15px] py-[6px] rounded-[20px] flex gap-[10px]">
                <AppImage src={ProfileIcon} />
                <Text className={"text-sm font-bold text-white cursor-pointer"}>
                  {user_data?.first_name?.length > 8
                    ? trimedData
                    : user_data?.first_name}
                </Text>
              </div>
            </AppLink>
          </div>
        </div>
      </AppContainer>
      <NotificationModal
        isNotificationOpen={isNotificationOpen}
        closeNotification={closeNotification}
        notificationData={notificationData}
        isNotificationsLoading={isNotificationsLoading}
      />
      <MobileDashboardSidebar
        dashboardData={dashboardData}
        onMenuClick={onMenuClick}
        active={active}
        isOpen={isOpen}
        closeSidebar={closeSidebar}
      />
    </div>
  );
}

export default MobDashboardNavbar;
