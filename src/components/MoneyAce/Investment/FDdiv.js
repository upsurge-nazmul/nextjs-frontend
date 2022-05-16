import React, { useContext, useEffect, useState } from "react";
import MoneyAceApis from "../../../actions/apis/MoneyAceApis";
import { MainContext } from "../../../context/Main";
import { toIndianFormat } from "../../../helpers/currency";
import { getIndianTime } from "../../../helpers/timehelpers";
import { removenonnumber } from "../../../helpers/validationHelpers";
import styles from "../../../styles/MoneyAce/fddiv.module.scss";
import BackSvg from "../../SVGcomponents/MoneyAce/ui/BackSvg";
export default function FDdiv({
  setcurrentmode,
  settoastdata,
  setmoneyacedata,
  moneyacedata,
  setcurrenttab,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [fddata, setfddata] = useState(null);
  const [mode, setmode] = useState("main");
  const [err, seterr] = useState("");
  const [portfoliodata, setportfoliodata] = useState([]);
  const [amount, setamount] = useState(1000);
  const [year, setyear] = useState(1);
  useEffect(() => {
    if (mode !== "main") return;
    getdata();
    async function getdata() {
      let res = await MoneyAceApis.getFdRates();
      if (res && res.data && res.data.success) {
        setfddata(res.data.data);
      }
    }
  }, [mode]);
  useEffect(() => {
    setamount(1000);
    setyear(1);
    seterr("");
    if (mode === "portfolio") {
      loadportfolio();
    }
  }, [mode]);
  useEffect(() => {
    seterr("");
  }, [amount]);
  async function loadportfolio() {
    let res = await MoneyAceApis.getFdHoldings();
    if (res && res.data && res.data.success) {
      setportfoliodata(res.data.data);
    } else {
      seterr(res?.data?.message || "Unable to reach to server");
    }
  }
  async function handlebuy() {
    if (!amount) {
      seterr("Please enter quantity");
      return;
    }
    if (amount < 1000) {
      seterr("Minimum amount for fd is ₹1000");
      return;
    }
    let res = await MoneyAceApis.buyFd({ amount, year });
    if (res && res.data && res.data.success) {
      settoastdata({ type: "success", msg: res.data.message, show: true });
      setmoneyacedata((prev) => ({
        ...prev,
        total_investment: prev.total_investment + res.data.data.invested_amount,
        account_balance: prev.account_balance - res.data.data.invested_amount,
      }));
      setmode("portfolio");
    } else {
      seterr(res?.data?.message || "Unable to reach to server");
    }
  }

  if (mode === "main")
    return (
      <div className={styles.fddiv}>
        <div
          className={styles.background}
          onClick={() => {
            setcurrentmode("main");
          }}
        />
        <div className={styles.main}>
          <div className={styles.subbg}>
            <div className={styles.innerbg}></div>
          </div>
          <p className={styles.heading}>FIXED DEPOSIT</p>
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <p>Intrest rate</p>
              <input type="text" value={fddata?.return_on_investment + " %"} />
            </div>
            <div className={styles.row}>
              <p>Account balance</p>
              <input
                type="text"
                value={"₹ " + toIndianFormat(moneyacedata?.account_balance)}
              />
            </div>
            <div className={styles.row}>
              <p>{`Current value of FD's`}</p>
              <input
                type="text"
                value={"₹ " + toIndianFormat(fddata?.total_investment)}
              />
            </div>
            {err && <p className={styles.error}>{err}</p>}
            <div className={styles.bottom}>
              <div
                className={styles.backbutton}
                onClick={() => setcurrentmode("main")}
              >
                <img
                  src="https://i.ibb.co/NxvRf9Z/icon-arrow3-left-0-1.png"
                  alt=""
                />
              </div>
              <div className={styles.btn} onClick={() => setmode("portfolio")}>
                <img
                  src="https://i.ibb.co/qWP5w1r/btn-icon-book-1.png"
                  alt=""
                />
                <p>{`Current FD's`}</p>
              </div>
              <div className={styles.btn} onClick={() => setmode("buy")}>
                <img
                  src="https://i.ibb.co/6BTprr4/icon-circle-plus-0-1.png"
                  alt=""
                />
                <p>New FD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (mode === "buy")
    return (
      <div className={styles.fddiv}>
        <div
          className={styles.background}
          onClick={() => {
            setcurrentmode("main");
          }}
        />
        <div className={styles.main}>
          <div className={styles.subbg}>
            <div className={styles.innerbg}></div>
          </div>
          <p className={styles.heading}>NEW FIXED DEPOSIT</p>
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <p style={{ textAlign: "center", justifyContent: "center" }}>
                {`Enter amount`}
              </p>
            </div>
            <div className={styles.row}>
              <input
                type="text"
                value={"₹ " + amount}
                onChange={(e) => setamount(removenonnumber(e.target.value))}
                placeholder="Enter amount.."
              />
            </div>
            <div className={styles.row}>
              <p style={{ textAlign: "center", justifyContent: "center" }}>
                {`Enter tenure`}
              </p>
            </div>
            <div className={styles.row}>
              <img
                src="https://i.ibb.co/TLFq2mS/minus.png"
                alt=""
                onClick={() => setyear((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
              />
              <input
                type="text"
                value={year + " yrs"}
                onChange={(e) => setyear(removenonnumber(e.target.value))}
                placeholder="Enter tenure..."
              />
              <img
                src="https://i.ibb.co/W6VgkX8/plus.png"
                alt=""
                onClick={() => setyear((prev) => Number(prev) + 1)}
              />
            </div>
            <div className={styles.row}>
              <p style={{ textAlign: "center", justifyContent: "center" }}>
                Value at maturity
              </p>
            </div>
            <p className={styles.total}>
              ₹{" "}
              {toIndianFormat(
                Number(amount) +
                  amount * ((1 + fddata?.return_on_investment / 100) * year - 1)
              ) +
                " at " +
                fddata?.return_on_investment +
                " % interest p.a"}
            </p>
            {err && <p className={styles.error}>{err}</p>}
            <div className={styles.bottom}>
              <div className={styles.btn} onClick={handlebuy}>
                <img
                  src="https://i.ibb.co/6BTprr4/icon-circle-plus-0-1.png"
                  alt=""
                />
                <p>Buy</p>
              </div>

              <div className={styles.btn} onClick={() => setmode("main")}>
                <img
                  src="https://i.ibb.co/ncfD8MQ/icon-circle-cross-0-1.png"
                  alt=""
                />
                <p>Cancel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (mode === "portfolio")
    return (
      <div className={`${styles.fddiv} ${styles.portfolio}`}>
        <div
          className={styles.background}
          onClick={() => {
            setcurrentmode("main");
          }}
        />
        <div className={styles.main}>
          <div className={styles.subbg}>
            <div className={styles.innerbg}></div>
          </div>
          <p className={styles.heading}>CURRENT FIXED DEPOSITS</p>
          <div className={styles.scrollwrapper}>
            <div className={styles.headRow}>
              <div className={styles.rowitem}>#</div>
              <div className={styles.rowitem}>Date</div>
              <div className={styles.rowitem}>Principal</div>
              <div className={styles.rowitem}>Maturity date</div>
              <div className={styles.rowitem}>Value at maturity</div>
              <div className={styles.rowitem}>ROI</div>
            </div>
            <div className={styles.rows}>
              {portfoliodata.map((row, index) => {
                return (
                  <div className={styles.row} key={row.id}>
                    <div className={styles.rowitem}>{index + 1}</div>
                    <div className={styles.rowitem}>
                      {getIndianTime(row.fd_date)}
                    </div>
                    <div className={styles.rowitem}>
                      ₹{toIndianFormat(row.invested_amount)}
                    </div>
                    <div className={styles.rowitem}>
                      {getIndianTime(row.maturity_date)}
                    </div>
                    <div className={styles.rowitem}>
                      ₹{toIndianFormat(row.maturity_value)}
                    </div>
                    <div className={styles.rowitem}>
                      {row.interest_rate * 10}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.backbutton} onClick={() => setmode("main")}>
            <img
              src="https://i.ibb.co/NxvRf9Z/icon-arrow3-left-0-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  return null;
}
