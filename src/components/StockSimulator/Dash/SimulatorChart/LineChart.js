import { Line } from "react-chartjs-2";

export default function LineChart({ chartData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      A: {
        type: "linear",
        position: "right",
      },
    },
  };

  const labels = chartData.map((item, i) => `${i + 1}/04`);

  const data = {
    labels,
    datasets: [
      {
        label: chartData.length ? chartData[0].Symbol : "",
        data: chartData.map((item) => item.Last),
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0, // this smoothen the curve
      },
    ],
  };
  return (
    <Line
      options={options}
      data={data}
      fallbackContent={"Something went wrong"}
    />
  );
}
