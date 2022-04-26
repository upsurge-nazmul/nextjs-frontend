import LineChart from "./LineChart";
import CandlestickChart from "./CandlestickChart";
import { useEffect, useState } from "react";

export default function SimulatorChart({
  simulatorMonthlyData = [],
  chartMode,
  ChartModeOptions,
  width = "100%",
  height = "100%",
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
        let xAxisValue = item.date;
        closingValues.push({
          x: xAxisValue,
          y: item.close,
        });
      }
      setLineChartData([
        {
          id: "Close",
          color: "hsl(64, 70%, 50%)",
          data: closingValues,
        },
      ]);
    }
  }, [simulatorMonthlyData]);

  return (
    <div>
      {chartMode === ChartModeOptions[0] ? (
        <>
          {candlestickData && (
            <CandlestickChart
              chartData={candlestickData}
              width={width}
              height={height}
            />
          )}
        </>
      ) : chartMode === ChartModeOptions[1] ? (
        <>
          {lineChartData && (
            <div style={{ height, width }}>
              <LineChart chartData={lineChartData} />
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
