import IndividualTickets from "@/components/Dashboard/Support/IndividualTickets";
import React from "react";

function page({ params }) {
  return (
    <div>
      <IndividualTickets id={params?.ticket} />
    </div>
  );
}

export default page;
