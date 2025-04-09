import AppButton from "@/components/Button/AppButton";
import Text from "@/components/Text/Text";
import React from "react";
import AppDropdown from "../Dropdown";

function UserReceiptListFilters({ handleFilter, options, setFilter, filter }) {
  const filterList = [
    {
      text: "All Receipt",
      value: undefined,
    },

    {
      text: "Paid Receipt",
      value: true,
    },
    {
      text: "Unpaid Receipt",
      value: false,
    },
  ];
  return (
    <div className="mt-[20px] md:flex grid grid-cols-1 md:gap-0 gap-[10px] justify-between">
      <div className="flex items-center gap-[10px] md:gap-[20px]">
        <Text
          className={"font-semibold text-[12px] md:text-[16px] hidden md:block"}
        >
          Filter Receipts by:
        </Text>
        {filterList?.map((m) => (
          <AppButton
            key={m?.value}
            text={m?.text}
            variant={"white"}
            className={`transition ease-in-out duration-300 px-[10px] md:!px-[18px] !leading-[20px] !rounded-[25px] !text-[10px] md:!text-[12px] font-semibold ${
              filter?.is_paid == m?.value ? "invoice-tab-selected " : ""
            }`}
            onClick={() =>
              setFilter((p) => ({
                ...p,
                [m?.text === "Receipt" ? "receipt" : "is_paid"]: m?.value,
              }))
            }
          />
        ))}
      </div>
      <div className="flex justify-start md:justify-end">
        {/* <AppDropdown options={options} selectedOption={options[0]?.label} /> */}
      </div>
    </div>
  );
}

export default UserReceiptListFilters;
