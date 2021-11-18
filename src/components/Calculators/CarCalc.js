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
import BigCalcInput from "./BigCalcInput";
import BigCalcDropdown from "./BigCalcDropdown";
import changetoint from "../../helpers/currency";
export default function CarCalc({ seterror, error }) {
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

  function emi() {
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
    
    let monthlyrate = 8 / 12 / 100;
    var months = calcdata.years * 12;

    let loanamount = 0;
    // Sedan, sports car, SUV, Luxury car, Hatchback
    if (calcdata.type === "Sedan") {
      loanamount = 1000000;
    } else if (calcdata.type === "Sports") {
      loanamount = 8000000;
      monthlyrate = 7 / 12 / 100;
    } else if (calcdata.type === "SUV") {
      loanamount = 1600000;
    } else if (calcdata.type === "Luxury") {
      loanamount = 4100000;
      monthlyrate = 7 / 12 / 100;
    } else if (calcdata.type === "Hatchback") {
      loanamount = 700000;
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
      heading2: "Total Interest Payable",
      heading3: `Total Payment
      (Principal + Interest)`,
      heading4: "Loan EMI",
      result2: Math.round(intrest).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result3: Math.round(totalpayment).toLocaleString("en-IN", {
        currency: "INR",
      }),
      result4: Math.round(emiamount).toLocaleString("en-IN", {
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
          {!error && <ResultBox resultdata={resultdata} />}
        </div>
      )}

      {!error && showresult ? (
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
