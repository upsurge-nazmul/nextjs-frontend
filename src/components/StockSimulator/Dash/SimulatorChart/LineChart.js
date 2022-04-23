// import { Line } from "react-chartjs-2";
import { ResponsiveLine } from "@nivo/line";

// export default function LineChart({
//   chartData,
//   width = "600px",
//   height = "600px",
// }) {
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: false,
//         text: "Chart.js Line Chart",
//       },
//     },
//     scales: {
//       A: {
//         type: "linear",
//         position: "right",
//       },
//     },
//   };

//   const labels = chartData.map((item) => item.Date);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: chartData.length ? chartData[0].Symbol : "",
//         data: chartData.map((item) => item.Last),
//         fill: true,
//         borderColor: "rgb(53, 162, 235)",
//         backgroundColor: "rgba(53, 162, 235, 0.5)",
//         tension: 0, // this smoothen the curve
//       },
//     ],
//   };
//   return (
//     <div style={{ height, width }}>
//       <Line
//         options={options}
//         data={data}
//         fallbackContent={"Something went wrong"}
//       />
//     </div>
//   );
// }

export default function LineChart({ chartData }) {
  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 0, right: 0, bottom: 80, left: 80 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 12,
        tickPadding: 5,
        tickRotation: 28,
        legend: "Date",
        legendOffset: 70,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      pointSize={6}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      enableArea={true}
      areaBaselineValue={20}
      enableGridX={false}
      enableGridY={true}
      useMesh={true}
      legends={[]}
    />
  );
}
