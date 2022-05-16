import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Main";
import changetoint from "../../helpers/currency";
import styles from "../../styles/Calculators/bigcalcinput.module.scss";
export default function BigCalcInput({
  title,
  pretitle,
  posttitle,
  value,
  setvalue,
  minvalue,
  code,
  maxvalue,
  range,
}) {
  const [rangevalue, setrangevalue] = useState(changetoint(value));
  const { theme } = useContext(MainContext);
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
    <div
      className={`${styles.bigcalcinput} ${
        theme === "dark" && styles.darkstyles
      }`}
    >
      <p className={styles.heading}>{title}</p>
      <div id={title} className={styles.inputwrapper}>
        {pretitle && <p className={styles.pretitle}>{pretitle}</p>}
        <input
          onWheel={(e) => hover(e)}
          onMouseOut={(e) => addscroll(e)}
          className={styles.input}
          style={{
            paddingLeft: posttitle ? "10%" : "0",
          }}
          type="text"
          value={value}
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
            setrangevalue(changetoint(e.target.value));
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
        {posttitle && <p className={styles.posttitle}>{posttitle}</p>}
      </div>
      {range && (
        <input
          className={styles.range}
          type="range"
          key={"range" + title}
          value={rangevalue}
          onWheel={(e) => hover(e)}
          onMouseOut={(e) => addscroll(e)}
          step={rangevalue + 1000 > maxvalue || rangevalue < 1000 ? 1 : 1000}
          max={maxvalue}
          min={minvalue}
          onChange={(e) => {
            if (maxvalue && e.target.value > maxvalue) {
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
        />
      )}
    </div>
  );
}
