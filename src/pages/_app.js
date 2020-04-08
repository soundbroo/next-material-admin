import React from "react";
import { useRouter } from "next/router";

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
import { UserProvider } from "../context/UserContext";

import Layout from "../components/Layout/Layout";
import App from "../components/App";

const CustomApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const router = useRouter();
  const login = router.pathname === "/login";
  return (
    <LayoutProvider>
      <UserProvider>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={themes.mui}>
            <CssBaseline />
            <ThemeProvider theme={themes.styled}>
              {!login ? (
                <Layout>
                  <App>
                    <Component {...pageProps} />
                  </App>
                </Layout>
              ) : (
                <App>
                  <Component {...pageProps} />
                </App>
              )}
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </UserProvider>
    </LayoutProvider>
  );
};

export default CustomApp;
