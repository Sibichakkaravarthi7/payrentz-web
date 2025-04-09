"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function ReactQueryProvider({ children }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // staleTime: 0,
          retry: 2,
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
