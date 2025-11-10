'use client';

import './styles/fonts.css';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
  <head>
    <title>LOLpedia</title>
    {/* Favicon */}
    <link rel="icon" href="/img/favicon.ico" />
    {/* Charset y meta tags básicos */}
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {/* Descripción para SEO */}
    <meta name="description" content="LOLpedia: guía interactiva de campeones de League of Legends" />
  </head>
  <body>
    {/* ChakraProvider aplica el tema a toda la app */}
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  </body>
</html>
  );
}