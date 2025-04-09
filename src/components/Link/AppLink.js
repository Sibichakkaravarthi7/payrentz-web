"use client";
import Link from "next/link";
import React from "react";

const AppLink = ({
  link,
  className,
  children,
  text,
  target,
  disabled = false,
  wrapperClassName = "wrapperClassName",
}) => {
  return (
    <span wrapperClassName={wrapperClassName}>
      {!disabled ? (
        <Link target={target} href={link} className={className}>
          {children || text}
        </Link>
      ) : (
        <>{children || text}</>
      )}
    </span>
  );
};

export default AppLink;
