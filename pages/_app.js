import Link from "next/link";
import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import Router from 'next/router'
import { destroyCookie, parseCookies } from "nookies";
import { API_URL } from "../utils/urls";

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

