import React from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// styles
import useStyles from "../styles";

// components
import Widget from "../../Widget/Widget";
import { Typography } from "../../Wrappers/Wrappers";
import Dot from "../../Sidebar/components/Dot";

import { dashPieChartData } from "../../../constants";

import { getRandomData } from "../../../utils/getRandomData";

const SmallChart = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Widget
          title="Visits Today"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <div className={classes.visitsNumberContainer}>
            <Typography size="xl" weight="medium">
              12, 678
            </Typography>
            <LineChart
              width={55}
              height={30}
              data={[
                { value: 10 },
                { value: 15 },
                { value: 10 },
                { value: 17 },
                { value: 18 },
              ]}
              margin={{ left: theme.spacing(2) }}
            >
              <Line
                type="natural"
                dataKey="value"
                stroke={theme.palette.success.main}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </div>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography color="text" colorBrightness="secondary">
                Registrations
              </Typography>
              <Typography size="md">860</Typography>
            </Grid>
            <Grid item>
              <Typography color="text" colorBrightness="secondary">
                Sign Out
              </Typography>
              <Typography size="md">32</Typography>
            </Grid>
            <Grid item>
              <Typography color="text" colorBrightness="secondary">
                Rate
              </Typography>
              <Typography size="md">3.25%</Typography>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      <Grid item lg={3} md={8} sm={6} xs={12}>
        <Widget
          title="App Performance"
          upperTitle
          className={classes.card}
          bodyClass={classes.fullHeightBody}
        >
          <div className={classes.performanceLegendWrapper}>
            <div className={classes.legendElement}>
              <Dot color="warning" />
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.legendElementText}
              >
                Integration
              </Typography>
            </div>
            <div className={classes.legendElement}>
              <Dot color="primary" />
              <Typography
                color="text"
                colorBrightness="secondary"
                className={classes.legendElementText}
              >
                SDK
              </Typography>
            </div>
          </div>
          <div className={classes.progressSection}>
            <Typography
              size="md"
              color="text"
              colorBrightness="secondary"
              className={classes.progressSectionTitle}
            >
              Integration
            </Typography>
            <LinearProgress
              variant="determinate"
              value={30}
              classes={{ barColorPrimary: classes.progressBar }}
              className={classes.progress}
            />
          </div>
          <div>
            <Typography
              size="md"
              color="text"
              colorBrightness="secondary"
              className={classes.progressSectionTitle}
            >
              SDK
            </Typography>
            <LinearProgress
              variant="determinate"
              value={55}
              classes={{ barColorPrimary: classes.progressBar }}
              className={classes.progress}
            />
          </div>
        </Widget>
      </Grid>
      <Grid item lg={3} md={8} sm={6} xs={12}>
        <Widget
          title="Server Overview"
          upperTitle
          className={classes.card}
          bodyClass={classes.fullHeightBody}
        >
          <div className={classes.serverOverviewElement}>
            <Typography
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
            >
              60% / 37°С / 3.3 Ghz
            </Typography>
            <div className={classes.serverOverviewElementChartWrapper}>
              <ResponsiveContainer height={50} width="99%">
                <AreaChart data={getRandomData(10)}>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={theme.palette.secondary.main}
                    fill={theme.palette.secondary.light}
                    strokeWidth={2}
                    fillOpacity="0.25"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={classes.serverOverviewElement}>
            <Typography
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
            >
              54% / 31°С / 3.3 Ghz
            </Typography>
            <div className={classes.serverOverviewElementChartWrapper}>
              <ResponsiveContainer height={50} width="99%">
                <AreaChart data={getRandomData(10)}>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    fill={theme.palette.primary.light}
                    strokeWidth={2}
                    fillOpacity="0.25"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={classes.serverOverviewElement}>
            <Typography
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
            >
              57% / 21°С / 3.3 Ghz
            </Typography>
            <div className={classes.serverOverviewElementChartWrapper}>
              <ResponsiveContainer height={50} width="99%">
                <AreaChart data={getRandomData(10)}>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={theme.palette.warning.main}
                    fill={theme.palette.warning.light}
                    strokeWidth={2}
                    fillOpacity="0.25"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Widget title="Revenue Breakdown" upperTitle className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ResponsiveContainer width="100%" height={144}>
                <PieChart margin={{ left: theme.spacing(2) }}>
                  <Pie
                    data={dashPieChartData}
                    innerRadius={45}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {dashPieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={theme.palette[entry.color].main}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.pieChartLegendWrapper}>
                {dashPieChartData.map(({ name, value, color }, index) => (
                  <div key={color} className={classes.legendItemContainer}>
                    <Dot color={color} />
                    <Typography style={{ whiteSpace: "nowrap" }}>
                      &nbsp;{name}&nbsp;
                    </Typography>
                    <Typography color="text" colorBrightness="secondary">
                      &nbsp;{value}
                    </Typography>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
    </>
  );
};

export default SmallChart;
