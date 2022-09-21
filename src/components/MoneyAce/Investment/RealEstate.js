import React, { useContext, useEffect, useState } from "react";
import MoneyAceApis from "../../../actions/apis/MoneyAceApis";
import { MainContext } from "../../../context/Main";
import { toIndianFormat } from "../../../helpers/currency";
import { getIndianTime } from "../../../helpers/timehelpers";
import { removenonnumber } from "../../../helpers/validationHelpers";
import styles from "../../../styles/MoneyAce/realestatediv.module.scss";
import BackSvg from "../../SVGcomponents/MoneyAce/ui/BackSvg";
export default function RealEstate({
  setcurrentmode,
  settoastdata,
  setmoneyacedata,
  setcurrenttab,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [realestatedata, setrealestatedata] = useState(null);
  const [mode, setmode] = useState("main");
  const [err, seterr] = useState("");
  const [portfoliodata, setportfoliodata] = useState([]);
  const [amount, setamount] = useState("");
  useEffect(() => {
    if (mode !== "main") return;
    getdata();
    async function getdata() {
      let res = await MoneyAceApis.getRealestateRates();
      if (res && res.data && res.data.success) {
        setrealestatedata(res.data.data);
      }
    }
  }, [mode]);
  useEffect(() => {
    setamount("");
    seterr("");
    if (mode === "portfolio") {
      loadportfolio();
    }
  }, [mode]);
  useEffect(() => {
    seterr("");
  }, [amount]);
  async function loadportfolio() {
    let res = await MoneyAceApis.getRealestateHoldings();
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
    let res = await MoneyAceApis.buyRealestate({ quantity: amount });
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
  async function handlesell() {
    if (!amount) {
      seterr("Please enter quantity");
      return;
    }
    let res = await MoneyAceApis.sellRealestate({ quantity: amount });
    if (res && res.data && res.data.success) {
      settoastdata({ type: "success", msg: res.data.message, show: true });
      setmoneyacedata((prev) => ({
        ...prev,
        total_investment: prev.total_investment - res.data.data.invested_amount,
        account_balance: prev.account_balance + res.data.data.returns,
      }));
      setmode("portfolio");
    } else {
      seterr(res?.data?.message || "Unable to reach to server");
    }
  }
  if (mode === "main")
    return (
      <div className={styles.stockdiv}>
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
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <p>Real Estate Index</p>
              <input
                type="text"
                value={
                  "₹ " +
                  toIndianFormat(realestatedata?.current_realestate_price || 0)
                }
              />
            </div>
            <div className={styles.row}>
              <p>Last year returns </p>
              <input
                type="text"
                value={realestatedata?.return_on_investment + " %"}
              />
            </div>
            <div className={styles.row}>
              <p>Portfolio value</p>
              <input
                type="text"
                value={"₹ " + toIndianFormat(realestatedata?.total_investment)}
              />
            </div>
            <div className={styles.row}>
              <p>Portfolio returns</p>
              <input
                type="text"
                value={(realestatedata?.portfolio_roi || 0) + " %"}
              />
            </div>
            {err && <p className={styles.error}>{err}</p>}
            <div className={styles.bottom}>
              <div
                className={styles.backbutton}
                onClick={() => setcurrentmode("main")}
              >
                <img
                  src="https://imgcdn.upsurge.in/images/icon-arrow3-left-0-1.png"
                  alt=""
                />
              </div>
              <div className={styles.btn} onClick={() => setmode("buy")}>
                <img
                  src="https://imgcdn.upsurge.in/images/icon-circle-plus-0-1.png"
                  alt=""
                />
                <p>Buy</p>
              </div>
              <div className={styles.btn} onClick={() => setmode("portfolio")}>
                <img
                  src="https://imgcdn.upsurge.in/images/btn-icon-book-1.png"
                  alt=""
                />
                <p>Portfolio</p>
              </div>
              <div className={styles.btn} onClick={() => setmode("sell")}>
                <img
                  src="https://imgcdn.upsurge.in/images/icon-circle-minus-0-1.png"
                  alt=""
                />
                <p>Sell</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (mode === "sell")
    return (
      <div className={styles.stockdiv}>
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
          <p className={styles.heading}>SELL REAL ESTATE</p>
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <p>
                Current REAL ESTATE index price is ₹
                {toIndianFormat(realestatedata?.current_realestate_price)}
              </p>
            </div>
            <div className={styles.row}>
              <img
                src="https://imgcdn.upsurge.in/images/minus.png"
                alt=""
                onClick={() =>
                  setamount((prev) => (prev - 1 < 0 ? 0 : prev - 1))
                }
              />
              <input
                type="text"
                value={amount}
                onChange={(e) => setamount(removenonnumber(e.target.value))}
                placeholder="Enter quantity.."
              />
              <img
                src="https://imgcdn.upsurge.in/images/plus.png"
                alt=""
                onClick={() => setamount((prev) => Number(prev) + 1)}
              />
            </div>
            <p className={styles.total}>
              ₹{" "}
              {toIndianFormat(
                Number(realestatedata?.current_realestate_price) * amount
              )}
            </p>
            {err && <p className={styles.error}>{err}</p>}
            <div className={styles.bottom}>
              <div className={styles.btn} onClick={handlesell}>
                <img
                  src="https://imgcdn.upsurge.in/images/icon-circle-minus-0-1.png"
                  alt=""
                />
                <p>Sell</p>
              </div>
              <div className={styles.btn} onClick={() => setmode("main")}>
                <img
                  src="https://imgcdn.upsurge.in/images/icon-circle-cross-0-1.png"
                  alt=""
                />
                <p>Cancel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (mode === "buy")
    return (
      <div className={styles.stockdiv}>
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
          <p className={styles.heading}>BUY REAL ESTATE</p>
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <p>
                Current REAL ESTATE index price is ₹
                {toIndianFormat(realestatedata?.current_realestate_price)}
              </p>
            </div>
            <div className={styles.row}>
              <p style={{ textAlign: "center" }}>Lockin period of 3 years</p>
            </div>
            <div className={styles.row}>
              <img
                src="https://imgcdn.upsurge.in/images/minus.png"
                alt=""
                onClick={() =>
                  setamount((prev) => (prev - 1 < 0 ? 0 : prev - 1))
                }
              />
              <input
                type="text"
                value={amount}
                onChange={(e) => setamount(removenonnumber(e.target.value))}
                placeholder="Enter quantity.."
              />
              <img
                src="https://imgcdn.upsurge.in/images/plus.png"
                alt=""
                onClick={() => setamount((prev) => Number(prev) + 1)}
              />
            </div>
            <p className={styles.total}>
              ₹{" "}
              {toIndianFormat(
                Number(realestatedata?.current_realestate_price) * amount
              )}
            </p>
            {err && <p className={styles.error}>{err}</p>}
            <div className={styles.bottom}>
              <div className={styles.btn} onClick={handlebuy}>
                <img
                  src="https://imgcdn.upsurge.in/images/icon-circle-plus-0-1.png"
                  alt=""
                />
                <p>Buy</p>
              </div>
              <div className={styles.btn} onClick={() => setmode("main")}>
                <img
                  src="https://imgcdn.upsurge.in/images/icon-circle-cross-0-1.png"
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
      <div className={`${styles.stockdiv} ${styles.portfolio}`}>
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
          <p className={styles.heading}>PORTFOLIO</p>
          <div className={styles.scrollwrapper}>
            <div className={styles.headRow}>
              <div className={styles.rowitem}>Quantity</div>
              <div className={styles.rowitem}>Date</div>
              <div className={styles.rowitem}>Maturity date</div>
              <div className={styles.rowitem}>Invested amount</div>
              <div className={styles.rowitem}>Current value</div>
              <div className={styles.rowitem}>ROI</div>
            </div>
            <div className={styles.rows}>
              {portfoliodata.map((row, index) => {
                return (
                  <div className={styles.row} key={row.id}>
                    <div className={styles.rowitem}>{row.quantity}</div>
                    <div className={styles.rowitem}>
                      {getIndianTime(row.timestamp)}
                    </div>
                    <div className={styles.rowitem}>
                      {getIndianTime(row.maturity_date)}
                    </div>
                    <div className={styles.rowitem}>
                      ₹{" " + toIndianFormat(row.invested_amount)}
                    </div>
                    <div className={styles.rowitem}>
                      ₹{" " + toIndianFormat(row.current_value)}
                    </div>
                    <div className={styles.rowitem}>
                      {(
                        (Number(row.current_value) -
                          Number(row.invested_amount)) /
                        Number(row.invested_amount)
                      ).toFixed(2)}{" "}
                      %
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.backbutton} onClick={() => setmode("main")}>
            <img
              src="https://imgcdn.upsurge.in/images/icon-arrow3-left-0-1.png"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  return null;
}
