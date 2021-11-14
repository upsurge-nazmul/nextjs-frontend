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
  maxvalue,
  range,
}) {
  return (
    <div className={styles.bigcalcinput}>
      <p className={styles.heading}>{title}</p>
      <div className={styles.inputwrapper}>
        {pretitle && <p className={styles.pretitle}>{pretitle}</p>}
        <input
          className={styles.input}
          style={{
            paddingLeft: posttitle ? "10%" : "0",
          }}
          type="number"
          value={value}
          onChange={(e) => {
            if (maxvalue && e.target.value > maxvalue) {
              return;
            }

            if (e.target.value === " " || e.target.value < 0) {
              return;
            }
            setvalue((prev) => ({ ...prev, [code]: parseInt(e.target.value) }));
          }}
          min={minvalue ?? 0}
        />
        {posttitle && <p className={styles.posttitle}>{posttitle}</p>}
      </div>
      {range && (
        <input
          className={styles.range}
          type="range"
          value={value}
          step={1000}
          max={maxvalue}
          onChange={(e) => {
            if (maxvalue && e.target.value > maxvalue) {
              return;
            }

            if (e.target.value === " " || e.target.value < 0) {
              return;
            }
            setvalue((prev) => ({ ...prev, [code]: parseInt(e.target.value) }));
          }}
        />
      )}
    </div>
  );
}
