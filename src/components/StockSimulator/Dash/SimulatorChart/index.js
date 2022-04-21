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
  const [lineChartData, setLineChartData] = useState();

  useEffect(() => {
    // Format expected in Apexchart Candlestick: [open, heigh, low, close]
    if (simulatorMonthlyData && simulatorMonthlyData.length) {
      let values = [];
      for (let item of simulatorMonthlyData) {
        values.push({
          x: item.Date,
          y: [item.Open, item.High, item.Low, item.Close],
        });
      }
      setCandlestickData(values);
    }
  }, [simulatorMonthlyData]);

  useEffect(() => {
    if (simulatorMonthlyData && simulatorMonthlyData.length) {
      let openingValues = [];
      let closingValues = [];
      let highValues = [];
      let lowValues = [];
      for (let item of simulatorMonthlyData) {
        let xAxisValue = item.Date;

        openingValues.push({
          x: xAxisValue,
          y: item.Open,
        });
        closingValues.push({
          x: xAxisValue,
          y: item.Close,
        });
        highValues.push({
          x: xAxisValue,
          y: item.High,
        });
        lowValues.push({
          x: xAxisValue,
          y: item.Low,
        });
      }
      setLineChartData([
        // {
        //   id: "Open",
        //   color: "hsl(309, 70%, 50%)",
        //   data: openingValues,
        // },
        {
          id: "Close",
          color: "hsl(64, 70%, 50%)",
          data: closingValues,
        },
        // {
        //   id: "High",
        //   color: "hsl(360, 70%, 50%)",
        //   data: highValues,
        // },
        // {
        //   id: "Low",
        //   color: "hsl(140, 70%, 50%)",
        //   data: lowValues,
        // },
      ]);
    }
  }, [simulatorMonthlyData]);

  return (
    <div className={styles.charts}>
      {chartMode === ChartModeOptions[0] ? (
        <>
          {candlestickData && <CandlestickChart chartData={candlestickData} />}
        </>
      ) : chartMode === ChartModeOptions[1] ? (
        <>{lineChartData && <LineChart chartData={lineChartData} />}</>
      ) : (
        ""
      )}
    </div>
  );
}
