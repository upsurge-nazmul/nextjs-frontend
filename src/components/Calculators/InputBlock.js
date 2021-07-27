import React from "react";
import styles from "../../styles/Calculators/inputblock.module.scss";

function InputBlock({ label, min, max, setvalue, value, sign }) {
  return (
    <div className={styles.inputBlock}>
      <div className={styles.topBlock}>
        <p className={styles.label}>{label}</p>
        <div className={styles.signAndValue}>
          <input
            type="number"
            value={value}
            max={max}
            min={min}
            onChange={(e) => {
              if (e.target.value && !isNaN(e.target.value))
                setvalue(e.target.value);
            }}
          />
          {sign && <p className={styles.sign}>{sign}</p>}
        </div>
      </div>

      <input
        type="range"
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        max={max}
        min={min}
      />
    </div>
  );
}

export default InputBlock;
