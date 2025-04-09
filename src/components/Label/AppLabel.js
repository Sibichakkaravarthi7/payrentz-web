import React from "react";

const AppLabel = ({ children, text, className, htmlFor }) => {
  return (
    <>
      <label
        className={`text-[12px] md:text-[18px] font-[600] ${className}`}
        htmlFor={htmlFor}
      >
        {children || text}
      </label>
    </>
  );
};

export default AppLabel;
