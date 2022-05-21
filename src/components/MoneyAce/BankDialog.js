import React, { useEffect, useState } from "react";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { removenonnumber } from "../../helpers/validationHelpers";
import styles from "../../styles/MoneyAce/bankdialog.module.scss";
export default function BankDialog({
  title,
  btntext,
  setdialogdata,
  showwhat,
  setshowwhat,
  setpassbookdata,
  setmoneyacedata,
  currentTourIndex,
  setcurrentTourIndex,
}) {
  const [amount, setamount] = useState();
  const [err, seterr] = useState("");
  useEffect(() => {
    seterr("");
  }, [amount]);
  async function handleClick() {
    if (showwhat === "deposit") {
      let response = await MoneyAceApis.depositMoney({ amount });
      if (response && response.data && response.data.success) {
        if (currentTourIndex === 6) {
          setcurrentTourIndex((prev) => prev + 1);
        }
        setshowwhat(null);
        setdialogdata(null);
        setpassbookdata((prev) => [
          ...prev,
          {
            particulars: "Deposit",
            account_balance:
              prev.length > 0
                ? prev[prev.length - 1].account_balance + Number(amount)
                : amount,
            deposit_money: amount,
            withdraw_money: 0,
            timestamp: new Date().getTime(),
          },
        ]);
        setmoneyacedata((prev) => ({
          ...prev,
          account_balance: prev.account_balance + Number(amount),
          inhand_money: prev.inhand_money - Number(amount),
        }));
      } else {
        seterr(response?.data?.message || "Unable to reach server");
      }
    } else {
      let response = await MoneyAceApis.withdrawMoney({ amount });
      if (response && response.data && response.data.success) {
        setshowwhat(null);
        setdialogdata(null);
        setpassbookdata((prev) => [
          ...prev,
          {
            particulars: "Withdraw",
            account_balance: prev[prev.length - 1].account_balance - amount,
            deposit_money: 0,
            withdraw_money: amount,
            timestamp: new Date().getTime(),
          },
        ]);
        setmoneyacedata((prev) => ({
          ...prev,
          account_balance: prev.account_balance - Number(amount),
          inhand_money: prev.inhand_money + Number(amount),
        }));
      } else {
        seterr(response?.data?.message || "Unable to reach server");
      }
    }
  }
  return (
    <div className={styles.bankdialog}>
      <div
        className={styles.background}
        onClick={() => {
          setshowwhat(null);
          setdialogdata(null);
        }}
      />

      <div className={styles.main}>
        <div className={styles.subbg}>
          <div className={styles.innerbg}></div>
        </div>
        <p className={styles.heading}>{title}</p>
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            setamount(removenonnumber(e.target.value));
          }}
          placeholder="Enter amount"
        />
        {err && <p className={styles.err}>{err}</p>}
        <div
          className={styles.submit}
          onClick={handleClick}
          id="deposit-btn-confirm"
        >
          <p>{btntext || "Continue"}</p>
        </div>
      </div>
    </div>
  );
}
