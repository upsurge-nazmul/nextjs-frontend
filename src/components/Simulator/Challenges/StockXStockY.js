import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/stockXStockY.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import { toIndianFormat } from "../../../helpers/currency";
import Menu from "../Menu";
import Popup from "../Popup";
import SmartToyIcon from "@mui/icons-material/SmartToy";
// import InfoIcon from "@mui/icons-material/Info";
import NoData from "../NoData";

export default function StockXStockY({ token, simulatorType, userData }) {
  const [selected, setSelected] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
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

  useEffect(() => {
    async function fetchUserChallengesResult() {
      let results = await SimulatorApis.getUserChallengesResult({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (results.data && results.data.success) {
        if (results.data.data) {
          setResult(results.data.data.stock_xy);
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
          Choose whether stock X or stock Y will perform better in the next
          trading session.
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
      {showResult && result && (
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
                  <div className={styles.name}>{result.submited_ans.name}</div>
                  <div className={styles.symbol}>
                    {result.submited_ans.symbol}
                  </div>
                  <div className={styles.symbol}>
                    {toIndianFormat(
                      parseFloat(result.submited_ans.current_return_percentage)
                    )}
                    %
                  </div>
                </div>
                {result.correct_ans ? (
                  <div className={styles.right}>
                    <div className={styles.title}>Correct answer is</div>
                    <div className={styles.name}>{result.correct_ans.name}</div>
                    <div className={styles.symbol}>
                      {result.correct_ans.symbol}
                    </div>
                    <div className={styles.symbol}>
                      {toIndianFormat(
                        parseFloat(result.correct_ans.current_return_percentage)
                      )}
                      %
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
