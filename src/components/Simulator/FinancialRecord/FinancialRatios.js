import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/financialData.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function FinancialRatios({ token, company }) {
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
    <div>
      <h1>This is financial ratios page</h1>
    </div>
  );
}
