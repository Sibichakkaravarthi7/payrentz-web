import React, { useState } from "react";
import AppImage from "../../Image/AppImage";
import {
  CartIcon,
  LocationIcon,
  NotificationIcon,
  UserCircleBlueIcon,
} from "@/Icons";
import Text from "../../Text/Text";
import AppLink from "@/components/Link/AppLink";
import useAppStore from "@/Store/Store";
import NotificationModal from "../Dashboard/NotificationModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GET_APP_NOTIFICATIONS,
  POST_APP_NOTIFICATIONS_ALL_READ,
} from "@/api/urls/urls";
import makeGetRequest from "@/utils/makeGetRequest";
import AppTooltip from "@/components/Tooltip/AppTooltip";
import makePostRequest from "@/utils/makePostRequest";

function DashboardNavbar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (body) => makePostRequest(POST_APP_NOTIFICATIONS_ALL_READ, body),
    {
      onSuccess: (res) => {
        // console.log("resssssssss", res);
        queryClient.invalidateQueries({
          queryKey: [GET_APP_NOTIFICATIONS],
        });
      },
    }
  );

  const {
    data: notificationData,
    isLoading: isNotificationsLoading,
    refetch,
  } = useQuery(
    [GET_APP_NOTIFICATIONS],
    () => makeGetRequest(GET_APP_NOTIFICATIONS)
    // {
    //   onSuccess: (res) => {
    //     console.log("notifications dattatssd", res);
    //   },
    // }
  );

  // console.log("notificaaaaaationss", notificationData);
  const { city } = useAppStore();
  // console.log("city", city);
  return (
    <div className="hidden sticky top-0 z-[15] bg-[#EDEDED] md:flex justify-between items-center pb-[29px] pl-[7px] pt-[36px] pr-[48px]">
      <div className="flex py-[8px] cursor-pointer">
        <AppImage
          src={LocationIcon}
          alt="location-icon"
          className="w-[14px] h-[17px]"
        />
        <Text className={"text-[18px] font-bold ml-[7px]"}>{city}</Text>
      </div>
      <div className="flex">
        <div className="flex items-center justify-center relative cursor-pointer w-[35px] h-[35px] bg-[#FFFFFF] rounded-[50%]">
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
        {/* <AppLink link={"/cart"}>
          <div className="bg-[#FFFFFF] ml-[20px] cursor-pointer rounded-[5px] flex px-[15px] py-[8px]">
            <AppImage src={CartIcon} alt="cart-icon" />
            <Text className={"text-[18px] font-bold ml-[7px]"}>Cart</Text>
          </div>
        </AppLink> */}

        <AppLink link={"/dashboard/user-profile"}>
          <AppImage
            src={UserCircleBlueIcon}
            alt="user-logo"
            className="ml-[24px] cursor-pointer"
          />
        </AppLink>
      </div>
      <NotificationModal
        notificationData={notificationData}
        isNotificationsLoading={isNotificationsLoading}
        isNotificationOpen={isNotificationOpen}
        closeNotification={closeNotification}
        refetch={refetch}
        mutate={mutate}
      />
    </div>
  );
}

export default DashboardNavbar;
