import React, { useEffect, useState } from "react";
import styles from "../../styles/Calculators/select.module.scss";
import SelectCircle from "../SVGcomponents/SelectCircle";

export default function SelectInput({
  question,
  options,
  current,
  setcurrent,
  index,
  total,
  setvalue,
  value,
  sign,
  min,
  max,
}) {
  const [selected, setselected] = useState(value);
  const [show, setshow] = useState(false);

  // useEffect(() => {
  //   if (selected && index !== total) {
  //     setcurrent((prev) => prev + 1);
  //   }
  // }, [selected]);

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
          <div className={styles.inputBlock}>
            <div className={styles.topBlock}>
              <div className={styles.signAndValue}>
                <input
                  type="number"
                  value={selected}
                  max={max}
                  min={min}
                  onChange={(e) => {
                    if (e.target.value && !isNaN(e.target.value))
                      setselected(e.target.value);
                    setvalue(e.target.value);
                  }}
                />
                {sign && <p className={styles.sign}>{sign}</p>}
              </div>
            </div>

            <input
              type="range"
              value={selected}
              onChange={(e) => {
                setvalue(e.target.value);
                setselected(e.target.value);
              }}
              max={max}
              min={min}
            />
          </div>
        )}
      </div>
    </div>
  );
}
