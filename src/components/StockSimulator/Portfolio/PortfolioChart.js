import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = ({ chartData, width = "600px", height = "600px" }) => {
  const [state, setState] = useState();
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();

  useEffect(() => {
    setState({
      series: [
        {
          data: chartData,
        },
      ],
      options: {
        chart: {
          type: "area",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 4,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          min: new Date(minDate).getTime(),
          max: new Date(maxDate).getTime(),
          // tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },
    });
  }, [chartData, minDate, maxDate]);

  useEffect(() => {
    let y = new Date().getFullYear();
    let m = ("0" + (new Date().getMonth() + 1)).slice(-2);
    setMinDate(`${y}-${m}-01`);
    setMaxDate(`${y}-${m}-31`);
  }, []);

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
