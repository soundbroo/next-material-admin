import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";

import fetch from "isomorphic-unfetch";
import { login } from "utils/auth";

import useStyles from "components/Login/styles";

import Logo from "images/logo.svg";

const Login = (props) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleLogin = async () => {
    const url = "/api/login";
    setIsLoading(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginValue, passwordValue }),
      });
      if (res.status === 200) {
        const { token } = await res.json();
        await login(token);
      } else {
        console.log("Login failed.");
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
      setIsLoading(false);
    } catch (error) {
      console.error("You have an error or there are Network issues", error);
      const { response } = error;
      setError(response ? response.statusText : error.message);
      setIsLoading(false);
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <Logo className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Material Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              Good Morning, User
            </Typography>
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                Something is wrong with your login or password :(
              </Typography>
            </Fade>
            <TextField
              id="login"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Name"
              type="login"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Password"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  className={classes.loginButton}
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={handleLogin}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              )}
            </div>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2014-2019 Flatlogic, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
};

export default Login;
