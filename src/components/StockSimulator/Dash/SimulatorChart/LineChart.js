import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = ({ chartData, width = "600px", height = "600px" }) => {
  const [state, setState] = useState();
  const COLORS = ["#17d1bc"];

  useEffect(() => {
    setState({
      series: [
        {
          data: chartData,
        },
      ],
      options: {
        colors: COLORS,
        chart: {
          type: "area",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: COLORS,
          },
        },
        markers: {
          size: 4,
          style: "hollow",
          colors: COLORS,
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
          colors: COLORS,
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
    <div id="chart">
      {state && (
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default ApexChart;
