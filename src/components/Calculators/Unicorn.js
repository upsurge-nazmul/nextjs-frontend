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
import RelativeSection from "./RelativeSection";
export default function Unicorn({ data }) {
  const [questions, setquestions] = useState([
    {
      title: "Select Industry type",
      type: "select",
      options: [
        "E-commerce",
        "F&B (Food and Beverages)",
        "Consumer Brands",
        "SaaS (Software as a service)",
        "AI & ML (Artificial Intelligence and Machine Learning)",
      ],
      code: "type",
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
    labels: ["Valuation"],
    datasets: [
      {
        label: "Valuation",
        data: [0, 0],
        backgroundColor: ["#4166EB", "#FDCC03"],
        borderColor: ["#4166EB", "#FDCC03"],
        borderWidth: 1,
      },
    ],
  });
  const [calcdata, setcalcdata] = useState({
    type: "E-commerce",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);

  function emi() {
    let valuation = 0;
    if (calcdata.type === "E-commerce") {
      valuation = 2;
    } else if (calcdata.type === "F&B (Food and Beverages)") {
      valuation = 5;
    } else if (calcdata.type === "Consumer Brands") {
      valuation = 7;
    } else if (calcdata.type === "SaaS (Software as a service)") {
      valuation = 8;
    } else if (
      calcdata.type === "AI & ML (Artificial Intelligence and Machine Learning)"
    ) {
      valuation = 10;
    }
    let revenue = 1000000000 / valuation;

    setresultdata((prev) => ({
      heading1: "",
      result1: `${Math.round(revenue).toLocaleString("en-IN", {
        currency: "INR",
      })} revenue needs to be reached `,
    }));
  }
  return (
    <>
      <div className={styles.calculatorComponent}>
        {/* <div className="leftsec">
        <ProgressVerticle
          questions={questions.length}
          current={current}
          setcurrent={setcurrent}
        />
      </div> */}

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
                    max={item.max ?? 10000000}
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
        {/* 
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
        ) : null} */}
      </div>
    </>
  );
}
