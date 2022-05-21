import { ResponsivePieCanvas } from "@nivo/pie";

export default function Holdings({ chartData, height = "200" }) {
  return (
    <ResponsivePieCanvas
      data={chartData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      valueFormat=" >-0.2f"
      innerRadius={0.55}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextOffset={3}
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsDiagonalLength={10}
      arcLinkLabelsStraightLength={12}
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[]}
      legends={[]}
      motionConfig={{
        mass: 1,
        tension: 170,
        friction: 26,
        clamp: true,
        precision: 0.01,
        velocity: 0,
      }}
      height={height}
    />
  );
}
