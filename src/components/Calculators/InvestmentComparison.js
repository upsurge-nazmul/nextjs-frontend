import React, { useEffect, useState } from "react";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
import changetoint from "../../helpers/currency";
export default function InvestmentComparison({ seterror, error }) {
  const [questions, setquestions] = useState([
    {
      title: "Select the First Investment Type",
      type: "select",
      code: "type1",
      options: [
        "Fixed deposit",
        "Mutual Fund",
        "Gold",
        "Stock market",
        "Government Bond",
      ],
    },
    {
      title: "Select the Second Investment Type",
      type: "select",
      code: "type2",
      options: [
        "Fixed deposit",
        "Mutual Fund",
        "Gold",
        "Stock market",
        "Government Bond",
      ],
    },
    {
      type: "input",
      title: "Enter the time duration of the first investment ?",
      code: "year1",
      min: 1,
      max: 80,
      range: true,
      posttitle: "years",
    },
    {
      type: "input",
      title: "Enter the time duration of the second investment ?",
      code: "year2",
      min: 1,
      max: 80,
      range: true,
      posttitle: "years",
    },
    {
      type: "input",
      title: "Enter the principal amount invested in the first investment?",
      code: "amount1",
      min: 1000,
      max: 100000000,
      pretitle: "₹",
      range: true,
    },
    {
      type: "input",
      title: "Enter the principal amount invested in the second investment?",
      code: "amount2",
      min: 1000,
      max: 100000000,
      pretitle: "₹",
      range: true,
    },
  ]);
  const [result, setresult] = useState(false);
  const [current, setcurrent] = useState(0);
  const [resultdata, setresultdata] = useState({
    heading1: "Invested Amount",
    heading2: "Returns",
    heading3: "Total Value",
    heading4: "Monthy Sip",
    result1: "",
    result2: "",
    result3: "",
    result4: "",
  });
  const [chartData, setChartData] = useState({
    labels: ["interest", "Loan Amount"],
    datasets: [
      {
        label: "Investment Comparison",
        data: [0, 0],
        backgroundColor: ["#4166EB", "#FDCC03"],
        borderColor: ["#4166EB", "#FDCC03"],
        borderWidth: 1,
      },
    ],
  });
  const [calcdata, setcalcdata] = useState({
    year1: 1,
    year2: 1,
    type1: "Fixed deposit",
    type2: "Fixed deposit",
    amount1: 1000,
    amount2: 1000,
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);

  function emi() {
    console.log(changetoint(calcdata.amount1) <= 1000);
    if (calcdata.year1 <= 0) {
      seterror("Duration of the first investment shoud be greater than 0");
      return;
    }
    if (calcdata.year2 <= 0) {
      seterror("Duration of the second investment shoud be greater than 0");
      return;
    }
    if (calcdata.amount1 === "") {
      seterror(
        "The principal amount invested in the first investment is required"
      );
      return;
    }
    if (calcdata.amount2 === "") {
      seterror(
        "The principal amount invested in the second investment is required"
      );
      return;
    }
    if (changetoint(calcdata.amount1) < 1000) {
      seterror(
        "The principal amount invested in the first investment cannot be less than 1,000"
      );
      return;
    }
    if (changetoint(calcdata.amount2) < 1000) {
      seterror(
        "The principal amount invested in the second investment cannot be less than 1,000"
      );
      return;
    }
    let intrest1 = 0;
    let intrest2 = 0;
    if (calcdata.type1 === "Fixed deposit") {
      intrest1 = 5 / 100;
    } else if (calcdata.type1 === "Mutual Fund") {
      intrest1 = 10.4 / 100;
    } else if (calcdata.type1 === "Gold") {
      intrest1 = 10 / 100;
    } else if (calcdata.type1 === "Stock market") {
      intrest1 = 13.9 / 100;
    } else {
      intrest1 = 3.65 / 100;
    }
    if (calcdata.type2 === "Fixed deposit") {
      intrest2 = 5 / 100;
    } else if (calcdata.type2 === "Mutual Fund") {
      intrest2 = 10.4 / 100;
    } else if (calcdata.type2 === "Gold") {
      intrest2 = 10 / 100;
    } else if (calcdata.type2 === "Stock market") {
      intrest2 = 13.9 / 100;
    } else {
      intrest2 = 3.65 / 100;
    }
    let result1 =
      changetoint(calcdata.amount1) * Math.pow(1 + intrest1, calcdata.year1);
    let result2 =
      changetoint(calcdata.amount2) * Math.pow(1 + intrest2, calcdata.year2);
    setresultdata((prev) => ({
      heading1: "Total Amount for " + calcdata.type1,
      heading2: "Total Amount for " + calcdata.type2,
      result1: Math.round(result1).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result2: Math.round(result2).toLocaleString("en-IN", {
        currency: "INR",
      }),
    }));
    setChartData((prev) => ({
      ...prev,
      labels: [
        "Total Amount for " + calcdata.type1,
        "Total Amount for " + calcdata.type2,
      ],
      datasets: [
        {
          label: "Investment Comparison",
          data: [Math.round(result1), Math.round(result2)],
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
              range={currentquestion.range}
              minvalue={currentquestion.min}
              pretitle={currentquestion.pretitle}
              posttitle={currentquestion.posttitle}
              code={currentquestion.code}
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
          <ResultBox resultdata={resultdata} />
        </div>
      )}

      {showresult ? (
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}>
            {/* <Bar
              data={chartData}
              className={styles.chart}
              width={100}
              height={100}
              options={{ maintainAspectRatio: false }}
            /> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}
