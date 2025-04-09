import AppImage from "@/components/Image/AppImage";
import React from "react";

const PaginationComponent = ({
  count = 0,
  next,
  prv,
  countPerPage = 28,
  page = 0,
  setPage,
}) => {
    // console.log("oiiiii", next, prv, count, page)
  const totalPages = Math.ceil(parseInt(count) / parseInt(countPerPage));
  const rightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="9"
      viewBox="0 0 6 9"
      fill="none"
    >
      <path
        d="M1 8.10938L4.55357 4.5558L1 1.00223"
        stroke="#1D273B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const leftIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="9"
      viewBox="0 0 6 9"
      fill="none"
    >
      <path
        d="M4.55469 1L1.00112 4.55357L4.55469 8.10714"
        stroke="#1D273B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <div className="flex justify-center mt-[34px] !text-[14px] font-[500]">
      <div className="flex">
        <div className="flex items-center">
          <span className="flex gap-[5px] items-center">
            <span
              onClick={() => prv && setPage((p) => p - 1)}
              className={` py-[2px] px-[9px] ${
                prv ? "opacity-[100%] cursor-pointer" : "opacity-[30%]"
              }`}
            >
              {leftIcon}
            </span>{" "}
            <span>Page</span>
          </span>
          <span className="py-[1px] px-[9px] bg-white rounded-[3px] mx-[5px] border border-[#61687629]">
            {page}
          </span>
        </div>

        <div className="flex items-center gap-[7px]">
          <span>{`of ${totalPages}`}</span>
          <span
            className={` py-[2px] px-[9px] ${
              next ? "opacity-[100%] cursor-pointer" : "opacity-[30%]"
            }`}
            onClick={() => next && setPage((p) => p + 1)}
          >
            {rightIcon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
