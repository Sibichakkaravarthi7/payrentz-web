import React from "react";

export const generateMetadata = (params) => ({
  title: "Appliances Rental Packages",
  description:
    "Since most of us need and hire more than one appliance, PayRentz offers rental packages with huge benefits.",
  alternates: {
    canonical: `https://payrentz.com/${params?.params?.city}/combo`,
  },

  robots: "index, follow",
});

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
