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
export default function CollegeLifeCalc({ seterror }) {
  const [years, setyear] = useState(1);
  const [type, settype] = useState("");
  const [university, setuniversity] = useState("");
  const [country, setcountry] = useState("");
  const [course, setcourse] = useState(0);
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
      title: "Enter the loan repayment duration",
      code: "years",
      min: 1,
      max: 70,
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
      title: "Enter the loan repayment duration",
      code: "years",
      min: 1,
      max: 7,
      sign: "years",
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
    years: 1,
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
  }, [calcdata]);

  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);

  function emi() {
    if (!calcdata.years) {
      seterror("The loan repayment duration cannot be less than 1 year");
    }
    let monthlyrate = 10 / 12 / 100;
    if (university === "Private") {
      monthlyrate = 14 / 12 / 100;
    }
    var months = calcdata.years * 12;

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

    let emiamount =
      (loanamount * monthlyrate * Math.pow(1 + monthlyrate, months)) /
      (Math.pow(1 + monthlyrate, months) - 1);
    let totalpayment = emiamount * months;
    let intrest = totalpayment - loanamount;
    setresultdata((prev) => ({
      heading1: "Total Interest Payable",
      heading2: `Total Payment
      (Principal + Interest)`,
      heading3: "Loan EMI",
      result1: Math.round(intrest).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result2: Math.round(totalpayment).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result3: Math.round(emiamount).toLocaleString("en-IN", {
        currency: "INR",
      }),
    }));
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(intrest), Math.round(loanamount)],
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
