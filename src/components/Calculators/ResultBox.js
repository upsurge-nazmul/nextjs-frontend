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
          <p className={styles.result}>₹ {resultdata.result1}</p>
        </div>
        {resultdata.result2 && (
          <div className={styles.container}>
            <p className={styles.heading}>{resultdata.heading2}</p>
            <p className={styles.result}>
              {resultdata.result2sign ? resultdata.result2sign : "₹"}{" "}
              {resultdata.result2}
            </p>
          </div>
        )}
      </div>
      {resultdata.result4 ? (
        <div className={styles.topflex}>
          <div className={styles.container}>
            <p className={styles.heading}>{resultdata.heading3}</p>
            <p className={styles.result}>₹ {resultdata.result3}</p>
          </div>
          <div className={styles.container}>
            <p className={styles.heading}>{resultdata.heading4}</p>
            <p className={styles.result}>₹ {resultdata.result4}</p>
          </div>
          {resultdata.result5 && (
            <div className={styles.container}>
              <p className={styles.heading}>{resultdata.heading5}</p>
              <p className={styles.result}>₹ {resultdata.result5}</p>
            </div>
          )}
        </div>
      ) : (
        resultdata.heading3 && (
          <div className={styles.bottomContainer}>
            <p className={styles.heading}>{resultdata.heading3}</p>
            <p className={styles.result}>₹ {resultdata.result3}</p>
          </div>
        )
      )}
    </div>
  );
}

export default ResultBox;
