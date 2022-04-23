import React, { useEffect, useState } from "react";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
import changetoint from "../../helpers/currency";
export default function CostOfRaisingCalc() {
  const [questions, setquestions] = useState([
    {
      title: "Select the city tier for school expenses",
      type: "select",
      code: "school",
      options: ["Tier 1", "Tier 2", "Tier 3"],
    },
    {
      title: "Select the city tier for college expenses",
      type: "select",
      code: "college",
      options: ["Tier 1", "Tier 2", "Tier 3"],
    },
    {
      title: "Select the city tier for marriage expenses",
      type: "select",
      code: "marriage",
      options: ["Tier 1", "Tier 2", "Tier 3"],
    },
    {
      title: "Select the city tier for extra expenses",
      type: "select",
      code: "extra",
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

  const [calcdata, setcalcdata] = useState({
    school: "Tier 2",
    marriage: "Tier 2",
    extra: "Tier 2",
    college: "Tier 2",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);

  function emi() {
    let schoolexpense = 0;
    let collegeexpense = 0;
    let marriageexpense = 0;
    let extraeexpense = 0;
    if (calcdata.school === "Tier 1") {
      schoolexpense = 1920000;
    } else if (calcdata.school === "Tier 2") {
      schoolexpense = 1344000;
    } else {
      schoolexpense = 768000;
    }
    if (calcdata.college === "Tier 1") {
      collegeexpense = 2000000;
    } else if (calcdata.college === "Tier 2") {
      collegeexpense = 1500000;
    } else {
      collegeexpense = 1000000;
    }
    if (calcdata.marriage === "Tier 1") {
      marriageexpense = 4000000;
    } else if (calcdata.marriage === "Tier 2") {
      marriageexpense = 2000000;
    } else {
      marriageexpense = 800000;
    }
    if (calcdata.extra === "Tier 1") {
      extraeexpense = 1080000;
    } else if (calcdata.extra === "Tier 2") {
      extraeexpense = 864000;
    } else {
      extraeexpense = 648000;
    }
    let res = extraeexpense + schoolexpense + collegeexpense + marriageexpense;

    setresultdata((prev) => ({
      heading1: "",
      result1: `Total Expense ₹${Math.round(res).toLocaleString("en-IN", {
        currency: "INR",
      })}`,
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
                    setcalcdata((prev) => ({
                      ...prev,
                      [item.code]: changetoint(e).toLocaleString("en-IN", {
                        currency: "INR",
                      }),
                    }))
                  }
                />
              );
            }
          })}
          <ResultBox resultdata={resultdata} />
        </div>
      )}
    </div>
  );
}
