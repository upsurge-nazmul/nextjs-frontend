import React, { useState } from "react";
import changetoint from "../../helpers/currency";
import styles from "../../styles/Calculators/resultblock.module.scss";

function ResultBox({
  resultdata,
  calcfunction,
  setchangesfromresult,
  setediteddata,
}) {
  return (
    <div className={styles.resultBox}>
      <div className={styles.topflex}>
        {resultdata.editable1 ? (
          <div className={styles.container}>
            {resultdata.heading1 && (
              <p className={styles.heading}>{resultdata.heading1}</p>
            )}
            {<p className={styles.bsign}>{"₹"}</p>}
            <input
              type="text"
              value={resultdata.result1}
              onChange={(e) => {
                if (
                  resultdata.max1 &&
                  changetoint(e.target.value) > resultdata.max1
                ) {
                  return;
                }
                setediteddata((prev) => ({
                  ...prev,
                  [resultdata.changecode1]: e.target.value,
                }));
              }}
            />
          </div>
        ) : (
          <div className={styles.container}>
            {resultdata.heading1 && (
              <p className={styles.heading}>{resultdata.heading1}</p>
            )}
            <p className={styles.result}>
              {resultdata.heading1 && "₹ "}
              {resultdata.result1}
            </p>
          </div>
        )}
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
        {resultdata.result3 !== undefined &&
          (resultdata.editable3 ? (
            <div className={styles.container}>
              {resultdata.heading3 && (
                <p className={styles.heading}>{resultdata.heading1}</p>
              )}
              {resultdata.sign3 && (
                <p className={styles.bsign}>{resultdata.sign3}</p>
              )}
              <input
                type="text"
                value={resultdata.result3}
                onChange={(e) => {
                  if (
                    resultdata.max3 &&
                    changetoint(e.target.value) > resultdata.max3
                  ) {
                    return;
                  }
                  setediteddata((prev) => ({
                    ...prev,
                    [resultdata.changecode3]: e.target.value,
                  }));
                }}
              />
            </div>
          ) : (
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
          ))}
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
