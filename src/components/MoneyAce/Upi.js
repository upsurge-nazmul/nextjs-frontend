import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/upi.module.scss";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import BackSvg from "../SVGcomponents/MoneyAce/ui/BackSvg";
import { MainContext } from "../../context/Main";
import { getfullname } from "../../helpers/generalfunctions";
import Bulletin from "./Bulletin";
import { onlyText, removenonnumber } from "../../helpers/validationHelpers";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
export default function Upi({
  setcurrenttab,
  canvassize,
  moneyacedata,
  setmoneyacedata,
  settoastdata,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [mode, setmode] = useState("all");
  const [upi, setupi] = useState("");
  const [upipin, setupipin] = useState("");
  const [confirmupi, setconfirmupi] = useState("");
  const [err, seterr] = useState("");
  async function handleaddupi() {
    if (confirmupi !== upipin) {
      seterr("Pin does not match");
      return;
    }
    let res = await MoneyAceApis.updateupi({ id: upi, pin: upipin });
    if (res && res.data && res.data.success) {
      settoastdata("Created successfully");
      setcurrenttab("dashboard");
    } else {
      seterr(res?.data?.message || "Error connecting to server");
    }
  }
  return (
    <div className={styles.upi}>
      {mode === "bulletin" && (
        <Bulletin setmode={setmode} canvassize={canvassize} />
      )}
      <div className={styles.main}>
        <p className={styles.heading}>
          <img
            className={styles.headingicon}
            src="https://i.ibb.co/MsY3sDZ/Bank.png"
            alt=""
          />
          Bank
          <div
            className={styles.bulletinbtn}
            onClick={() => setmode("bulletin")}
          >
            <NewspaperRoundedIcon className={styles.bulletinicon} />
          </div>
        </p>
        <div className={styles.upidiv}>
          <p className={styles.subheading}>UPI</p>
          {moneyacedata?.is_upi_claim && false ? (
            <div className={styles.wrapper}>
              <div className={styles.row}>
                <p>UPI id</p>
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
                  onChange={(e) => setupipin(removenonnumber(e.target.value))}
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
                    setconfirmupi("");
                  }}
                >
                  <p>Reset</p>
                </div>
                <div className={styles.btn} onClick={handleaddupi}>
                  <p>Save</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <BackSvg
        className={styles.back}
        onClick={() => setcurrenttab("dashboard")}
      />
    </div>
  );
}
