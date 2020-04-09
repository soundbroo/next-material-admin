import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";

import { withAuthSync } from "../utils/auth";

const Main = (props) => <>{props.children}</>;

Main.getInitialProps = async (ctx) => {
  console.log("Main", ctx);
};

export default withAuthSync(Main);
