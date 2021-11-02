import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ResultBox from "./ResultBox";
import Select from "./Select";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import SelectInput from "./SelectInput";
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
import Progress from "../Progress";
import InputBlock from "./InputBlock";
import DropBox from "./DropBox";
export default function BigMacCalc({ seterror }) {
  const [inrmoney, setyear] = useState(1);
  const [type, settype] = useState("");
  const [university, setuniversity] = useState("");
  const [country, setcountry] = useState("");
  const [questions, setquestions] = useState([
    {
      type: "input",
      title: "Enter the amount",
      code: "inrmoney",
      min: 1,
      max: 10000000,
      sign: "₹",
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
    inrmoney: 1,
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
    if (!calcdata.inrmoney) {
      seterror("Amount is required");
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
    var money = calcdata.inrmoney * ratio;

    setresultdata((prev) => ({
      heading1: "Total Money (INR)",
      heading2: `Worth in ${country}`,
      result1: Math.round(calcdata.inrmoney),
      result2: Math.round(money),
    }));
    setChartData((prev) => ({
      ...prev,
      labels: ["Total Money (INR)", `Worth in ${calcdata.country}`],
      datasets: [
        {
          label: "Worth Comparision",
          data: [Math.round(calcdata.inrmoney), Math.round(money)],
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
