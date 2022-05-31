import { useState, useEffect } from "react";
import styles from "../../../styles/StockSimulator/bitcoinPriceEst.module.scss";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import { getDateRange } from "../../../helpers/timehelpers";
import Chart from "../Home/Chart";
import Menu from "../Menu";
import Popup from "../Popup";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { toIndianFormat } from "../../../helpers/currency";
// import InfoIcon from "@mui/icons-material/Info";
import NoData from "../NoData";

export default function BitcoinPriceEst({ token, simulatorType, userData }) {
  const [bitcoinData, setBitcoinData] = useState();
  const [estValue, setEstValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    async function fetchUserChallenges() {
      let challenges = await SimulatorApis.getUserChallenges({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (challenges.data && challenges.data.success) {
        if (challenges.data.data && challenges.data.data.bitcoin_price_est)
          setEstValue(challenges.data.data.bitcoin_price_est);
      }
    }
    fetchUserChallenges();
  }, []);

  useEffect(() => {
    async function fetchBitcoinHist() {
      let btcHist = await SimulatorApis.getStocks({
        payload: {
          from: getDateRange("6 Months").from,
          to: getDateRange("6 Months").to,
          symbol: "BTC",
        },
        token,
        type: simulatorType,
      });
      if (btcHist.data && btcHist.data.success) {
        let values = [];
        for (let item of btcHist.data.data.rows) {
          let xAxisValue = new Date(item.date);
          values.push({
            x: xAxisValue,
            y: parseFloat(item.close),
          });
        }
        setBitcoinData(values);
      }
    }
    fetchBitcoinHist();
  }, [token]);

  useEffect(() => {
    async function fetchUserChallengesResult() {
      let results = await SimulatorApis.getUserChallengesResult({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (results.data && results.data.success) {
        if (results.data.data) {
          setResult(results.data.data.btc_est);
        } else {
          setResult(results.data.message);
        }
      }
    }
    fetchUserChallengesResult();
  }, []);

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log("confirmed estimated value", estValue);

    let addedChallenge = await SimulatorApis.createOrUpdateChallenge({
      payload: {
        user_id: userData.user_id,
        bitcoin_price_est: estValue,
        date: new Date(),
      },
      token,
      type: simulatorType,
    });
    if (addedChallenge.data && addedChallenge.data.success) {
      setEstValue(addedChallenge.data.data.bitcoin_price_est);
    }
    setEditMode(false);
  };

  return (
    <div className={styles.bitcoinPriceEst}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Bitcoin Price Estimate</div>
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
          {`Estimate tomorrow’s price of bitcoin as close as you can to win this game!`}
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.bottomLeft}>
          {bitcoinData && (
            <Chart
              chartData={bitcoinData}
              className={styles.chart}
              colors={["#F64E60"]}
              chartName="Close"
            />
          )}
        </div>
        <div className={styles.bottomRight}>
          <div className={styles.label}>Estimated Price</div>
          <input
            value={estValue}
            onChange={(e) => setEstValue(e.target.value)}
            className={styles.value}
            type="number"
            placeholder="eg: 0.00"
            disabled={!editMode}
          />
          <div className={styles.actionArea}>
            {editMode ? (
              <button
                onClick={(e) => handleConfirm(e)}
                className={styles.action}
                type="submit"
              >
                Confirm
              </button>
            ) : (
              <button
                onClick={(e) => setEditMode(true)}
                className={styles.action}
                type="submit"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
      {showResult && result && (
        <Popup
          title="Bitcoin Price Estimate Result"
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
          {typeof result === "string" ? (
            <div className={styles.popup}>
              <NoData message={result} />
            </div>
          ) : (
            <div className={styles.popup}>
              <div className={result.correct ? styles.correct : styles.wrong}>
                Your guess was {result.correct ? "right" : "wrong"}
              </div>
              <div className={styles.submission}>
                <div className={styles.left}>
                  <div className={styles.title}>You have estimated</div>
                  <div className={styles.name}>
                    ₹{toIndianFormat(result.submited_ans)}
                  </div>
                </div>
                {result.correct_ans ? (
                  <div className={styles.right}>
                    <div className={styles.title}>Correct answer is</div>
                    <div className={styles.name}>
                      ₹{toIndianFormat(result.correct_ans)}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </Popup>
      )}
    </div>
  );
}
