import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import AppImage from "../Image/AppImage";
import { DownloadIcon } from "@/Icons";
import { ClipLoader } from "react-spinners";
import { convertToPrice } from "@/utils/Constants";
import PaginationComponent from "./Invoices/PaginationComponent";

function InvoiceTable({
  columnHeaders,
  data,
  showTag,
  handleDownload,
  invoiceDownloading,
  isLedger = false,
  deposit = 0,
  balance = 0,
  page,
  setPage,
  count,
  next,
  prv,
}) {
  // console.log(data);
  // console.log(columnHeaders);

  const customizeView = (value, header, valueObject) => {
    if (showTag?.[header?.toLowerCase()]) {
      return returnAsTag(value, showTag?.[header]?.[value?.toLowerCase()]);
    }
    return value;
  };
  const returnAsTag = (value, color) => {
    return <p className={`${color}-app-tag mx-auto`}>{value}</p>;
  };

  return (
    <div className="overflow-x-auto mt-[21px] normal-variant-numeric">
      <Table hoverable>
        <TableHead className="text-[14px] text-center text-[#374151] font-semibold">
          {columnHeaders?.map((header) => (
            <TableHeadCell key={header}>
              {header?.replaceAll("_", " ")?.trim()}
            </TableHeadCell>
          ))}
          <TableHeadCell>
            <span className="sr-only">Download</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data?.map((item) => (
            <TableRow
              key={item?.id}
              id={item?.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {columnHeaders?.map((header) => (
                <TableCell
                  className="text-center px-[4px] py-[4px] md:px-6 md:py-4 abcxdd"
                  key={header}
                >
                  {customizeView(item?.[header], header, item)}
                </TableCell>
              ))}
              {handleDownload ? (
                <TableCell
                  onClick={() => handleDownload(item)}
                  className="px-[4px] py-[4px] md:px-6 md:py-4  cursor-pointer "
                >
                  {invoiceDownloading == item?.["inv_id"] ? (
                    <ClipLoader size={"12px"} color={"#2B5CAB"} />
                  ) : (
                    <AppImage
                      src={DownloadIcon}
                      alt="download-icon"
                      className="cursor-pointer mr-[30px] !w-[25px] !h-[25px] "
                      loading="lazy"
                    />
                  )}
                </TableCell>
              ) : (
                <TableCell></TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {isLedger ? (
            <TableRow className="bg-[#F9FAFB] dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={3}>
                TOTAL DEPOSIT:
                <span className="font-[500] text-black pl-[10px]">
                  {convertToPrice(deposit)}
                </span>
              </TableCell>
              <TableCell
                colSpan={2}
                className="font-bold text-[18px] text-black ml-[150px]"
              >
                TOTAL :
                <span className="font-[500] text-black pl-[10px]">
                  {convertToPrice(balance)}
                </span>
              </TableCell>

              {/* <TableCell></TableCell> */}
              {/* <TableCell className="text-center"></TableCell> */}
              <TableCell className="text-center">
                {/* {convertToPrice(balance)} */}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
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
    </div>
  );
}

export default InvoiceTable;
