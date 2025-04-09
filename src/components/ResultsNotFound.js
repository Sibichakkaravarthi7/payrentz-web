import React from "react";
import AppImage from "./Image/AppImage";
import { NoResults } from "@/Icons";
import Text from "./Text/Text";

const ResultsNotFound = () => {
  return (
    <div className="h-[50vh] flex justify-center items-center w-full">
      <div className="flex justify-center flex-col items-center gap-[9px] opacity-[40%]">
        <AppImage
          className="w-full max-w-[100px]"
          src={NoResults}
          loading="lazy"
          alt="no-results"
        />
        <Text className={"text-[18px] font-bold"}>No Results Found</Text>
      </div>
    </div>
  );
};

export default ResultsNotFound;
