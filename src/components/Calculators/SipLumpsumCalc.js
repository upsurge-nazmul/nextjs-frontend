import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import Select from "./Select";
import ProgressVerticle from "../ProgressVerticle";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import SelectInput from "./SelectInput";
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
export default function HomeCalc() {
  const [years, setyear] = useState(1);
  const [type, settype] = useState("All");
  const [amount, setamount] = useState();
  const [university, setuniversity] = useState("");
  const [country, setcountry] = useState("");
  const [course, setcourse] = useState(0);
  const [questions, setquestions] = useState([
    {
      type: "input",
      title: "Enter money needed in future.",
      code: "amount",
      min: 1,
      max: 10000000,
      pretitle: "₹",
    },
    {
      title: "Investment Duration",
      type: "input",
      code: "years",
      min: 1,
      max: 80,
      posttitle: "years",
    },
    {
      title: "Investment Type",
      type: "select",
      code: "type",
      options: [
        "All",
        "Fixed deposit",
        "Mutual Fund",
        "Gold",
        "Stock market",
        "Government Bond",
      ],
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
        label: "# of Votes",
        data: [0, 0],
        backgroundColor: ["#4166EB", "#FDCC03"],
        borderColor: ["#4166EB", "#FDCC03"],
        borderWidth: 1,
      },
    ],
  });
  const [calcdata, setcalcdata] = useState({
    years: 1,
    type: "All",
    amount: 1000,
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);

  function emi() {
    let fd = calcdata.amount / Math.pow(1 + 5 / 100, calcdata.years);
    let mutualfund = calcdata.amount / Math.pow(1 + 10.4 / 100, calcdata.years);
    let gold = calcdata.amount / Math.pow(1 + 10 / 100, calcdata.years);
    let stockmarket =
      calcdata.amount / Math.pow(1 + 13.9 / 100, calcdata.years);
    let governmentb =
      calcdata.amount / Math.pow(1 + 3.65 / 100, calcdata.years);
    if (calcdata.type === "Fixed deposit") {
      setresultdata((prev) => ({
        heading1: "Sip For Fixed Deposit",
        result1: Math.round(fd),
      }));
      setChartData((prev) => ({
        ...prev,
        labels: ["Sip For Fixed Deposit"],

        datasets: [
          {
            label: "# of Votes",
            data: [Math.round(fd)],
            backgroundColor: ["#FDCC03"],
            borderColor: ["#FDCC03"],
            borderWidth: 1,
          },
        ],
      }));
    } else if (calcdata.type === "Mutual Fund") {
      setresultdata((prev) => ({
        heading1: "Sip For Mutual Fund",
        result1: Math.round(mutualfund),
      }));
      setChartData((prev) => ({
        ...prev,
        labels: ["Sip For Mutual Fund"],
        datasets: [
          {
            label: "Sips",
            data: [Math.round(mutualfund)],
            backgroundColor: ["#FDCC03"],
            borderColor: ["#FDCC03"],
            borderWidth: 1,
          },
        ],
      }));
    } else if (calcdata.type === "Gold") {
      setresultdata((prev) => ({
        heading1: "Sip For Gold",
        result1: Math.round(gold),
      }));
      setChartData((prev) => ({
        ...prev,
        labels: ["Sip For Gold"],

        datasets: [
          {
            label: "Sips",

            data: [Math.round(gold)],
            backgroundColor: ["#FDCC03"],
            borderColor: ["#FDCC03"],
            borderWidth: 1,
          },
        ],
      }));
    } else if (calcdata.type === "Stock market") {
      setresultdata((prev) => ({
        heading1: "Sip For Stock Market",
        result1: Math.round(stockmarket),
      }));
      setChartData((prev) => ({
        ...prev,
        labels: ["Sip For Stock Market"],

        datasets: [
          {
            label: "Sips",

            data: [Math.round(stockmarket)],
            backgroundColor: ["#FDCC03"],
            borderColor: ["#FDCC03"],
            borderWidth: 1,
          },
        ],
      }));
    } else if (calcdata.type === "Government Bond") {
      setresultdata((prev) => ({
        heading1: "Sip For Government Bond",
        result1: Math.round(governmentb),
      }));
      setChartData((prev) => ({
        ...prev,
        labels: ["Sip For Government Bond"],
        datasets: [
          {
            label: "Sips",

            data: [Math.round(governmentb)],
            backgroundColor: ["#FDCC03"],
            borderColor: ["#FDCC03"],
            borderWidth: 1,
          },
        ],
      }));
    } else {
      setresultdata((prev) => ({
        heading1: "Sip For Fixed Deposit",
        heading2: `Sip For Mutual Fund`,
        heading3: "Sip For Gold",
        heading4: "Sip For Stock Market",
        heading5: "Sip For Government Bond",
        result1: Math.round(fd),
        result2: Math.round(mutualfund),
        result3: Math.round(gold),
        result4: Math.round(stockmarket),
        result5: Math.round(governmentb),
      }));
      setChartData((prev) => ({
        ...prev,
        labels: [
          "Sip For Fixed Deposit",
          `Sip For Mutual Fund`,
          "Sip For Gold",
          "Sip For Stock Market",
          "Sip For Government Bond",
        ],
        datasets: [
          {
            label: "Sips",

            data: [
              Math.round(fd),
              Math.round(mutualfund),
              Math.round(gold),
              Math.round(stockmarket),
              Math.round(governmentb),
            ],
            backgroundColor: [
              "#FDCC03",
              "#4166EB",
              "#17D1BC",
              "#FF6263",
              "#fd9903",
            ],
            borderColor: [
              "#FDCC03",
              "#4166EB",
              "#17D1BC",
              "#FF6263",
              "#fd9903",
            ],
            borderWidth: 1,
          },
        ],
      }));
    }
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
              minvalue={currentquestion.min}
              pretitle={currentquestion.pretitle}
              posttitle={currentquestion.posttitle}
              code={currentquestion.code}
            />
          )}
          <div className={styles.buttons}>
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
            <p
              className={styles.next}
              onClick={() => {
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
                  sign={item.sign}
                  min={item.min}
                  max={item.max}
                  value={calcdata[item.code]}
                  setvalue={(e) =>
                    setcalcdata((prev) => ({ ...prev, [item.code]: e }))
                  }
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
            <Bar
              data={chartData}
              className={styles.chart}
              width={100}
              height={100}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
