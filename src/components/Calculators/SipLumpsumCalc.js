import React, { useContext, useEffect, useState } from "react";
import { BarExtendedDatum, ResponsiveBar } from "@nivo/bar";
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
import { MainContext } from "../../context/Main";
export default function HomeCalc({ seterror, error }) {
  const [questions, setquestions] = useState([
    {
      title: "Investment Method",
      type: "select",
      code: "method",
      options: ["SIP", "Lumpsum"],
    },
    {
      type: "input",
      title: "Enter money needed in future.",
      code: "amount",
      min: 10000,
      max: 100000000,
      pretitle: "₹",
      range: true,
    },
    {
      title: "When will you need the money ?",
      type: "input",
      code: "years",
      min: 1,
      max: 80,
      posttitle: "years",
      range: true,
    },
    {
      title: "Investment Type",
      type: "select",
      code: "type",
      options: [
        "All",
        "Fixed deposit",
        "Mutual Fund",
        "Gold",
        "Stock market",
        "Government Bond",
      ],
    },
  ]);
  const [result, setresult] = useState(false);
  const [current, setcurrent] = useState(0);
  const [resultdata, setresultdata] = useState({
    heading1: "Invested Amount",
    heading2: "Returns",
    heading3: "Total Value",
    heading4: "Monthy SIP",
    result1: "",
    result2: "",
    result3: "",
    result4: "",
  });
  const [chartData, setChartData] = useState([
    {
      type: "Fixed Deposit",
      value: 161,
      color: "#FDCC03",
    },
    {
      type: "Mutual Fund",
      value: 161,
      color: "#4166EB",
    },
    {
      type: "Gold",
      value: 161,
      color: "#17D1BC",
    },
    {
      type: "Stock Market",
      value: 161,
      color: "#FF6263",
    },
    {
      type: "Government Bond",
      value: 161,
      color: "#ff9900",
    },
  ]);
  const [calcdata, setcalcdata] = useState({
    years: 1,
    type: "All",
    amount: 10000,
    method: "SIP",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);

  function emi() {
    if (!calcdata.years || calcdata.years <= 0) {
      seterror("Investment Duration cannot be less than 1 year");
    }
    if (!changetoint(calcdata.amount) || changetoint(calcdata.amount) <= 1000) {
      seterror("Money needed in future shoud be greater than 10,000");
    }
    let fd = 0;
    let mutualfund = 0;
    let gold = 0;
    let stockmarket = 0;
    let governmentb = 0;
    if (calcdata.method === "SIP") {
      fd =
        changetoint(calcdata.amount) /
        (Math.pow(1 + 5 / 100, calcdata.years) * ((1 + 5 / 100) / (5 / 100)));
      mutualfund =
        changetoint(calcdata.amount) /
        (Math.pow(1 + 10.4 / 100, calcdata.years) *
          ((1 + 5 / 100) / (5 / 100)));
      gold =
        changetoint(calcdata.amount) /
        (Math.pow(1 + 10 / 100, calcdata.years) * ((1 + 5 / 100) / (5 / 100)));
      stockmarket =
        changetoint(calcdata.amount) /
        (Math.pow(1 + 13.9 / 100, calcdata.years) *
          ((1 + 5 / 100) / (5 / 100)));
      governmentb =
        changetoint(calcdata.amount) /
        (Math.pow(1 + 3.65 / 100, calcdata.years) *
          ((1 + 5 / 100) / (5 / 100)));
    } else {
      fd = changetoint(calcdata.amount) / Math.pow(1 + 5 / 100, calcdata.years);
      mutualfund =
        changetoint(calcdata.amount) / Math.pow(1 + 10.4 / 100, calcdata.years);
      gold =
        changetoint(calcdata.amount) / Math.pow(1 + 10 / 100, calcdata.years);
      stockmarket =
        changetoint(calcdata.amount) / Math.pow(1 + 13.9 / 100, calcdata.years);
      governmentb =
        changetoint(calcdata.amount) / Math.pow(1 + 3.65 / 100, calcdata.years);
    }
    if (calcdata.type === "Fixed deposit") {
      setresultdata((prev) => ({
        heading1: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 5% For Fixed Deposit`,

        result1: Math.round(fd).toLocaleString("en-IN", {
          currency: "INR",
        }),
      }));
      setChartData([
        {
          type: "Fixed Deposit",
          value: Math.round(fd),
          color: "#FDCC03",
        },
      ]);
    } else if (calcdata.type === "Mutual Fund") {
      setresultdata((prev) => ({
        heading1: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 10.8% For Mutual Fund`,
        result1: Math.round(mutualfund).toLocaleString("en-IN", {
          currency: "INR",
        }),
      }));
      setChartData([
        {
          type: "Mutual Fund",
          value: Math.round(mutualfund),
          color: "#4166EB",
        },
      ]);
    } else if (calcdata.type === "Gold") {
      setresultdata((prev) => ({
        heading1: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 10% For Gold`,
        result1: Math.round(gold).toLocaleString("en-IN", {
          currency: "INR",
        }),
      }));
      setChartData([
        {
          type: "Fixed Deposit",
          value: Math.round(fd),
          color: "#FDCC03",
        },
        {
          type: "Mutual Fund",
          value: Math.round(mutualfund),
          color: "#4166EB",
        },
        {
          type: "Gold",
          value: Math.round(gold),
          color: "#17D1BC",
        },
        {
          type: "Stocks",
          value: Math.round(stockmarket),
          color: "#FF6263",
        },
        {
          type: "Government Bond",
          value: Math.round(governmentb),
          color: "#ff9900",
        },
      ]);
    } else if (calcdata.type === "Stock market") {
      setresultdata((prev) => ({
        heading1: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 13.9% For Stock Market`,
        result1: Math.round(stockmarket).toLocaleString("en-IN", {
          currency: "INR",
        }),
      }));
      setChartData([
        {
          type: "Stocks",
          value: Math.round(stockmarket),
          color: "#FF6263",
        },
      ]);
    } else if (calcdata.type === "Government Bond") {
      setresultdata((prev) => ({
        heading1: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 3.65% For Government Bond`,
        result1: Math.round(governmentb),
      }));
      setChartData([
        {
          type: "Government Bond",
          value: Math.round(governmentb),
          color: "#ff9900",
        },
      ]);
    } else {
      setresultdata((prev) => ({
        heading1: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 5% For Fixed Deposit`,
        heading2: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 10.8% For Mutual Fund`,
        heading3: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 10% For Gold`,
        heading4: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 13.9% For Stock Market`,
        heading5: `${
          calcdata.method === "SIP" ? "SIP" : "Lumpsum"
        } at 3.65% For Government Bond`,
        result1: Math.round(fd).toLocaleString("en-IN", {
          currency: "INR",
        }),
        result2: Math.round(mutualfund).toLocaleString("en-IN", {
          currency: "INR",
        }),
        result3: Math.round(gold).toLocaleString("en-IN", {
          currency: "INR",
        }),
        result4: Math.round(stockmarket).toLocaleString("en-IN", {
          currency: "INR",
        }),
        result5: Math.round(governmentb).toLocaleString("en-IN", {
          currency: "INR",
        }),
      }));
      setChartData([
        {
          type: "Fixed Deposit",
          value: Math.round(fd),
          color: "#FDCC03",
        },
        {
          type: "Mutual Fund",
          value: Math.round(mutualfund),
          color: "#4166EB",
        },
        {
          type: "Gold",
          value: Math.round(gold),
          color: "#17D1BC",
        },
        {
          type: "Stocks",
          value: Math.round(stockmarket),
          color: "#FF6263",
        },
        {
          type: "Government Bond",
          value: Math.round(governmentb),
          color: "#ff9900",
        },
      ]);
    }
  }
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
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttons}>
            {current !== 0 ? (
              <p
                className={styles.previous}
                onClick={() => {
                  if (!error) {
                    seterror("");
                    if (current !== 0) {
                      setcurrent(current - 1);
                    }
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
                    setcalcdata((prev) => ({
                      ...prev,
                      [item.code]: e,
                    }))
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
                  code={item.code}
                  value={calcdata[item.code]}
                  maxvalue={item.max}
                  setvalue={setcalcdata}
                />
              );
            }
          })}
          {!error && <ResultBox resultdata={resultdata} />}
        </div>
      )}

      {!error && showresult ? (
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}>
            <ResponsiveBar
              data={chartData}
              colors={{ datum: "data.color" }}
              keys={["value"]}
              indexBy="type"
              margin={{ top: 0, right: 0, bottom: 50, left: 60 }}
              padding={0.2}
              valueScale={{ type: "linear" }}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              valueFormat={(value) =>
                changetoint(value).toLocaleString("en-IN", {
                  currency: "INR",
                })
              }
              axisRight={null}
              axisBottom={{
                tickSize: 8,
                tickPadding: 8,
                tickRotation: -15,
                legendPosition: "middle",
                legendOffset: 48,
              }}
              label={false}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
