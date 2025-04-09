import { NotificationIcon } from "@/Icons";
import {
  GET_APP_NOTIFICATIONS,
  POST_APP_NOTIFICATIONS_STATUS,
} from "@/api/urls/urls";
import CloseButton from "@/components/CloseButton";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import makePostRequest from "@/utils/makePostRequest";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

function Notifications({ obj }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (body) => makePostRequest(POST_APP_NOTIFICATIONS_STATUS(obj?.id), body),
    {
      onSuccess: (res) => {
        // console.log("resssssssss", res);
        queryClient.invalidateQueries({
          queryKey: [GET_APP_NOTIFICATIONS],
        });
        // console.log("notificattions ddasdadasda", obj);
      },
    }
  );
  // console.log("notificattions ddasdadasda", obj);
  return (
    <>
      <div className="py-[10px] px-[10px] border-b-2 cursor-pointer border-[#E5E5E5] flex items-center gap-[15px]">
        <div className="p-[4px] border border-lightGray rounded-[50px]">
          <AppImage
            src={NotificationIcon}
            alt="notification-icon"
            className="w-[20px]"
          />
        </div>
        <div className="flex items-center w-full gap-[20px]">
          <Text className={"text-[11px] font-medium col-span-3"}>
            {obj?.message}
          </Text>

          <CloseButton
            height="11"
            width="11"
            onClick={() =>
              mutate({
                id: obj?.id,
              })
            }
          />
        </div>
      </div>
    </>
  );
}

export default Notifications;
