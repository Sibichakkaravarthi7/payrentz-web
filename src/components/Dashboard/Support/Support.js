"use client";

import AppButton from "@/components/Button/AppButton";
import Text from "@/components/Text/Text";
import React, { useEffect, useState } from "react";
import SupportTable from "./SupportTable";
import { useRouter } from "next/navigation";
import IndividualTickets from "./IndividualTickets";
import { useMutation, useQuery } from "react-query";
import makeGetRequest from "@/utils/makeGetRequest";
import { GET_USER_TICKETS, POST_TICKET_CANCEL } from "@/api/urls/urls";
import LoaderLayout from "@/components/Layout/LoaderLayout";
import { SET_TICKET_VIEW_PAGE, formatDate } from "@/utils/Constants";
import MobileTicketTable from "../Invoices/MobileInvoicesTable";
import MobileSupportTickets from "./MobileSupportTickets";
import AppImage from "@/components/Image/AppImage";
import { NoInvoice } from "@/Icons";
import useModal from "@/utils/hooks/useModal";
import AppModal from "@/components/Modal/AppModal";
import { ButtonGroup } from "flowbite-react";
import makePostRequest from "@/utils/makePostRequest";
import LabelWrapper from "@/components/Login/LabelWrapper";
import AppTextarea from "@/components/Textarea/AppTextarea";
import toast from "react-hot-toast";

