import { PayrentzLogo } from "@/Icons";
import Image from "next/image";
import React from "react";

const AppImage = ({
  src,
  alt = "image",
  onClick,
  priority = false,
  ...others
}) => {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        {...others}
        onClick={onClick}
        priority={priority}
      />
    </>
  );
};

export default AppImage;
