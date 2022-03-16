import React, { useState } from "react";
import changetoint from "../../helpers/currency";
import styles from "../../styles/Calculators/resultblock.module.scss";

function ResultBox({
  resultdata,
  calcfunction,
  setchangesfromresult,
  setediteddata,
  onlyText,
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
              className={styles.inputbox}
              value={resultdata.result1}
              onChange={(e) => {
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
            <p className={`${styles.result} ${onlyText && styles.onlytext}`}>
              {resultdata.heading1 && "₹ "}
              {resultdata.result1}
            </p>
          </div>
        )}
        {resultdata.result2 !== undefined &&
          (resultdata.editable2 ? (
            <div className={styles.container}>
              {resultdata.heading2 && (
                <p className={styles.heading}>{resultdata.heading2}</p>
              )}
              {resultdata.sign2 && (
                <p className={styles.bsign}>{resultdata.sign2}</p>
              )}
              <input
                type="text"
                className={styles.inputbox}
                value={resultdata.result2}
                onChange={(e) => {
                  setediteddata((prev) => ({
                    ...prev,
                    [resultdata.changecode2]: e.target.value,
                  }));
                }}
              />
            </div>
          ) : (
            <div className={styles.container}>
              {resultdata.heading2 && (
                <p className={styles.heading}>{resultdata.heading2}</p>
              )}
              <p className={`${styles.result} ${onlyText && styles.onlytext}`}>
                {resultdata.result2sign
                  ? resultdata.result2sign
                  : resultdata.heading2 && "₹"}{" "}
                {resultdata.result2 === "NaN" ? 0 : resultdata.result2}
              </p>
            </div>
          ))}
        {resultdata.result3 !== undefined &&
          (resultdata.editable3 ? (
            <div className={styles.container}>
              {resultdata.heading3 && (
                <p className={styles.heading}>{resultdata.heading3}</p>
              )}
              {resultdata.sign3 && (
                <p className={styles.bsign}>{resultdata.sign3}</p>
              )}
              <input
                type="text"
                className={styles.inputbox}
                value={resultdata.result3 === "NaN" ? 0 : resultdata.result3}
                onChange={(e) => {
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
              <p className={`${styles.result} ${onlyText && styles.onlytext}`}>
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
              {resultdata.result4 === "NaN" ? 0 : resultdata.result4}
            </p>
          </div>
        )}
        {resultdata.result5 && (
          <div className={styles.container}>
            <p className={styles.heading}>{resultdata.heading5}</p>
            <p className={`${styles.result} ${onlyText && styles.onlytext}`}>
              ₹ {resultdata.result5 === "NaN" ? 0 : resultdata.result5}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultBox;