function Support() {
  const [tab, setTab] = useState("");
  const [count, setCount] = useState({ all: 0, open: 0, closed: 0 });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [cancelItem, setCancelItem] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const { onClose, onOpen, isOpen } = useModal();

  const {
    data: ticketList,
    isLoading: ticketIsLoading,
    refetch,
  } = useQuery(
    [GET_USER_TICKETS, tab, page],
    () =>
      makeGetRequest(GET_USER_TICKETS, {
        ticket_status: tab,
        page,
      }),
    {
      onSuccess: (res) => {
        // console.log("Ticketlist data", res);
        setCount((prv) => ({ ...prv, [tab]: res?.data?.count }));
        // console.log("ticket list stored stored data", count, tab);
      },
    }
  );

  const { isLoading: cancelIsLoading, mutate: cancelMutate } = useMutation(
    (body) => makePostRequest(POST_TICKET_CANCEL(cancelItem), body),
    {
      onSuccess: (res) => {
        toast.success("Support Ticket Cancelled Successfully");
        onClose();
        refetch();
        setCancelReason("");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.data?.error);

        onClose();
        refetch();
        setCancelReason("");
      },
    }
  );

  const supports = [
    {
      title: "All Tickets",
      type: "",
    },
    {
      title: "Open Tickets",
      type: "open",
    },
    {
      title: "Closed Tickets",
      type: "closed",
    },
  ];

  useEffect(() => {
    // console.log("filtered tickets", tab);
  }, [tab]);

  const handleClick = (type) => {
    // console.log("Clicked type:", type);
    setTab(type);
  };

  const handleTicketClick = (ticket) => {
    // setSelectedTicket(ticket);
    router.push(SET_TICKET_VIEW_PAGE(ticket?.uuid));
    // console.log("selectedTicket", ticket);
  };

  const handleCreatingTicket = () => {
    router.push("/dashboard/support/create");
  };

  const showTag = {
    status: {
      closed: "green",
      open: "red",
      "in progress": "yellow",
      cancelled: "green",
    },
  };

  const ticketDetails = [
    {
      "s. no.": 1,
      ticket_id: "DELI1001",
      title: "Washing Machine (6Kg) - Delivery",
      status: "Open",
      created_on: "30-01-2024",
      closed_on: "-",
    },
  ];

  function getKeysFromData(data) {
    if (!data || data.length === 0) {
      return [];
    }
    const firstItem = data[0];
    const keys = Object.keys(firstItem);

    return keys;
  }

  const allTicketsDetails = getKeysFromData(ticketDetails);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  const cancelFuncs = {
    text: "Cancel",
    func: (val) => {
      // console.log("cancel", val);
      setCancelItem(val?.id);
      onOpen();
    },
  };
  // console.log(cancelItem);
  // console.log(cancelReason?.length);

  const reasonSubmitting = () => {
    if (cancelReason?.length > 0) {
      cancelMutate({ cancel_ticket_reason: cancelReason });
    } else {
      toast.error("Enter Reason!");
    }
  };

  return (
    <div className="md:pl-[14px]">
      <div className="flex mt-[10px] justify-between">
        <Text className={"text-[28px] font-bold mb-[30px]"}>Support</Text>
        <AppButton
          text={"Create a New Ticket"}
          variant={"red"}
          className={""}
          onClick={() => handleCreatingTicket()}
        />
      </div>
      <div className="flex gap-[41px] cursor-pointer border-b-2 border-[#DBDBDB]">
        {supports?.map((item) => (
          <div
            key={item?.type}
            className={`transition ease-in-out duration-300  pb-[10px] border-b-[3px] ${
              tab === item?.type ? "border-b-[3px] border-[#ED1F28]" : ""
            }`}
            onClick={() => handleClick(item?.type)}
          >
            <Text
              className={`transition ease-in-out duration-300  font-normal text-[12px] md:text-[16px] text-[#858585] ${
                tab === item?.type ? "font-semibold text-[#ED1F28]" : ""
              }`}
            >
              {item?.title}
            </Text>
          </div>
        ))}
      </div>

      <LoaderLayout height={50} isLoading={ticketIsLoading}>
        {ticketList?.data?.count > 0 ? (
          <>
            <div className="md:hidden pt-[20px]">
              <MobileSupportTickets
                page={page}
                setPage={setPage}
                next={ticketList?.data?.next}
                prv={ticketList?.data?.previous}
                count={ticketList?.data?.count}
                data={ticketList?.data?.results?.map((m, ind) => ({
                  s_no: ind + 1 || "-",
                  ticket_id: m?.auto_ticket_id || "-",
                  title:
                    m?.subscription_detail?.variant_detail?.identity || "-",
                  type: m?.ticket_type || "-",
                  status: m?.ticket_status || "-",
                  inv_date: m?.created ? formatDate(m?.created) : "-",
                  closed_on: m?.closed_on ? formatDate(m?.closed_on) : "-",
                  uuid: m?.uuid,
                  id: m?.id,
                }))}
                cancelFuncs={cancelFuncs}
                onTicketClick={handleTicketClick}
              />
            </div>
            <div className="hidden md:block">
              <SupportTable
                showTag={showTag}
                page={page}
                setPage={setPage}
                next={ticketList?.data?.next}
                prv={ticketList?.data?.previous}
                count={ticketList?.data?.count}
                columnHeaders={allTicketsDetails}
                data={ticketList?.data?.results?.map((m, ind) => ({
                  "s. no.": ind + 1 || "-",
                  ticket_id: m?.auto_ticket_id || "-",
                  title: `${
                    m?.subscription_detail?.variant_detail?.identity ||
                    m?.identity
                  } - ${m?.ticket_type || "-"}`,
                  status: m?.ticket_status || "-",
                  created_on: m?.created ? formatDate(m?.created) : "-",
                  closed_on:
                    m?.ticket_status === "closed" && m?.closed_on
                      ? formatDate(m?.closed_on)
                      : "-",
                  uuid: m?.uuid,
                  id: m?.id,
                }))}
                // onTicketClick={handleTicketClick}
                cancelFuncs={cancelFuncs}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center pt-[30px] pl-[30px] pr-[33px]">
            <AppImage className="w-ful max-w-[150px]" src={NoInvoice} />
            <Text
              className={"text-[#BFBFBF] text-[16px] font-[500] text-center"}
            >
              No Tickets Found
            </Text>
          </div>
        )}
        <AppModal
          bodyClassName=" py-[20px] md:py-[28px] border min-h-[200px] rounded-[5px]"
          closeButton
          className="close-reasons-modal lg:min-w-[800px]"
          isOpen={isOpen}
          onClose={onClose}
        >
          <div className="mt-3">
            <LabelWrapper
              label={"Reasons *"}
              // className={"md:!max-w-[495px]"}
            >
              <AppTextarea
                name="reason"
                // isError={error}
                onChange={(e) => setCancelReason(e?.target?.value)}
                placeholder={"Enter the reason."}
                className="border ticket-input border-[#E6E7E9] min-h-[70px] rounded-[5px]"
              />
            </LabelWrapper>

            <div className="flex gap-[20px] mt-5 justify-end mr-[30px]">
              <AppButton
                // variant={"red"}
                onClick={() => onClose()}
                text={"Cancel"}
                className={"max-h-[35px] min-w-[65px]"}
              />
              <AppButton
                variant={"red"}
                onClick={() => reasonSubmitting()}
                text={"Submit"}
                className={"max-h-[35px] min-w-[65px]"}
                isLoading={cancelIsLoading}
              />
            </div>
          </div>
        </AppModal>
      </LoaderLayout>
    </div>
  );
}

export default Support;
