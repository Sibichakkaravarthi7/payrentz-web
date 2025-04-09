"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ClientPathname = ({ setPathname }) => {
  const pathname = usePathname();

  useEffect(() => {
    setPathname(pathname);
  }, [pathname, setPathname]);

  return null;
};

export default ClientPathname;
