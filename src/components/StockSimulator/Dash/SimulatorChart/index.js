import LineChart from "./LineChart";
import CandlestickChart from "./CandlestickChart";
import { useEffect, useState } from "react";

export default function SimulatorChart({
  simulatorMonthlyData = [],
  chartMode,
  ChartModeOptions,
  styles,
}) {
  const [candlestickData, setCandlestickData] = useState();

  useEffect(() => {
    // Format expected in Apexchart Candlestick: [open, heigh, low, close]
    if (simulatorMonthlyData && simulatorMonthlyData.length) {
      let values = [];
      for (let item of simulatorMonthlyData) {
        values.push({
          x: new Date(Math.random() * 1538879400000).toLocaleDateString(
            "en-US"
          ),
          y: [item.Open, item.High, item.Low, item.Close],
        });
      }
      setCandlestickData(values);
    }
  }, [simulatorMonthlyData]);

  return (
    <div className={styles.charts}>
      {chartMode === ChartModeOptions[0] ? (
        <>
          {candlestickData && <CandlestickChart chartData={candlestickData} />}
        </>
      ) : chartMode === ChartModeOptions[1] ? (
        <>
          {simulatorMonthlyData && (
            <LineChart chartData={simulatorMonthlyData} />
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
