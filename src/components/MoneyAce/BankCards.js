import React, { useContext, useState } from "react";
import styles from "../../styles/MoneyAce/bankcards.module.scss";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { onlyNum, removenonnumber } from "../../helpers/validationHelpers";
import { getMonthYearOnly } from "../../helpers/timehelpers";
import { MainContext } from "../../context/Main";
import { getfullname } from "../../helpers/generalfunctions";
export default function BankCards({
  setshowcard,
  moneyacedata,
  setmoneyacedata,
  setpassbookdata,
  setcurrentTourIndex,
  currentTourIndex,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [atmpin, setatmpin] = useState("");
  const [showpin, setshowpin] = useState(false);
  async function activateatm() {
    let response = await MoneyAceApis.activateAtm({ pin: atmpin });
    if (response && response.data && response.data.success) {
      setpassbookdata((prev) => [
        ...prev,
        {
          account_balance: moneyacedata.account_balance + 1000,
          deposit_money: 1000,
          timestamp: new Date().getTime(),
          particulars: "Bonus for claiming atm card",
        },
      ]);
      setmoneyacedata((prev) => ({ ...prev, ...response.data.data }));
    }
  }
  return (
    <div className={styles.bankcards}>
      <div className={styles.background} onClick={() => setshowcard(null)} />

      <div className={styles.main}>
        <div className={styles.mainbg}>
          <div className={styles.innerbg}></div>
        </div>
        {moneyacedata.is_atm_claim ? (
          <div className={styles.card} id="debit-card-main">
            <div className={styles.logo}>
              <div></div>
              <div></div>
            </div>
            <div className={styles.head}>Balance</div>
            <div className={styles.balance}>
              ₹{moneyacedata.account_balance}
            </div>
            <div className={styles.number}>
              {moneyacedata.debit_card_number}
            </div>
            <div className={styles.valids}>
              <div className={styles.valid}>
                <p className={styles.heading}>VALID THRU</p>
                <p className={styles.value}>
                  {getMonthYearOnly(moneyacedata.exp_date)}
                </p>
              </div>
              <div className={styles.valid}>
                <p className={styles.heading}>CARD HOLDER</p>
                <p className={styles.value}>
                  {getfullname(userdata.first_name, userdata.last_name)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.nocard}>
            {!showpin ? (
              <p
                className={styles.err}
              >{`Currently, you don't have any card`}</p>
            ) : (
              <p className={styles.heading}>Please set a 4 digit pin</p>
            )}
            {showpin && (
              <input
                type="text"
                value={atmpin}
                maxLength={4}
                onChange={(e) => setatmpin(removenonnumber(e.target.value))}
              />
            )}
            <div
              className={styles.btn}
              id={
                showpin ? "debit-card-pin-btn" : "debit-card-confirm-activate"
              }
              onClick={() => {
                if (!showpin) {
                  if (currentTourIndex === 9) {
                    setcurrentTourIndex((prev) => prev + 1);
                  }
                  setshowpin(true);
                } else {
                  if (currentTourIndex === 10) {
                    setcurrentTourIndex((prev) => prev + 1);
                  }
                  activateatm();
                }
              }}
            >
              <p>{showpin ? "Confirm" : "Acitivate ATM card"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
