import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = ({
  chartData,
  className,
  colors = ["#17d1bc"],
  seriesName = "",
}) => {
  const [state, setState] = useState();

  useEffect(() => {
    setState({
      series: [
        {
          name: seriesName,
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
        dataLabels: {
          enabled: false,
          style: {
            colors: colors,
          },
        },
        markers: {
          size: 4,
          style: "hollow",
          colors: colors,
        },
        xaxis: {
          type: "datetime",
          // tickAmount: 6,
        },
        yaxis: {
          labels: {
            formatter: (value) => value.toFixed(2),
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
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
