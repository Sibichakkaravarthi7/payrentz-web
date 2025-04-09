import React from "react";

const Text = ({ as = "p", children, text = " ", className, ...others }) => {
  const childVal = children || text;
  if (as == "p")
    return (
      <p className={`lh-normal ${className}`} {...others}>
        {childVal}
      </p>
    );
  if (as == "h1")
    return (
      <h1 className={`lh-normal ${className}`} {...others}>
        {childVal}
      </h1>
    );
  if (as == "h2")
    return (
      <h2 className={`lh-normal ${className}`} {...others}>
        {childVal}
      </h2>
    );
  if (as == "h3")
    return (
      <h3 className={`lh-normal ${className}`} {...others}>
        {childVal}
      </h3>
    );
  if (as == "h4")
    return (
      <h4 className={`lh-normal ${className}`} {...others}>
        {childVal}
      </h4>
    );

  return <>Text</>;
};

export default Text;
