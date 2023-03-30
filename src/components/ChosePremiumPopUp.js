import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../styles/GeneralComponents/chosePremium.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PaymentsApi from "../actions/apis/PaymentsApi";

const METHODS = [
  { name: "PhonePe", id: "phonepe", key:"phonypay" },
  { name: "Stripe", id: "stripe", key:"stripy" },
];

function ChosePremiumPopUp({ setChoseToPremium }) {
  const router = useRouter();
  const [plans, setPlans] = useState();
  const [method, setMethod] = useState(METHODS[0].id);

  async function fetchPlans() {
    const res = await PaymentsApi.getPlans();
    if (res && res.data && res.data.success) {
      setPlans(res.data.data);
    }
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className={styles.subToPremium}>
      <div
        className={styles.background}
        onClick={() => {
          setChoseToPremium(false);
        }}
      ></div>
      <div className={styles.block}>
        <div className={styles.cross} onClick={() => setChoseToPremium(false)}>
          <CancelOutlinedIcon className={styles.icon} />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionLeft}>
            <h3 className={styles.header}>Upsurge Premium</h3>
            <p className={styles.smallfont}> for 6 months </p>
            <p className={styles.subheading}>
              Get access to premium quests and games
            </p>
            {/* Change the premium family to something more catchy*/}
            <ul>
              <li className={styles.sectionItem}>
                {/* <img
                  src={
                    require("../assets/pricing/kq_red.png").default
                    .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                /> */}
                20 Knowledge Quests
              </li>
              <li className={styles.sectionItem}>
                {/* <img
                src={
                  require("../assets/pricing/educational_games.svg").default.src
                }
                alt="Education Games"
                className={styles.sectionItemImage}
              /> */}
                16 Educational Games
              </li>
              <li className={styles.sectionItem}>
                {/* <img
                  src={
                    require("../assets/pricing/bonus_unicoins_red.svg").default
                      .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                /> */}
                5 Flagship Games (1000 hours)
              </li>
              <li className={styles.sectionItem}>Events and Challenges</li>
              <li className={styles.sectionItem}>10,000 Bonus Unicoins</li>
              <li className={styles.sectionItem}>Redeem Vouchers</li>
              <li className={styles.sectionItem}>
                Win monthly rewards worth ₹25,000/-
              </li>
            </ul>
            <div className={styles.pricing}>
              <div className={styles.bottom}></div>
              <div className={styles.pricingSectionTop}>
                <p className={styles.slashedPrice}>₹2499</p>{" "}
                <p className={styles.actualPrice}>₹499</p>{" "}
              </div>
              <div className={styles.pricingSectionBottom}>
                <p className={styles.smallfont}>(limited period offer)</p>
              </div>
            </div>
            <div
              className={styles.button}
              onClick={() => {
                router.push(`/payments/${method}?plan_id=${plans[1].id}`);
              }}
            >
              {`Subscribe to Premium`}
            </div>
          </div>
          <div className={styles.verticleLine}></div>
          <div className={styles.sectionRight}>
            <div className={styles.bestValue}>Best Value</div>
            <h3 className={styles.header}>Upsurge Premium</h3>
            <p className={styles.smallfont}> for 12 months </p>
            <p className={styles.subheading}>
              Get access to premium quests and games
            </p>
            <ul>
              <li className={styles.sectionItem}>
                {/* <img
                  src={
                    require("../assets/pricing/kq_red.png").default
                    .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                /> */}
                20 Knowledge Quests
              </li>
              <li className={styles.sectionItem}>
                {/* <img
                src={
                  require("../assets/pricing/educational_games.svg").default.src
                }
                alt="Education Games"
                className={styles.sectionItemImage}
              /> */}
                16 Educational Games
              </li>
              <li className={styles.sectionItem}>
                {/* <img
                  src={
                    require("../assets/pricing/bonus_unicoins_red.svg").default
                      .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                /> */}
                5 Flagship Games (1000 hours)
              </li>
              <li className={styles.sectionItem}>Events and Challenges</li>
              <li className={styles.sectionItem}>20,000 Bonus Unicoins</li>
              <li className={styles.sectionItem}>Redeem Vouchers</li>
              <li className={styles.sectionItem}>
                Win monthly rewards worth ₹1,00,000/-
              </li>
              <li className={styles.sectionItem}>
                Invites to Online Workshops.
              </li>
              <li className={styles.sectionItemGolden}>
                {/* <img
                  src={
                    require("../assets/pricing/upsurge_goodie.svg").default
                    .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                /> */}
                <p>upsurge branded goodies (worth ₹2,500)</p>
              </li>
            </ul>
            <div className={styles.pricing}>
              <div className={styles.pricingSectionTop}>
                <p className={styles.slashedPrice}>₹4799</p>{" "}
                <p className={styles.actualPriceGolden}>₹2499</p>{" "}
              </div>
              <div className={styles.pricingSectionBottom}>
                <p className={styles.smallfont}>(limited period offer)</p>
              </div>
            </div>
            <div
              className={styles.button}
              onClick={() => {
                router.push(`/payments/${method}?plan_id=${plans[0].id}`);
              }}
            >
              {`Subscribe to Premium`}
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div>Prefered payment method</div>
          {METHODS.map((m) => {
            return (
              <>
                <input
                  type="checkbox"
                  id={m.id}
                  name={m.name}
                  key={m.key}
                  value={m.id}
                  onChange={(e) => setMethod(e.target.value)}
                  checked={m.id === method}
                />
                <label htmlFor={m.name}> {m.name}</label>
              </>
            );
          })}
        </div>
        <p
          className={styles.clickable}
          onClick={() => {
            if (router.pathname === "/dashboard/k") {
              setChoseToPremium(false);
            } else {
              router.push(`/dashboard/k`);
            }
          }}
        >
          <u>Continue with the free version</u>
        </p>
      </div>
    </div>
  );
}

export default ChosePremiumPopUp;
