import React from "react";
import Select from "react-select";
import Text from "../Text/Text";
import AppLabel from "../Label/AppLabel";

const AppSelect = ({
  readOnly = false,
  onChange,
  isMulti = false,
  dontAlterOptions,
  foreignKey,
  options,
  defaultValue,
  isRequired,
  name,
  placeholder,
  onInputChange,
  onFocus,
  isLoading,
  className,
  wrapperClassname,
  value,
  isError,
  normalValue = false,
  floorValue = false,
  labelClassName,
  label,
  ...restProps
}) => {
  const getOptions = () => {
    if (dontAlterOptions) return options;
    if (foreignKey) {
      const customOptions = options
        // ?.filter((f) => {
        // console.log(
        //   "fk",
        //   splitByDotgetOne(foreignKey, f),
        //   watch(foreignKey)?.value
        // );
        //   return splitByDotgetOne(foreignKey, f) == watch(foreignKey)?.value;
        // })
        ?.map((m) => ({ label: m?.identity, value: m?.id, ...m }));

      // console.log("customOptions", customOptions)
      return customOptions;
    }
    return options?.map((m) => ({ label: m?.identity, value: m?.id }));
  };

  return (
    <div className={`w-full max-w-[410px] relative ${wrapperClassname}`}>
      <AppLabel
        className={`absolute top-[-10px] ml-[10px] !text-[11px] md:!text-[13px] py-[1px] px-[5px] bg-white z-[1] ${labelClassName}`}
        text={label}
      />
      <Select
        defaultValue={defaultValue}
        isRequired={isRequired}
        name={name}
        options={getOptions()}
        isMulti={isMulti}
        placeholder={placeholder ?? "Select"}
        className={`w-full h-fit rounded-[5px] ${className} ${
          isError?.[name] ? "show-input-error" : ""
        }`}
        // required={isRequired}
        // chakraStyles={reactSelectStyles}
        onChange={onChange}
        onInputChange={onInputChange}
        onFocus={onFocus}
        errorBorderColor="red"
        isLoading={isLoading}
        isReadOnly={readOnly}
        isDisabled={readOnly}
        value={
          normalValue
            ? floorValue
              ? {
                  label: value > 3 ? 0 : Math.max(0, value),
                  value: value > 3 ? 0 : Math.max(0, value),
                }
              : value
            : value?.[name]
        }
        {...restProps}
      />
      {isError?.[name] ? (
        <Text className={"text-appRed text-[8px] md:text-[12px] absolute"}>
          {isError?.[name]?.message || "Enter a valid data"}
        </Text>
      ) : null}
    </div>
  );
};

export default AppSelect;
