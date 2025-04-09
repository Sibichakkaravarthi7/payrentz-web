"use client";

import React from "react";
import { Accordion } from "flowbite-react";
import Text from "@/components/Text/Text";
import { convertToPrice, formatDate } from "@/utils/Constants";
import { DownloadIcon } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import { ClipLoader } from "react-spinners";
import AppLink from "@/components/Link/AppLink";
import PaginationComponent from "./PaginationComponent";

function MobileLedgersTable({
  data,
  invoiceDownloading,
  handleDownload,
  onTicketClick,
  page,
  next,
  count,
  prv,
  setPage,
  balance,
}) {
  // console.log("ledgerrrrrrr dataaattta", data)
  return (
    <div>
      {data?.map((i) => (
        <Accordion key={i?.id} className="bg-white shadow-sm" collapseAll>
          <Accordion.Panel>
            <Accordion.Title className="!py-3 text-[12px] accordion-title">
              <div className="grid grid-cols-3">
                {/* <div className="col-span-1"><Text>{i?.s_no}</Text></div> */}
                <div>
                  {i?.s_no ? (
                    <Text className={"capitalize"}>{i?.s_no}</Text>
                  ) : null}
                </div>
                {/* <Text>{i?.ticket_id}</Text> */}
                <div className="col-span-1  ">
                  {i?.amount ? <Text>{i?.amount}</Text> : null}
                </div>
                <div className="col-span-1">
                  <Text className={"capitalize"}>
                    <span
                      className={
                        i?.status == "credit"
                          ? "bg-green-100 px-2 py-1 rounded"
                          : "bg-red-100 px-2 py-1 rounded"
                      }
                      style={{
                        color: i?.status == "credit" ? "green" : "red",
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
                {i?.type ? (
                  <div className="grid grid-cols-2">
                    <Text>Type :</Text>
                    <Text className={"capitalize"}>{i?.type}</Text>
                  </div>
                ) : null}
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
                      className={`${
                        i?.status === "credit" ? "bg-green-100" : "bg-red-100"
                      } px-2 py-1 rounded`}
                      style={{
                        color: i?.status === "credit" ? "green" : "red",
                        opacity: 0.7,
                      }}
                    >
                      {i?.status}
                    </span>
                  </Text>
                </div>
                <div className="grid grid-cols-2">
                  <Text>Created On :</Text>
                  <Text>{i?.date}</Text>
                </div>
                {i?.amount ? (
                  <div className="grid grid-cols-2">
                    <Text>Amount :</Text>
                    <Text>{i?.amount}</Text>
                  </div>
                ) : null}
                {i?.trans_date ? (
                  <div className="grid grid-cols-2">
                    <Text>Transaction Date :</Text>
                    <Text>{i?.trans_date}</Text>
                  </div>
                ) : null}
                {i?.trans_id ? (
                  <div className="grid grid-cols-2">
                    <Text>Transaction ID :</Text>
                    <Text>{i?.trans_id}</Text>
                  </div>
                ) : null}
                {handleDownload ? (
                  <div
                    onClick={() => handleDownload(i)}
                    className="flex justify-center"
                  >
                    {invoiceDownloading == i?.["id"] ? (
                      <ClipLoader size={"12px"} color={"#2B5CAB"} />
                    ) : (
                      // <AppImage
                      //   src={DownloadIcon}
                      //   alt="download-icon"
                      //   className="cursor-pointer !w-[30px] !h-[30px]"
                      // />
                      <Text className={"text-[12px] text-[#2B5CAB] underline"}>
                        Download
                      </Text>
                    )}
                  </div>
                ) : null}
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
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      ))}
      <div className=" flex justify-center items-center bg-white shadow-sm rounded-md w-[99.5%] min-h-[40px] mt-[1px] ml-[2px]">
        <Text className={"text-center align-top"}>Total : {balance}</Text>
      </div>
      {page ? (
        <div>
          <PaginationComponent
            page={page}
            setPage={setPage}
            count={count}
            next={next}
            prv={prv}
            countPerPage={24}
          />
        </div>
      ) : null}
    </div>
  );
}

export default MobileLedgersTable;
