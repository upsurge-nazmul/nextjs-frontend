import React, { useEffect, useState } from "react";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
import changetoint from "../../helpers/currency";
export default function EducationInvestmentCalc({ seterror, error }) {
  const [questions, setquestions] = useState([
    {
      title: "Select the type of university ",
      type: "select",
      code: "type",
      options: ["Indian", "Foreign"],
    },
    {
      title: "University type",
      type: "select",
      code: "university",
      options: ["Public", "Private"],
    },
    {
      title: "Select Region",
      type: "select",
      code: "country",
      options: ["US", "Australia", "Europe", "Asia"],
    },
    {
      title: "Select Course",
      type: "select",
      code: "course",
      options: ["MBA", "Masters", "Undergradate degree"],
    },

    {
      type: "input",
      title: "Years remaining in admission",
      code: "years",
      min: 1,
      max: 6,
      range: true,
      posttitle: "years",
    },
  ]);
  const backupquestions = [
    {
      title: "Select the type of university ",
      type: "select",
      code: "type",
      options: ["Indian", "Foreign"],
    },
    {
      title: "University type",
      type: "select",
      code: "university",
      options: ["Public", "Private"],
    },
    {
      title: "Select Region",
      type: "select",
      code: "country",
      options: ["US", "Australia", "Europe", "Asia"],
    },
    {
      title: "Select Course",
      type: "select",
      code: "course",
      options: ["MBA", "Masters", "Undergrad"],
    },

    {
      type: "input",
      title: "Years remaining in admission",
      code: "years",
      min: 1,
      max: 6,
      posttitle: "years",
      range: true,
    },
  ];
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
    labels: ["Monthly Investment"],
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
    type: "Indian",
    university: "Public",
    country: "US",
    course: "MBA",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    if (calcdata.course === "Undergrad") {
      let x = questions[questions.findIndex((item) => item.code === "years")];
      x.max = 18;
      questions[questions.findIndex((item) => item.code === "years")] = x;
      setquestions(questions);
    } else {
      let x = questions[questions.findIndex((item) => item.code === "years")];
      x.max = 6;
      questions[questions.findIndex((item) => item.code === "years")] = x;
      setquestions(questions);
    }
    setcalcdata((prev) => ({ ...prev, years: 1 }));
  }, [calcdata.course]);
  useEffect(() => {
    if (calcdata.type !== "Indian") {
      setquestions(
        backupquestions.filter((item) => item.code !== "university")
      );
    } else {
      setquestions(backupquestions.filter((item) => item.code !== "country"));
    }
  }, [calcdata.type]);
  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
  }, [calcdata, current]);
  function emi() {
    if (!calcdata.years) {
      seterror("Years remaining in admission cannot be less than 1 year");
    }
    let loanamount = 0;
    if (calcdata.type === "Indian") {
      if (calcdata.university === "Private") {
        if (calcdata.course === "MBA") {
          loanamount = 4500000;
        } else if (calcdata.course === "Masters") {
          loanamount = 400000;
        } else {
          loanamount = 2000000;
        }
      } else {
        if (calcdata.course === "MBA") {
          loanamount = 2400000;
        } else if (calcdata.course === "Masters") {
          loanamount = 400000;
        } else {
          loanamount = 1000000;
        }
      }
    } else {
      if (calcdata.country === "Australia") {
        if (calcdata.course === "MBA") {
          loanamount = 3750000;
        } else if (calcdata.course === "Masters") {
          loanamount = 1500000;
        } else {
          loanamount = 8000000;
        }
      } else if (calcdata.country === "Europe") {
        if (calcdata.course === "MBA") {
          loanamount = 4500000;
        } else if (calcdata.course === "Masters") {
          loanamount = 500000;
        } else {
          loanamount = 500000;
        }
      } else if (calcdata.country === "Asia") {
        if (calcdata.course === "MBA") {
          loanamount = 7000000;
        } else if (calcdata.course === "Masters") {
          loanamount = 1950000;
        } else {
          loanamount = 4000000;
        }
      } else {
        if (calcdata.course === "MBA") {
          loanamount = 15000000;
        } else if (calcdata.course === "Masters") {
          loanamount = 3000000;
        } else {
          loanamount = 9000000;
        }
      }
    }

    let monthlyinvestment = loanamount / (12 * calcdata.years);

    setresultdata((prev) => ({
      heading1: "",
      result1: `To save ₹${loanamount.toLocaleString("en-IN", {
        currency: "INR",
      })} in ${
        changetoint(calcdata.years) > 1
          ? calcdata.years + " years"
          : calcdata.years + " year"
      } your monthly investment should be ₹${Math.round(
        monthlyinvestment
      ).toLocaleString("en-IN", {
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
              maxvalue={currentquestion.max}
              minvalue={currentquestion.min}
              pretitle={currentquestion.pretitle}
              posttitle={currentquestion.posttitle}
              code={currentquestion.code}
              range={currentquestion.range}
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
          {!error && <ResultBox resultdata={resultdata} />}
        </div>
      )}
    </div>
  );
}
