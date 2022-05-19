import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/stockXStockY.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function StockXStockY({ token, simulatorType, userData }) {
  const [selected, setSelected] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();

  useEffect(() => {
    async function fetchUserChallenges() {
      let challenges = await SimulatorApis.getUserChallenges({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (challenges.data && challenges.data.success) {
        if (challenges.data.data && challenges.data.data.stock_answer)
          setSelected(challenges.data.data.stock_answer);
      }
    }
    fetchUserChallenges();
  }, []);

  useEffect(() => {
    async function fetchStockXY() {
      let stocks = await SimulatorApis.getStockXY({
        payload: {
          user_id: userData.user_id,
        },
        token,
        type: simulatorType,
      });
      if (stocks.data && stocks.data.success) {
        const { x, y } = stocks.data.data;
        setX(x);
        setY(y);
      }
    }
    fetchStockXY();
  }, []);

  const handleSelect = async (value) => {
    setSelected(value);
    console.log("selected", value);

    let addedChallenge = await SimulatorApis.createOrUpdateChallenge({
      payload: {
        user_id: userData.user_id,
        stock_x: x.symbol,
        stock_y: y.symbol,
        stock_answer: value,
        date: new Date(),
      },
      token,
      type: simulatorType,
    });
    if (addedChallenge.data && addedChallenge.data.success) {
      setSelected(addedChallenge.data.data.stock_answer);
    }
  };

  return (
    <div className={styles.stockXStockY}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Stock X or Stock Y</div>
          <button className={styles.infoButton}>i</button>
        </div>
        <div className={styles.description}>
          Sed morbi pulvinar ornare gravida. Pulvinar turpis pellentesque
          porttitor nec phasellus justo, viverra. Duis varius risus, in tellus.
          In enim tincidunt nulla.
        </div>
      </div>
      <div className={styles.bottomSection}>
        {x && y ? (
          <div className={styles.optionsArea}>
            <div
              className={
                selected === x.symbol ? styles.activeOption : styles.option
              }
            >
              <button onClick={() => handleSelect(x.symbol)}>
                <div className={styles.checkIcon}>
                  {selected === x.symbol ? <CheckCircleIcon /> : ""}
                </div>
                <div className={styles.name}>{x.name}</div>
                <div>{`₹${parseFloat(x.close).toFixed(2)}`}</div>
              </button>
            </div>
            <div className={styles.or}>OR</div>
            <div
              className={
                selected === y.symbol ? styles.activeOption : styles.option
              }
            >
              <button onClick={() => handleSelect(y.symbol)}>
                <div className={styles.checkIcon}>
                  {selected === y.symbol ? <CheckCircleIcon /> : ""}
                </div>
                <div className={styles.name}>{y.name}</div>
                <div>{`₹${parseFloat(y.close).toFixed(2)}`}</div>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
