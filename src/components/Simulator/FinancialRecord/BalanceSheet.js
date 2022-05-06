import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/financialData.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function BalanceSheet({ token, company }) {
  const [balanceSheet, setBalanceSheet] = useState([]);

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

  console.log("!!!!!!!!!!", balanceSheet);

  return (
    <div>
      <h1>This is balance sheet page</h1>
    </div>
  );
}
