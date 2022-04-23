import React, { useEffect, useState } from "react";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import Progress from "../Progress";
import ResultBox from "./ResultBox";
import Select from "./Select";
import ProgressVerticle from "../ProgressVerticle";
import styles from "../../styles/Calculators/calccomponent.module.scss";
function VacationCalc() {
  const [years, setyear] = useState(1);
  const [region, setregion] = useState("India");
  const [luxury, setluxury] = useState("Smart");
  const [flights, setflights] = useState("IndiGo");
  const [nights, setnights] = useState(1);
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
    vacaction();
    setresult(true);
  }, [region, luxury, years, flights, nights]);

  function vacaction() {
    //future = amount [(1+monthlyrate)^months-1] * 1+monthlyrate/monthlyrate
    //
    let vacationGoal = 1000000;
    let monthlyRate = 8 / 12 / 100;
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
          data: [Math.round(1000000), Math.round(returnamount)],
          backgroundColor: ["#F86466", "#FBCD00"],
          borderColor: ["#F86466", "#FBCD00"],
          borderWidth: 1,
        },
      ],
    }));
  }

  const questions = [
    {
      title: "Select your region.",
      type: "select",
      value: region,
      setvalue: setregion,
      options: [
        "India",
        "America",
        "Maldives",
        "South East Asia",
        "Eastern Europe",
        "Western Europe",
      ],
    },
    {
      title: "Luxury",
      type: "select",
      value: luxury,
      setvalue: setluxury,
      options: ["Smart", "Luxury", "Backpacker"],
    },
    {
      title: "Flights",
      type: "select",
      value: flights,
      setvalue: setflights,
      options: ["IndiGo", "Air India ", "SpiceJet"],
    },
    {
      type: "select",
      title: "When do you want to take vacation?",
      setvalue: setyear,
      value: years,
      options: [
        "1 to 2 years",
        "2 to 5 years",
        "5 to 10 years",
        "more than 10 years",
      ],
    },
    // {
    //   type: "input",
    //   title: "Nights",
    //   min: 1,
    //   max: 100,
    //   setvalue: setnights,
    //   value: nights,
    //   sign: "",
    // },
  ];
  return (
    <div className={styles.calculatorComponent}>
      {/* <div className="leftsec">
        <ProgressVerticle
          questions={questions.length}
          current={current}
          setcurrent={setcurrent}
        />
      </div> */}

      <div className={styles.inputSection}>
        {questions.map((item, index) => {
          if (item.type === "select")
            return (
              <Select
                question={item.title}
                options={item.options}
                current={current}
                setcurrent={setcurrent}
                index={index}
                total={questions.length - 1}
              />
            );
        })}
        <div className={`${styles.submitButton} ${styles.vertgrad}`}>
          Calculate
        </div>
        {false && result ? <ResultBox resultdata={resultdata} /> : null}
      </div>

      {true ? (
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}></div>
        </div>
      ) : null}
    </div>
  );
}

export default VacationCalc;
