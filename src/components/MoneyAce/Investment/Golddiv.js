import React, { useContext, useEffect, useState } from "react";
import MoneyAceApis from "../../../actions/apis/MoneyAceApis";
import { MainContext } from "../../../context/Main";
import { getIndianTime } from "../../../helpers/timehelpers";
import { removenonnumber } from "../../../helpers/validationHelpers";
import styles from "../../../styles/MoneyAce/realestatediv.module.scss";
export default function Golddiv({
  setcurrentmode,
  settoastdata,
  setmoneyacedata,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [golddata, setgolddata] = useState(null);
  const [mode, setmode] = useState("main");
  const [err, seterr] = useState("");
  const [portfoliodata, setportfoliodata] = useState([]);
  const [amount, setamount] = useState("");
  useEffect(() => {
    if (mode !== "main") return;
    getdata();
    async function getdata() {
      let res = await MoneyAceApis.getGoldRates();
      if (res && res.data && res.data.success) {
        setgolddata(res.data.data);
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
    let res = await MoneyAceApis.getGoldHoldings();
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
    let res = await MoneyAceApis.buyGold({ quantity: amount });
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
    let res = await MoneyAceApis.sellGold({ quantity: amount });
    if (res && res.data && res.data.success) {
      settoastdata({ type: "success", msg: res.data.message, show: true });
      setmoneyacedata((prev) => ({
        ...prev,
        total_investment: prev.total_investment - res.data.data.invested_amount,
        account_balance: prev.account_balance + res.data.data.returns,
      }));
      setmode("main");
    } else {
      seterr(res?.data?.message || "Unable to reach to server");
    }
  }
  if (mode === "main")
    return (
      <div className={styles.stockdiv}>
        <p className={styles.heading}>GOLD</p>
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <p>Gold price</p>
            <input type="text" value={golddata?.current_gold_price} />
          </div>
          <div className={styles.row}>
            <p>Last year returns </p>
            <input type="text" value={golddata?.return_on_investment} />
          </div>
          <div className={styles.row}>
            <p>Portfolio value</p>
            <input type="text" value={golddata?.total_investment} />
          </div>
          <div className={styles.row}>
            <p>Portfolio returns</p>
            <input type="text" value={golddata?.portfolio_roi || 0} />
          </div>
          {err && <p className={styles.error}>{err}</p>}
          <div className={styles.bottom}>
            <div className={styles.btn} onClick={() => setmode("buy")}>
              <p>Buy</p>
            </div>
            <div className={styles.btn} onClick={() => setmode("portfolio")}>
              <p>Portfolio</p>
            </div>
            <div className={styles.btn} onClick={() => setmode("sell")}>
              <p>Sell</p>
            </div>
          </div>
        </div>
      </div>
    );
  if (mode === "sell")
    return (
      <div className={styles.stockdiv}>
        <p className={styles.heading}>SELL GOLD</p>
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <p>
              Current GOLD price per gram is ₹{golddata?.current_gold_price} per
              gram
            </p>
          </div>
          <div className={styles.row}>
            <img
              src="https://i.ibb.co/TLFq2mS/minus.png"
              alt=""
              onClick={() => setamount((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
            />
            <input
              type="text"
              value={amount}
              onChange={(e) => setamount(removenonnumber(e.target.value))}
              placeholder="Enter quantity.."
            />
            <img
              src="https://i.ibb.co/W6VgkX8/plus.png"
              alt=""
              onClick={() => setamount((prev) => Number(prev) + 1)}
            />
          </div>
          <p className={styles.total}>
            ₹ {Number(golddata?.current_gold_price) * amount}
          </p>
          <div className={styles.bottom}>
            <div className={styles.btn} onClick={handlesell}>
              <p>Sell</p>
            </div>
            <div className={styles.btn} onClick={() => setmode("main")}>
              <p>Cancel</p>
            </div>
          </div>
        </div>
        <img
          className={styles.homebtn}
          onClick={() => setmode("main")}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    );
  if (mode === "buy")
    return (
      <div className={styles.stockdiv}>
        <p className={styles.heading}>BUY GOLD</p>
        <div className={styles.wrapper}>
          <div className={styles.row}>
            <p>
              Current GOLD price is ₹{golddata?.current_gold_price} per gram
            </p>
          </div>
          <div className={styles.row}>
            <img
              src="https://i.ibb.co/TLFq2mS/minus.png"
              alt=""
              onClick={() => setamount((prev) => (prev - 1 < 0 ? 0 : prev - 1))}
            />
            <input
              type="text"
              value={amount}
              onChange={(e) => setamount(removenonnumber(e.target.value))}
              placeholder="Enter quantity.."
            />
            <img
              src="https://i.ibb.co/W6VgkX8/plus.png"
              alt=""
              onClick={() => setamount((prev) => Number(prev) + 1)}
            />
          </div>
          <p className={styles.total}>
            ₹ {Number(golddata?.current_gold_price) * amount}
          </p>
          {err && <p className={styles.error}>{err}</p>}
          <div className={styles.bottom}>
            <div className={styles.btn} onClick={handlebuy}>
              <p>Buy</p>
            </div>
            <div className={styles.btn} onClick={() => setmode("main")}>
              <p>Cancel</p>
            </div>
          </div>
        </div>
        <img
          className={styles.homebtn}
          onClick={() => setmode("main")}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    );
  if (mode === "portfolio")
    return (
      <div className={styles.stockdiv}>
        <p className={styles.heading}>PORTFOLIO</p>
        <div className={styles.scrollwrapper}>
          <div className={styles.headRow}>
            <div className={styles.rowitem}>Quantity</div>
            <div className={styles.rowitem}>Date</div>
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
                  <div className={styles.rowitem}>₹{row.invested_amount}</div>
                  <div className={styles.rowitem}>₹{row.current_value}</div>
                  <div className={styles.rowitem}>
                    {Number(row.current_value) / Number(row.invested_amount)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <img
          className={styles.homebtn}
          onClick={() => setmode("main")}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    );
  return null;
}
