import React from "react";
import styles from "../../styles/Calculators/resultBlock.module.scss";

function ResultBox({ resultdata }) {
  function getIndianFormat(x) {
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  }
  return (
    <div className={styles.resultBox}>
      <div className={styles.topflex}>
        <div className={styles.container}>
          <p className={styles.heading}>{resultdata.heading1}</p>
          <p className={styles.result}>
            ₹ {getIndianFormat(resultdata.result1)}
          </p>
        </div>
        <div className={styles.container}>
          <p className={styles.heading}>{resultdata.heading2}</p>
          <p className={styles.result}>
            ₹ {getIndianFormat(resultdata.result2)}
          </p>
        </div>
      </div>
      {resultdata.result4 ? (
        <div className={styles.topflex}>
          <div className={styles.container}>
            <p className={styles.heading}>{resultdata.heading3}</p>
            <p className={styles.result}>
              ₹ {getIndianFormat(resultdata.result3)}
            </p>
          </div>
          <div className={styles.container}>
            <p className={styles.heading}>{resultdata.heading4}</p>
            <p className={styles.result}>
              ₹ {getIndianFormat(resultdata.result4)}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.bottomContainer}>
          <p className={styles.heading}>{resultdata.heading3}</p>
          <p className={styles.result}>
            ₹ {getIndianFormat(resultdata.result3)}
          </p>
        </div>
      )}
    </div>
  );
}

export default ResultBox;
