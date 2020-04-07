import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";

// context
import { useUserState } from "../context/UserContext";

export default function App({ children }) {
  // global
  var { isAuthenticated } = useUserState();

  const router = useRouter();

  React.useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated && router.pathname === "/") {
      Router.push("/dashboard/Dashboard");
    }
    if (router.pathname === "/login/Login") {
      if (isAuthenticated) {
        Router.push("/dashboard/Dashboard");
      }
    }
    if (!isAuthenticated) {
      Router.push("/login/Login");
    }
  }, [isAuthenticated, router.pathname]);

  return <>{children}</>;
}
