import React, { useEffect, useState } from "react";
import ResultBox from "./ResultBox";
import Select from "./Select";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import SelectInput from "./SelectInput";
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
import Progress from "../Progress";
import InputBlock from "./InputBlock";
import DropBox from "./DropBox";
import changetoint from "../../helpers/currency";
export default function BigMacCalc({ seterror, error }) {
  const [questions, setquestions] = useState([
    {
      type: "input",
      title: "Enter the amount",
      code: "inrmoney",
      min: 100,
      max: 10000000,
      pretitle: "₹",
      range: true,
    },
    {
      title: "Select Country",
      type: "select",
      code: "country",
      options: ["Australia", "UK", "US", "Singapore", "Japan", "Canada"],
    },
  ]);
  const [result, setresult] = useState(false);
  const [current, setcurrent] = useState(0);
  const [resultdata, setresultdata] = useState({
    heading1: "Invested Amount",
    heading2: "Returns",
    heading3: "",
    heading4: "",
    result1: "",
    result2: "",
    result3: "",
    result4: "",
  });
  const [chartData, setChartData] = useState({
    labels: ["Total Money (INR)", "Worth in country"],
    datasets: [
      {
        label: "# of Votes",
        data: [0, 0],
        backgroundColor: ["#4166EB", "#FDCC03"],
        borderColor: ["#4166EB", "#FDCC03"],
        borderWidth: 1,
      },
    ],
  });
  const [calcdata, setcalcdata] = useState({
    inrmoney: 100,
    country: "UK",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
  }, [calcdata, current]);

  function emi() {
    if (
      !changetoint(calcdata.inrmoney) ||
      changetoint(calcdata.inrmoney) < 100
    ) {
      seterror("Amount should not be less than 100");
    }
    let bigmac = 0;
    if (calcdata.country === "Singapore") {
      bigmac = 4.31;
    } else if (calcdata.country === "UK") {
      bigmac = 4.75;
    } else if (calcdata.country === "US") {
      bigmac = 5.65;
    } else if (calcdata.country === "Canada") {
      bigmac = 5.31;
    } else if (calcdata.country === "Australia") {
      bigmac = 4.79;
    } else if (calcdata.country === "Japan") {
      bigmac = 3.55;
    }
    let ratio = 2.55 / bigmac;
    var money = changetoint(calcdata.inrmoney) * ratio;

    setresultdata((prev) => ({
      heading1: "Total Money",
      heading2: `Worth in ${calcdata.country}`,
      result1: Math.round(changetoint(calcdata.inrmoney)).toLocaleString(
        "en-IN",
        {
          currency: "INR",
        }
      ),
      result2: Math.round(money).toLocaleString("en-IN", {
        currency: "INR",
      }),
    }));
    setChartData((prev) => ({
      ...prev,
      labels: ["Total Money (INR)", `Worth in ${calcdata.country}`],
      datasets: [
        {
          label: "Worth Comparision",
          data: [Math.round(changetoint(calcdata.inrmoney)), Math.round(money)],
          backgroundColor: ["#FDCC03", "#4166EB"],
          borderColor: ["#FDCC03", "#4166EB"],
          borderWidth: 1,
        },
      ],
    }));
  }
  return (
    <div className={styles.calculatorComponent}>
      {!showresult && (
        <div className={styles.inputSection}>
          <Progress
            questions={questions.length}
            current={current}
            setcurrent={setcurrent}
          />
          {currentquestion.type === "select" ? (
            <BigCalcDropdown
              title={currentquestion.title}
              options={currentquestion.options}
              value={calcdata[currentquestion.code]}
              setvalue={setcalcdata}
              code={currentquestion.code}
            />
          ) : (
            <BigCalcInput
              title={currentquestion.title}
              value={calcdata[currentquestion.code]}
              setvalue={setcalcdata}
              maxvalue={currentquestion.max}
              minvalue={currentquestion.min}
              pretitle={currentquestion.pretitle}
              posttitle={currentquestion.posttitle}
              code={currentquestion.code}
              range={currentquestion.range}
            />
          )}
          <div className={styles.buttons}>
            {current !== 0 ? (
              <p
                className={styles.previous}
                onClick={() => {
                  if (current !== 0) {
                    setcurrent(current - 1);
                  }
                }}
              >
                Previous
              </p>
            ) : (
              <p></p>
            )}
            <p
              className={styles.next}
              onClick={() => {
                if (error) return;
                if (current !== questions.length - 1) {
                  setcurrent(current + 1);
                } else {
                  setshowresult(true);
                }
              }}
            >
              Next
            </p>
          </div>
        </div>
      )}
      {showresult && (
        <div className={styles.postresultinputs}>
          {questions.map((item) => {
            if (item.type === "select") {
              return (
                <DropBox
                  title={item.title}
                  sign={item.sign}
                  min={item.min}
                  max={item.max}
                  value={calcdata[item.code]}
                  setvalue={(e) =>
                    setcalcdata((prev) => ({ ...prev, [item.code]: e }))
                  }
                  options={item.options}
                />
              );
            } else {
              return (
                <InputBlock
                  label={item.title}
                  posttitle={item.posttitle}
                  pretitle={item.pretitle}
                  minvalue={item.min}
                  maxvalue={item.max}
                  code={item.code}
                  value={calcdata[item.code]}
                  setvalue={setcalcdata}
                />
              );
            }
          })}
          {!error && <ResultBox resultdata={resultdata} />}
        </div>
      )}

      {!error && showresult ? (
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}></div>
        </div>
      ) : null}
    </div>
  );
}
