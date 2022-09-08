import styles from "../../styles/Journey/journey.module.scss";
import Banner from "./Banner";
import Pathway from "./Pathway";

export default function Journey() {
  return (
    <div className={styles.journey}>
      <Banner />
      <Pathway />
    </div>
  );
}
