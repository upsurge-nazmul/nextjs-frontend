import { useState } from "react";
import styles from "../../styles/StockSimulator/info.module.scss";
import InfoSvg from "../SVGcomponents/StockSimulator/InfoSvg";

export default function Menu({ text = "" }) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.menu}>
      <div
        className={active ? styles.menuBackground : styles.deactiveBackground}
        onClick={() => setActive(false)}
      />
      <div className={styles.menuBody}>
        <InfoSvg
          className={styles.menuTitle}
          onClick={() => setActive((prev) => !prev)}
        />
        {active ? (
          <div className={active ? styles.activeContent : styles.menuContent}>
            <div className={styles.text}>{text}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
