import styles from "../../styles/Benefits/imageDisplay.module.scss";

export default function ImageDisplay({
  src = "",
  alt = "",
  frameType = "default",
}) {
  return (
    <div
      className={styles.layer1}
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
      <div className={styles.layer2}>
        <div className={styles.layer3}>
          <img src={src} alt={alt} className={styles.image} />
        </div>
      </div>
    </div>
  );
}
