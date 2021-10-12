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
export default function BigMacCalc() {
  const [inrmoney, setyear] = useState(1);
  const [type, settype] = useState("");
  const [university, setuniversity] = useState("");
  const [country, setcountry] = useState("");
  const [course, setcourse] = useState(0);
  const [questions, setquestions] = useState([
    {
      type: "input",
      title: "Enter the amount",
      setvalue: setyear,
      value: inrmoney,
      min: 1,
      max: 10000000,
      sign: "₹",
    },
    {
      title: "Select Country",
      type: "select",
      value: country,
      setvalue: setcountry,
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

  useEffect(() => {
    emi();
    setresult(true);
  }, [type, university, inrmoney, country]);

  function emi() {
    let bigmac = 0;
    if (country === "Singapore") {
      bigmac = 4.31;
    } else if (country === "UK") {
      bigmac = 4.75;
    } else if (country === "US") {
      bigmac = 5.65;
    } else if (country === "Canada") {
      bigmac = 5.31;
    } else if (country === "Australia") {
      bigmac = 4.79;
    } else if (country === "Japan") {
      bigmac = 3.55;
    }
    let ratio = 2.55 / bigmac;
    var money = inrmoney * ratio;

    setresultdata((prev) => ({
      heading1: "Total Money (INR)",
      heading2: `Worth in ${country}`,
      result1: Math.round(inrmoney),
      result2: Math.round(money),
    }));
    setChartData((prev) => ({
      ...prev,
      labels: ["Total Money (INR)", `Worth in ${country}`],
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(money), Math.round(inrmoney)],
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

        {inrmoney && country ? <ResultBox resultdata={resultdata} /> : null}
      </div>

      {inrmoney && country ? (
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
