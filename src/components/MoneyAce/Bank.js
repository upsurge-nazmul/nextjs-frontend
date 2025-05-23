import React, { useContext, useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import styles from "../../styles/MoneyAce/bank.module.scss";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import { Checkbox, Slider } from "@mui/material";
import BackSvg from "../SVGcomponents/MoneyAce/ui/BackSvg";
import BankDialog from "./BankDialog";
import {
  onlyNum,
  onlyText,
  removenonnumber,
} from "../../helpers/validationHelpers";
import BankCards from "./BankCards";
import { MainContext } from "../../context/Main";
import { getIndianTime, getReadableDob } from "../../helpers/timehelpers";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { getfullname } from "../../helpers/generalfunctions";
import Bulletin from "./Bulletin";
import { toIndianFormat } from "../../helpers/currency";
import NineSlice from "../NineSlice";
export default function Bank({
  setcurrenttab,
  canvassize,
  moneyacedata,
  setmoneyacedata,
  settoastdata,
  currentTourIndex,
  setcurrentTourIndex,
  showcard,
  setshowcard,
  showupi,
  setshowupi,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [passbookdata, setpassbookdata] = useState([]);
  const [accountopened, setacoountopened] = useState(
    moneyacedata?.account_number
  );
  const [showwhat, setshowwhat] = useState("");
  const [upi, setupi] = useState("");
  const [upipin, setupipin] = useState("");
  const [confirmupi, setconfirmupi] = useState("");
  const entities = [
    "Stocks",
    "Real Estate",
    "Gold",
    "FD",
    "Retirement",
    "Saving Account",
  ];
  const [dialogdata, setdialogdata] = useState(null);
  const [mode, setmode] = useState("home");
  const [err, seterr] = useState("");
  async function handleaddupi() {
    if (confirmupi !== upipin) {
      seterr("Pin does not match");
      return;
    }
    let res = await MoneyAceApis.updateupi({ id: upi, pin: upipin });
    if (res && res.data && res.data.success) {
      settoastdata("Created successfully");
      setshowupi(false);
      setmoneyacedata((prev) => ({ ...prev, upi_id: upi }));
      if (currentTourIndex === 14) {
        setcurrentTourIndex((prev) => prev + 1);
      }
    } else {
      seterr(res?.data?.message || "Error connecting to server");
    }
  }
  //
  //
  // https://imgcdn.upsurge.in/images/icon-info-0-1.png
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
  useEffect(() => {
    seterr("");
  }, [upi, upipin, confirmupi]);
  return (
    <div className={styles.bank}>
      {mode === "bulletin" && (
        <Bulletin setmode={setmode} canvassize={canvassize} />
      )}

      <div className={styles.main}>
        <div className={styles.heading}>
          <NineSlice
            width={
              widthHeight.width < 860
                ? widthHeight.width * 0.18
                : widthHeight.width * 0.12
            }
            height={
              widthHeight.width < 860
                ? widthHeight.width * 0.05
                : widthHeight.width * 0.035
            }
            border={5}
            s
            image="https://imgcdn.upsurge.in/images/title-header-1.png"
            imageSize={{ x: 702, y: 195 }}
          >
            <p className={styles.title}>
              {!accountopened
                ? "ACCOUNT"
                : showcard
                ? "CARDS"
                : showupi
                ? "UPI"
                : dialogdata
                ? dialogdata.btntext
                : "BANKING"}
            </p>
          </NineSlice>
        </div>
        <div className={styles.mainbg}>
          <div className={styles.innerbg}></div>
        </div>
        {mode === "passbook" ? (
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
        ) : (
          <div className={styles.homecontainer}>
            <div className={styles.top}>
              <div className={styles.headcomp}>
                <div className={styles.headdata}>
                  <NineSlice
                    width={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.14
                          : widthHeight.width * 0.055
                        : widthHeight.width * 0.08
                    }
                    height={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.055
                          : widthHeight.width * 0.01
                        : widthHeight.width * 0.015
                    }
                    border={widthHeight.width < 860 ? 5 : 25}
                    image="https://imgcdn.upsurge.in/images/tooltip-bg-small-1.png"
                    imageSize={{ x: 112, y: 82 }}
                  ></NineSlice>
                  <p className={styles.title}>ACCOUNT NO.</p>
                </div>
                <p className={styles.text}>{moneyacedata?.account_number}</p>
              </div>
              <div className={styles.headcomp}>
                <div className={styles.headdata}>
                  <NineSlice
                    width={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.14
                          : widthHeight.width * 0.055
                        : widthHeight.width * 0.08
                    }
                    height={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.055
                          : widthHeight.width * 0.01
                        : widthHeight.width * 0.015
                    }
                    border={widthHeight.width < 860 ? 5 : 25}
                    image="https://imgcdn.upsurge.in/images/tooltip-bg-small-1.png"
                    imageSize={{ x: 112, y: 82 }}
                  ></NineSlice>
                  <p className={styles.title}>ACCOUNT NAME</p>
                </div>
                <p className={styles.text}>
                  {getfullname(userdata?.first_name, userdata?.last_name)}
                </p>
              </div>
              <div className={styles.headcomp}>
                <div className={styles.headdata}>
                  <NineSlice
                    width={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.14
                          : widthHeight.width * 0.055
                        : widthHeight.width * 0.08
                    }
                    height={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.055
                          : widthHeight.width * 0.01
                        : widthHeight.width * 0.015
                    }
                    border={widthHeight.width < 860 ? 5 : 25}
                    image="https://imgcdn.upsurge.in/images/tooltip-bg-small-1.png"
                    imageSize={{ x: 112, y: 82 }}
                  ></NineSlice>
                  <p className={styles.title}>BALANCE</p>
                </div>
                <p className={styles.text}>
                  {"₹ " + toIndianFormat(moneyacedata?.account_balance)}
                </p>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.headcomp}>
                <div className={styles.headdata}>
                  <NineSlice
                    width={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.14
                          : widthHeight.width * 0.055
                        : widthHeight.width * 0.08
                    }
                    height={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.055
                          : widthHeight.width * 0.01
                        : widthHeight.width * 0.015
                    }
                    border={widthHeight.width < 860 ? 5 : 25}
                    image="https://imgcdn.upsurge.in/images/tooltip-bg-small-1.png"
                    imageSize={{ x: 112, y: 82 }}
                  ></NineSlice>
                  <p className={styles.title}>DEBIT CARD</p>
                </div>
                <p className={styles.text}>
                  {moneyacedata?.debit_card_number || "N/A"}
                </p>
              </div>
              <div className={styles.headcomp}>
                <div className={styles.headdata}>
                  <NineSlice
                    width={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.14
                          : widthHeight.width * 0.055
                        : widthHeight.width * 0.08
                    }
                    height={
                      widthHeight.width < 1200
                        ? widthHeight.width < 860
                          ? widthHeight.width * 0.055
                          : widthHeight.width * 0.01
                        : widthHeight.width * 0.015
                    }
                    border={widthHeight.width < 860 ? 5 : 25}
                    image="https://imgcdn.upsurge.in/images/tooltip-bg-small-1.png"
                    imageSize={{ x: 112, y: 82 }}
                  ></NineSlice>
                  <p className={styles.title}>UPI</p>
                </div>
                <p className={styles.text}>
                  {moneyacedata?.upi_id
                    ? moneyacedata.upi_id + "@upsurge"
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
        {!accountopened && (
          <div className={styles.openacc}>
            <div className={styles.main}>
              <div
                className={styles.bg}
                onClick={() => {
                  if (moneyacedata?.account_number) {
                    setacoountopened(true);
                  }
                }}
              ></div>
              <div className={styles.form}>
                <div className={styles.subbg}>
                  <div className={styles.innerbg}></div>
                </div>
                <div className={styles.row}>
                  <p>ACCOUNT NAME</p>
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
                  <p>DATE OF BIRTH</p>
                  <input value={getIndianTime(userdata.dob)} type="text" />
                </div>
                {/* <div className={styles.row}>
                  <div className={styles.chkbx}>
                    {userdata.gender === "male" ? (
                      <img
                        className={styles.Checkbox}
                        src="https://imgcdn.upsurge.in/images/checkboxfilled.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className={styles.Checkbox}
                        src="https://imgcdn.upsurge.in/images/checkboxemptu.png"
                        alt=""
                      />
                    )}
                    <p>Male</p>
                    {userdata.gender === "female" ? (
                      <img
                        className={styles.Checkbox}
                        src="https://imgcdn.upsurge.in/images/checkboxfilled.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className={styles.Checkbox}
                        src="https://imgcdn.upsurge.in/images/checkboxemptu.png"
                        alt=""
                      />
                    )}
                    <p>Female</p>
                  </div>
                </div> */}
                {!moneyacedata?.account_number && (
                  <div
                    id="create-acc-btn"
                    className={styles.submit}
                    onClick={() => {
                      if (currentTourIndex === 4) {
                        setcurrentTourIndex((prev) => prev + 1);
                      }
                      handleopenaccount();
                    }}
                  >
                    <p>{"Submit"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {showupi && (
          <div className={styles.upi}>
            <div className={styles.main}>
              <div
                className={styles.bg}
                onClick={() => setshowupi(false)}
              ></div>
              <div className={styles.form}>
                <div className={styles.subbg}>
                  <div className={styles.innerbg}></div>
                </div>
                {moneyacedata?.is_upi_claim ? (
                  <div className={styles.wrapper}>
                    <div className={`${styles.row} `}>
                      <p>UPI Id</p>
                      <input type="text" value={moneyacedata.upi_id} />
                      <p className={styles.upiinput}>@upsurge</p>
                    </div>
                    <div className={styles.row}>
                      <p>UPI Pin</p>
                      <input type="text" value={moneyacedata.upi_pin} />
                    </div>
                  </div>
                ) : (
                  <div className={styles.wrapper}>
                    <div className={styles.row}>
                      <p>Enter UPI id</p>
                      <input
                        type="text"
                        maxLength={8}
                        value={upi}
                        onChange={(e) => setupi(onlyText(e.target.value))}
                      />
                      <p className={styles.upiinput}>@upsurge</p>
                    </div>
                    <div className={styles.row}>
                      <p>Enter UPI Pin</p>
                      <input
                        type="text"
                        value={upipin}
                        maxLength={4}
                        onChange={(e) =>
                          setupipin(removenonnumber(e.target.value))
                        }
                      />
                    </div>
                    <div className={styles.row}>
                      <p>Confirm UPI Pin</p>
                      <input
                        type="text"
                        value={confirmupi}
                        maxLength={4}
                        onChange={(e) =>
                          setconfirmupi(removenonnumber(e.target.value))
                        }
                      />
                    </div>
                    {err && <p className={styles.err}>{err}</p>}
                    <div className={styles.bottomrow}>
                      <div
                        className={styles.btn}
                        onClick={() => {
                          setupi("");
                          setupipin("");
                          setconfirmupi("");
                        }}
                      >
                        <p>Reset</p>
                      </div>
                      <div
                        className={styles.btn}
                        onClick={handleaddupi}
                        id="upi-btn-confirm"
                      >
                        <p>Save</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {showwhat && (
          <BankDialog
            title={dialogdata.title}
            btntext={dialogdata.btntext}
            currentTourIndex={currentTourIndex}
            setcurrentTourIndex={setcurrentTourIndex}
            showwhat={showwhat}
            setshowwhat={setshowwhat}
            setdialogdata={setdialogdata}
            setpassbookdata={setpassbookdata}
            setmoneyacedata={setmoneyacedata}
          />
        )}
        {showcard && (
          <BankCards
            setshowcard={setshowcard}
            moneyacedata={moneyacedata}
            setmoneyacedata={setmoneyacedata}
            setpassbookdata={setpassbookdata}
            currentTourIndex={currentTourIndex}
            setcurrentTourIndex={setcurrentTourIndex}
          />
        )}
        {moneyacedata?.account_number && (
          <div className={styles.bottomrow}>
            <div
              className={styles.backbutton}
              onClick={() => {
                if (mode === "passbook") {
                  setmode("home");
                  return;
                }
                setcurrenttab("dashboard");
              }}
            >
              <img
                src="https://imgcdn.upsurge.in/images/icon-arrow3-left-0-1.png"
                alt=""
              />
            </div>

            <div
              className={styles.backbutton}
              onClick={() => {
                setmode((prev) => (prev === "passbook" ? "home" : "passbook"));
              }}
            >
              <img
                src={
                  mode === "passbook"
                    ? "https://imgcdn.upsurge.in/images/icon-info-0-1.png"
                    : "https://imgcdn.upsurge.in/images/btn-icon-book-1.png"
                }
                alt=""
              />
            </div>
            <div
              className={styles.btn}
              id="deposit-btn"
              onClick={() => {
                if (currentTourIndex === 5) {
                  setcurrentTourIndex((prev) => prev + 1);
                }

                setshowwhat("deposit");
                setdialogdata({
                  title: "Please enter amount to deposit",
                  btntext: "Deposit",
                });
              }}
            >
              <img
                src="https://imgcdn.upsurge.in/images/icon-circle-plus-0-1.png"
                alt=""
              />
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
              <img
                src="https://imgcdn.upsurge.in/images/icon-circle-minus-0-1.png"
                alt=""
              />
              <p>Withdraw</p>
            </div>

            <div className={styles.space}></div>

            <div className={styles.btn} onClick={() => setacoountopened(false)}>
              <img
                src="https://imgcdn.upsurge.in/images/icon-moneybag-0-1.png"
                alt=""
              />
              <p>Account</p>
            </div>
            <div
              id="debit-card-btn"
              className={styles.btn}
              onClick={() => {
                if (currentTourIndex === 8) {
                  setcurrentTourIndex((prev) => prev + 1);
                }
                setshowcard(true);
              }}
            >
              <img src="https://imgcdn.upsurge.in/images/icon-cards-0-1.png" alt="" />
              <p>Cards</p>
            </div>
            <div
              className={styles.btn}
              id="upi-btn"
              onClick={() => {
                if (currentTourIndex === 13) {
                  setcurrentTourIndex((prev) => prev + 1);
                }
                setshowupi(true);
              }}
            >
              <img
                src="https://imgcdn.upsurge.in/images/1024x1024bb-removebg-preview-1.png"
                alt=""
              />
              <p>UPI</p>
            </div>
            {/* <div className={styles.btn} >
          <p>Transfer</p>
        </div> */}
          </div>
        )}
      </div>

      {/* <BackSvg
        className={styles.back}
        onClick={() => setcurrenttab("dashboard")}
      /> */}
    </div>
  );
}
