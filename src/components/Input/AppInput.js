import { TextInput } from "flowbite-react";
import React from "react";
import Text from "../Text/Text";

const AppInput = ({
  type = "text",
  wrapperClassName = "",
  className = "",
  placeholder,
  isError,
  name,
  onChange,
  value,
  onEnterPress,
  onKeyDownCapture,
  isPhoneNumber,
  readOnly,
  prefixClassname,
  rawInput = false,
  ...others
}) => {
  const inputValue =
    type === "radio" || type === "checkbox" ? value : value?.[name];

  return (
    <div className={`app-input relative ${wrapperClassName}`}>
      {isPhoneNumber && (
        <div className={`absolute top-[40%] left-[10px] ${prefixClassname}`}>
          <Text className={"!text-[16px]"}>+91</Text>
        </div>
      )}{" "}
      <input
        readOnly={readOnly}
        onChange={onChange}
        value={rawInput ? value : inputValue}
        type={type}
        className={`w-full app-input ${className} ${
          isError?.[name] ? "show-input-error" : ""
        }`}
        name={name}
        placeholder={placeholder}
        {...others}
        onKeyDownCapture={onKeyDownCapture}
      />
      {isError?.[name] ? (
        <Text className={"text-appRed text-[8px] md:text-[12px] absolute"}>
          {isError?.[name]?.message || "Enter a valid data"}
        </Text>
      ) : null}
    </div>
  );
};

export default AppInput;
