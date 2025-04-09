"use client";
import React from "react";
import { BeatLoader } from "react-spinners";

const AppLoader = ({
  size = 15,
  color = "#2B5CAB",
}) => {
  return (
    <div className="flex justify-center items-center app-loader w-full">
      <BeatLoader size={size} color={color} />
    </div>
  );
};

export default AppLoader;
