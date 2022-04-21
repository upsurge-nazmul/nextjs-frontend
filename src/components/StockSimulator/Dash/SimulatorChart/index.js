import LineChart from "./LineChart";
import CandlestickChart from "./CandlestickChart";

export default function SimulatorChart({
  simulatorMonthlyData = [],
  height = "fit-content",
  width = "600px",
}) {
  console.log("#########", simulatorMonthlyData);

  return (
    <div style={{ height, width }}>
      {/* <LineChart chartData={simulatorMonthlyData} /> */}
      <CandlestickChart />
    </div>
  );
}
