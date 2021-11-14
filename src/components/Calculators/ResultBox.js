import React from "react";
import styles from "../../styles/Calculators/resultblock.module.scss";

function ResultBox({ resultdata }) {
  return (
    <div className={styles.resultBox}>
      <div className={styles.topflex}>
        <div className={styles.container}>
          {resultdata.heading1 && (
            <p className={styles.heading}>{resultdata.heading1}</p>
          )}
          <p className={styles.result}>
            {resultdata.heading1 && "₹ "}
            {resultdata.result1}
          </p>
        </div>
        {resultdata.result2 && (
          <div className={styles.container}>
            {resultdata.heading2 && (
              <p className={styles.heading}>{resultdata.heading2}</p>
            )}
            <p className={styles.result}>
              {resultdata.result2sign
                ? resultdata.result2sign
                : resultdata.heading2 && "₹"}{" "}
              {resultdata.result2}
            </p>
          </div>
        )}
        {resultdata.result3 && (
          <div className={styles.container}>
            {resultdata.heading3 && (
              <p className={styles.heading}>{resultdata.heading3}</p>
            )}
            <p className={styles.result}>
              {resultdata.result3sign
                ? resultdata.result3sign
                : resultdata.heading3 && "₹"}{" "}
              {resultdata.result3}
            </p>
          </div>
        )}
        {resultdata.result4 && (
          <div className={styles.container}>
            {resultdata.heading4 && (
              <p className={styles.heading}>{resultdata.heading4}</p>
            )}
            <p className={styles.result}>
              {resultdata.result4sign
                ? resultdata.result4sign
                : resultdata.heading4 && "₹"}{" "}
              {resultdata.result4}
            </p>
          </div>
        )}
        {resultdata.result5 && (
          <div className={styles.container}>
            <p className={styles.heading}>{resultdata.heading5}</p>
            <p className={styles.result}>₹ {resultdata.result5}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultBox;
