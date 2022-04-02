import React, { useContext, useEffect, useState } from "react";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { MainContext } from "../../context/Main";
import { getfullname } from "../../helpers/generalfunctions";
import { getIndianTime } from "../../helpers/timehelpers";
import styles from "../../styles/MoneyAce/profile.module.scss";
import StoreItem from "./store/StoreItem";
export default function Profile({ setshow, moneyacedata }) {
  const { userdata } = useContext(MainContext);
  const [selected, setselected] = useState("Summary");
  const [purchases, setpurchases] = useState([]);
  useEffect(() => {
    if (selected !== "Purchases") return;
    getpurchases();
    async function getpurchases() {
      let res = await MoneyAceApis.getpurchases();
      if (res && res.data && res.data.success) {
        setpurchases(res.data.data);
        console.log(res.data.data);
      }
    }
    const scrollContainer = document.querySelector("#purchasewrapper");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY * 5;
    });
  }, [selected]);
  return (
    <div className={styles.profile}>
      <div className={styles.bg} />

      <div className={styles.main}>
        <p className={styles.heading}>PROFILE</p>
        <div className={styles.divmain}>
          <div className={styles.left}>
            <img src={userdata.user_img_url} alt="" className={styles.avatar} />
            <div className={styles.leftitemswrapper}>
              <div
                className={`${styles.cat} ${
                  selected === "Summary" && styles.selectedCat
                }`}
                onClick={() => setselected("Summary")}
              >
                <p>Summary</p>
              </div>
              <div
                className={`${styles.cat} ${
                  selected === "Achievements" && styles.selectedCat
                }`}
                onClick={() => setselected("Achievements")}
              >
                <p>Achievements</p>
              </div>
              <div
                className={`${styles.cat} ${
                  selected === "Purchases" && styles.selectedCat
                }`}
                onClick={() => setselected("Purchases")}
              >
                <p>Purchases</p>
              </div>
              <div
                className={`${styles.cat} ${
                  selected === "Bank details" && styles.selectedCat
                }`}
                onClick={() => setselected("Bank details")}
              >
                <p>Bank details</p>
              </div>
            </div>
          </div>
          {selected === "Summary" ? (
            <div className={styles.right}>
              <div className={styles.row}>
                <p>Name</p>
                <input
                  type="text"
                  value={getfullname(userdata.first_name, userdata.last_name)}
                />
              </div>
              {userdata.dob && (
                <div className={styles.row}>
                  <p>DOB</p>
                  <input type="text" value={getIndianTime(userdata.dob)} />
                </div>
              )}
              <div className={styles.row}>
                <p>Cash in hand</p>
                <input type="text" value={"₹ " + moneyacedata?.inhand_money} />
              </div>
              <div className={styles.row}>
                <p>Account balance</p>
                <input
                  type="text"
                  value={"₹ " + moneyacedata?.account_balance}
                />
              </div>
              <div className={styles.row}>
                <p>Purchased items</p>
                <input type="text" value={moneyacedata?.items || 0} />
              </div>
            </div>
          ) : selected === "Bank details" ? (
            <div className={styles.right}>
              <div className={styles.row}>
                <p>Account number</p>
                <input
                  type="text"
                  value={moneyacedata?.account_number || "N/A"}
                />
              </div>
              <div className={styles.row}>
                <p>Debit card no.</p>
                <input
                  type="text"
                  value={moneyacedata?.debit_card_number || "N/A"}
                />
              </div>
              <div className={styles.row}>
                <p>Upi id</p>
                <input type="text" value={moneyacedata?.upi_id || "N/A"} />
              </div>
              <div className={styles.row}>
                <p>Account balance</p>
                <input
                  type="text"
                  value={"₹ " + moneyacedata?.account_balance}
                />
              </div>
            </div>
          ) : selected === "Purchases" ? (
            <div className={styles.right}>
              <div className={styles.purchasewrapper} id="purchasewrapper">
                {purchases.map((item) => {
                  return (
                    <StoreItem
                      data={item}
                      viewonly
                      key={"StoreItem" + item.id}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={styles.right}></div>
          )}
        </div>
        <img
          className={styles.homebtn}
          onClick={() => setshow(false)}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    </div>
  );
}
