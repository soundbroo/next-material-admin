import Router from "next/router";
import cookie from "js-cookie";

export const login = (token) => {
  cookie.set("token", token, { expires: 7 });
  Router.push("/dashboard");
};

export const logout = () => {
  cookie.remove("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
};

export const syncLogout = (event) => {
  if (event.key === "logout") {
    console.log("logged out from storage!");
    Router.push("/login");
  }
};

export const logoutEffect = (syncLogout) => {
  window.addEventListener("storage", syncLogout);

  return () => {
    window.removeEventListener("storage", syncLogout);
    window.localStorage.removeItem("logout");
  };
};
