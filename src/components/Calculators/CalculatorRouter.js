import React, { useEffect, useLayoutEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DropBox from "./DropBox";
import EducationCalc from "./EducationCalc";
import InputBlock from "./InputBlock";
import ResultBox from "./ResultBox";
import SipLumpsumCalc from "./SipLumpsumCalc";
import VacationCalc from "./VacationCalc";
import styles from "../../styles/Calculators/calccomponent.module.scss";

function CalculatorRouter({ name }) {
  const [mode, setmode] = useState(name);
  const [amount, setamount] = useState(10000);
  const [rate, setrate] = useState(10);

  const [initialLumpsum, setinitialLumpsum] = useState(0);
  const [result, setresult] = useState(false);
  const [years, setyear] = useState(1);
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
        backgroundColor: ["#4166EB", "#FDCC03"],
        borderColor: ["#4166EB", "#FDCC03"],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    if (mode === "sip") {
      sipcalc();
    } else if (mode === "lumpsum") {
      lumpsum();
    } else if (
      mode === "eduLoan" ||
      mode === "carLoan" ||
      mode === "homeLoan"
    ) {
      emi();
    } else if (mode === "vacation") {
      vacaction();
    } else if (mode === "retirement") {
      retirement();
    }
    setresult(true);
  }, [amount, rate, years, mode, initialLumpsum]);

  function retirement() {
    let monthlyRate = rate / 12 / 100;
    var months = years * 12;
    let totalinvestment = amount * months;
    let futureValue =
      (amount * (1 + monthlyRate) * (Math.pow(1 + monthlyRate, months) - 1)) /
      monthlyRate;
    let returnamount = futureValue - totalinvestment;
    setresultdata((prev) => ({
      ...prev,
      result1: Math.round(totalinvestment),
      result2: Math.round(returnamount),
      result3: Math.round(futureValue + Number(initialLumpsum)),
    }));
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(totalinvestment), Math.round(returnamount)],
          backgroundColor: ["#4166EB", "#FDCC03"],
          borderColor: ["#4166EB", "#FDCC03"],
          borderWidth: 1,
        },
      ],
    }));
  }
  function sipcalc() {
    let monthlyRate = rate / 12 / 100;
    var months = years * 12;
    let totalinvestment = amount * months;
    let futureValue =
      (amount * (1 + monthlyRate) * (Math.pow(1 + monthlyRate, months) - 1)) /
      monthlyRate;
    let returnamount = futureValue - totalinvestment;
    setresultdata((prev) => ({
      ...prev,
      result1: Math.round(totalinvestment),
      result2: Math.round(returnamount),
      result3: Math.round(futureValue + Number(initialLumpsum)),
    }));
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(totalinvestment), Math.round(returnamount)],
          backgroundColor: ["#4166EB", "#FDCC03"],
          borderColor: ["#4166EB", "#FDCC03"],
          borderWidth: 1,
        },
      ],
    }));
  }
  function lumpsum() {
    let wealthGained = Math.round(Math.pow(1 + rate / 100, years) * amount);
    let returnamount = wealthGained - amount;
    setresultdata((prev) => ({
      ...prev,
      result1: Math.round(amount),
      result2: Math.round(returnamount),
      result3: Math.round(wealthGained),
    }));
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(amount), Math.round(returnamount)],
          backgroundColor: ["#4166EB", "#FDCC03"],
          borderColor: ["#4166EB", "#FDCC03"],
          borderWidth: 1,
        },
      ],
    }));
  }
  function vacaction() {
    //future = amount [(1+monthlyrate)^months-1] * 1+monthlyrate/monthlyrate
    //
    let vacationGoal = amount;
    let monthlyRate = rate / 12 / 100;
    var months = years * 12;
    let totalinvestment =
      vacationGoal /
      (Math.round(Math.pow(1 + monthlyRate, months - 1)) *
        ((1 + monthlyRate) / monthlyRate));

    let monthlyInvestment = totalinvestment / months;
    let returnamount = vacationGoal - totalinvestment;
    setresultdata((prev) => ({
      ...prev,
      heading1: "Total Investment",
      heading3: "Monthly Investment",
      result1: Math.round(totalinvestment),
      result2: Math.round(returnamount),
      result3: Math.round(monthlyInvestment),
    }));
    setChartData((prev) => ({
      ...prev,
      datasets: [
        {
          label: "# of Votes",
          data: [Math.round(amount), Math.round(returnamount)],
          backgroundColor: ["#4166EB", "#FDCC03"],
          borderColor: ["#4166EB", "#FDCC03"],
          borderWidth: 1,
        },
      ],
    }));
  }
  function emi() {
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
          backgroundColor: ["#4166EB", "#FDCC03"],
          borderColor: ["#4166EB", "#FDCC03"],
          borderWidth: 1,
        },
      ],
    }));
  }
  const data = {
    eduLoan: {
      label: "Loan Amount",
      rate: "Interest Rate (p.a)",
    },
    carLoan: {
      label: "Loan Amount",
      rate: "Interest Rate (p.a)",
    },
    homeLoan: {
      label: "Loan Amount",
      rate: "Interest Rate (p.a)",
    },
    sip: {
      label: "Monthly Investment",
      rate: "Expected Return Rate",
    },
    lumpsum: {
      label: "Total Investment",
      rate: "Expected Return Rate",
    },
    vacation: {
      label: "Vacation Goal",
      rate: "Expected Return Rate",
    },
    retirement: {
      label: "Monthly Investment",
      rate: "Expected Return Rate",
    },
  };

  function getCalcType() {
    if (mode === "homeLoan" || mode === "carLoan" || mode === "eduLoan") {
      return "loan";
    } else {
      return "investment";
    }
  }
  if (mode === "sip" || mode === "lumpsum") return <SipLumpsumCalc />;
  if (mode === "vacation") return <VacationCalc />;
  else if (mode === "education") return <EducationCalc />;
  else
    return (
      <div className={styles.calculatorComponent}>
        <div className={styles.inputSection}>
          <InputBlock
            label={data[mode]?.label}
            min={500}
            max={20000000}
            setvalue={setamount}
            value={amount}
            sign={"₹"}
          />
          <InputBlock
            label={data[name]?.rate}
            min={1}
            max={50}
            setvalue={setrate}
            value={rate}
            sign={"%"}
          />
          <InputBlock
            label={"Time Period"}
            min={1}
            max={100}
            setvalue={setyear}
            value={years}
            sign={"Years"}
          />
          {result ? <ResultBox resultdata={resultdata} /> : null}
        </div>
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}>
            <div className={styles.resultabs}>
              <p className={styles.main}>{"₹" + resultdata.result3}</p>
              <p className={styles.se}>per month</p>
            </div>
            <Doughnut
              data={chartData}
              className={styles.chart}
              width={100}
              height={100}
              options={{ maintainAspectRatio: true }}
            />
          </div>
        </div>
      </div>
    );
}

export default CalculatorRouter;
