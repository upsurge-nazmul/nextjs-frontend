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
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
import changetoint from "../../helpers/currency";
export default function CollegeLifeCalc({ seterror, error }) {
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
      options: ["MBA", "Masters", "Undergrad"],
    },

    {
      type: "input",
      title: "Enter estimated monthly earning",
      code: "earnings",
      min: 1000,
      max: 10000000,
      range: "years",
      pretitle: "₹",
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
      title: "Enter estimated monthly earning",
      code: "earnings",
      min: 1000,
      max: 10000000,
      range: "years",
      pretitle: "₹",
    },
  ];
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
    labels: ["Interest", "Loan Amount"],
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
    earnings: 1000,
    type: "Indian",
    university: "Public",
    course: "MBA",
    country: "US",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

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
    setresult(true);
  }, [calcdata, current]);

  function emi() {
    if (calcdata.earnings === "") {
      seterror("Estimated earnings is required");
    }
    let monthlyrate = 10 / 12 / 100;
    if (calcdata.university === "Private") {
      monthlyrate = 14 / 12 / 100;
    }
    var months = calcdata.years * 12;

    let loanamount = 0;
    if (calcdata.type === "Indian") {
      if (calcdata.university === "Private") {
        if (calcdata.course === "MBA") {
          loanamount = 145834;
        } else if (calcdata.course === "Masters") {
          loanamount = 16667;
        } else {
          loanamount = 41667;
        }
      } else {
        if (calcdata.course === "MBA") {
          loanamount = 100000;
        } else if (calcdata.course === "Masters") {
          loanamount = 16666;
        } else {
          loanamount = 20834;
        }
      }
      loanamount = loanamount + 10000;
    } else {
      if (calcdata.country === "Australia") {
        if (calcdata.course === "MBA") {
          loanamount = 156250;
        } else if (calcdata.course === "Masters") {
          loanamount = 62500;
        } else {
          loanamount = 166667;
        }
        loanamount = loanamount + 25000;
      } else if (calcdata.country === "Europe") {
        if (calcdata.course === "MBA") {
          loanamount = 187500;
        } else if (calcdata.course === "Masters") {
          loanamount = 20833;
        } else {
          loanamount = 10417;
        }
        loanamount = loanamount + 60000;
      } else if (calcdata.country === "Asia") {
        if (calcdata.course === "MBA") {
          loanamount = 291667;
        } else if (calcdata.course === "Masters") {
          loanamount = 81250;
        } else {
          loanamount = 83333;
        }
        loanamount = loanamount + 45000;
      } else {
        if (calcdata.course === "MBA") {
          loanamount = 625000;
        } else if (calcdata.course === "Masters") {
          loanamount = 125000;
        } else {
          loanamount = 187500;
        }
        loanamount = loanamount + 60000;
      }
    }

    let res = loanamount - changetoint(calcdata.earnings);

    setresultdata((prev) => ({
      heading1: "",
      result1:
        res > 0
          ? `You will have to take a loan of ₹ ${Math.round(res).toLocaleString(
              "en-IN",
              { currency: "INR" }
            )}`
          : `Congratulations, You will save ₹ ${Math.round(
              Math.abs(res)
            ).toLocaleString("en-IN", {
              currency: "INR",
            })} each month during your college life`,
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
          <ResultBox resultdata={resultdata} />
        </div>
      )}
    </div>
  );
}
