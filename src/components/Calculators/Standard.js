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
import changetoint from "../../helpers/currency";
export default function Standard({ seterror, error }) {
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
      title: "How frequently do you dine out ?",
      type: "input",
      code: "dineout",
      min: 0,
      max: 100,
    },
    {
      title: "Select preferred mode of transport?",
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
      title: "How frequently do you dine out ?",
      type: "input",
      code: "dineout",
      min: 0,
      max: 100,
    },
    {
      title: "Select preferred mode of transport?",
      type: "select",
      code: "transport",
      options: ["Public", "Private"],
    },

    {
      type: "select",
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
    vehicle: "Car",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
  }, [calcdata, current]);
  useEffect(() => {
    if (calcdata.transport !== "Private") {
      setquestions(backupquestions.filter((item) => item.code !== "vehicle"));
    } else {
      setquestions(backupquestions);
    }
  }, [calcdata.transport]);
  function emi() {
    if (calcdata.dineout === "") {
      seterror("No. of dining outs are required");
    }
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

    let total =
      600 * changetoint(calcdata.dineout) + groceries + misc + rent + transport;

    setresultdata((prev) => ({
      heading1: "",
      result1: `Monthly Expense: ₹ ${Math.round(total).toLocaleString("en-IN", {
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
              maxvalue={currentquestion.max}
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
                if (!error) {
                  if (current !== questions.length - 1) {
                    setcurrent(current + 1);
                  } else {
                    setshowresult(true);
                  }
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
