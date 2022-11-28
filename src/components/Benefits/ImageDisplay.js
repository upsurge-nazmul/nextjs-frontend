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
      />
      <img
        src={require("../../assets/whyUpsurge/blue.svg").default.src}
        alt={"Blue Circle"}
      />
      <img
        src={require("../../assets/whyUpsurge/red.svg").default.src}
        alt={"Red Circle"}
      />
      <img
        src={require("../../assets/whyUpsurge/green.svg").default.src}
        alt={"Green Parabolla"}
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
