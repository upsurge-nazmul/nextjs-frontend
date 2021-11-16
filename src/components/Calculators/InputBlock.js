import React, { useEffect, useState } from "react";
import changetoint from "../../helpers/currency";
import styles from "../../styles/Calculators/inputblock.module.scss";

function InputBlock({
  label,
  maxvalue,
  minvalue,
  setvalue,
  value,
  pretitle,
  posttitle,
  code,
}) {
  const [rangevalue, setrangevalue] = useState(changetoint(value));
  useEffect(() => {
    setrangevalue(changetoint(value));
  }, [value]);
  async function hover(e) {
    let pe = document.getElementById("calc-page");
    if (pe) {
      pe.style.overflowY = "hidden";
    }
    e.preventDefault();

    if (e.deltaY > 0) {
      console.log("small");
      if (changetoint(value) <= 10) {
        if (changetoint(value) - 1 < minvalue) {
          return;
        }
        setvalue((prev) => ({
          ...prev,
          [code]: (changetoint(value) - 1).toLocaleString("en-IN", {
            currency: "INR",
          }),
        }));
        setrangevalue(changetoint(value) - 1);

        return;
      }
      if (changetoint(value) < 1000) {
        if (changetoint(value) - 10 < minvalue) {
          if (changetoint(value) - 10 <= maxvalue) {
            if (changetoint(value) - 1 < minvalue) {
              return;
            }
            setrangevalue(changetoint(value) - 1);

            setvalue((prev) => ({
              ...prev,
              [code]: (changetoint(value) - 1).toLocaleString("en-IN", {
                currency: "INR",
              }),
            }));
          }
          return;
        }
        setrangevalue(changetoint(value) - 10);
        setvalue((prev) => ({
          ...prev,
          [code]: (changetoint(value) - 10).toLocaleString("en-IN", {
            currency: "INR",
          }),
        }));
      } else {
        if (changetoint(value) - 1000 < minvalue) {
          return;
        }
        setrangevalue(changetoint(value) - 1000);
        setvalue((prev) => ({
          ...prev,
          [code]: (changetoint(value) - 1000).toLocaleString("en-IN", {
            currency: "INR",
          }),
        }));
      }
    } else {
      if (changetoint(value) <= 10) {
        if (changetoint(value) + 1 > maxvalue) {
          return;
        }
        setrangevalue(changetoint(value) + 1);
        setvalue((prev) => ({
          ...prev,
          [code]: (changetoint(value) + 1).toLocaleString("en-IN", {
            currency: "INR",
          }),
        }));
        return;
      }
      if (changetoint(value) < 1000) {
        if (changetoint(value) + 10 > maxvalue) {
          if (changetoint(value) + 1 <= maxvalue) {
            setrangevalue(changetoint(value) + 1);

            setvalue((prev) => ({
              ...prev,
              [code]: (changetoint(value) + 1).toLocaleString("en-IN", {
                currency: "INR",
              }),
            }));
          }
          return;
        }
        setrangevalue(changetoint(value) + 10);
        setvalue((prev) => ({
          ...prev,
          [code]: (changetoint(value) + 10).toLocaleString("en-IN", {
            currency: "INR",
          }),
        }));
      } else {
        if (changetoint(value) + 1000 > maxvalue) {
          if (changetoint(value) + 10 > maxvalue) {
            if (!(changetoint(value) + 1 > maxvalue)) {
              setrangevalue(changetoint(value) + 1);
              setvalue((prev) => ({
                ...prev,
                [code]: (changetoint(value) + 1).toLocaleString("en-IN", {
                  currency: "INR",
                }),
              }));
            }
          } else {
            setrangevalue(changetoint(value) + 10);
            setvalue((prev) => ({
              ...prev,
              [code]: (changetoint(value) + 10).toLocaleString("en-IN", {
                currency: "INR",
              }),
            }));
          }
          return;
        }
        setrangevalue(changetoint(value) + 1000);
        setvalue((prev) => ({
          ...prev,
          [code]: (changetoint(value) + 1000).toLocaleString("en-IN", {
            currency: "INR",
          }),
        }));
      }
    }
  }
  async function addscroll(e) {
    let pe = document.getElementById("calc-page");
    if (pe) {
      pe.style.overflowY = "auto";
    }
  }
  return (
    <div className={styles.inputBlock}>
      <div className={styles.topBlock}>
        <p className={styles.label}>{label}</p>
        <div className={styles.signAndValue}>
          {pretitle && <p className={styles.sign}>{pretitle}</p>}
          <input
            type="text"
            value={value}
            onWheel={(e) => hover(e)}
            onMouseOut={(e) => addscroll(e)}
            onChange={(e) => {
              if (maxvalue && changetoint(e.target.value) > maxvalue) {
                return;
              }

              if (
                e.target.value[e.target.value.length - 1] === " " ||
                e.target.value < 0
              ) {
                return;
              }
              setrangevalue(!e.target.value ? "" : changetoint(e.target.value));
              setvalue((prev) => ({
                ...prev,
                [code]: !e.target.value
                  ? ""
                  : changetoint(e.target.value).toLocaleString("en-IN", {
                      currency: "INR",
                    }),
              }));
            }}
          />
          {posttitle && <p className={styles.sign}>{posttitle}</p>}
        </div>
      </div>

      <input
        key={label}
        type="range"
        value={rangevalue}
        step={rangevalue + 1000 > maxvalue || rangevalue < 1000 ? 1 : 1000}
        onWheel={(e) => hover(e)}
        onMouseOut={(e) => addscroll(e)}
        onChange={(e) => {
          if (maxvalue && changetoint(e.target.value) > maxvalue) {
            return;
          }
          if (e.target.value === " " || e.target.value < 0) {
            return;
          }
          setvalue((prev) => ({
            ...prev,
            [code]: parseInt(e.target.value).toLocaleString("en-IN", {
              currency: "INR",
            }),
          }));
          setrangevalue(e.target.value);
        }}
        max={maxvalue}
        min={minvalue}
      />
    </div>
  );
}

export default InputBlock;
