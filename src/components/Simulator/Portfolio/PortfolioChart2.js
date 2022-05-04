import { ResponsiveLine } from "@nivo/line";

export default function LineChart({ chartData }) {
  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 12,
        tickPadding: 5,
        tickRotation: 28,
        legend: "Date",
        legendOffset: 40,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -55,
        legendPosition: "middle",
      }}
      pointSize={5}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={false}
      enableGridX={true}
      enableGridY={true}
      useMesh={true}
      legends={[]}
    />
  );
}
