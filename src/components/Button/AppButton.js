import { Button } from "flowbite-react";
import React from "react";
import AppLink from "../Link/AppLink";
import AppImage from "../Image/AppImage";
import AppLoader from "../Loader/AppLoader";

const AppButton = ({
  text,
  color = "white",
  className,
  size = "",
  onClick = undefined,
  link,
  variant,
  icon,
  gapBtwIcon = "10px",
  wrapperClassName,
  disabled = false,
  isLoading,
  loaderSize = 10,
  target,
}) => {
  const btnVariant = {
    red: {
      background: "#ED1F28",
      color: "white",
    },
    redOutline: {
      border: "1px solid #ED1F28",
      color: "#ED1F28",
      background: "white",
    },
    blackOutline: {
      border: "1px solid #2D2D2D",
      color: "#2D2D2D",
      background: "white",
    },
    blue: {
      color: "white",
      background: "#2B5CAB",
    },
    white: {
      color: "black",
      background: "#FFFFFF",
      boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.06)",
    },
  };
  const btnVariantStyles = btnVariant[variant];

  const btn = (
    <>
      <button
        style={btnVariantStyles}
        className={`py-[8px] px-[15px] rounded-[5px] justify-center font-bold text-xs md:text-lg ${className} flex gap-[${gapBtwIcon}] items-center`}
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <div className="flex w-full">
            <span className=" w-[0px] invisible">.</span>
            <AppLoader color={color} size={loaderSize} />{" "}
          </div>
        ) : (
          <>
            {icon ? <AppImage src={icon} loading="lazy" alt="icon" /> : null}
            {text}
          </>
        )}
      </button>
    </>
  );

  if (link) {
    return (
      <AppLink target={target} link={link}>
        {btn}
      </AppLink>
    );
  }
  return (
    <div disabled={disabled} className={wrapperClassName}>
      {btn}
    </div>
  );
};

export default AppButton;
