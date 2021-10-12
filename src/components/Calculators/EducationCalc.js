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
export default function HomeCalc() {
  const [years, setyear] = useState(1);
  const [type, settype] = useState("");
  const [university, setuniversity] = useState("");
  const [country, setcountry] = useState("");
  const [course, setcourse] = useState(0);
  const [questions, setquestions] = useState([
    {
      title: "Select the type of university ",
      type: "select",
      value: type,
      setvalue: settype,
      options: ["Indian", "Foreign"],
    },
    {
      title: "University type",
      type: "select",
      value: university,
      setvalue: setuniversity,
      options: ["Public", "Private"],
    },
    {
      title: "Select Region",
      type: "select",
      value: country,
      setvalue: setcountry,
      options: ["US", "Australia", "Europe", "Asia"],
    },
    {
      title: "Select Course",
      type: "select",
      value: course,
      setvalue: setcourse,
      options: ["MBA", "Masters", "Undergrad"],
    },

    {
      type: "input",
      title: "Enter the loan repayment duration",
      setvalue: setyear,
      value: years,
      min: 1,
      max: 70,
      sign: "years",
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
  }, [type, university, years, country]);

  function emi() {
    let monthlyrate = 10 / 12 / 100;
    if (university === "Private") {
      monthlyrate = 14 / 12 / 100;
    }
    var months = years * 12;

    let loanamount = 0;
    if (type === "Indian") {
      if (university === "Private") {
        if (course === "MBA") {
          loanamount = 4500000;
        } else if (course === "Masters") {
          loanamount = 400000;
        } else {
          loanamount = 2000000;
        }
      } else {
        if (course === "MBA") {
          loanamount = 2400000;
        } else if (course === "Masters") {
          loanamount = 400000;
        } else {
          loanamount = 1000000;
        }
      }
    } else {
      if (country === "Australia") {
        if (course === "MBA") {
          loanamount = 3750000;
        } else if (course === "Masters") {
          loanamount = 1500000;
        } else {
          loanamount = 8000000;
        }
      } else if (country === "Europe") {
        if (course === "MBA") {
          loanamount = 4500000;
        } else if (course === "Masters") {
          loanamount = 500000;
        } else {
          loanamount = 500000;
        }
      } else if (country === "Asia") {
        if (course === "MBA") {
          loanamount = 7000000;
        } else if (course === "Masters") {
          loanamount = 1950000;
        } else {
          loanamount = 4000000;
        }
      } else {
        if (course === "MBA") {
          loanamount = 15000000;
        } else if (course === "Masters") {
          loanamount = 3000000;
        } else {
          loanamount = 9000000;
        }
      }
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
          if (type === "Indian" && item.title === "Select Region") {
            return null;
          } else if (type === "Foreign" && item.title === "University type") {
            return null;
          } else if (item.type === "select") {
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

        {(years && type && course && university) ||
        (years && type && course && country) ? (
          <ResultBox resultdata={resultdata} />
        ) : null}
      </div>

      {(years && type && course && university) ||
      (years && type && course && country) ? (
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
