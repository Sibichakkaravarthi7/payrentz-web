import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Text from "@/components/Text/Text";
import AppLink from "@/components/Link/AppLink";

function TicketsTable({ data, showTag, columnHeaders, onTicketClick }) {
  const customizeView = (value, header) => {
    // console.log("value", value);

    if (showTag?.[header?.toLowerCase()]) {
      return returnAsTag(value, showTag?.[header]?.[value?.toLowerCase()]);
    }
    return value;
  };
  const returnAsTag = (value, color) => {
    return <p className={`${color}-app-tag mx-auto`}>{value}</p>;
  };

  return (
    <div className="overflow-x-auto w-auto">
      <Table hoverable>
        <TableHead className="text-[14px] hidden cursor-pointer text-center whitespace-nowrap text-[#374151] font-semibold">
          {columnHeaders?.map((header) => (
            <TableHeadCell key={header}>
              {header?.replace("_", " ")?.trim()}
            </TableHeadCell>
          ))}
        </TableHead>
        <TableBody className="divide-y cursor-pointer">
          {data?.map((item) => (
            <TableRow
              key={item?.id}
              id={item?.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {columnHeaders?.map((header) => (
                <TableCell
                  className="text-center whitespace-nowrap abcxdd"
                  key={header}
                >
                  {customizeView(item?.[header], header, item)}
                </TableCell>
              ))}
              <TableCell onClick={() => onTicketClick(item)}>
                <AppLink link={"/dashboard/support/view/ticket"}>
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
    </div>
  );
}

export default TicketsTable;
