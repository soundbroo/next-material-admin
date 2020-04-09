import React, { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";

import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import themes from "../themes";

import { LayoutProvider } from "../context/LayoutContext";

import Main from "../components/Main";

import { withAuthSync } from "../utils/auth";

const CustomApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  useEffect(() => {
    if (Router.pathname === "/") Router.push("/dashboard");
  }, []);
  return (
    <>
      <Head>
        <title>Next material admin</title>
      </Head>
      <LayoutProvider>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={themes.mui}>
            <CssBaseline />
            <ThemeProvider theme={themes.styled}>
              <Main>
                <Component {...pageProps} />
              </Main>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </LayoutProvider>
    </>
  );
};

CustomApp.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  console.log("ctx", ctx);
  const url = "/api/profile";

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        Authorization: JSON.stringify({ token }),
      },
    });

    if (response.ok) {
      return;
    } else {
      return await redirectOnError();
    }
  } catch (error) {
    return redirectOnError();
  }
};

export default withAuthSync(CustomApp);
