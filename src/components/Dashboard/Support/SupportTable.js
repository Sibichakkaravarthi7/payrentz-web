import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import AppLink from "@/components/Link/AppLink";
import Text from "@/components/Text/Text";
import PaginationComponent from "../Invoices/PaginationComponent";

function SupportTable({
  columnHeaders,
  data,
  showTag,
  // onTicketClick,
  page,
  setPage,
  next,
  prv,
  count,
  cancelFuncs,
}) {
  const customizeView = (value, header) => {
    if (showTag?.[header?.toLowerCase()]) {
      return returnAsTag(value, showTag?.[header]?.[value?.toLowerCase()]);
    }
    return value;
  };
  const returnAsTag = (value, color) => {
    return <p className={`${color}-app-tag mx-auto`}>{value}</p>;
  };
  return (
    <div className="overflow-x-auto mt-[21px]">
      <Table hoverable>
        <TableHead className="text-[14px] cursor-pointer text-center whitespace-nowrap text-[#374151] font-semibold">
          {columnHeaders?.map((header) => (
            <TableHeadCell key={header}>
              {header?.replace("_", " ")?.trim()}
            </TableHeadCell>
          ))}
          <TableHeadCell>
            <span className="sr-only">Close Ticket</span>
          </TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">View Ticket</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y cursor-pointer">
          {data?.map((item) => (
            <TableRow
              key={item?.id}
              id={item?.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              // onClick={() => onTicketClick(item)}
            >
              {columnHeaders?.map((header) => (
                <TableCell
                  className="text-center capitalize whitespace-nowrap abcxdd"
                  key={header}
                >
                  {customizeView(item?.[header], header, item)}
                </TableCell>
              ))}
              <TableCell>
                {!["closed", "cancelled"]?.includes(item?.status) && (
                  <div onClick={() => cancelFuncs?.func(item)}>
                    <Text
                      className={
                        "text-[#ED1F28] font-medium cursor-pointer text-[10px] md:text-[12px]"
                      }
                    >
                      {cancelFuncs?.text}
                    </Text>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <AppLink link={"/dashboard/support/view/" + item?.uuid}>
                  <Text
                    className={
                      "text-[#ED1F28] font-medium cursor-pointer text-[10px] md:text-[12px]"
                    }
                  >
                    View
                  </Text>
                </AppLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <PaginationComponent
          page={page}
          setPage={setPage}
          count={count}
          next={next}
          prv={prv}
        />
      </div>
    </div>
  );
}

export default SupportTable;
