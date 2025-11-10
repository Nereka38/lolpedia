'use client';

import { Provider } from "@/components/ui/provider"
import './styles/fonts.css';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>LOLpedia</title>
         <link rel="icon" href="/img/logo-header.png" />
        <meta charSet="UTF-8" />
      </head>
      <body>
       <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}