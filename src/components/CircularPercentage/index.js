export default function CircularPercentage({
  text = 0,
  size = "50px",
  borderWidth = "3px",
  borderRadius = "10%",
  borderBgColor = "rgb(230 226 226)",
  borderCompleteColor = "#4166EB",
}) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: borderRadius,
          border: `${borderWidth} solid ${borderBgColor}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: borderCompleteColor,
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {text + "%"}
        </div>
      </div>
      {/* right side border => 0 to 25% */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: text <= 25 ? `${((text - 0) / 25) * 100}%` : "100%",
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: text >= 25 ? borderRadius : 0,
          borderRight: `${borderWidth} solid ${borderCompleteColor}`,
        }}
      />
      {/* bottom border => 26 to 50% */}
      {text > 25 && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderBottomLeftRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
              borderBottom: `${borderWidth} solid ${borderCompleteColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: text <= 50 ? `${100 - ((text - 25) / 25) * 100}%` : "0%",
              height: "100%",
              borderBottomLeftRadius: borderRadius,
              borderBottomRightRadius: 0,
              borderBottom: `${borderWidth} solid ${borderBgColor}`,
            }}
          />
        </>
      )}
      {/* left side border => 51 to 75% */}
      {text > 50 && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderTopLeftRadius: borderRadius,
              borderBottomLeftRadius: borderRadius,
              borderLeft: `${borderWidth} solid ${borderCompleteColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: text <= 75 ? `${100 - ((text - 50) / 25) * 100}%` : "0%",
              borderTopLeftRadius: borderRadius,
              borderBottomLeftRadius: 0,
              borderLeft: `${borderWidth} solid ${borderBgColor}`,
            }}
          />
        </>
      )}
      {/* top border => 76 to 100% */}
      {text > 75 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: text <= 100 ? `${((text - 75) / 25) * 100}%` : "100%",
            height: "100%",
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: text < 100 ? 0 : borderRadius,
            borderTop: `${borderWidth} solid ${borderCompleteColor}`,
          }}
        />
      )}
    </div>
  );
}
