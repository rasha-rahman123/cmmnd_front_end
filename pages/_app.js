import Link from "next/link";
import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import "../styles/globals.css";


import ShopProvider, { ShopContext } from "../context/ShopContext";
function MyApp({ Component, pageProps, articles}) {
  

  return (
    <ShopProvider>
      <ThemeProvider theme={theme}>
        <Layout>
        <Component  {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ShopProvider>
  );
}

export default MyApp;

