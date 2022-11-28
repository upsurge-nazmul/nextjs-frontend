import styles from "../../styles/Benefits/imageDisplay.module.scss";

export default function ImageDisplay({
  src = "",
  alt = "",
  frameType = "default",
}) {
  return (
    <div
      className={styles.displayArea}
      style={
        frameType === "vertical"
          ? {
              height: "70vh",
              width: "50vh",
            }
          : frameType === "horizontal"
          ? {
              height: "50vh",
              width: "70vh",
            }
          : {
              height: "60vh",
              width: "60vh",
            }
      }
    >
      <img
        src={require("../../assets/whyUpsurge/yellow.svg").default.src}
        alt={"Yellow Star"}
        style={{
          position: "absolute",
          top: "3%",
          left: "87%",
          height: "47px",
          width: "47px",
        }}
      />
      <img
        src={require("../../assets/whyUpsurge/blue.svg").default.src}
        alt={"Blue Circle"}
        style={{
          position: "absolute",
          top: "25%",
          left: "4%",
          height: "60px",
          width: "60px",
        }}
      />
      <img
        src={require("../../assets/whyUpsurge/red.svg").default.src}
        alt={"Red Circle"}
        style={{
          position: "absolute",
          top: "75%",
          left: "83%",
          height: "30px",
          width: "30px",
        }}
      />
      <img
        src={require("../../assets/whyUpsurge/green.svg").default.src}
        alt={"Green Parabolla"}
        style={{
          position: "absolute",
          top: "80%",
          left: "2%",
          height: "50px",
          width: "50px",
        }}
      />
      <div className={styles.layer1}>
        <div className={styles.layer2}>
          <div className={styles.layer3}>
            <img src={src} alt={alt} className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
}
