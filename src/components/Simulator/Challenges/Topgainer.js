import { useEffect, useState } from "react";
import styles from "../../../styles/StockSimulator/topgainer.module.scss";
import CompanySelection from "../Dash/CompanySelection";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SimulatorApis from "../../../actions/apis/SimulatorApis";

export default function Topgainer({
  list,
  currenTops,
  token,
  simulatorType,
  userData,
}) {
  const [selectedSymbol, setSelectedSymbol] = useState();
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(() => {
    async function fetchUserChallenges() {
      let challenges = await SimulatorApis.getUserChallenges({
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (challenges.data && challenges.data.success) {
        if (challenges.data.data && challenges.data.data.top_gainer)
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

  const handleConfirmButton = async () => {
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
    }
  };

  return (
    <div className={styles.topgainer}>
      <div className={styles.topSection}>
        <div className={styles.titleArea}>
          <div className={styles.title}>Top Gainer</div>
          <button className={styles.infoButton}>i</button>
        </div>
        <div className={styles.description}>
          Sed morbi pulvinar ornare gravida. Pulvinar turpis pellentesque
          porttitor nec phasellus justo, viverra. Duis varius risus, in tellus.
          In enim tincidunt nulla.
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
              <div className={styles.item}>Company Name</div>
              <div className={styles.item}>High</div>
              <div className={styles.item}>Low</div>
              <div className={styles.item}>Gain</div>
              {/* <div className={styles.item}>5 Days Performance</div> */}
            </div>
            {currenTops && currenTops.length
              ? currenTops.map((item, i) => {
                  return (
                    <div className={styles.tableRow} key={i}>
                      <div className={styles.item}>{item.name}</div>
                      <div className={styles.item}>
                        {String(parseFloat(item.high).toFixed(2))}
                      </div>
                      <div className={styles.item}>
                        {String(parseFloat(item.low).toFixed(2))}
                      </div>
                      <div className={styles.item}>
                        {String(parseFloat(item.current_return).toFixed(2))}
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
            <div className={styles.selected}>
              <div className={styles.title}>Selected Stock</div>
              <div className={styles.name}>{selectedCompany.name}</div>
              <div className={styles.symbol}>{selectedCompany.symbol}</div>
              <div className={styles.close}>
                {"₹" + String(parseFloat(selectedCompany.close).toFixed(2))}
              </div>
              <div
                className={
                  parseFloat(selectedCompany.current_return) > 0
                    ? styles.gain
                    : styles.loss
                }
              >
                {parseFloat(selectedCompany.current_return) > 0 ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
                {parseFloat(Math.abs(selectedCompany.current_return)).toFixed(
                  2
                )}
              </div>
              <div className={styles.date}>{selectedCompany.date}</div>
              <div className={styles.actionArea}>
                <button
                  className={styles.action}
                  onClick={() => handleConfirmButton(selectedCompany)}
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.noSelected}>
              Select any stock from the dropdown
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
