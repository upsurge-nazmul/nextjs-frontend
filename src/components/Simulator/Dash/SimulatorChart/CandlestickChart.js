import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function ApexChart({ chartData, className }) {
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
          labels: {
            formatter: (value) => value.toFixed(2),
          },
          tooltip: { enabled: true },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
      },
    });
  }, [chartData]);

  return (
    <div id="chart" className={className}>
      {state && (
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="candlestick"
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
}

export default ApexChart;
