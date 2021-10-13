import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import Select from "./Select";
import ProgressVerticle from "../ProgressVerticle";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import SelectInput from "./SelectInput";
export default function InvestmentComparison() {
  const [year1, setyear1] = useState(1);
  const [year2, setyear2] = useState(1);
  const [type1, settype1] = useState("");
  const [type2, settype2] = useState("");
  const [amount1, setamount1] = useState();
  const [amount2, setamount2] = useState();
  const [questions, setquestions] = useState([
    {
      title: "Select the First Investment Type",
      type: "select",
      value: type1,
      setvalue: settype1,
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
      value: type2,
      setvalue: settype2,
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
      setvalue: setyear1,
      value: year1,
      min: 1,
      max: 70,
      sign: "years",
    },
    {
      type: "input",
      title: "Enter the time duration of the second investment ?",
      setvalue: setyear2,
      value: year2,
      min: 1,
      max: 70,
      sign: "years",
    },
    {
      type: "input",
      title: "Enter the principal amount invested in the first investment?",
      setvalue: setamount1,
      value: amount1,
      min: 1,
      max: 10000000,
      sign: "₹",
    },
    {
      type: "input",
      title: "Enter the principal amount invested in the second investment?",
      setvalue: setamount2,
      value: amount2,
      min: 1,
      max: 10000000,
      sign: "₹",
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
  }, [type1, type2, amount1, amount2, year1, year2]);

  function emi() {
    let intrest1 = 0;
    let intrest2 = 0;
    if (type1 === "Fixed deposit") {
      intrest1 = 5 / 100;
    } else if (type1 === "Mutual Fund") {
      intrest1 = 10.4 / 100;
    } else if (type1 === "Gold") {
      intrest1 = 10 / 100;
    } else if (type1 === "Stock market") {
      intrest1 = 13.9 / 100;
    } else {
      intrest1 = 3.65 / 100;
    }
    if (type2 === "Fixed deposit") {
      intrest2 = 5 / 100;
    } else if (type2 === "Mutual Fund") {
      intrest2 = 10.4 / 100;
    } else if (type2 === "Gold") {
      intrest2 = 10 / 100;
    } else if (type2 === "Stock market") {
      intrest2 = 13.9 / 100;
    } else {
      intrest2 = 3.65 / 100;
    }
    let result1 = amount1 * Math.pow(1 + intrest1, year1);
    let result2 = amount2 * Math.pow(1 + intrest2, year2);
    setresultdata((prev) => ({
      heading1: "Total Amount for " + type1,
      heading2: "Total Amount for " + type2,
      result1: Math.round(result1),
      result2: Math.round(result2),
    }));
    setChartData((prev) => ({
      ...prev,
      labels: ["Total Amount for " + type1, "Total Amount for " + type2],
      datasets: [
        {
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
      <div className={styles.inputSection}>
        {questions.map((item, index) => {
          if (item.type === "select") {
            return (
              <Select
                question={item.title}
                options={item.options}
                value={item.value}
                setvalue={item.setvalue}
                current={current}
                setcurrent={setcurrent}
                index={index}
                total={questions.length - 1}
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

        {year1 && year2 && type1 && type2 && amount1 && amount2 ? (
          <ResultBox resultdata={resultdata} />
        ) : null}
      </div>

      {year1 && year2 && type1 && type2 && amount1 && amount2 ? (
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}>
            <Doughnut
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
