import React, { useContext, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import styles from "../../styles/MoneyAce/bank.module.scss";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import { Checkbox, Slider } from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import BackSvg from "../SVGcomponents/MoneyAce/ui/BackSvg";
import BankDialog from "./BankDialog";
import { onlyNum, removenonnumber } from "../../helpers/validationHelpers";
import BankCards from "./BankCards";
import { MainContext } from "../../context/Main";
import { getIndianTime, getReadableDob } from "../../helpers/timehelpers";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { getfullname } from "../../helpers/generalfunctions";
import Bulletin from "./Bulletin";
import { toIndianFormat } from "../../helpers/currency";
export default function Bank({
  setcurrenttab,
  canvassize,
  moneyacedata,
  setmoneyacedata,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [passbookdata, setpassbookdata] = useState([]);
  const [accountopened, setacoountopened] = useState(
    moneyacedata?.account_number
  );
  const [showcard, setshowcard] = useState(false);
  const [showwhat, setshowwhat] = useState("");

  const entities = [
    "Stocks",
    "Real Estate",
    "Gold",
    "FD",
    "Retirement",
    "Saving Account",
  ];
  const [dialogdata, setdialogdata] = useState(null);
  const [mode, setmode] = useState("all");

  async function handleopenaccount() {
    let response = await MoneyAceApis.openBankAccount();
    if (response && response.data && response.data.success) {
      setmoneyacedata((prev) => ({ ...prev, ...response.data.data }));
      setpassbookdata((prev) => [
        ...prev,
        {
          particulars: "Bonus for opening account",
          deposit_money: 1000,
          account_balance: 1000,
          timestamp: new Date().getTime(),
        },
      ]);
      setacoountopened(true);
    }
  }
  useEffect(() => {
    loadpassbook();
    async function loadpassbook() {
      let response = await MoneyAceApis.getBankPassbook();
      if (response && response.data && response.data.success) {
        setpassbookdata(response.data.data);
      }
    }
  }, []);
  return (
    <div className={styles.bank}>
      {mode === "bulletin" && (
        <Bulletin setmode={setmode} canvassize={canvassize} />
      )}
      {showwhat && (
        <BankDialog
          title={dialogdata.title}
          btntext={dialogdata.btntext}
          showwhat={showwhat}
          setdialog={setshowwhat}
          setpassbookdata={setpassbookdata}
        />
      )}
      {showcard && (
        <BankCards
          setshowcard={setshowcard}
          moneyacedata={moneyacedata}
          setmoneyacedata={setmoneyacedata}
        />
      )}
      <div className={styles.main}>
        <p className={styles.heading}>
          <img
            className={styles.headingicon}
            src="https://i.ibb.co/MsY3sDZ/Bank.png"
            alt=""
          />
          Bank
          {accountopened ? (
            <p className={styles.name}>
              {getfullname(userdata.first_name, userdata.last_name)}
            </p>
          ) : (
            <p className={styles.whiteheading}>ACCOUNT</p>
          )}
          {accountopened && (
            <p className={styles.accno}>A/c - {moneyacedata.account_number}</p>
          )}
          <div
            className={styles.bulletinbtn}
            onClick={() => setmode("bulletin")}
          >
            <NewspaperRoundedIcon className={styles.bulletinicon} />
          </div>
        </p>
        {accountopened && (
          <div className={styles.container}>
            <div className={styles.headRow}>
              <div className={styles.rowitem}>#</div>
              <div className={styles.rowitem}>Date</div>
              <div className={styles.rowitem}>Description</div>
              <div className={styles.rowitem}>Debit</div>
              <div className={styles.rowitem}>Credit</div>
              <div className={styles.rowitem}>Balance</div>
            </div>
            <div className={styles.rows}>
              {passbookdata.map((row, index) => {
                return (
                  <div className={styles.row} key={row.id}>
                    <div className={styles.rowitem}>
                      {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                    </div>
                    <div className={styles.rowitem}>
                      {getIndianTime(row.timestamp)}
                    </div>
                    <div className={styles.rowitem}>{row.particulars}</div>
                    <div className={styles.rowitem}>
                      {row.withdraw_money
                        ? "-₹" + toIndianFormat(row.withdraw_money)
                        : "-"}
                    </div>
                    <div className={styles.rowitem}>
                      {row.deposit_money
                        ? "₹" + toIndianFormat(row.deposit_money)
                        : "-"}
                    </div>
                    <div className={styles.rowitem}>
                      ₹{toIndianFormat(row.account_balance)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!accountopened && (
          <div className={styles.openacc}>
            <div className={styles.main}>
              <div className={styles.heading}>
                <div className={styles.namewrapper}>
                  <img
                    src="https://i.ibb.co/yXFLZCQ/Green-Header-Small-BG.png"
                    alt=""
                  />
                  <p>
                    {moneyacedata.account_number
                      ? "Account details"
                      : "upsurge banking form"}
                  </p>
                </div>
              </div>
              <div className={styles.form}>
                <div className={styles.row}>
                  <p>Your name</p>
                  <input
                    value={(
                      userdata.first_name +
                      " " +
                      (userdata.last_name || "")
                    ).trim()}
                    type="text"
                  />
                </div>
                <div className={styles.row}>
                  <p>Your Dob</p>
                  <input value={getIndianTime(userdata.dob)} type="text" />
                </div>
                <div className={styles.row}>
                  <div className={styles.chkbx}>
                    {userdata.gender === "male" ? (
                      <img
                        className={styles.Checkbox}
                        src="https://i.ibb.co/JjkK9wf/checkboxfilled.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className={styles.Checkbox}
                        src="https://i.ibb.co/Gk8h9Sc/checkboxemptu.png"
                        alt=""
                      />
                    )}
                    <p>Male</p>
                    {userdata.gender === "female" ? (
                      <img
                        className={styles.Checkbox}
                        src="https://i.ibb.co/JjkK9wf/checkboxfilled.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className={styles.Checkbox}
                        src="https://i.ibb.co/Gk8h9Sc/checkboxemptu.png"
                        alt=""
                      />
                    )}
                    <p>Female</p>
                  </div>
                </div>
                <div
                  className={styles.submit}
                  onClick={() => {
                    if (moneyacedata.account_number) {
                      setacoountopened(true);
                      return;
                    }
                    handleopenaccount();
                  }}
                >
                  <p>{moneyacedata.account_number ? "Close" : "Submit"}</p>
                </div>
              </div>
              <div className={styles.row}></div>
            </div>
          </div>
        )}
      </div>
      {accountopened && (
        <div className={styles.bottomrow}>
          <div className={styles.btn} onClick={() => setacoountopened(false)}>
            <p>Account</p>
          </div>
          <div className={styles.btn} onClick={() => setshowcard(true)}>
            <p>Cards</p>
          </div>

          <div className={styles.space}></div>
          <div
            className={styles.btn}
            onClick={() => {
              setshowwhat("deposit");
              setdialogdata({
                title: "Please enter amount to deposit",
                btntext: "Deposit",
              });
            }}
          >
            <p>Deposit</p>
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              setshowwhat("withdraw");
              setdialogdata({
                title: "Please enter amount to withdraw",
                btntext: "Withdraw",
              });
            }}
          >
            <p>Withdraw</p>
          </div>
          {/* <div className={styles.btn} >
          <p>Transfer</p>
        </div> */}
        </div>
      )}
      <BackSvg
        className={styles.back}
        onClick={() => setcurrenttab("dashboard")}
      />
    </div>
  );
}
