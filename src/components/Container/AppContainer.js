import React from "react";

const AppContainer = ({ children, className = "" }) => {
  return (
    <div className={`max-w-[1332px] mx-auto px-[20px] ${className}`}>
      {children}
    </div>
  );
};

export default AppContainer;
