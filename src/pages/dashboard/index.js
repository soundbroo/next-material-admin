import React from "react";
import { Grid } from "@material-ui/core";

// styles
import useStyles from "../../components/Dashboard/styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "../../components/Dashboard/Table";
import BigStat from "../../components/Dashboard/BigStat";
import MainChart from "../../components/Dashboard/MainChart";
import SmallChart from "../../components/Dashboard/SmallChart";

import { mock } from "../../constants";

const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      <PageTitle title="Dashboard" button="Logout" />
      <Grid container spacing={2}>
        <SmallChart />
        <Grid item xs={12}>
          <MainChart />
        </Grid>
        {mock.bigStat.map((stat) => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Widget
            title="Support Requests"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
