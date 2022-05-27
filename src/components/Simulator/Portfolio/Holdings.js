import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { toIndianFormat } from "../../../helpers/currency";

export default function Holdings({
  chartData,
  className,
  legendPosition = "bottom",
}) {
  const [state, setState] = useState();

  useEffect(() => {
    if (chartData && chartData.length) {
      let data = [];
      let labels = [];

      for (let item of chartData) {
        data.push(item.amount);
        labels.push(item.name);
      }
      setState({
        series: data,
        options: {
          chart: {
            type: "donut",
          },
          labels: labels,
          dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
              return String(parseFloat(val).toFixed(2)) + "%";
            },
            textAnchor: "start",
            offsetX: 20,
            offsetY: -10,
            style: {
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "bold",
              // colors: ["#fff"],
            },
            // dropShadow: {
            //   enabled: false,
            //   top: 1,
            //   left: 1,
            //   blur: 1,
            //   color: "#000",
            //   opacity: 0.45,
            // },
          },
          legend: {
            show: true,
            position: legendPosition,
            showForSingleSeries: true,
            horizontalAlign: "center",
            labels: {
              colors: undefined,
              useSeriesColors: true,
            },
            // width: 100,
            formatter: function (val, opts) {
              return opts.w.config.labels[opts.seriesIndex];
              // + "₹" +
              // String(
              //   parseFloat(opts.w.config.series[opts.seriesIndex]).toFixed(2)
              // )
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          stroke: {
            show: false,
          },
          plotOptions: {
            pie: {
              offsetX: 0,
              offsetY: 0,
              dataLabels: {
                offset: 0,
                minAngleToShowLabel: 10,
              },
            },
          },
          tooltip: {
            y: {
              formatter: (v) => "₹" + toIndianFormat(parseFloat(v)),
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div id="chart" className={className}>
      {state && (
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
}
