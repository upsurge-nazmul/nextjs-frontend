import React, { useEffect, useState } from "react";
import styles from "../../styles/Calculators/select.module.scss";

function Select({ question, options, current, setcurrent, index, total }) {
  const [selected, setselected] = useState("");
  const [show, setshow] = useState(false);

  useEffect(() => {
    if (selected && index !== total) {
      setcurrent((prev) => prev + 1);
    }
  }, [selected]);

  useEffect(() => {
    if (current === index) setshow(true);
    else setshow(false);
  }, [current]);
  return (
    <div className={styles.selectBlock}>
      <div className={styles.leftblock}>
        <div className={styles.qno + " " + styles.vertgrad}>
          {!selected ? (
            <p>{index + 1}</p>
          ) : (
            <svg
              width="10"
              height="10"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.21924 6.8136L6.40783 12L16.7806 1.6272"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </div>
        {index !== total ? (
          <div className={styles.backRow + " " + styles.vertgrad}></div>
        ) : null}
      </div>
      <div className={styles.rightblock}>
        <p className={styles.question} onClick={() => setcurrent(index)}>
          {question}
        </p>
        {selected ? <p className={styles.answer}>{selected}</p> : null}
        {show && (
          <div className={styles.optionWrapper}>
            {options.map((option) => {
              return (
                <div
                  className={styles.optionContainer}
                  onClick={() => setselected(option)}
                >
                  <p className={styles.option}>{option}</p>
                  <div
                    className={`${styles.select} ${
                      option === selected ? styles.selected : ""
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Select;
