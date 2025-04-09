import React from "react";

function AppDropdown({ options, selectedOption, className }) {
  return (
    <select
      className={`${options?.classes} bg-[#FFFFFF] !text-[12px] rounded-[44px] shadow-md text-[#000000] border-0 ${className}`}
      value={selectedOption}
    >
      {options?.map((option, index) => (
        <option
          className="text-center p-0 text-[12px] font-medium"
          key={index}
          value={option?.value}
        >
          {option?.label}
        </option>
      ))}
    </select>
  );
}

export default AppDropdown;
