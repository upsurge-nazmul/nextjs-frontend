import React, { useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/bankdashboard.module.scss";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import Bulletin from "./Bulletin";
export default function BankDashboard({ setcurrenttab, canvassize }) {
  const [mode, setmode] = useState("all");

  function getdialogdata(type) {
    if (type === "deposit") {
      setdialogdata({
        title: "Please enter a amount for deposit",
        btntext: "continue",
      });
    }
  }
  return (
    <div className={styles.bank}>
      {mode === "bulletin" && (
        <Bulletin setmode={setmode} canvassize={canvassize} />
      )}
      <div className={styles.main}>
        <div className={styles.bg}>
          <p className={styles.heading}>
            <BigBackArrow
              onClick={() => setcurrenttab("citymap")}
              className={styles.headingicon}
            />
            Bank
            <div
              className={styles.bulletinbtn}
              onClick={() => setmode("bulletin")}
            >
              <NewspaperRoundedIcon className={styles.bulletinicon} />
            </div>
          </p>

          <div className={styles.btnwrapper}>
            <div className={styles.button}>Passbook</div>
            <div
              className={styles.button}
              onClick={() => getdialogdata("deposit")}
            >
              Deposit
            </div>
            <div
              className={styles.button}
              onClick={() => getdialogdata("withdraw")}
            >
              Withdraw
            </div>
            <div className={styles.button}>ATM</div>
            <div className={styles.button}>UPI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
