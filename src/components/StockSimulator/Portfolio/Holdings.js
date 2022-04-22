import { ResponsivePieCanvas } from "@nivo/pie";

export default function Holdings() {
  const data = [
    {
      id: "Company1",
      label: "Company1",
      value: 244,
      color: "hsl(328, 70%, 50%)",
    },
    {
      id: "Company2",
      label: "Company2",
      value: 115,
      color: "hsl(204, 70%, 50%)",
    },
    {
      id: "Others",
      label: "Others",
      value: 474,
      color: "hsl(177, 70%, 50%)",
    },
  ];

  return (
    <ResponsivePieCanvas
      data={data}
      margin={{ top: 40, right: 0, bottom: 0, left: 0 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "paired" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="#333333"
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
    />
  );
}
