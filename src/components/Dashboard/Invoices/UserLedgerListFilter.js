import AppDropdown from "@/components/Dashboard/Dropdown";
import AppInput from "@/components/Input/AppInput";
import AppSelect from "@/components/Select/AppSelect";
import Text from "@/components/Text/Text";
import { ledgerTypeOptions } from "@/utils/Constants";
import React, { useState } from "react";

function UserLedgerListFilter({ options, handleChange, minToDate, maxToDate, setMinToDate, setMaxToDate, setFilter, filter }) {
  

  const handleFromDateChange = (e) => {
    const fromDateValue = e?.target?.value;
    setMinToDate(fromDateValue);
  };

  const handleToDateChange = (e) => {
    const ToDateValue = e?.target?.value;
    setMaxToDate(ToDateValue);
  };

  
  return (
    <div className="mt-[20px] grid grid-cols-1 md:flex justify-between">
      <div className="grid grid-cols-1 md:flex items-center gap-[10px] md:gap-[20px]">
        <Text className={"font-semibold text-[10px] md:text-[16px]"}>
          Filter Ledger by:
        </Text>
        <div className="grid grid-cols-2 col-span-2 md:flex gap-[10px] items-center">
          <div className="col-span-1 flex gap-[10px] items-center">
            <Text className={"font-semibold text-[10px] md:text-[16px]"}>Date:</Text>
            <AppInput
              type="date"
              placeholder={"dd-mm-yy"}
              className="appinput-size-for-sm rounded-[33px] !px-[5px] border-0 bg-[#FFFFFF] shadow-md text-[#858585]  "
              onChange={(e) => handleFromDateChange(e)}
              value={minToDate}
            />
          </div>
          <div className="col-span-1 flex gap-[10px] items-center">
            <Text className={"font-semibold text-[10px] md:text-[16px]"}>to</Text>
            <AppInput
              type="date"
              placeholder={"dd-mm-yy"}
              className="appinput-size-for-sm rounded-[33px] !px-[5px] border-0 bg-[#FFFFFF] shadow-md text-[#858585]"
              min={minToDate}
              value={maxToDate}
              onChange={(e) => handleToDateChange(e)}
            />
          </div>
        </div>
        <div>
          <div className="flex gap-[9px] items-center md:ml-[46px]">
            <Text className={"font-semibold text-[10px] md:text-[16px]"}>Type:</Text>
            <AppSelect
              placeholder={"Select"}
              value={filter}
              className={"appinput-size-for-sm invoice-select"}
              classNamePrefix={"invoice"}
              options={ledgerTypeOptions}
              onChange={(e) => setFilter((p) => ({ ...p, ledgerType: e }))}
              name={"ledgerType"}
            />
          </div>
        </div>
        <AppDropdown options={options} selectedOption={options[0]?.label} />
      </div>
    </div>
  );
}

export default UserLedgerListFilter;
