import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/financialData.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import BalanceSheet from "./BalanceSheet";
import ABReturns from "./ABReturns";
import FinancialRatios from "./FinancialRatios";
import Tabs from "../Tabs";

const TABS = [
  { name: "Balance Sheet", value: "balance_sheet", icon: "Balance Sheet" },
  {
    name: "Alpha Beta Returns",
    value: "ab_returns",
    icon: "Alpha Beta Returns",
  },
  {
    name: "Financial Ratios",
    value: "financial_ratios",
    icon: "Financial Ratios",
  },
];

export default function FinancialRecord({ company, token }) {
  const [tab, setTab] = useState(TABS[0].value);
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [abReturns, setAbReturns] = useState([]);
  const [finRatios, setFinRatios] = useState([]);

  useEffect(() => {
    async function fetchBalanceSheet() {
      let balSheet = await SimulatorApis.getBalanceSheet({
        payload: {
          symbol: company.symbol,
        },
        token,
      });
      if (balSheet.data.success) {
        setBalanceSheet(balSheet.data.data.rows);
      }
    }
    if (company) {
      fetchBalanceSheet();
    }
  }, [company]);

  console.log(balanceSheet);

  return (
    <div className={styles.financialRecord}>
      <div className={styles.bodyArea}>
        {tab === TABS[0].value && <BalanceSheet data={balanceSheet} />}
        {tab === TABS[1].value && <ABReturns data={abReturns} />}
        {tab === TABS[2].value && <FinancialRatios data={finRatios} />}
      </div>
      <div className={styles.footerArea}>
        <Tabs options={TABS} action={setTab} active={tab} shape="square" />
      </div>
    </div>
  );
}
