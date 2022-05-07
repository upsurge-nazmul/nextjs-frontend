import { useEffect, useState } from "react";
import styles from "../../../../styles/StockSimulator/financialRatios.module.scss";
import SimulatorApis from "../../../../actions/apis/SimulatorApis";
import Chart from "./Chart";
import ButtonGroup from "../../ButtonGroup";

const Options = [
  { name: "FWD PE NTM", value: "fwdPPerENtm" },
  { name: "Fwd PEG Ratio NTM", value: "fwdPegRatioNtm" },
  { name: "P/E", value: "pPerE" },
  { name: "TEV/Fwd EBITDA NTM", value: "tevPerFwdEbitdaNtm" },
  { name: "TEV/LTM EBITDA", value: "tevPerLtmEbitda" },
];

export default function FinancialRatios({ token, company }) {
  const [finRatios, setFinRatios] = useState([]);
  const [fwdPPerENtm, setFwdPPerENtm] = useState();
  const [fwdPegRatioNtm, setFwdPegRatioNtm] = useState();
  const [pPerE, setPPerE] = useState();
  const [tevPerFwdEbitdaNtm, setTevPerFwdEbitdaNtm] = useState();
  const [tevPerLtmEbitda, setTevPerLtmEbitda] = useState();
  const [chartView, setChartView] = useState(Options[0].value);

  useEffect(() => {
    async function fetchFinRatios() {
      let finRatios = await SimulatorApis.getFinancialRatios({
        payload: {
          symbol: company.symbol,
        },
        token,
      });
      if (finRatios.data.success) {
        setFinRatios(finRatios.data.data.rows);
      }
    }
    if (company) {
      fetchFinRatios();
    }
  }, [company]);

  useEffect(() => {
    if (finRatios && finRatios.length) {
      let fwdp = [];
      let fwdPeg = [];
      let ppe = [];
      let tevNtm = [];
      let tevLtm = [];

      for (let item of finRatios) {
        fwdp.push({
          x: item.date,
          y: parseFloat(item.fwd_p_per_e_ntm),
        });
        fwdPeg.push({
          x: item.date,
          y: parseFloat(item.fwd_peg_ratio_ntm),
        });
        ppe.push({
          x: item.date,
          y: parseFloat(item.p_per_e),
        });
        tevNtm.push({
          x: item.date,
          y: parseFloat(item.tev_per_fwd_ebitda_ntm),
        });
        tevLtm.push({
          x: item.date,
          y: parseFloat(item.tev_per_ltm_ebitda),
        });
      }

      setFwdPPerENtm(fwdp);
      setFwdPegRatioNtm(fwdPeg);
      setPPerE(ppe);
      setTevPerFwdEbitdaNtm(tevNtm);
      setTevPerLtmEbitda(tevLtm);
    }
  }, [finRatios]);

  return (
    <div className={styles.financialRatios}>
      <div className={styles.bodyArea}>
        {chartView === Options[0].value && (
          <div className={styles.chartArea}>
            {/* <p className={styles.chartTitle}>{Options[0].name}</p> */}
            <Chart
              chartData={fwdPPerENtm}
              className={styles.chart}
              colors={["#1dd117"]}
            />
          </div>
        )}
        {chartView === Options[1].value && (
          <div className={styles.chartArea}>
            {/* <p className={styles.chartTitle}>{Options[1].name}</p> */}
            <Chart
              chartData={fwdPegRatioNtm}
              className={styles.chart}
              colors={["#c5d117"]}
            />
          </div>
        )}
        {chartView === Options[2].value && (
          <div className={styles.chartArea}>
            {/* <p className={styles.chartTitle}>{Options[2].name}</p> */}
            <Chart
              chartData={pPerE}
              className={styles.chart}
              colors={["#d17a17"]}
            />
          </div>
        )}
        {chartView === Options[3].value && (
          <div className={styles.chartArea}>
            {/* <p className={styles.chartTitle}>{Options[3].name}</p> */}
            <Chart
              chartData={tevPerFwdEbitdaNtm}
              className={styles.chart}
              colors={["#d12317"]}
            />
          </div>
        )}
        {chartView === Options[4].value && (
          <div className={styles.chartArea}>
            {/* <p className={styles.chartTitle}>{Options[4].name}</p> */}
            <Chart
              chartData={tevPerLtmEbitda}
              className={styles.chart}
              colors={["#177dd1"]}
            />
          </div>
        )}
      </div>

      <ButtonGroup value={chartView} action={setChartView} options={Options} />
    </div>
  );
}
