import React, { useState } from "react";
import Notifications from "./Notifications";
import AppImage from "@/components/Image/AppImage";
import { NoNotificationsIcon } from "@/Icons";
import Text from "@/components/Text/Text";
import LoaderLayout from "@/components/Layout/LoaderLayout";

function NotificationModal({
  isNotificationOpen,
  closeNotification,
  notificationData,
  isNotificationsLoading,
  refetch,
  mutate,
}) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleAllRead = () => {
    mutate({});
    // console.log("deleted data", notificationData);
  };

  return (
    <>
      {isNotificationOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#EDEDED] right-0 opacity-5"
            onClick={closeNotification}
          />
          <div
            className={`fixed bg-[#ffffff] w-[320px] h-[400px] overflow-scroll rounded-[10px] shadow-md top-[80px] right-[15px] notificationInOut ${
              isNotificationOpen
                ? "opacity-100 transform translate-y-[10px] z-[10] transition-transform duration-200 ease-in-out"
                : "opacity-0 transform translate-y-0"
            }`}
          >
            {notificationData?.data?.count > 0 ? (
              <>
                <div className="flex flex-col sticky top-[0px]">
                  <div className="p-[15px] flex justify-between items-center bg-[#ffffff] z-[10px] border-[#E5E5E5] border-b-2">
                    <Text className={"font-semibold text-[16px]"}>
                      Notifications
                    </Text>
                    <Text
                      className={"text-[#2B5CAB] text-[10px] cursor-pointer"}
                      onClick={() => handleAllRead()}
                    >
                      Mark all read
                    </Text>
                  </div>
                </div>
                {notificationData?.data?.results?.map((obj) => (
                  <Notifications obj={obj} key={obj?.id} />
                ))}
              </>
            ) : (
              <div className="flex flex-col h-full items-center justify-center gap-[10px]">
                <AppImage
                  src={NoNotificationsIcon}
                  alt="no-notifications-icon"
                  className="w-[50px] h-[50px] opacity-40"
                />
                <Text className={"opacity-40"}>No notifications yet</Text>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default NotificationModal;
