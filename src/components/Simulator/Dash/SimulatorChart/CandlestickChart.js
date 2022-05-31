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
            show: true,
            tools: {
              download: false,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: [],
            },
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
          custom: function ({ seriesIndex, dataPointIndex, w }) {
            const o = parseFloat(
              w.globals.seriesCandleO[seriesIndex][dataPointIndex]
            ).toFixed(2);
            const h = parseFloat(
              w.globals.seriesCandleH[seriesIndex][dataPointIndex]
            ).toFixed(2);
            const l = parseFloat(
              w.globals.seriesCandleL[seriesIndex][dataPointIndex]
            ).toFixed(2);
            const c = parseFloat(
              w.globals.seriesCandleC[seriesIndex][dataPointIndex]
            ).toFixed(2);
            return (
              '<div class="apexcharts-tooltip-candlestick" style="padding: 6px 10px">' +
              '<div>Open: <span class="value">' +
              o +
              "</span></div>" +
              '<div>High: <span class="value">' +
              h +
              "</span></div>" +
              '<div>Low: <span class="value">' +
              l +
              "</span></div>" +
              '<div>Close: <span class="value">' +
              c +
              "</span></div>" +
              "</div>"
            );
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
