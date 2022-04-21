import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function ApexChart({ chartData, width = "600px", height = "600px" }) {
  /**
     * Single data exampale:
     * {
            x: new Date(1538778600000),
            y: [6629.81, 6650.5, 6623.04, 6633.33],
        }
        Here, y: [open, heigh, low, close]
    */
  const [state, setState] = useState();

  useEffect(() => {
    setState({
      series: [
        {
          data: chartData,
        },
      ],
      options: {
        chart: {
          type: "candlestick",
          toolbar: {
            show: false,
          },
        },
        // title: {
        //   text: "CandleStick Chart",
        //   align: "left",
        // },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }, []);

  return (
    <div id="chart">
      {state && (
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="candlestick"
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

export default ApexChart;
