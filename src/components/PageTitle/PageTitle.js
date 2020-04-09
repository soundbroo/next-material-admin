import React from "react";
import { Button } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

import { logout } from "../../utils/auth";

export default function PageTitle(props) {
  var classes = useStyles();
  const handleLogout = () => logout();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleLogout}
        >
          {props.button}
        </Button>
      )}
    </div>
  );
}
