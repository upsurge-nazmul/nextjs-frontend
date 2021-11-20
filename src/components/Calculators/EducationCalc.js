import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import Select from "./Select";
import ProgressVerticle from "../ProgressVerticle";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import { ResponsivePie } from "@nivo/pie";
import { animated } from "@react-spring/web";
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
import changetoint from "../../helpers/currency";
export default function HomeCalc({ seterror, error }) {
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
      options: ["MBA", "Masters", "Undergraduate degree"],
    },
    {
      title: "Select the bank offering you education loan",
      type: "select",
      code: "bank",
      options: ["Public", "Private"],
    },
    {
      type: "input",
      title: "Enter the loan repayment duration",
      code: "years",
      min: 1,
      max: 7,
      posttitle: "years",
      range: true,
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
      options: ["MBA", "Masters", "Undergraduate degree"],
    },
    {
      title: "Select the bank offering you education loan",
      type: "select",
      code: "bank",
      options: ["Public", "Private"],
    },
    {
      type: "input",
      title: "Enter the loan repayment duration",
      code: "years",
      min: 1,
      max: 7,
      posttitle: "years",
      range: true,
    },
  ];
  const [editedata, setediteddata] = useState(null);
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
    country: "US",
    course: "MBA",
    bank: "Public",
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
  }, [calcdata, current]);

  useEffect(() => {
    setediteddata(null);
  }, [
    calcdata.type,
    calcdata.country,
    calcdata.course,
    calcdata.university,
    calcdata.bank,
  ]);
  useEffect(() => {
    if (editedata) {
      seterror("");
      emi();
    }
  }, [editedata]);

  function emi() {
    if (
      editedata &&
      editedata.principal !== undefined &&
      editedata.principal !== null
    ) {
      if (editedata.principal === "") {
        seterror("Cost of Course cannot be null");
      }
      if (changetoint(editedata.principal) < 100000) {
        seterror("Cost of Course cannot be less than 1,00,000");
      }
      if (changetoint(editedata.principal) > 200000000) {
        seterror("Cost of Course cannot be less than 20,00,00,000");
      }
    }
    if (!calcdata.years || calcdata.years <= 0) {
      seterror("Tenure of the loan cannot be less than 1 year");
    }
    let rr = 12;
    if (calcdata.bank === "Private") {
      rr = 14;
    }
    if (editedata)
      if (editedata.rate !== undefined && editedata.rate !== null) {
        rr = editedata.rate;

        if (editedata.rate === "" || editedata.rate < 1) {
          seterror("Rate cannot be less than 1");
        }
      }
    let monthlyrate = rr / 12 / 100;

    var months = changetoint(calcdata.years) * 12;

    let loanamount = 0;
    if (
      editedata &&
      editedata.principal !== undefined &&
      editedata.principal !== null
    ) {
      loanamount =
        editedata.principal === "" ? "" : changetoint(editedata.principal);
    } else {
      if (calcdata.type === "Indian") {
        if (calcdata.bank === "Private") {
          rr = 10.5;
          monthlyrate = 10.5 / 12 / 100;
        } else {
          rr = 8.5;

          monthlyrate = 8.5 / 12 / 100;
        }
        if (calcdata.university === "Private") {
          if (calcdata.course === "MBA") {
            loanamount = 3500000;
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
    }

    let emiamount =
      (loanamount * monthlyrate * Math.pow(1 + monthlyrate, months)) /
      (Math.pow(1 + monthlyrate, months) - 1);
    let totalpayment = emiamount * months;
    let intrest = totalpayment - loanamount;
    setresultdata((prev) => ({
      heading1: "Cost of Course",
      result1: Math.round(loanamount).toLocaleString("en-IN", {
        currency: "INR",
      }),
      editable1: true,
      max1: 200000000,
      min1: 100000,
      changecode1: "principal",
      heading2: "Interest Rate",
      result2: rr,
      sign2: "%",
      editable2: true,
      max2: 20,
      changecode2: "rate",
      min2: 5,
      heading3: "Total Interest Payable",
      heading4: `Total Payment
      (Principal + Interest)`,
      heading5: "Loan EMI",
      result3: Math.round(intrest).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result4: Math.round(totalpayment).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result5: Math.round(emiamount).toLocaleString("en-IN", {
        currency: "INR",
      }),
    }));
    setChartData([
      {
        id: "Interest",
        label: "Interest",
        value: Math.round(intrest),
        color: "rgb(253, 204, 3)",
      },
      {
        id: "Loan Amount",
        label: "Loan Amount",
        value: Math.round(loanamount),
        color: "#4166EB",
        tcolor: "#fff",
      },
    ]);
  }
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0;
    dataWithArc.forEach((datum) => {
      total += datum.value;
    });

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "clamp(14px,1vw,16px)",
          fontWeight: 600,
        }}
      >
        {"Total : ₹" + resultdata.result4}
      </text>
    );
  };

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
                  pretitle={item.pretitle}
                  posttitle={currentquestion.posttitle}
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
          {(!error || setediteddata) && (
            <ResultBox setediteddata={setediteddata} resultdata={resultdata} />
          )}
        </div>
      )}

      {!error && showresult ? (
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}>
            <ResponsivePie
              data={chartData}
              margin={{ top: 10, right: 80, bottom: 80, left: 80 }}
              startAngle={-180}
              padAngle={0.7}
              innerRadius={0.5}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ datum: "data.color" }}
              borderWidth={1}
              animate
              valueFormat={(value) =>
                changetoint(value).toLocaleString("en-IN", {
                  currency: "INR",
                })
              }
              borderColor={{ from: "color", modifiers: [["opacity", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#000000"
              arcLinkLabelsThickness={5}
              theme={{ fontSize: "15px", color: "black" }}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              enableArcLinkLabels={false}
              arcLabelsTextColor={{
                from: "data.tcolor",
              }}
              layers={[
                "arcs",
                "arcLabels",
                "arcLinkLabels",
                "legends",
                CenteredMetric,
              ]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#000000",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
              arcLabelsComponent={({ datum, label, style }) => (
                <animated.g
                  transform={style.transform}
                  style={{ pointerEvents: "none" }}
                >
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={style.textColor}
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    {(
                      (changetoint(label) / changetoint(resultdata.result4)) *
                      100
                    ).toFixed(2) + "%"}
                  </text>
                </animated.g>
              )}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgb(255, 255, 255)",
                  size: 1,
                  padding: 1,
                  stagger: false,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
