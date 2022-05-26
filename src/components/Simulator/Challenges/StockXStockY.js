import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/stockXStockY.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import { toIndianFormat } from "../../../helpers/currency";
import Menu from "../Menu";
import Popup from "../Popup";
import SmartToyIcon from "@mui/icons-material/SmartToy";
// import InfoIcon from "@mui/icons-material/Info";

export default function StockXStockY({ token, simulatorType, userData }) {
  const [selected, setSelected] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [showResult, setShowResult] = useState(false);

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
          {/* <button className={styles.infoButton}>i</button> */}
          <Menu
            menuItems={[
              {
                name: `Result`,
                icon: <SmartToyIcon />,
                onClick: () => setShowResult(true),
              },
              // {
              //   name: `More Info`,
              //   icon: <InfoIcon />,
              //   onClick: () => {},
              // },
            ]}
          />
        </div>
        <div className={styles.description}>
          {/* Sed morbi pulvinar ornare gravida. Pulvinar turpis pellentesque
          porttitor nec phasellus justo, viverra. Duis varius risus, in tellus.
          In enim tincidunt nulla. */}
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
                <div>{`₹${toIndianFormat(parseFloat(x.close))}`}</div>
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
                <div>{`₹${toIndianFormat(parseFloat(y.close))}`}</div>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {showResult && (
        <Popup
          title="Stock X or Stock Y Result"
          actions={{
            cancelText: "Close",
            isCancel: true,
            handleCancel: () => {
              setShowResult(false);
            },
            proceedText: "Proceed",
            isProceed: false,
            handleProceed: () => {
              setShowResult(false);
            },
            proceedButtonType: "normal",
          }}
          onOutsideClick={() => {
            setShowResult(false);
          }}
        >
          <div className={styles.popup}>
            <div className={styles.wrong}>Your guess was wrong</div>
            <div className={styles.submission}>
              <div className={styles.left}>
                <div className={styles.title}>You have guessed</div>
                <div className={styles.name}>XYU company Name</div>
                <div className={styles.symbol}>XYUC</div>
                <div className={styles.symbol}>$1233232</div>
              </div>
              <div className={styles.right}>
                <div className={styles.title}>Correct answer is</div>
                <div className={styles.name}>XYU company Name</div>
                <div className={styles.symbol}>XYUC</div>
                <div className={styles.symbol}>$1233232</div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
}
