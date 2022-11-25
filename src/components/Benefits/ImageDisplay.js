import styles from "../../styles/Benefits/imageDisplay.module.scss";

export default function ImageDisplay({ src, alt }) {
  return (
    <div className={styles.layer1}>
      <div className={styles.layer2}>
        <div className={styles.layer3}>
          <img src={src} alt={alt} className={styles.image} />
        </div>
      </div>
    </div>
  );
}
