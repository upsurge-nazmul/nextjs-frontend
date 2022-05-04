import LineChart from "./LineChart";
import CandlestickChart from "./CandlestickChart";
import { useEffect, useState } from "react";

export default function SimulatorChart({
  simulatorMonthlyData = [],
  chartMode,
  ChartModeOptions,
  className,
}) {
  const [candlestickData, setCandlestickData] = useState();
  const [lineChartData, setLineChartData] = useState();

  useEffect(() => {
    // Format expected in Apexchart Candlestick: [open, heigh, low, close]
    if (simulatorMonthlyData && simulatorMonthlyData.length) {
      let values = [];
      for (let item of simulatorMonthlyData) {
        values.push({
          x: item.date,
          y: [item.open, item.high, item.low, item.close],
        });
      }
      setCandlestickData(values);
    }
  }, [simulatorMonthlyData]);

  useEffect(() => {
    if (simulatorMonthlyData && simulatorMonthlyData.length) {
      let closingValues = [];
      for (let item of simulatorMonthlyData) {
        let xAxisValue = new Date(item.date);
        closingValues.push({
          x: xAxisValue,
          y: parseFloat(item.close),
        });
      }
      setLineChartData(closingValues);
    }
  }, [simulatorMonthlyData]);

  return (
    <>
      {chartMode === ChartModeOptions[0] ? (
        <>
          {candlestickData && (
            <CandlestickChart
              chartData={candlestickData}
              className={className}
            />
          )}
        </>
      ) : chartMode === ChartModeOptions[1] ? (
        <>
          {lineChartData && (
            <LineChart chartData={lineChartData} className={className} />
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
