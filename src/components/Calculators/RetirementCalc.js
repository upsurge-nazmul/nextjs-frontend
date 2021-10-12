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
export default function Retirement() {
  const [money, setmoney] = useState(1);
  const [type, settype] = useState(0);
  const [age, setage] = useState(18);
  const [country, setcountry] = useState("");
  const [course, setcourse] = useState(0);
  const [questions, setquestions] = useState([
    {
      title: "Expected age of retirement",
      type: "select",
      value: type,
      setvalue: settype,
      options: [40, 45, 60, 65],
    },
    {
      title: "Current age",
      type: "input",
      value: age,
      setvalue: setage,
      min: 18,
      max: 79,
      sign: "years",
    },
    {
      title: "Money required monthly",
      type: "input",
      setvalue: setmoney,
      value: money,
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
  }, [type, age, money, country]);

  function emi() {
    let remaininglife = 80 - age;
    let monthlyinvestment = (money * remaininglife) / type;

    setresultdata((prev) => ({
      heading1: "",
      result1: `${Math.round(
        monthlyinvestment
      )} Should be your monthly investment and should grow each year with 7%.`,
    }));
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(monthlyinvestment), Math.round(money)],
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
          if (type === "Indian" && item.title === "Select Region") {
            return null;
          } else if (type === "Foreign" && item.title === "age type") {
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

        {money && type && age ? <ResultBox resultdata={resultdata} /> : null}
      </div>

      {money && type && age ? (
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
