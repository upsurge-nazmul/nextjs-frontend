import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/profitableStocks.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import { getShortForm } from "../../../helpers/shortForms";
import { CircularProgress } from "@mui/material";

export default function ProfitableStocks({ token, simulatorType, duration }) {
  const [companies, setCompanies] = useState();

  useEffect(() => {
    async function fetchTopCompanies() {
      setCompanies();
      let comps = await SimulatorApis.getTopCompanies({
        payload: {},
        token,
        simulatorType,
        duration,
      });
      if (comps.data && comps.data.success) {
        setCompanies(comps.data.data.rows);
      }
    }
    fetchTopCompanies();
  }, [duration]);

  return (
    <>
      {companies ? (
        companies.length ? (
          companies.map((item, i) => {
            return (
              <div key={i} className={styles.card}>
                <div className={styles.iconArea}>
                  <div className={styles.icon}>{getShortForm(item.name)}</div>
                </div>
                <div className={styles.nameArea}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.symbol}>{item.symbol}</div>
                  <div className={styles.symbol}>{`Closing Value: ₹${parseFloat(
                    item.close
                  ).toFixed(2)}`}</div>
                </div>
                <div className={styles.valueArea}>
                  <div className={styles.label}>Today's Return</div>
                  <div className={styles.value}>
                    <div
                      className={
                        parseFloat(item.current_return) > 0
                          ? styles.gain
                          : parseFloat(item.current_return) < 0
                          ? styles.loss
                          : styles.nutral
                      }
                    >{`₹${parseFloat(item.current_return).toFixed(2)}`}</div>
                  </div>
                </div>
                <div className={styles.buttonArea}>
                  <button className={styles.button}>{"->"}</button>
                </div>
              </div>
            );
          })
        ) : (
          <CircularProgress />
        )
      ) : (
        ""
      )}
    </>
  );
}
