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
export default function Standard() {
  const [questions, setquestions] = useState([
    {
      title: "Select City",
      type: "select",
      code: "city",
      options: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
    },
    {
      title: "Select home type",
      type: "select",
      code: "type",
      options: ["Shared", "Personal"],
    },
    {
      title: "How frequently you dine out ?",
      type: "input",
      code: "dineout",
    },
    {
      title: "Select preferred transport",
      type: "select",
      code: "transport",
      options: ["Public", "Private"],
    },

    {
      type: "input",
      title: "Select transport vehicle",
      code: "vehicle",
      options: ["Car", "Bike"],
    },
  ]);
  const backupquestions = [
    {
      title: "Select City",
      type: "select",
      code: "city",
      options: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
    },
    {
      title: "Select home type",
      type: "select",
      code: "type",
      options: ["Shared", "Personal"],
    },
    {
      title: "How frequently you dine out ?",
      type: "input",
      code: "dineout",
    },
    {
      title: "Select preferred transport",
      type: "select",
      code: "transport",
      options: ["Public", "Private"],
    },

    {
      type: "input",
      title: "Select transport vehicle",
      code: "vehicle",
      options: ["Car", "Bike"],
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
    city: "Delhi",
    type: "Shared",
    transport: "Public",
    dineout: 1,
    vehicle: "Bike",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);
  useEffect(() => {
    if (calcdata.transport !== "Private") {
      setquestions(backupquestions.filter((item) => item.code !== "vehicle"));
    } else {
      setquestions(questions);
    }
  }, [calcdata]);
  useEffect(() => {
    setcurrentquestion(questions[current]);
    emi();
  }, [calcdata, current]);
  function emi() {
    let loanamount = 0;
    let groceries = 2500;
    let misc = 0;
    let rent = 0;
    let transport = 0;
    if (calcdata.city === "Delhi" || calcdata.city === "Mumbai") {
      groceries = 3000;
    }

    if (calcdata.city === "Delhi") {
      misc = 4000;
      if (calcdata.transport === "Public") {
        transport = 3000;
      } else {
        if (calcdata.vehicle === "Car") {
          transport = 10000;
        } else {
          transport = 3000;
        }
      }
      if (calcdata.type === "Shared") {
        rent = 5000;
      } else {
        rent = 12500;
      }
    } else if (calcdata.city === "Mumbai") {
      misc = 7000;
      if (calcdata.transport === "Public") {
        transport = 3000;
      } else {
        if (calcdata.vehicle === "Car") {
          transport = 10000;
        } else {
          transport = 3000;
        }
      }
      if (calcdata.type === "Shared") {
        rent = 9000;
      } else {
        rent = 20000;
      }
    } else if (calcdata.city === "Bangalore") {
      misc = 6000;
      if (calcdata.transport === "Public") {
        transport = 3000;
      } else {
        if (calcdata.vehicle === "Car") {
          transport = 8000;
        } else {
          transport = 3000;
        }
      }
      if (calcdata.type === "Shared") {
        rent = 7000;
      } else {
        rent = 10000;
      }
    } else if (calcdata.city === "Chennai") {
      misc = 5000;
      if (calcdata.transport === "Public") {
        transport = 1500;
      } else {
        if (calcdata.vehicle === "Car") {
          transport = 6000;
        } else {
          transport = 3000;
        }
      }
      if (calcdata.type === "Shared") {
        rent = 4000;
      } else {
        rent = 7000;
      }
    } else {
      misc = 5000;
      if (calcdata.transport === "Public") {
        transport = 2000;
      } else {
        if (calcdata.vehicle === "Car") {
          transport = 10000;
        } else {
          transport = 3000;
        }
      }
      if (calcdata.type === "Shared") {
        rent = 3500;
      } else {
        rent = 8000;
      }
    }

    let total = 600 * calcdata.dineout + groceries + misc + rent + transport;

    setresultdata((prev) => ({
      heading1: "Monthly Expense",
      result1: Math.round(total),
    }));
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "Monthly Expense",
          data: [Math.round(total)],
          backgroundColor: ["#FDCC03"],
          borderColor: ["#FDCC03"],
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
