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
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
        legendOffset: 50,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
