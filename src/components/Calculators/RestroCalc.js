import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
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
import changetoint from "../../helpers/currency";
export default function RestroCalc({ data }) {
  const [questions, setquestions] = useState([
    {
      title: "Type of restaurant",
      type: "select",
      options: [
        "Indian",
        "Chi-Indian",
        "Asian",
        "Continental",
        "Burgers",
        "Pizzas",
      ],
      code: "type",
    },
    {
      title: "Select property type",
      type: "select",
      options: ["Owned", "Leased from Cloud Kitchen Companies"],
      code: "property",
    },
    {
      title: "Select the size of restaurant",
      type: "select",
      options: [
        "Small (250 sq. ft)",
        "Medium (500 sq. ft)",
        "Big (750 sq. ft)",
      ],
      code: "size",
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
    labels: ["Orders", "Lumpsum Required to start today"],
    datasets: [
      {
        label: ["Orders", "Lumpsum Required to start today"],
        data: [0, 0],
        backgroundColor: ["#4166EB", "#FDCC03"],
        borderColor: ["#4166EB", "#FDCC03"],
        borderWidth: 1,
      },
    ],
  });
  const [calcdata, setcalcdata] = useState({
    type: "Indian",
    size: "Small (250 sq. ft)",
    property: "Owned",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);

  function emi() {
    let monthlyrate = 12 / 12 / 100;
    var months = calcdata.years * 12;
    let brandingcost = 90000;
    let equipmentcost = 0;
    let rent = 0;
    let foodcost = 0.3;
    let ticketsize = 0;
    let discount = 0.05;
    let commision = 0.22;
    if (calcdata.property === "Owned") {
      if (calcdata.size === "Small (250 sq. ft)") {
        equipmentcost = 1500 * (250 / 2);
        rent = 100 * 250;
      } else if (calcdata.size === "Medium (500 sq. ft)") {
        equipmentcost = 1500 * (500 / 2);
        rent = 100 * 500;
      } else {
        equipmentcost = 1500 * (750 / 2);
        rent = 100 * 750;
      }
    } else {
      if (calcdata.size === "Small (250 sq. ft)") {
        equipmentcost = 800 * (250 / 2);
        rent = 150 * 250;
      } else if (calcdata.size === "Medium (500 sq. ft)") {
        equipmentcost = 800 * (500 / 2);
        rent = 150 * 500;
      } else {
        equipmentcost = 800 * (750 / 2);
        rent = 150 * 750;
      }
    }
    let workingcapital = 0;

    if (calcdata.type === "Indian") {
      workingcapital = 70000;
      ticketsize = 500;
    } else if (calcdata.type === "Chi-Indian") {
      workingcapital = 60000;
      ticketsize = 400;
    } else if (calcdata.type === "Asian") {
      workingcapital = 87500;
      ticketsize = 700;
    } else if (calcdata.type === "Continental") {
      workingcapital = 87500;
      ticketsize = 300;
    } else if (calcdata.type === "Burgers") {
      workingcapital = 50000;
      ticketsize = 300;
      equipmentcost = equipmentcost - 50000;
    } else {
      workingcapital = 50000;
      ticketsize = 400;
      equipmentcost = equipmentcost - 50000;
    }
    workingcapital = workingcapital + brandingcost;
    let Lumpsum = equipmentcost + 6 * workingcapital + 6 * rent;
    let totalmonthly = workingcapital + rent;
    let orders =
      totalmonthly / (ticketsize * (1 - foodcost - discount - commision));

    setresultdata((prev) => ({
      heading1: "",
      heading2: ``,
      heading3: ``,
      result1: `Lumpsum amount of ₹${Math.round(Lumpsum).toLocaleString(
        "en-IN",
        {
          currency: "INR",
        }
      )} is required to start today`,
      result2: `Monthly expenditure : ₹ ${Math.round(
        totalmonthly
      ).toLocaleString("en-IN", {
        currency: "INR",
      })}`,
      result3: `Break-even analysis (Orders) : ${Math.round(
        orders
      ).toLocaleString("en-IN", {
        currency: "INR",
      })} per month`,
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
            <ResultBox resultdata={resultdata} onlyText />
          </div>
        )}

        {/* {showresult ? (
          <div className={styles.chartSection}>
            <div className={styles.chartContainer}>
              <PolarArea
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
