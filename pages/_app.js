import Link from "next/link";
import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import "../styles/globals.css";

import ShopProvider from "../context/ShopContext";

import { ContentfulClient, ContentfulProvider } from 'react-contentful';

const contentfulClient = new ContentfulClient({
  accessToken: 'muPYGj2Owz5K_JLsoL0sabeHDyLwtCk3P6UBXAHn068',
  space: 's7bsoy8h4huv',
});

function MyApp({ Component, pageProps, articles}) {

  return (
    <ContentfulProvider client={contentfulClient}>
      <ShopProvider>
          <ThemeProvider theme={theme}>
            <Layout>
            <Component  {...pageProps} />
            </Layout>
          </ThemeProvider>
      </ShopProvider>
    </ContentfulProvider>
  );
}

export default MyApp;