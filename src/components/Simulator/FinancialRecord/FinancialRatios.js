import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/financialRatios.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function FinancialRatios({ token, company, backAction }) {
  const [finRatios, setFinRatios] = useState([]);

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

  console.log("!!!!!!!!!!", finRatios);

  return (
    <div className={styles.financialRatios}>
      <div className={styles.headingArea}>
        <button className={styles.backButton} onClick={backAction}>
          back
        </button>
        <p className={styles.heading}>Financial Ratios</p>
      </div>
    </div>
  );
}
