import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/StockSimulator/profitableStocks.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import { getShortForm } from "../../../helpers/shortForms";
// import { CircularProgress } from "@mui/material";
import { MODES } from "../constants";
import NoData from "../NoData";

export default function ProfitableStocks({
  token,
  simulatorType,
  duration,
  setSelectedSymbol = () => {},
}) {
  const [companies, setCompanies] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchTopCompanies() {
      setCompanies();
      let comps = await SimulatorApis.getTopCompanies({
        payload: {},
        token,
        type: simulatorType,
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
              <>
                {item ? (
                  <div key={i} className={styles.card}>
                    <div className={styles.iconArea}>
                      <div className={styles.icon}>
                        {getShortForm(item.name)}
                      </div>
                    </div>
                    <div className={styles.nameArea}>
                      <div className={styles.name}>{item.name}</div>
                      <div className={styles.symbol}>{item.symbol}</div>
                      <div
                        className={styles.symbol}
                      >{`Closing Value: ₹${parseFloat(item.close).toFixed(
                        2
                      )}`}</div>
                    </div>
                    {duration === "daily" && (
                      <div className={styles.propertiesArea}>
                        <div className={styles.properties}>
                          <div className={styles.propertyItem}>
                            <div className={styles.label}>O</div>
                            <div className={styles.value}>
                              {parseFloat(item.open).toFixed(2)}
                            </div>
                          </div>
                          <div className={styles.propertyItem}>
                            <div className={styles.label}>C</div>
                            <div className={styles.value}>
                              {parseFloat(item.close).toFixed(2)}
                            </div>
                          </div>
                          <div className={styles.propertyItem}>
                            <div className={styles.label}>H</div>
                            <div className={styles.value}>
                              {parseFloat(item.high).toFixed(2)}
                            </div>
                          </div>
                          <div className={styles.propertyItem}>
                            <div className={styles.label}>L</div>
                            <div className={styles.value}>
                              {parseFloat(item.low).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className={styles.valueArea}>
                      <div className={styles.label}>Return</div>
                      <div className={styles.value}>
                        <div
                          className={
                            parseFloat(item.current_return) > 0
                              ? styles.gain
                              : parseFloat(item.current_return) < 0
                              ? styles.loss
                              : styles.nutral
                          }
                        >{`₹${parseFloat(Math.abs(item.current_return)).toFixed(
                          2
                        )}`}</div>
                      </div>
                    </div>
                    <div className={styles.buttonArea}>
                      <button
                        className={styles.button}
                        onClick={() => {
                          router.push(
                            `/dashboard/w/${simulatorType}/${MODES[1].value}`
                          );
                          setSelectedSymbol(item.symbol);
                        }}
                      >
                        {"->"}
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })
        ) : (
          <NoData />
        )
      ) : (
        ""
      )}
    </>
  );
}
