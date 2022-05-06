import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/abReturns.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function ABReturns({ token, company }) {
  const [abReturns, setAbReturns] = useState([]);

  useEffect(() => {
    async function fetchAbReturns() {
      let abReturns = await SimulatorApis.getAlphaBetaReturns({
        payload: {
          symbol: company.symbol,
        },
        token,
      });
      if (abReturns.data.success) {
        setAbReturns(abReturns.data.data.rows);
      }
    }
    if (company) {
      fetchAbReturns();
    }
  }, [company]);

  console.log("!!!!!!!!!!", abReturns);

  return (
    <div className={styles.abReturns}>
      <h1>This is A B Returns page</h1>
    </div>
  );
}
