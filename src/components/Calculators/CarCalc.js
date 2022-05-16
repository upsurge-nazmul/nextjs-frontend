import React, { useEffect, useState, useContext } from "react";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import { ResponsivePie } from "@nivo/pie";
import { animated } from "@react-spring/web";
import { MainContext } from "../../context/Main";
import BigCalcInput from "./BigCalcInput";
import BigCalcDropdown from "./BigCalcDropdown";
import changetoint from "../../helpers/currency";
export default function CarCalc({ seterror, error }) {
  const { widthHeight } = useContext(MainContext);

  const [calcdata, setcalcdata] = useState({
    years: 1,
    type: "Sedan",
    onetimepayment: 0,
  });
  const [questions, setquestions] = useState([
    {
      title: "Select the type of car",
      type: "select",
      code: "type",
      options: ["Sedan", "Sports", "SUV", "Luxury", "Hatchback"],
    },
    {
      type: "input",
      title: "Enter the tenure of the loan",
      code: "years",
      min: 1,
      max: 10,
      range: true,
      posttitle: "years",
    },
    {
      type: "input",
      title: "Enter Down-Payment",
      min: 0,
      max: 1000000,
      code: "onetimepayment",
      pretitle: "₹",
      range: true,
    },
  ]);
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);
  const [editedata, setediteddata] = useState(null);

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
  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);

  useEffect(() => {
    setediteddata(null);
  }, [calcdata.type]);
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
        seterror("Indicative value cannot be null");
      }
      if (changetoint(editedata.principal) < 100000) {
        seterror("Indicative value cannot be less than 1,00,000");
      }
      if (changetoint(editedata.principal) > 200000000) {
        seterror("Indicative value cannot be less than 20,00,00,000");
      }
    }
    if (calcdata.years === "") {
      seterror("Tenure of the loan cannot be less than 1 year");
      return;
    }
    if (changetoint(calcdata.years) === 0) {
      seterror("Tenure of the loan cannot be less than 1 year");
      return;
    }
    if (calcdata.onetimepayment === "") {
      seterror("Down-Payment cannot be null");
      return;
    }
    let rr = 8;
    if (editedata)
      if (editedata.rate !== undefined && editedata.rate !== null) {
        rr = editedata.rate;

        if (editedata.rate === "" || editedata.rate < 1) {
          seterror("Rate cannot be less than 1");
        }
      }
    let monthlyrate = rr / 12 / 100;
    var months = calcdata.years * 12;

    let loanamount = 0;
    // Sedan, sports car, SUV, Luxury car, Hatchback
    if (
      editedata &&
      editedata.principal !== undefined &&
      editedata.principal !== null
    ) {
      loanamount =
        editedata.principal === "" ? "" : changetoint(editedata.principal);
      if (calcdata.onetimepayment) {
        if (changetoint(calcdata.onetimepayment) > loanamount) {
          setcalcdata((prev) => ({
            ...prev,
            onetimepayment: loanamount / 2 < 0 ? 0 : loanamount / 2,
          }));
        }
      }
    } else {
      if (calcdata.type === "Sedan") {
        loanamount = 1000000;
      } else if (calcdata.type === "Sports") {
        loanamount = 8000000;
        monthlyrate = 7 / 12 / 100;
        rr = 7;
      } else if (calcdata.type === "SUV") {
        loanamount = 1600000;
      } else if (calcdata.type === "Luxury") {
        loanamount = 4100000;
        monthlyrate = 7 / 12 / 100;
        rr = 7;
      } else if (calcdata.type === "Hatchback") {
        loanamount = 700000;
      }
    }

    let onetimequestion = questions[2];
    onetimequestion.max = loanamount / 2;
    let updatedarr = questions;
    updatedarr[2] = onetimequestion;
    setquestions(updatedarr);
    if (calcdata.onetimepayment) {
      loanamount = loanamount - changetoint(calcdata.onetimepayment);
    }
    let emiamount =
      (loanamount * monthlyrate * Math.pow(1 + monthlyrate, months)) /
      (Math.pow(1 + monthlyrate, months) - 1);
    let totalpayment = emiamount * months;
    let intrest = totalpayment - loanamount;
    setresultdata((prev) => ({
      heading1: "The indicative value for car is",
      result1: Math.round(
        changetoint(calcdata.onetimepayment)
          ? changetoint(calcdata.onetimepayment) + parseInt(loanamount)
          : loanamount
      ).toLocaleString("en-IN", {
        currency: "INR",
      }),
      editable1: true,
      max1: 50000000,
      min1: 100000,
      changecode1: "principal",
      heading3: "Interest Rate",
      result3: rr,
      sign3: "%",
      editable3: true,
      max3: 20,
      changecode3: "rate",
      min3: 5,
      heading4: "Total Interest Payable",
      heading5: `Total Payment
      (Principal + Interest)`,
      heading6: "Loan EMI",
      result4: Math.round(intrest).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result5: Math.round(totalpayment).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result6: Math.round(emiamount).toLocaleString("en-IN", {
        currency: "INR",
      }),
      heading2: "Principal Amount",
      result2: parseInt(loanamount).toLocaleString("en-IN", {
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
  const { theme } = useContext(MainContext);
  return (
    <div
      className={`${styles.calculatorComponent} ${
        theme === "dark" && styles.darkcalculatorComponent
      }`}
    >
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
          {(!error || setediteddata) && (
            <ResultBox
              setediteddata={setediteddata}
              calcfunction={emi}
              resultdata={resultdata}
            />
          )}
        </div>
      )}

      {!error && showresult ? (
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}>
            <ResponsivePie
              data={chartData}
              margin={{
                top: 0,
                right:
                  widthHeight.width > 860
                    ? widthHeight.height < 500
                      ? 0
                      : 80
                    : 10,
                bottom:
                  widthHeight.width > 860
                    ? widthHeight.height < 500
                      ? 0
                      : 80
                    : 10,
                left:
                  widthHeight.width > 860
                    ? widthHeight.height < 500
                      ? 0
                      : 80
                    : 10,
              }}
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
                      (changetoint(label) / changetoint(resultdata.result5)) *
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
