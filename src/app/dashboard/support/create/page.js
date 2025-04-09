"use client";
import {
  GET_CREATE_TICKET_PRODUCT_DATA,
  GET_USER_TICKETS,
  POST_CREATE_TICKET_DATA,
} from "@/api/urls/urls";
import TicketCreation from "@/components/Dashboard/Support/TicketCreation";
import makeGetRequest from "@/utils/makeGetRequest";
import makePatchRequest from "@/utils/makePatchRequest";
import makePostRequest from "@/utils/makePostRequest";
import { useRouter } from "next/navigation";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const ticketCreateContext = createContext();

function Page() {
  const [ticketData, setTicketData] = useState();
  const [createdTicketData, setCreatedTicketData] = useState();
  const [error, setError] = useState();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading: initialIsLoading } = useQuery(
    [GET_CREATE_TICKET_PRODUCT_DATA],
    () => makeGetRequest(GET_CREATE_TICKET_PRODUCT_DATA),
    {
      onSuccess: (res) => {
        // console.log("create ticket", res);
        setTicketData(res);
      },
    }
  );

  const { mutate, isLoading: submitIsLoading } = useMutation(
    (body) => makePostRequest(POST_CREATE_TICKET_DATA, body),
    {
      onSuccess: (res) => {
        toast.success("Support Ticket Created Successfully!");
        queryClient.invalidateQueries({ queryKey: [GET_USER_TICKETS] });
        router.push("/dashboard/support/");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.data?.error);
      },
    }
  );

  // console.log("ticket data", ticketData);
  // console.log("created ticket data", createdTicketData);

  const ticketContextValue = {
    error,
    setError,
    ticketData,
    mutate,
    createdTicketData,
    setCreatedTicketData,
  };

  return (
    <div>
      <ticketCreateContext.Provider value={ticketContextValue}>
        <TicketCreation
          error={error}
          ticketData={ticketData}
          setError={setError}
          initialIsLoading={initialIsLoading}
          submitIsLoading={submitIsLoading}
        />
      </ticketCreateContext.Provider>
    </div>
  );
}

export default Page;
