import { Line } from "react-chartjs-2";

export default function SimulatorChart({ simulatorData, width = "600px" }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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

  const labels = simulatorData.map((item, i) => `${i + 1}/04`);

  const data = {
    labels,
    datasets: [
      {
        label: simulatorData[0].Symbol,
        data: simulatorData.map((item) => item.Last),
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4, // this smoothen the curve
      },
    ],
  };
  return (
    <div style={{ height: "fit-content", width }}>
      <Line
        options={options}
        data={data}
        fallbackContent={"Something went wrong"}
      />
    </div>
  );
}
