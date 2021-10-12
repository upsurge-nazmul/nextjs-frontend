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
export default function CostOfRaisingCalc() {
  const [marriage, setmarriage] = useState();
  const [type, settype] = useState("");
  const [school, setschool] = useState();
  const [university, setuniversity] = useState("");
  const [college, setcollege] = useState("");
  const [extra, setextra] = useState(0);
  const [questions, setquestions] = useState([
    {
      title: "Select the city tier for school expenses",
      type: "select",
      value: school,
      setvalue: setschool,
      options: ["Tier 1", "Tier 2", "Tier 3"],
    },
    {
      title: "Select the city tier for marriage expenses",
      type: "select",
      value: marriage,
      setvalue: setmarriage,
      options: ["Tier 1", "Tier 2", "Tier 3"],
    },
    {
      title: "Select the city tier for college expenses",
      type: "select",
      value: college,
      setvalue: setcollege,
      options: ["Tier 1", "Tier 2", "Tier 3"],
    },
    {
      title: "Select the city tier for extra expenses",
      type: "select",
      value: extra,
      setvalue: setextra,
      options: ["Tier 1", "Tier 2", "Tier 3"],
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
    labels: ["Total Expense"],
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
  }, [type, university, marriage, college]);

  function emi() {
    let monthlyrate = 10 / 12 / 100;
    if (university === "Private") {
      monthlyrate = 14 / 12 / 100;
    }
    var months = marriage * 12;

    let schoolexpense = 0;
    let collegeexpense = 0;
    let marriageexpense = 0;
    let extraeexpense = 0;
    if (school === "Tier 1") {
      schoolexpense = 1512000;
    } else if (school === "Tier 2") {
      schoolexpense = 648000;
    } else {
      schoolexpense = 216000;
    }
    if (college === "Tier 1") {
      collegeexpense = 2000000;
    } else if (school === "Tier 2") {
      collegeexpense = 1500000;
    } else {
      collegeexpense = 1000000;
    }
    if (marriage === "Tier 1") {
      marriageexpense = 4000000;
    } else if (school === "Tier 2") {
      marriageexpense = 2000000;
    } else {
      marriageexpense = 800000;
    }
    if (extra === "Tier 1") {
      extraeexpense = 1080000;
    } else if (school === "Tier 2") {
      extraeexpense = 864000;
    } else {
      extraeexpense = 648000;
    }
    let res = extraeexpense + schoolexpense + collegeexpense + marriageexpense;

    setresultdata((prev) => ({
      heading1: "Total Expense",
      result1: Math.round(res),
    }));
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(res)],
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

        {marriage && school && extra && college ? (
          <ResultBox resultdata={resultdata} />
        ) : null}
      </div>

      {marriage && school && extra && college ? (
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
