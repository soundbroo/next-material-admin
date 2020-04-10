import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import nextCookie from "next-cookies";

import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@material-ui/core";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from "@material-ui/styles";

import themes from "themes";

import { syncLogout, logoutEffect } from "utils/auth";

import Header from "components/Header";

import { DataProvider } from "context/data";

const CustomApp = ({ Component, ctx }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  useEffect(() => {
    if (Router.pathname === "/") Router.push("/dashboard");
  }, []);

  useEffect(() => logoutEffect(syncLogout), []);

  const router = useRouter();

  const isLoginPage =
    typeof window !== undefined && router.pathname === "/login";

  return (
    <>
      <Head>
        <title>Next material admin</title>
      </Head>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={themes.mui}>
          <CssBaseline />
          <ThemeProvider theme={themes.styled}>
            <DataProvider>
              {!isLoginPage && <Header />}
              <Component {...ctx} />
            </DataProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </>
  );
};

CustomApp.getInitialProps = async ({ ctx }) => {
  const { token } = nextCookie(ctx);
  const { req, res } = ctx;
  const url = "/login";
  const redirect = (location) => {
    res.writeHead(302, { Location: location }).end();
    Head.rewind();
  };

  if (!process.browser) {
    if (!token && req.url !== url) redirect(url);
    if (req.url === "/") redirect("/dashboard");
  }
  return {};
};

export default CustomApp;
