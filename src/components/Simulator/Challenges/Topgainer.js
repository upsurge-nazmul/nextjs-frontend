import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/topgainer.module.scss";
import CompanySelection from "../Dash/CompanySelection";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import { convertedUTCToLocal } from "../../../helpers/timehelpers";
import { CircularProgress } from "@mui/material";
import { toIndianFormat } from "../../../helpers/currency";
import Menu from "../Menu";
import Popup from "../Popup";
import SmartToyIcon from "@mui/icons-material/SmartToy";
// import InfoIcon from "@mui/icons-material/Info";
import NoData from "../NoData";

export default function Topgainer({
  list,
  currenTops,
  token,
  simulatorType,
  userData,
}) {
  const [currentSymbol, setCurrentSymbol] = useState(); // comes from API, but not updated in the UI
  const [selectedSymbol, setSelectedSymbol] = useState(); // comes from API, but updates on UI selection
  const [selectedCompany, setSelectedCompany] = useState();
  const [isLoading, setLoading] = useState(false);
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
        if (challenges.data.data && challenges.data.data.top_gainer)
          setCurrentSymbol(challenges.data.data.top_gainer);
        setSelectedSymbol(challenges.data.data.top_gainer);
      }
    }
    fetchUserChallenges();
  }, []);

  useEffect(() => {
    if (selectedSymbol && list && list.length) {
      let sel = list.find((item) => item.symbol === selectedSymbol);
      setSelectedCompany(sel);
    }
  }, [list, selectedSymbol]);

  useEffect(() => {
    async function fetchUserChallengesResult() {
      let results = await SimulatorApis.getUserChallengesResult({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (results.data && results.data.success) {
        if (results.data.data) {
          setResult(results.data.data.top_gainer);
        } else {
          setResult(results.data.message);
        }
      }
    }
    fetchUserChallengesResult();
  }, []);

  const handleConfirmButton = async () => {
    setLoading(true);
    let addedChallenge = await SimulatorApis.createOrUpdateChallenge({
      payload: {
        user_id: userData.user_id,
        top_gainer: selectedCompany.symbol,
        date: new Date(),
      },
      token,
      type: simulatorType,
    });
    if (addedChallenge.data && addedChallenge.data.success) {
      setSelectedSymbol(addedChallenge.data.data.top_gainer);
      setCurrentSymbol(addedChallenge.data.data.top_gainer);
    }
    setLoading(false);
  };

  return (
    <div className={styles.topgainer}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Top Gainer</div>
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
        <div className={styles.leftside}>
          <div className={styles.searchArea}>
            {list && list.length && (
              <CompanySelection
                {...{
                  value: selectedSymbol,
                  setvalue: setSelectedSymbol,
                  options: list,
                }}
              />
            )}
          </div>
          <div className={styles.companiesTable}>
            <div className={styles.headerRow}>
              <div className={styles.item}>
                {simulatorType === "cryptosimulator"
                  ? "Cryptocurrency "
                  : "Company "}{" "}
                Name
              </div>
              <div className={styles.item}>Open</div>
              <div className={styles.item}>Close</div>
              <div className={styles.item}>%Gain</div>
              {/* <div className={styles.item}>5 Days Performance</div> */}
            </div>
            {currenTops && currenTops.length
              ? currenTops.map((item, i) => {
                  return (
                    <div className={styles.tableRow} key={i}>
                      <div className={styles.item}>{item.name}</div>
                      <div className={styles.item}>
                        {toIndianFormat(parseFloat(item.open))}
                      </div>
                      <div className={styles.item}>
                        {toIndianFormat(parseFloat(item.close))}
                      </div>
                      <div className={styles.item}>
                        {item.current_return_percentage
                          ? String(
                              parseFloat(
                                item.current_return_percentage
                              ).toFixed(2)
                            )
                          : 0}
                      </div>
                      {/* <div className={styles.item}>
                      {parseFloat(item.volume).toFixed(2)}
                    </div> */}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div className={styles.rightside}>
          {selectedCompany ? (
            <>
              {isLoading ? (
                <div className={styles.loadinArea}>
                  <CircularProgress />
                </div>
              ) : (
                <div className={styles.selected}>
                  <div className={styles.title}>
                    Selected{" "}
                    {simulatorType === "cryptosimulator"
                      ? "Cryptocurrency"
                      : "Stock"}
                  </div>
                  <div className={styles.name}>{selectedCompany.name}</div>
                  <div className={styles.symbol}>{selectedCompany.symbol}</div>
                  <div className={styles.close}>
                    {"₹" + toIndianFormat(parseFloat(selectedCompany.close))}
                  </div>
                  <div
                    className={
                      parseFloat(selectedCompany.current_return_percentage) > 0
                        ? styles.gain
                        : parseFloat(
                            selectedCompany.current_return_percentage
                          ) < 0
                        ? styles.loss
                        : styles.nutral
                    }
                  >
                    {parseFloat(selectedCompany.current_return_percentage) >
                    0 ? (
                      <ArrowDropUpIcon />
                    ) : parseFloat(selectedCompany.current_return_percentage) <
                      0 ? (
                      <ArrowDropDownIcon />
                    ) : (
                      ""
                    )}
                    {parseFloat(
                      Math.abs(selectedCompany.current_return_percentage)
                    ).toFixed(2)}
                  </div>
                  <div className={styles.date}>
                    {convertedUTCToLocal(selectedCompany.date)}
                  </div>
                  {selectedSymbol !== currentSymbol && (
                    <div className={styles.actionArea}>
                      <button
                        className={styles.action}
                        onClick={() => handleConfirmButton(selectedCompany)}
                      >
                        Confirm Selection
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className={styles.noSelected}>
              Select any{" "}
              {simulatorType === "cryptosimulator" ? "currency" : "stock"} from
              the dropdown
            </div>
          )}
        </div>
      </div>
      {showResult && result && (
        <Popup
          title="Top Gainer Result"
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
                Your submission was {result.correct ? "right" : "wrong"}
              </div>
              <div className={styles.submission}>
                <div className={styles.left}>
                  <div className={styles.title}>You have submitted</div>
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
              </div>
            </div>
          )}
        </Popup>
      )}
    </div>
  );
}
