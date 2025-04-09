import React from "react";

export const generateMetadata = (params) => ({
  title: "Blogs - PayRentz | Rental Tips & Insights",
  description:
    "Read expert insights and rental tips on home appliances, furniture, laptops, and fitness equipment. Stay informed with PayRentz blogs.",

  alternates: {
    canonical: `https://payrentz.com/blogs`,
  },

  robots: "index, follow",
});

const layout = ({ children }) => {
  return <div>{children}</div>;
};

export default layout;
