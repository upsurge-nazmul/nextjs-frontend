import React, { useEffect, useState } from "react";
import styles from "../../styles/Calculators/select.module.scss";
import SelectCircle from "../SVGcomponents/SelectCircle";

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
          {!selected ? <p>{index + 1}</p> : <SelectCircle />}
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
            {options.map((option, index) => {
              return (
                <div
                  key={"selectOption" + index}
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
