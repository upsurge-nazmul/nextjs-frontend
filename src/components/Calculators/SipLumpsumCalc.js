import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DropBox from "./DropBox";
import InputBlock from "./InputBlock";
import ResultBox from "./ResultBox";

function SipLumpsumCalc() {
  const [mode, setmode] = useState("sip");
  const [amount, setamount] = useState(10000);
  const [rate, setrate] = useState(10);
  const [initialLumpsum, setinitialLumpsum] = useState(0);
  const [result, setresult] = useState(false);
  const [years, setyear] = useState(1);
  const [taxbracket, settaxbracket] = useState("less than 5 lacs");
  const [investmentoptions, setinvestmentoptions] = useState("FD");
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
    if (mode === "sip") sipcalc();
    else lumpsum();

    setresult(true);
  }, [
    amount,
    rate,
    years,
    mode,
    initialLumpsum,
    taxbracket,
    investmentoptions,
  ]);

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
          backgroundColor: ["#F86466", "#FBCD00"],
          borderColor: ["#F86466", "#FBCD00"],
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
          backgroundColor: ["#F86466", "#FBCD00"],
          borderColor: ["#F86466", "#FBCD00"],
          borderWidth: 1,
        },
      ],
    }));
  }
  return (
    <div className="calculatorComponent">
      <div className="inputSection">
        <div className="inputBlockSip">
          <div className="radioButton">
            <input
              type="radio"
              name="radio"
              id="sip"
              value="sip"
              onChange={(e) => setmode(e.target.value)}
              defaultChecked
            />
            <p>SIP</p>
          </div>
          <div className="radioButton">
            <input
              type="radio"
              name="radio"
              id="lumpsum"
              value="lumpsum"
              onChange={(e) => setmode(e.target.value)}
            />
            <p>Lumpsum</p>
          </div>
        </div>
        <InputBlock
          label={"Time Period"}
          min={1}
          max={100}
          setvalue={setyear}
          value={years}
          sign={"Yrs"}
        />

        <DropBox
          title="Tax Bracket"
          value={taxbracket}
          setvalue={settaxbracket}
          options={[
            "less than 5 lacs",
            "5 to 10 lacs",
            "10 to 20 lacs",
            "more than 20 lacs",
          ]}
        />
        <DropBox
          title="Investment Option"
          value={investmentoptions}
          setvalue={setinvestmentoptions}
          options={[
            "FD",
            "Corporate Bonds",
            "Govt Schemes",
            "Index Funds",
            "Mutual Funds",
            "Smart Portfolio",
          ]}
        />

        {result ? <ResultBox resultdata={resultdata} /> : null}
      </div>
      <div className="chartSection">
        <div className="chartContainer">
          <Doughnut
            data={chartData}
            className="chart"
            width={100}
            height={100}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
}

export default SipLumpsumCalc;
