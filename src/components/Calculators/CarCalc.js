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
export default function CarCalc() {
  const [years, setyear] = useState(1);
  const [type, settype] = useState("");
  const [noofrooms, setnoofrooms] = useState("");
  const [city, setcity] = useState("");
  const [onetimepayment, setOnetimepayment] = useState(0);
  const [questions, setquestions] = useState([
    {
      title: "Select he type of car",
      type: "select",
      value: type,
      setvalue: settype,
      options: ["Sedan", "Sports", "SUV", "Luxury", "Hatchback"],
    },
    {
      type: "input",
      title: "Enter the tenure of the loan",
      setvalue: setyear,
      value: years,
      min: 1,
      max: 70,
      sign: "years",
    },
    {
      type: "input",
      title: "Enter the down Payment",
      min: 0,
      max: 1000000,
      setvalue: setOnetimepayment,
      value: onetimepayment,
      sign: "₹",
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
    labels: ["Intrest", "Loan Amount"],
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
    emi();
    setresult(true);
  }, [type, years, onetimepayment]);

  function emi() {
    let monthlyrate = 12 / 12 / 100;
    var months = years * 12;

    let loanamount = 0;
    // Sedan, sports car, SUV, Luxury car, Hatchback
    if (type === "Sedan") {
      loanamount = 1000000;
    } else if (type === "Sports") {
      loanamount = 8000000;
    } else if (type === "SUV") {
      loanamount = 1600000;
    } else if (type === "Luxury") {
      loanamount = 4100000;
    } else if (type === "Hatchback") {
      loanamount = 700000;
    }
    if (onetimepayment) {
      loanamount = loanamount - onetimepayment;
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
      result1: Math.round(intrest),
      result2: Math.round(totalpayment),
      result3: Math.round(emiamount),
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
      <div className={styles.inputSection}>
        {questions.map((item, index) => {
          if (item.type === "select") {
            return (
              <Select
                question={item.title}
                options={item.options}
                value={item.value}
                setvalue={item.setvalue}
                current={current}
                setcurrent={setcurrent}
                index={index}
                total={
                  type !== "Apartment"
                    ? questions.length - 2
                    : questions.length - 1
                }
              />
            );
          } else if (item.type === "input") {
            return (
              <SelectInput
                question={item.title}
                index={index}
                value={item.value}
                current={current}
                setcurrent={setcurrent}
                setvalue={item.setvalue}
                min={item.min}
                max={item.max}
                sign={item.sign}
              />
            );
          }
        })}
        {/* <div className={`${styles.submitButton} ${styles.vertgrad}`}>
          Calculate
        </div> */}
        {years && type ? <ResultBox resultdata={resultdata} /> : null}
      </div>

      {years && type ? (
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
