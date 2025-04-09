import { Textarea } from "flowbite-react";
import React from "react";
import Text from "../Text/Text";

function AppTextarea({
  onChange,
  className,
  name,
  isError,
  placeholder,
  wrapperClassName = "",
  ...others
}) {
  return (
    <div className={wrapperClassName}>
      <Textarea
        onChange={onChange}
        className={`w-full app-textarea ${className} ${
          isError?.[name] ? "show-input-error" : ""
        }`}
        name={name}
        placeholder={placeholder}
        {...others}
      />
      {isError?.[name] ? (
        <Text className={"text-appRed text-[8px] md:text-[12px] absolute"}>
          {isError?.[name]?.message || "Enter a valid data"}
        </Text>
      ) : null}
    </div>
  );
}

export default AppTextarea;
