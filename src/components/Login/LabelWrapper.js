import React from "react";
import Text from "../Text/Text";
import AppInput from "../Input/AppInput";
import AppLabel from "../Label/AppLabel";
import AppTooltip from "../Tooltip/AppTooltip";

const LabelWrapper = ({
  children,
  labelClassName,
  label,
  className,
  secondaryLabel,
  htmlFor,
  tooltipClassName,
  tooltipComment,
  isTooltipNeeded,
  wrapperClassName,
}) => {
  return (
    <div className={className}>
      <div className={`flex gap-[10px] items-center ${wrapperClassName}`}>
        <AppLabel
          htmlFor={htmlFor}
          className={`pb-[8px] md:pb-[9px] block  ${labelClassName}`}
          text={label}
        />

        {secondaryLabel ? secondaryLabel : null}
        {isTooltipNeeded ? <AppTooltip comment={tooltipComment} className={` ${tooltipClassName}`} /> : null}
        
      </div>

      {children}
    </div>
  );
};

export default LabelWrapper;
