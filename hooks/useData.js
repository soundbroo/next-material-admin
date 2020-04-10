import { useContext } from "react";
import { DataContext } from "context/data";

const useData = () => {
  const [data, setData] = useContext(DataContext);

  const getMainChartData = () => data.mainChart;
  const setMainChartData = (mainChartData) => {
    return setData({ ...data, mainChart: mainChartData });
  };

  return { getMainChartData, setMainChartData };
};

export default useData;
