import React, { useEffect } from "react";
import styles from "../../styles/Calculators/dropbox.module.scss";

function DropBox({ value, title, setvalue, options }) {
  return (
    <div className={styles.dropBox}>
      <p className={styles.title}>{title}</p>
      <div className={styles.selectwrapper}>
        <select
          name={title}
          onChange={(e) => setvalue(e.target.value)}
          value={value}
        >
          {options.map((item, index) => {
            return (
              <option key={"dropboxoption" + index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default DropBox;
