import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { theme } from "@styles/theme";
import { SideBarDrawerProvider } from "@contexts/SidebarDrawerContext";
import { queryClient } from "@services/queryClient";
import { makeServer } from "@services/mirage";
import { AuthProvider } from "@contexts/AuthContext";

if (process.env.NODE_ENV === "development") {
  //makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SideBarDrawerProvider>
            <Component {...pageProps} />
          </SideBarDrawerProvider>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
