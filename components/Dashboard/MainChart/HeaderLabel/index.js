import React from "react";
import useStyles from "components/Dashboard/styles";
import { Typography } from "components/Wrappers";
import Dot from "components/Dot";

const HeaderLabel = ({ color, label }) => {
  const classes = useStyles();
  return (
    <div className={classes.mainChartHeaderLabel}>
      <Dot color="warning" />
      <Typography className={classes.mainChartLegentElement}>
        {label}
      </Typography>
    </div>
  );
};

export default HeaderLabel;
