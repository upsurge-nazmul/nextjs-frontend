import { useState } from "react";
import styles from "../../../styles/StockSimulator/financialRecord.module.scss";
import BalanceSheet from "./BalanceSheet";
import ABReturns from "./ABReturns";
import FinancialRatios from "./FinancialRatios";
import Tabs from "../Tabs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

export default function FinancialRecord({ company, token, setShowFR }) {
  const [tab, setTab] = useState(TABS[0].value);

  return (
    <div className={styles.financialRecord}>
      <div className={styles.headingArea}>
        <button className={styles.backButton} onClick={() => setShowFR(false)}>
          <ArrowBackIcon className={styles.icon} />
        </button>
        {tab === TABS[0].value && (
          <p className={styles.heading}>{TABS[0].name}</p>
        )}
        {tab === TABS[1].value && (
          <p className={styles.heading}>{TABS[1].name}</p>
        )}
        {tab === TABS[2].value && (
          <p className={styles.heading}>{TABS[2].name}</p>
        )}
      </div>
      <div className={styles.bodyArea}>
        {tab === TABS[0].value && <BalanceSheet {...{ token, company }} />}
        {tab === TABS[1].value && <ABReturns {...{ token, company }} />}
        {tab === TABS[2].value && <FinancialRatios {...{ token, company }} />}
      </div>
      <div className={styles.footerArea}>
        <Tabs options={TABS} action={setTab} active={tab} />
      </div>
    </div>
  );
}
