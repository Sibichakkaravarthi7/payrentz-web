"use client";
import {
  CalendarIcon,
  LeftArrowIcon,
  TabWithPenIcon,
  WallpaperIcon,
} from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import React from "react";
import AddNotes from "./AddNotes";
import AppLink from "@/components/Link/AppLink";
import { useQuery } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import { GET_TICKET_BY_ID } from "@/api/urls/urls";
import moment from "moment";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import MobilePartnerDetails from "./MobilePartnerDetails";
import { formatDate } from "@/utils/Constants";

function IndividualTickets({ title, id, assignee, date }) {
  const { refetch, data, isLoading } = useQuery(
    [GET_TICKET_BY_ID(id)],
    () => makeGetRequest(GET_TICKET_BY_ID(id)),
    {
      onSuccess: (res) => {
        console.log("response data", res);
      },
    }
  );

  const ticketBtns = [
    // {
    //   icon: NotesIcon,
    //   alt: "notes-icon",
    //   title: "Add Note",
    // },
    {
      icon: CalendarIcon,
      alt: "calendar-icon",
      title: "Request Change Schedule",
    },
    // {
    //   icon: CancelIcon,
    //   alt: "cancel-icon",
    //   title: "Cancel Ticket",
    // },
    // {
    //   icon: ReportIcon,
    //   alt: "report-icon",
    //   title: "Report",
    // },
  ];

  function formatDateString(inputDateString) {
    const inputDate = new Date(inputDateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return inputDate.toLocaleString("en-IN", options);
  }

  const getDateAndTimeBasedOnTicketType = (type) => {
    const ticketType = data?.ticket_type;
    if (["delivery", "service", "relocation-delivery"]?.includes(ticketType)) {
      return type == "date" ? data?.schedule_date : data?.schedule_time;
    }

    if (["installation", "relocation-installation"]?.includes(ticketType)) {
      return type == "date"
        ? data?.schedule_installation_date
        : data?.schedule_installation_time;
    }

    if (["pickup"]?.includes(ticketType)) {
      return type == "date"
        ? data?.schedule_pickup_date
        : data?.schedule_pickup_time;
    }
  };

  function dateDifferenceInDays(date1, date2) {
    // Parse dates in the format dd-mm-yyyy
    var parts1 = date1.split("-");
    var parts2 = date2.split("-");
    var startDate = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    var endDate = new Date(parts2[2], parts2[1] - 1, parts2[0]);

    // Calculate the time difference in milliseconds
    var timeDifference = Math.abs(endDate.getTime() - startDate.getTime());

    // Convert the time difference from milliseconds to days
    var differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return differenceInDays;
  }

  return (
    <div className="mt-[19px] bg-[#FFFFFF] border border-[#E6E7E9] rounded-[5px] normal-variant-numeric">
      <LoaderLayout isLoading={isLoading} height={75}>
        <div className="flex flex-wrap px-[26px] mt-[22px] items-center gap-[10px]">
          <AppLink link={"/dashboard/support"}>
            <AppImage
              src={LeftArrowIcon}
              alt="left-arrow"
              className="w-[20px] h-[20px] mb-0"
            />
          </AppLink>

          {/* <div className="flex flex-wrap gap-[10px]">
            {ticketBtns?.map((items) => (
              <div
                key={items?.title}
                className="flex items-center cursor-pointer gap-[7px] px-[15px] py-[8px] border border-[#E4E6E8] rounded-[5px] shadow-md"
              >
                <AppImage
                  src={items?.icon}
                  alt={items?.alt}
                  className="w-[15px] h-[15px]"
                />
                <Text
                  className={
                    "text-[10px] md:text-[12px] text-[#1D1D1D] font-medium"
                  }
                >
                  {items?.title}
                </Text>
              </div>
            ))}
          </div> */}
        </div>
        <div className="pl-[26px] pr-[22px]">
          <div className="mt-[20px] md:flex grid grid-cols-1 gap-[10px] md:gap-0 justify-between">
            <div className="flex items-center gap-[5px] md:gap-[12px]">
              <Text
                className={
                  "text-[14px] md:text-[20px] font-semibold text-[#1D1D1D] capitalize"
                }
              >
                {`${
                  data?.subscription_detail?.variant_detail?.identity ||
                  data?.identity
                } - ${data?.ticket_type}`}
              </Text>
              <Text
                className={
                  "text-[10px] md:text-[12px] text-[#858585] font-medium"
                }
              >
                {data?.auto_ticket_id}
              </Text>
            </div>
            <Text
              className={
                "text-[10px] md:text-[12px] text-[#858585] font-medium"
              }
            >
              Run Time:{" "}
              {data?.ticket_status?.toLowerCase() == "open"
                ? moment(data?.created).fromNow()
                : dateDifferenceInDays(
                    formatDate(data?.created),
                    formatDate(data?.closed_on)
                  ) > 1
                ? dateDifferenceInDays(
                    formatDate(data?.created),
                    formatDate(data?.closed_on)
                  ) + " days"
                : dateDifferenceInDays(
                    formatDate(data?.created),
                    formatDate(data?.closed_on)
                  ) + " day"}
            </Text>
          </div>
          <div className="mt-[20px] pb-[14px] border-b-2 md:flex grid grid-cols-1 gap-[10px] md:gap-0 justify-between">
            <div className="flex items-center gap-[10px] md:gap-[30px]">
              <Text className={"text-[12px] text-[#858585] font-medium"}>
                Date & Time: {formatDateString(data?.created)}
              </Text>
              {data?.ticket_type !== "general-support" && (
                <Text className={"text-[12px] text-[#858585] font-medium"}>
                  Assignee: {assignee}
                </Text>
              )}
            </div>
            <Text
              className={`text-[12px] text-[#1D1D1D] font-medium capitalize `}
            >
              Ticket Status:
              <span
                className={`ml-[10px] ${
                  data?.ticket_status?.toLowerCase() == "open"
                    ? "red-app-tag"
                    : "green-app-tag"
                }`}
              >
                {data?.ticket_status}
              </span>
            </Text>
          </div>
          <div className="mt-[16px]">
            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className={"font-medium text-[#2D2D2D] !leading-[26px] mt-[30px]"}
            ></div>

            <div className="mt-[38px]">
              <Text
                className={
                  "text-[8px] md:text-[12px] text-[#000] !leading-[214.9%] font-medium"
                }
              >
                Note:
              </Text>
              <Text
                className={
                  "text-[8px] md:text-[12px] text-[#000] !leading-[214.9%] font-medium"
                }
              >
                {data?.notes}
              </Text>
            </div>
          </div>
          {data?.assign_service_partner_detail ? (
            <MobilePartnerDetails
              partnerName={data?.assign_service_partner_detail?.first_name}
              scheduledDate={getDateAndTimeBasedOnTicketType("date")}
              scheduledTime={getDateAndTimeBasedOnTicketType("time")}
              WallpaperIcon={WallpaperIcon}
              TabWithPenIcon={TabWithPenIcon}
            />
          ) : null}

          <AddNotes
            messageList={data?.admin_notes || []}
            ticketId={data?.id}
            refetch={refetch}
          />
        </div>
      </LoaderLayout>
    </div>
  );
}

export default IndividualTickets;
