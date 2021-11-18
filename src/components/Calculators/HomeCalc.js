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
import RelativeSection from "./RelativeSection";
import changetoint from "../../helpers/currency";
export default function HomeCalc({ data, seterror, error }) {
  const [questions, setquestions] = useState([
    {
      title: "Select the type of house",
      type: "select",
      options: ["Apartment", "Bungalow"],
      code: "type",
    },
    {
      title: "No. Of Bedrooms",
      type: "select",
      options: ["2 rooms", "3 rooms", "4 rooms"],
      code: "noofrooms",
    },
    {
      title: "Select the size of Bungalow",
      type: "select",
      options: ["7 BHK", "11 BHK", "16 BHK"],
      code: "sizebunglow",
    },
    {
      title: "Select the City",
      type: "select",
      options: ["Delhi", "Bangalore", "Chennai", "Hyderabad"],
      code: "city",
    },
    {
      type: "input",
      title: "Enter Down-Payment",
      min: 0,
      max: 10000000,
      pretitle: "₹",
      range: true,
      code: "onetimepayment",
    },
    {
      type: "input",
      title: "Enter the tenure of the loan",
      min: 5,
      max: 30,
      posttitle: "years",
      code: "years",
      range: false,
    },
  ]);
  const backupquestions = [
    {
      title: "Select the type of house",
      type: "select",
      options: ["Apartment", "Bungalow"],
      code: "type",
    },
    {
      title: "No. Of Bedrooms",
      type: "select",
      options: ["2 rooms", "3 rooms", "4 rooms"],
      code: "noofrooms",
    },
    {
      title: "Select the size of Bungalow",
      type: "select",
      options: ["7 BHK", "11 BHK", "16 BHK"],
      code: "sizebunglow",
    },
    {
      title: "Select the City",
      type: "select",
      options: ["Delhi", "Bangalore", "Chennai", "Hyderabad"],
      code: "city",
    },
    {
      type: "input",
      title: "Enter Down-Payment",
      min: 0,
      max: 100000000,
      pretitle: "₹",
      range: true,
      code: "onetimepayment",
    },
    {
      type: "input",
      title: "Enter the tenure of the loan",
      min: 5,
      max: 30,
      posttitle: "years",
      code: "years",
      range: false,
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
    type: "Apartment",
    noofrooms: "2 rooms",
    city: "Delhi",
    onetimepayment: 0,
    sizebunglow: "7 BHK",
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);

  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);
  useEffect(() => {
    if (calcdata.type !== "Apartment") {
      setquestions(backupquestions.filter((item) => item.code !== "noofrooms"));
    } else {
      setquestions(
        backupquestions.filter((item) => item.code !== "sizebunglow")
      );
    }
  }, [calcdata.type]);

  function emi() {
    if (!calcdata.years) {
      seterror("Tenure of the loan cannot be less than 1 year");
      return;
    }
    if (changetoint(calcdata.years) === 0) {
      seterror("Tenure of the loan cannot be less than 1 year");
      return;
    }
    if (!calcdata.onetimepayment) {
      seterror("Down-Payment cannot be null");
      return;
    }
    let monthlyrate = 8.5 / 12 / 100;
    var months = calcdata.years * 12;
    let loanamount = 0;
    if (calcdata.type === "Apartment") {
      if (calcdata.noofrooms === "2 rooms") {
        if (calcdata.city === "Delhi") {
          loanamount = 4500000;
        } else if (calcdata.city === "Bangalore") {
          loanamount = 6000000;
        } else if (calcdata.city === "Chennai") {
          loanamount = 3500000;
        } else if (calcdata.city === "Hyderabad") {
          loanamount = 5000000;
        }
      } else if (calcdata.noofrooms === "3 rooms") {
        if (calcdata.city === "Delhi") {
          loanamount = 7500000;
        } else if (calcdata.city === "Bangalore") {
          loanamount = 10000000;
        } else if (calcdata.city === "Chennai") {
          loanamount = 6500000;
        } else if (calcdata.city === "Hyderabad") {
          loanamount = 8000000;
        }
      } else {
        if (calcdata.city === "Delhi") {
          loanamount = 12500000;
        } else if (calcdata.city === "Bangalore") {
          loanamount = 20000000;
        } else if (calcdata.city === "Chennai") {
          loanamount = 18000000;
        } else if (calcdata.city === "Hyderabad") {
          loanamount = 20000000;
        }
      }
    } else {
      if (calcdata.sizebunglow === "7 BHK") {
        if (calcdata.city === "Delhi") {
          loanamount = 60000000;
        } else if (calcdata.city === "Bangalore") {
          loanamount = 55000000;
        } else if (calcdata.city === "Chennai") {
          loanamount = 50000000;
        } else if (calcdata.city === "Hyderabad") {
          loanamount = 50000000;
        }
      } else if (calcdata.sizebunglow === "11 BHK") {
        if (calcdata.city === "Delhi") {
          loanamount = 100000000;
        } else if (calcdata.city === "Bangalore") {
          loanamount = 70000000;
        } else if (calcdata.city === "Chennai") {
          loanamount = 80000000;
        } else if (calcdata.city === "Hyderabad") {
          loanamount = 75000000;
        }
      } else {
        if (calcdata.city === "Delhi") {
          loanamount = 200000000;
        } else if (calcdata.city === "Bangalore") {
          loanamount = 110000000;
        } else if (calcdata.city === "Chennai") {
          loanamount = 130000000;
        } else if (calcdata.city === "Hyderabad") {
          loanamount = 120000000;
        }
      }
    }
    let indx = questions.findIndex(
      (item) => item.title === "Enter Down-Payment"
    );
    questions[indx].max = loanamount / 5;
    setquestions(questions);
    console.log(indx);

    if (changetoint(calcdata.onetimepayment)) {
      loanamount = loanamount - changetoint(calcdata.onetimepayment);
      if (loanamount < 0) {
        console.log(questions[3]);
        seterror("down payment cannot be greater than loan amount");
        return;
      } else {
        seterror("");
      }
    }

    let emiamount =
      (loanamount * monthlyrate * Math.pow(1 + monthlyrate, months)) /
      (Math.pow(1 + monthlyrate, months) - 1);
    let totalpayment = emiamount * months;
    let intrest = totalpayment - loanamount;
    setresultdata((prev) => ({
      heading2: "Total Interest Payable",
      heading3: `Total Payment
      (Principal + Interest)`,
      heading4: "Loan EMI",
      heading1: "The indicative value for home is",
      result1: Math.round(
        changetoint(calcdata.onetimepayment)
          ? changetoint(calcdata.onetimepayment) + parseInt(loanamount)
          : loanamount
      ).toLocaleString("en-IN", {
        currency: "INR",
      }),
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
                maxvalue={currentquestion.max}
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
            {questions.map((item, index) => {
              if (item.type === "select") {
                return (
                  <DropBox
                    title={item.title}
                    sign={item.sign}
                    min={item.min}
                    key={"input" + index}
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
                    key={"input" + index}
                    posttitle={item.posttitle}
                    pretitle={item.pretitle}
                    setvalue={setcalcdata}
                    minvalue={item.min}
                    maxvalue={item.max}
                    code={item.code}
                    value={calcdata[item.code]}
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
    </>
  );
}
