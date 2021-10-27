import React from "react";
import styles from "../../styles/Calculators/bigcalcinput.module.scss";
export default function BigCalcInput({
  title,
  pretitle,
  posttitle,
  value,
  setvalue,
  minvalue,
  code,
}) {
  return (
    <div className={styles.bigcalcinput}>
      <p className={styles.heading}>{title}</p>
      <div className={styles.inputwrapper}>
        {pretitle && <p className={styles.pretitle}>{pretitle}</p>}
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => {
            if (!e.target.value) {
              setvalue((prev) => ({
                ...prev,
                [code]: 0,
              }));
              return;
            }
            if (e.target.value === " ") {
              return;
            }
            setvalue((prev) => ({ ...prev, [code]: parseInt(e.target.value) }));
          }}
          minvalue={minvalue ?? 0}
        />
        {posttitle && <p className={styles.posttitle}>{posttitle}</p>}
      </div>
    </div>
  );
}
