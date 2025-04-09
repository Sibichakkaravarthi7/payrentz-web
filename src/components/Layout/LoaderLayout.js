import React from "react";
import AppLoader from "../Loader/AppLoader";

const LoaderLayout = ({ children, isLoading, height = 40, wrapperClassname }) => {
  return (
    <>
      {isLoading ? (
        <div className={`flex justify-center items-center h-[${height}vh] ${wrapperClassname}`}>
          <AppLoader />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoaderLayout;
