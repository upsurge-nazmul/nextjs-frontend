export default function IconWithBg({
  children,
  bgClr = "#333",
  borderClr = "#ccc",
  size = "66px",
}) {
  return (
    <div
      style={{
        backgroundColor: bgClr,
        border: `3px solid ${borderClr}`,
        borderRadius: "20px",
        height: size,
        width: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
