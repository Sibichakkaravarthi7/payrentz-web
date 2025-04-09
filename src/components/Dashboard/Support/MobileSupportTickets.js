"use client";

import React from "react";
import { Accordion } from "flowbite-react";
import Text from "@/components/Text/Text";
import { convertToPrice, formatDate } from "@/utils/Constants";
import { DownloadIcon } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import { ClipLoader } from "react-spinners";
import AppLink from "@/components/Link/AppLink";
import PaginationComponent from "../Invoices/PaginationComponent";

function MobileSupportTickets({
  data,
  onTicketClick,
  page,
  next,
  count,
  prv,
  setPage,
  cancelFuncs,
}) {
  // console.log("dataaaaaaaasss", data);
  return (
    <div>
      {data?.map((i) => (
        <Accordion key={i?.id} className="bg-white shadow-sm" collapseAll>
          <Accordion.Panel>
            <Accordion.Title className="!py-3 text-[12px] accordion-title">
              <div className="grid grid-cols-4">
                <div>
                  <Text>{i?.ticket_id}</Text>
                </div>

                <div className="col-span-3 flex justify-end">
                  <Text className={"capitalize"}>
                    <span
                      className={
                        i?.status == "closed"
                          ? "bg-green-100 px-2 py-1 rounded"
                          : "bg-red-100 px-2 py-1 rounded"
                      }
                      style={{
                        color: i?.status == "closed" ? "green" : "red",
                        opacity: 0.7,
                      }}
                    >
                      {i?.status}
                    </span>
                  </Text>
                </div>
              </div>
            </Accordion.Title>
            <Accordion.Content className="text-[12px] text-[#CDCDCD] font-bold">
              <div className="flex flex-col gap-[10px]">
                <div className="grid grid-cols-2">
                  <Text>S.No :</Text>
                  <Text>{i?.s_no}</Text>
                </div>
                <div className="grid grid-cols-2">
                  <Text>Ticket ID :</Text>
                  <Text>{i?.ticket_id}</Text>
                </div>
                <div className="grid grid-cols-2">
                  <Text>Title :</Text>
                  <Text>{i?.title}</Text>
                </div>
                <div className="grid grid-cols-2">
                  <Text>Type :</Text>
                  <Text className={"capitalize"}>{i?.type}</Text>
                </div>
                {i?.id ? (
                  <div className="grid grid-cols-2">
                    <Text>Invoice ID :</Text>
                    <Text>{i?.id}</Text>
                  </div>
                ) : null}

                <div className="grid grid-cols-2">
                  <Text>Status :</Text>
                  <Text className={"capitalize"}>
                    <span
                      className={
                        i?.status === "closed"
                          ? "bg-green-100 px-2 py-1 rounded"
                          : "bg-red-100 px-2 py-1 rounded"
                      }
                      style={{
                        color: i?.status === "closed" ? "green" : "red",
                        opacity: 0.7,
                      }}
                    >
                      {i?.status}
                    </span>
                  </Text>
                </div>
                <div className="grid grid-cols-2">
                  <Text>Created On :</Text>
                  <Text>{i?.inv_date}</Text>
                </div>
                <div className="grid grid-cols-2">
                  <Text>Closed On :</Text>
                  <Text>{i?.closed_on}</Text>
                </div>
                {i?.amount ? (
                  <div className="flex justify-between">
                    <Text>Amount :</Text>
                    <Text>{i?.amount}</Text>
                  </div>
                ) : null}
                {i?.trans_date ? (
                  <div className="flex justify-between">
                    <Text>Transaction Date :</Text>
                    <Text>{i?.trans_date}</Text>
                  </div>
                ) : null}
                {i?.trans_id ? (
                  <div className="grid grid-cols-3">
                    <Text>Transaction ID :</Text>
                    <Text>{i?.trans_id}</Text>
                  </div>
                ) : null}

                <div className="flex gap-3 ml-[50%]">
                {onTicketClick ? (
                  <div
                    onClick={() => onTicketClick(i)}
                    className="flex justify-center"
                  >
                    <AppLink link={"/dashboard/support/view/ticket"}>
                      <Text
                        className={
                          "text-[#ED1F28] font-medium cursor-pointer text-[12px]"
                        }
                      >
                        View
                      </Text>
                    </AppLink>
                  </div>
                ) : null}
                {cancelFuncs ? (
                 !["closed","cancelled"]?.includes(i?.status) &&  <div
                    // onClick={() => console.log(i)}
                    onClick={() => cancelFuncs?.func(i)}
                    className="flex justify-center"
                  >
                    <div>
                      <Text
                        className={
                          "text-[#ED1F28] font-medium cursor-pointer text-[12px]"
                        }
                      >
                        {cancelFuncs?.text}
                      </Text>
                    </div>
                  </div>
                ) : null}
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      ))}
      {page ? (
        <div className="">
          <PaginationComponent
            countPerPage={24}
            page={page}
            setPage={setPage}
            count={count}
            next={next}
            prv={prv}
          />
        </div>
      ) : null}
    </div>
  );
}

export default MobileSupportTickets;
