import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = ({ chartData, className }) => {
  const [state, setState] = useState();
  const COLORS = ["#17d1bc"];

  useEffect(() => {
    setState({
      series: [
        {
          name: "Closing Value",
          data: chartData,
        },
      ],
      options: {
        colors: COLORS,
        chart: {
          type: "area",
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
          y: {
            formatter: (v) => "₹" + String(parseFloat(v).toFixed(2)),
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
