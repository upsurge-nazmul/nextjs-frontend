import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import ResultBox from "./ResultBox";
import styles from "../../styles/Calculators/calccomponent.module.scss";

function EducationCalc() {
  const [amount, setamount] = useState(10000);
  const [rate, setrate] = useState(10);
  const [course, setcourse] = useState("Undergraduate");
  const [initialLumpsum, setinitialLumpsum] = useState(0);
  const [result, setresult] = useState(false);
  const [years, setyear] = useState(1);
  const [region, setregion] = useState("India");
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
    labels: ["Invested Amount", "Returns"],
    datasets: [
      {
        label: "# of Votes",
        data: [0, 0],
        backgroundColor: ["#F86466", "#FBCD00"],
        borderColor: ["#F86466", "#FBCD00"],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    education();
    setresult(true);
  }, [amount, rate, years, initialLumpsum, course, region]);

  //calculator logic goes here
  function education() {
    let monthlyrate = rate / 12 / 100;
    var months = years * 12;
    let emiamount =
      (amount * monthlyrate * Math.pow(1 + monthlyrate, months)) /
      (Math.pow(1 + monthlyrate, months) - 1);

    let totalpayment = emiamount * months;
    let intrest = totalpayment - amount;
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
      labels: ["Total Payment", "Total Interest"],
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(totalpayment), Math.round(intrest)],
          backgroundColor: ["#F86466", "#FBCD00"],
          borderColor: ["#F86466", "#FBCD00"],
          borderWidth: 1,
        },
      ],
    }));
  }
  return (
    <div className={styles.calculatorComponent}>
      <div className={styles.inputSection}>
        <DropBox
          title="Where do you or your child want to go?"
          value={region}
          setvalue={setregion}
          options={["India", "US", "UK", "Europe", "Singapore", "Canada"]}
        />
        <DropBox
          title="What course"
          value={course}
          setvalue={setcourse}
          options={["Undergraduate", "Masters", "MBA"]}
        />
        <InputBlock
          label={"When do you or your child start college?"}
          min={1}
          max={100}
          setvalue={setyear}
          value={years}
          sign={"Yrs"}
        />

        <InputBlock
          label={"Estimated Cost"}
          min={10000}
          max={5000000}
          setvalue={setamount}
          value={amount}
          sign={"₹"}
        />
        <InputBlock
          label={"Current Savings"}
          min={1}
          max={5000000}
          setvalue={setinitialLumpsum}
          value={initialLumpsum}
          sign={"₹"}
        />

        {result ? <ResultBox resultdata={resultdata} /> : null}
      </div>
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
    </div>
  );
}

export default EducationCalc;
