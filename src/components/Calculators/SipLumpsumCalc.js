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
      setvalue: setamount,
      value: amount,
      min: 1,
      max: 10000000,
      sign: "₹",
    },
    {
      title: "Investment Duration",
      type: "input",
      setvalue: setyear,
      value: years,
      min: 1,
      max: 80,
      sign: "years",
    },
    {
      title: "Investment Type",
      type: "select",
      value: type,
      setvalue: settype,
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
    labels: ["Intrest", "Loan Amount"],
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

  useEffect(() => {
    emi();
    setresult(true);
  }, [type, amount, years]);

  function emi() {
    let fd = amount / Math.pow(1 + 5 / 100, years);
    let mutualfund = amount / Math.pow(1 + 10.4 / 100, years);
    let gold = amount / Math.pow(1 + 10 / 100, years);
    let stockmarket = amount / Math.pow(1 + 13.9 / 100, years);
    let governmentb = amount / Math.pow(1 + 3.65 / 100, years);
    if (type === "Fixed deposit") {
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
    } else if (type === "Mutual Fund") {
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
    } else if (type === "Gold") {
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
    } else if (type === "Stock market") {
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
    } else if (type === "Government Bond") {
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
      <div className={styles.inputSection}>
        {questions.map((item, index) => {
          if (type === "Indian" && item.title === "Select Region") {
            return null;
          } else if (type === "Foreign" && item.title === "University type") {
            return null;
          } else if (item.type === "select") {
            return (
              <Select
                question={item.title}
                options={item.options}
                value={item.value}
                setvalue={item.setvalue}
                current={current}
                setcurrent={setcurrent}
                index={index}
                total={
                  type !== "Apartment"
                    ? questions.length - 2
                    : questions.length - 1
                }
              />
            );
          } else if (item.type === "input") {
            return (
              <SelectInput
                question={item.title}
                index={index}
                value={item.value}
                current={current}
                setcurrent={setcurrent}
                setvalue={item.setvalue}
                min={item.min}
                max={item.max}
                sign={item.sign}
              />
            );
          }
        })}

        {years && type && amount ? <ResultBox resultdata={resultdata} /> : null}
      </div>

      {years && type && amount ? (
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
