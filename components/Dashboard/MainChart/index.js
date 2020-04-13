import React, { useState, useEffect } from "react";
import { Select, OutlinedInput, MenuItem } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import useStyles from "components/Dashboard/styles";
import Widget from "components/Widget/";
import { Typography } from "components/Wrappers";
import Dot from "components/Dot";
import { getRandomData } from "utils/getRandomData";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  YAxis,
  XAxis
} from "recharts";

import HeaderLabel from "components/Dashboard/MainChart/HeaderLabel";

import useData from "hooks/useData";

const MainChart = () => {
  const classes = useStyles();
  const theme = useTheme();

  const {
    getMainChartData: getMainChartDataContext,
    setMainChartData
  } = useData();

  const [mainChartState, setMainChartState] = useState("monthly");

  const generateMainChartData = () => {
    const resultArray = [];
    const tablet = getRandomData(31, 3500, 6500, 7500, 1000);
    const desktop = getRandomData(31, 1500, 7500, 7500, 1500);
    const mobile = getRandomData(31, 1500, 7500, 7500, 1500);

    for (let i = 0; i < tablet.length; i++) {
      resultArray.push({
        tablet: tablet[i].value,
        desktop: desktop[i].value,
        mobile: mobile[i].value
      });
    }

    return resultArray;
  };

  useEffect(() => {
    setMainChartData(generateMainChartData());
  }, []);

  return (
    <Widget
      bodyClass={classes.mainChartBody}
      header={
        <div className={classes.mainChartHeader}>
          <Typography variant="h5" color="text" colorBrightness="secondary">
            Daily Line Chart
          </Typography>
          <div className={classes.mainChartHeaderLabels}>
            <HeaderLabel color="warning" label="Tablet" />
            <HeaderLabel color="primary" label="Mobile" />
            <HeaderLabel color="primary" label="Desktop" />
          </div>
          <Select
            autoWidth
            value={mainChartState}
            onChange={e => setMainChartState(e.target.value)}
            input={
              <OutlinedInput
                labelWidth={0}
                classes={{
                  notchedOutline: classes.mainChartSelectRoot,
                  input: classes.mainChartSelect
                }}
              />
            }
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </div>
      }
    >
      <ResponsiveContainer width="100%" minWidth={500} height={350}>
        <ComposedChart
          margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
          data={getMainChartDataContext()}
        >
          <YAxis
            ticks={[0, 2500, 5000, 7500]}
            tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
            stroke={theme.palette.text.hint + "80"}
            tickLine={false}
          />
          <XAxis
            tickFormatter={i => i + 1}
            tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
            stroke={theme.palette.text.hint + "80"}
            tickLine={false}
          />
          <Area
            type="natural"
            dataKey="desktop"
            fill={theme.palette.background.light}
            strokeWidth={0}
            activeDot={false}
          />
          <Line
            type="natural"
            dataKey="mobile"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
          <Line
            type="linear"
            dataKey="tablet"
            stroke={theme.palette.warning.main}
            strokeWidth={2}
            dot={{
              stroke: theme.palette.warning.dark,
              strokeWidth: 2,
              fill: theme.palette.warning.main
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Widget>
  );
};

export default MainChart;
