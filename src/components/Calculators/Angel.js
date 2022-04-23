import React, { useEffect, useState } from "react";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import styles from "../../styles/Calculators/calccomponent.module.scss";
import BigCalcDropdown from "./BigCalcDropdown";
import BigCalcInput from "./BigCalcInput";
import RelativeSection from "./RelativeSection";
import changetoint from "../../helpers/currency";
export default function Angel({ data, seterror, error }) {
  const [questions, setquestions] = useState([
    {
      title: "Select Industry type",
      type: "select",
      options: [
        "E-commerce",
        "F&B (Food and Beverages)",
        "Consumer Brands",
        "SaaS (Software as a service)",
        "AI & ML (Artificial Intelligence and Machine Learning)",
      ],
      code: "type",
    },
    {
      title: "Is your Startup generating revenue right now?",
      type: "select",
      options: ["Yes", "No"],
      code: "revenue",
    },
    {
      title: "Enter the revenue for this year",
      type: "input",
      code: "rev1",
      min: 100000,
      max: 100000000,
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the revenue for next year",
      type: "input",
      min: 100000,
      max: 100000000,
      code: "rev2",
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the revenue for next to next year",
      type: "input",
      min: 100000,
      max: 100000000,
      code: "rev3",
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the expected revenue for the first year of operations",
      type: "input",
      code: "erev1",
      max: 100000000,
      min: 0,
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the expected revenue for the second year of operations",
      type: "input",
      min: 0,
      code: "erev2",
      max: 100000000,
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the expected revenue for the third year of operations",
      type: "input",
      max: 100000000,
      min: 0,
      code: "erev3",
      pretitle: "₹",
      range: true,
    },
  ]);
  const backupquestions = [
    {
      title: "Select Industry type",
      type: "select",
      options: [
        "E-commerce",
        "F&B (Food and Beverages)",
        "Consumer Brands",
        "SaaS (Software as a service)",
        "AI & ML (Artificial Intelligence and Machine Learning)",
      ],
      code: "type",
    },
    {
      title: "Is your Startup generating revenue right now?",
      type: "select",
      options: ["Yes", "No"],
      code: "revenue",
    },
    {
      title: "Enter the revenue for this year",
      type: "input",
      code: "rev1",
      min: 100000,
      max: 100000000,
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the revenue for next year",
      type: "input",
      min: 100000,
      max: 100000000,
      code: "rev2",
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the revenue for next to next year",
      type: "input",
      min: 100000,
      max: 100000000,
      code: "rev3",
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the expected revenue for the first year of operations",
      type: "input",
      code: "erev1",
      max: 100000000,
      min: 0,
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the expected revenue for the second year of operations",
      type: "input",
      min: 0,
      code: "erev2",
      max: 100000000,
      pretitle: "₹",
      range: true,
    },
    {
      title: "Enter the expected revenue for the third year of operations",
      type: "input",
      max: 100000000,
      min: 0,
      code: "erev3",
      pretitle: "₹",
      range: true,
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
    labels: ["Valuation"],
    datasets: [
      {
        label: "Valuation",
        data: [0, 0],
        backgroundColor: ["#4166EB", "#FDCC03"],
        borderColor: ["#4166EB", "#FDCC03"],
        borderWidth: 1,
      },
    ],
  });
  const [calcdata, setcalcdata] = useState({
    type: "E-commerce",
    revenue: "No",
    property: "Owned",
    rev1: 100000,
    rev2: 100000,
    rev3: 100000,
    erev1: 1000,
    erev2: 1000,
    erev3: 1000,
  });
  const [currentquestion, setcurrentquestion] = useState(questions[0]);
  const [showresult, setshowresult] = useState(false);
  useEffect(() => {
    if (calcdata.revenue === "Yes") {
      setquestions(
        backupquestions.filter(
          (item) =>
            item.code !== "erev1" &&
            item.code !== "erev2" &&
            item.code !== "erev3"
        )
      );
    } else {
      setquestions(
        backupquestions.filter(
          (item) =>
            item.code !== "rev1" && item.code !== "rev2" && item.code !== "rev3"
        )
      );
    }
  }, [calcdata.revenue]);
  useEffect(() => {
    seterror("");
    setcurrentquestion(questions[current]);
    emi();
    setresult(true);
  }, [calcdata, current]);
  useEffect(() => {
    setcalcdata((prev) => ({
      ...prev,
      rev1: 100000,
      rev2: 100000,
      rev3: 100000,
      erev1: 1000,
      erev2: 1000,
      erev3: 1000,
    }));
  }, [calcdata.revenue]);
  function emi() {
    if (calcdata.revenue !== "No") {
      if (calcdata.rev1 == "") {
        seterror("Revenue for year 1 is required");
        return;
      }
      if (calcdata.rev2 == "") {
        seterror("Revenue for year 2 is required");
        return;
      }
      if (calcdata.rev3 == "") {
        seterror("Revenue for year 3 is required");
        return;
      }
      if (calcdata.rev1 < 100000) {
        seterror("Revenue for year 1 cannot be less than 1,00,000");
        return;
      }
      if (calcdata.rev2 < 100000) {
        seterror("Revenue for year 2 cannot be less than 1,00,000");
        return;
      }
      if (calcdata.rev3 < 100000) {
        seterror("Revenue for year 3 cannot be less than 1,00,000");
        return;
      }
    } else {
      if (calcdata.erev1 === "") {
        seterror("Expected revenue for year 1 is required");
        return;
      }
      if (calcdata.erev2 == "") {
        seterror("Expected revenue for year 2 is required");
        return;
      }
      if (calcdata.erev3 == "") {
        seterror("Expected revenue for year 3 is required");
        return;
      }
    }

    let valuation = 0;
    if (calcdata.type === "E-commerce") {
      valuation = 2;
    } else if (calcdata.type === "F&B (Food and Beverages)") {
      valuation = 5;
    } else if (calcdata.type === "Consumer Brands") {
      valuation = 7;
    } else if (calcdata.type === "SaaS (Software as a service)") {
      valuation = 8;
    } else if (
      calcdata.type === "AI & ML (Artificial Intelligence and Machine Learning)"
    ) {
      valuation = 10;
    }
    let growthrate = 0;
    let investment = 0;
    if (calcdata.revenue === "Yes") {
      growthrate =
        (changetoint(calcdata.rev2) / changetoint(calcdata.rev1) +
          changetoint(calcdata.rev3) / changetoint(calcdata.rev2)) /
          2 -
        1;

      investment =
        changetoint(calcdata.rev1) * valuation * (1 + growthrate / 2);
    } else {
      growthrate =
        (changetoint(calcdata.erev2) / changetoint(calcdata.erev1) +
          changetoint(calcdata.erev3) / changetoint(calcdata.erev2)) /
          2 -
        1;
      investment =
        changetoint(calcdata.erev1) * valuation * (1 + growthrate / 2) * 0.8;
    }

    setresultdata((prev) => ({
      heading1: "",
      result1: `Valuation of your startup at which you can raise investment : ₹${Math.round(
        investment
      ).toLocaleString("en-IN", {
        currency: "INR",
      })}`,
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
                range={currentquestion.range}
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
            {!error && <ResultBox resultdata={resultdata} />}
          </div>
        )}
      </div>
    </>
  );
}
