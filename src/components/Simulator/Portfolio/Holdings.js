import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Holdings({ chartData, className }) {
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
          },
          legend: {
            position: "bottom",
            showForSingleSeries: true,
            horizontalAlign: "center",
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
