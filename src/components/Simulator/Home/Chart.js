import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = ({
  chartData,
  className,
  chartName = "",
  colors = ["#17d1bc"],
}) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState({
      series: [
        {
          name: chartName,
          data: chartData,
        },
      ],
      options: {
        colors: colors,
        chart: {
          type: "area",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "smooth",
          width: 1,
          lineCap: "butt",
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: colors,
          },
        },
        markers: {
          size: 0,
          style: "hollow",
          colors: colors,
        },
        xaxis: {
          show: false,
          type: "datetime",
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
          labels: {
            formatter: (value) => value.toFixed(2),
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        grid: {
          show: false,
        },
        fill: {
          type: "gradient",
          colors: colors,
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
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
          type="area"
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default ApexChart;
