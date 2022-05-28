import { useState, useEffect } from "react";
import styles from "../../../styles/StockSimulator/marketUpDown.module.scss";
import UpSvg from "../../SVGcomponents/StockSimulator/UpSvg";
import DownSvg from "../../SVGcomponents/StockSimulator/DownSvg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import Menu from "../Menu";
import Popup from "../Popup";
import SmartToyIcon from "@mui/icons-material/SmartToy";
// import InfoIcon from "@mui/icons-material/Info";
import NoData from "../NoData";

export default function MarketUpDown({ token, simulatorType, userData }) {
  const [selected, setSelected] = useState();
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
        if (challenges.data.data && challenges.data.data.market_pred)
          setSelected(challenges.data.data.market_pred);
      }
    }
    fetchUserChallenges();
  }, []);

  useEffect(() => {
    async function fetchUserChallengesResult() {
      let results = await SimulatorApis.getUserChallengesResult({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (results.data && results.data.success) {
        if (results.data.data) {
          setResult(results.data.data.market_pred);
        } else {
          setResult(results.data.message);
        }
      }
    }
    fetchUserChallengesResult();
  }, []);

  const handleSelect = async (value) => {
    setSelected(value);
    console.log("selected", value);

    let addedChallenge = await SimulatorApis.createOrUpdateChallenge({
      payload: {
        user_id: userData.user_id,
        market_pred: value,
        date: new Date(),
      },
      token,
      type: simulatorType,
    });
    if (addedChallenge.data && addedChallenge.data.success) {
      setSelected(addedChallenge.data.data.market_pred);
    }
  };

  return (
    <div className={styles.marketUpDown}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Market Up or Down</div>
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
          Predict whether the NSE200 index (market) will go up or down in the
          next trading session
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.optionsArea}>
          <div
            className={selected === "up" ? styles.activeUp : styles.upOption}
          >
            <button onClick={() => handleSelect("up")}>
              <div className={styles.checkIcon}>
                {selected === "up" ? <CheckCircleIcon /> : ""}
              </div>
              <div className={styles.name}>Market will go up</div>
              <UpSvg />
            </button>
          </div>
          <div className={styles.or}>OR</div>
          <div
            className={
              selected === "down" ? styles.activeDown : styles.downOption
            }
          >
            <button onClick={() => handleSelect("down")}>
              <div className={styles.checkIcon}>
                {selected === "down" ? <CheckCircleIcon /> : ""}
              </div>
              <div className={styles.name}>Market will go down</div>
              <DownSvg />
            </button>
          </div>
        </div>
      </div>
      {showResult && result && (
        <Popup
          title="Market Up or Down Result"
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
                  <div className={styles.title}>You have guessed</div>
                  <div
                    className={
                      result.submited_ans === "up" ? styles.up : styles.down
                    }
                  >
                    {result.submited_ans === "up" ? (
                      <>
                        <UpSvg />
                        UP
                      </>
                    ) : (
                      <>
                        <DownSvg />
                        Down
                      </>
                    )}
                  </div>
                </div>
                {result.correct_ans ? (
                  <div className={styles.right}>
                    <div className={styles.title}>Correct answer is</div>
                    <div
                      className={
                        result.correct_ans === "up" ? styles.up : styles.down
                      }
                    >
                      {result.correct_ans === "up" ? (
                        <>
                          <UpSvg />
                          UP
                        </>
                      ) : (
                        <>
                          <DownSvg />
                          Down
                        </>
                      )}
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
