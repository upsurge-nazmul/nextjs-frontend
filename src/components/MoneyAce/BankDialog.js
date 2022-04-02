import React, { useEffect, useState } from "react";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { removenonnumber } from "../../helpers/validationHelpers";
import styles from "../../styles/MoneyAce/bankdialog.module.scss";
export default function BankDialog({ title, btntext, setdialog, showwhat }) {
  const [amount, setamount] = useState();
  const [err, seterr] = useState("");
  useEffect(() => {
    seterr("");
  }, [amount]);
  async function handleClick() {
    if (showwhat === "deposit") {
      let response = await MoneyAceApis.depositMoney({ amount });
      console.log(response.data);
      if (response && response.data && response.data.success) {
        setdialog(null);
      } else {
        seterr(response?.data?.message || "Unable to reach server");
      }
    } else {
      let response = await MoneyAceApis.withdrawMoney({ amount });
      if (response && response.data && response.data.success) {
        setdialog(null);
      } else {
        seterr(response?.data?.message || "Unable to reach server");
      }
    }
  }
  return (
    <div className={styles.bankdialog}>
      <div className={styles.background} onClick={() => setdialog(null)} />
      <div className={styles.main}>
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
        <div className={styles.submit} onClick={handleClick}>
          <p>{btntext || "Continue"}</p>
        </div>
      </div>
    </div>
  );
}
