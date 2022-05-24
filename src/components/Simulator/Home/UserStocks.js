import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/StockSimulator/userStocks.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import { getShortForm } from "../../../helpers/shortForms";
import { MODES } from "../constants";
import { toIndianFormat } from "../../../helpers/currency";

export default function UserStocks({
  userData,
  token,
  simulatorType,
  duration,
  selected = "all",
  setLastUpdated = () => {},
  setSelectedSymbol = () => {},
}) {
  const [companies, setCompanies] = useState();
  const router = useRouter();

  const convetedDate = (date) => {
    date = new Date(date);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    return `${d}/${m}/${y}`;
  };

  useEffect(() => {
    async function fetchTopCompanies() {
      setCompanies();
      let comps = await SimulatorApis.getTopUserCompanies({
        payload: {
          user_id: userData.user_id,
        },
        token,
        type: simulatorType,
        duration: duration,
      });
      if (
        comps.data &&
        comps.data.success &&
        comps.data.data &&
        comps.data.data.length
      ) {
        if (selected === "all") {
          setCompanies(comps.data.data);
        } else {
          let filt = comps.data.data.filter((c) => c.symbol === selected);
          setCompanies(filt);
        }
        setLastUpdated(
          convetedDate(comps.data.data[0] && comps.data.data[0].date)
        );
      } else {
        setLastUpdated(convetedDate(new Date()));
      }
    }
    fetchTopCompanies();
  }, [duration, selected]);

  return (
    <>
      {companies && companies.length
        ? companies.map((item, i) => {
            return (
              <div key={"companies" + i}>
                {item ? (
                  <div className={styles.card}>
                    <div className={styles.iconArea}>
                      <div className={styles.icon}>
                        {getShortForm(item.name)}
                      </div>
                    </div>
                    <div className={styles.nameArea}>
                      <div className={styles.name}>{item.name}</div>
                      <div className={styles.symbol}>{item.symbol}</div>
                    </div>
                    <div className={styles.valueArea}>
                      <div className={styles.label}>Total Value</div>
                      <div className={styles.value}>
                        {"₹" +
                          toIndianFormat(
                            parseFloat(item.current_price) *
                              parseFloat(item.quantity)
                          )}
                      </div>
                    </div>
                    <div className={styles.qtArea}>
                      <div className={styles.label}>Quantity</div>
                      <div className={styles.value}>{item.quantity}</div>
                    </div>
                    <div className={styles.gainArea}>
                      <div
                        className={
                          parseFloat(item.current_return) > 0
                            ? styles.gain
                            : parseFloat(item.current_return) < 0
                            ? styles.loss
                            : styles.nutral
                        }
                      >{`₹${toIndianFormat(
                        Math.abs(item.current_return)
                      )}`}</div>
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
                  <div></div>
                )}
              </div>
            );
          })
        : ""}
    </>
  );
}
