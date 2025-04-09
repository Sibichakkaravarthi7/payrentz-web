import {
  BlackSubscriptionIcon,
  RedArrowIcon,
  SubscriptionIcon,
  TicketBlackIcon,
} from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import Text from "@/components/Text/Text";
import React from "react";
import SubscriptionCarousel from "./SubscriptionCarousel";
import AppLink from "@/components/Link/AppLink";
import makeGetRequest from "@/utils/makeGetRequest";
import { GET_USER_RECENT_TICKETS } from "@/api/urls/urls";
import { useQuery } from "react-query";
import moment from "moment";
import TicketsTable from "./TicketsTable";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import MobileSupportTickets from "../Support/MobileSupportTickets";
import { SET_TICKET_VIEW_PAGE, formatDate } from "@/utils/Constants";
import { useRouter } from "next/navigation";

function TotalTickets() {
  const router = useRouter();
  const { data: ticketsList, isLoading: ticketsIsLoading } = useQuery(
    [GET_USER_RECENT_TICKETS],
    () => makeGetRequest(GET_USER_RECENT_TICKETS, {}),
    {
      onSuccess: (res) => {
        console.log("ticket data", res);
      },
    }
  );

  const showTag = {
    status: {
      closed: "green",
      open: "red",
      "in progress": "yellow",
    },
  };

  const ticketDetails = [
    {
      title: "Washing Machine (6Kg) - Delivery",
      status: "Open",
      ticket_id: "DELI1001",
      assignee: "Operations",
      created_on: "30-01-2024",
    },
  ];

  const handleTicketClick = (ticket) => {
    // setSelectedTicket(ticket);
    router.push(SET_TICKET_VIEW_PAGE(ticket?.uuid));
    // console.log("selectedTicket", ticket);
  };

  function getKeysFromData(data) {
    if (!data || data.length === 0) {
      return [];
    }
    const firstItem = data[0];
    const keys = Object.keys(firstItem);

    return keys;
  }

  const allTicketsDetails = getKeysFromData(ticketDetails);

  function convertTimestampToFormat(inputTimestamp) {
    const date = new Date(inputTimestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  // console.log(
  //   "before converted dateeeeeeeeee",
  //   ticketsList?.data?.results?.created
  // );

  // console.log(
  //   "converted dateeeee in momentttt",
  //   convertTimestampToFormat(ticketsList?.data?.results?.created)
  // );

  // console.log("created", createdDate);
  // // Calculate the difference in words
  // const resultString = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <div className="bg-[#FFFFFF] mt-[13px] shadow-md rounded-[10px] pb-[33px]">
      <div className="flex items-center justify-between gap-[10px] pl-[25px] pb-[20px] pr-[21px] border-b-2 pt-[21px]">
        <div className="flex items-center gap-[10px]">
          <AppImage src={TicketBlackIcon} alt="ticket-icon" />
          <Text className={"font-bold"}>Tickets</Text>
        </div>
        {ticketsList?.data?.count > 0 ? (
          <>
            <AppLink link={"/dashboard/support/"}>
              <div className="flex gap-[10px] items-center justify-end cursor-pointer">
                <Text className={"text-[#ED1F28] text-[12px] font-medium"}>
                  View All Tickets
                </Text>
                <div className="bg-[#ED1F28] bg-opacity-[0.1] rounded-[50%] p-[5px]">
                  <AppImage src={RedArrowIcon} alt="arrow-icon" />
                </div>
              </div>
            </AppLink>
          </>
        ) : null}
      </div>
      <LoaderLayout
        height={10}
        isLoading={ticketsIsLoading}
        wrapperClassname={"py-[20px]"}
      >
        {ticketsList?.data?.count > 0 ? (
          <>
            {/* {ticketsList?.data?.results?.map((item, index) => (
            <div
              key={index}
              className="pt-[22px] border-b-2 ml-[25px] mr-[25px] pb-[22px]"
            >
              <div className="flex items-center justify-center md:justify-between">
                <div
                  key={index}
                  className="flex items-center gap-[10px] md:gap-[60px]"
                >
                  <div className="flex items-center gap-[10px] md:gap-[22px]">
                    <Text
                      className={
                        "text-[#1D1D1D] text-[10px] md:text-[16px] font-medium"
                      }
                    >
                      {item?.identity}
                    </Text>
                    <Text className={"text-[10px] md:text-[16px]"}>
                      {item?.ticket_status}
                    </Text>
                  </div>
                  <div className="flex items-center gap-[10px] md:gap-[22px]">
                    <Text
                      className={
                        "text-[#858585] font-normal text-[8px] md:text-[10px]"
                      }
                    >
                      Ticket ID: {item?.auto_ticket_id}
                    </Text>
                    <Text
                      className={
                        "text-[#858585] font-normal text-[8px] md:text-[10px]"
                      }
                    >
                      Assigned: {item?.assign_operator || "-"}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-[10px] md:gap-[29px]">
                  <Text
                    className={
                      "text-[#858585] font-normal text-[8px] md:text-[10px]"
                    }
                  >
                    {resultString}
                  </Text>
                  <Text
                    className={
                      "text-[#ED1F28] font-medium cursor-pointer text-[10px] md:text-[12px]"
                    }
                  >
                    View
                  </Text>
                </div>
              </div>
            </div>
          ))} */}
            <div className="md:hidden mt-[10px] px-[10px]">
              <MobileSupportTickets
                data={ticketsList?.data?.results?.map((m, ind) => ({
                  s_no: ind + 1 || "-",
                  ticket_id: m?.auto_ticket_id || "-",
                  title:
                    m?.subscription_detail?.variant_detail?.identity || "-",
                  type: m?.ticket_type || "-",
                  status: m?.ticket_status || "-",
                  inv_date: m?.created ? formatDate(m?.created) : "-",
                  closed_on: m?.closed_on || "-",
                  uuid: m?.uuid,
                }))}
                onTicketClick={handleTicketClick}
              />
            </div>
            <div className="hidden md:block">
              <TicketsTable
                showTag={showTag}
                columnHeaders={allTicketsDetails}
                onTicketClick={handleTicketClick}
                data={ticketsList?.data?.results?.map((m) => ({
                  title: m?.subscription_detail?.variant_detail?.identity,
                  type: m?.ticket_type || "-",
                  status: m?.ticket_status || "-",
                  ticket_id: m?.auto_ticket_id || "-",
                  uuid: m?.uuid,
                  assignee: m?.assign_ticket_detail?.identity || "-",
                  created: moment(m?.created)?.fromNow(),
                }))}
              />
            </div>
          </>
        ) : (
          <div className="pt-[20px] pl-[30px] pr-[33px]">
            <Text className={"text-[#858585] text-[12px]"}>
              No Tickets Found
            </Text>
          </div>
        )}
      </LoaderLayout>
    </div>
  );
}

export default TotalTickets;
