import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../styles/GeneralComponents/chosePremium.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PaymentsApi from "../actions/apis/PaymentsApi";
import { CircularProgress } from "@mui/material";

const METHODS = [
  { name: "PhonePe", id: "phonepe", key: "phonypay" },
  { name: "Stripe", id: "stripe", key: "stripy" },
];

function ChosePremiumPopUp({ setChoseToPremium = () => {}, token = "" }) {
  const router = useRouter();
  const [plans, setPlans] = useState();
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState(METHODS[0].id);

  async function fetchPlans() {
    const res = await PaymentsApi.getPlans();
    if (res && res.data && res.data.success) {
      setPlans(res.data.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlans();
    console.log(plans);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          height: "100%",
          minHeight: "80vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={100} />
      </div>
    );
  }
  return (
    <div className={styles.subToPremium}>
      <div
        className={styles.background}
        onClick={() => {
          if (router.pathname === "/dashboard/k") {
            setChoseToPremium(false);
          } else {
            router.push(`/dashboard/k`);
          }
        }}
      ></div>
      <div className={styles.block}>
        <div className={styles.cross} onClick={() => setChoseToPremium(false)}>
          <CancelOutlinedIcon className={styles.icon} />
        </div>

        <div className={`${styles.section} ${styles.topsectionheader}`}>
          <div className={styles.sectionLeft}>
            <h2 className={styles.header}>upsurge Premium</h2>
            <p className={styles.subheading}>
              Get access to premium quests and games
            </p>
          </div>
          <div className={styles.sectionRight}>
            <ul>
              <li className={styles.sectionItem}>20 Quests </li>
              <li className={styles.sectionItem}>16 Educational Games</li>
              <li className={styles.sectionItem}>
                5 Flagship Games (1000 hours)
              </li>
              <li className={styles.sectionItem}>Events and Challenges</li>
              <li className={styles.sectionItem}>10,000 Bonus Unicoins</li>
              <li className={styles.sectionItem}>Redeem Vouchers</li>
              <li className={styles.sectionItem}>
                Win monthly rewards worth ₹25,000{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLeft}>
            <div className={styles.bestValue}>&nbsp;</div>
            <div className={styles.pricing}>
              <div className={styles.bottom}>
                <h3 className={styles.header}>{plans[2]?.name}</h3>
              </div>
              <div className={styles.pricingSectionTop}>
                <p className={styles.slashedPrice}>₹{plans[2].slashPrice}</p>{" "}
                <p className={styles.actualPrice}>₹{plans[2].amount}&nbsp;</p>{" "}
              </div>
              <div className={styles.pricingSectionBottom}>
                <p className={styles.smallfont}>(limited period offer)</p>
              </div>
            </div>

            <div
              className={styles.button}
              onClick={() => {
                router.push(
                  `/payments/${method}?plan_id=${plans[2].id}${
                    token ? `&token=${token}` : ""
                  }`
                );
              }}
            >
              {`Subscribe to Premium`}
            </div>
          </div>

          <div className={styles.verticleLine}></div>

          <div className={styles.sectionLeft}>
            <div className={styles.bestValue}>&nbsp;</div>
            <div className={styles.pricing}>
              <div className={styles.bottom}>
                <h3 className={styles.header}>{plans[1].name}</h3>
              </div>
              <div className={styles.pricingSectionTop}>
                <p className={styles.slashedPrice}>₹{plans[1].slashPrice}</p>{" "}
                <p className={styles.actualPrice}>₹{plans[1].amount}&nbsp;</p>{" "}
              </div>
              <div className={styles.pricingSectionBottom}>
                <p className={styles.smallfont}>(limited period offer)</p>
              </div>
            </div>

            <div
              className={styles.button}
              onClick={() => {
                router.push(
                  `/payments/${method}?plan_id=${plans[1].id}${
                    token ? `&token=${token}` : ""
                  }`
                );
              }}
            >
              {`Subscribe to Premium`}
            </div>
          </div>

          <div className={styles.verticleLine}></div>

          <div className={styles.sectionRight}>
            <div className={styles.bestValue}>Best Value</div>

            <div className={styles.pricing}>
              <div className={styles.bottom}>
                <h3 className={styles.header}>{plans[0].name}</h3>
              </div>
              <div className={styles.pricingSectionTop}>
                <p className={styles.slashedPrice}>₹{plans[0].slashPrice}</p>
                <p className={styles.actualPriceGolden}>
                  ₹{plans[0].amount}&nbsp;
                </p>
              </div>
              <div className={styles.pricingSectionBottom}>
                <p className={styles.smallfont}>(limited period offer)</p>
              </div>
            </div>
            <div
              className={styles.button}
              onClick={() => {
                router.push(
                  `/payments/${method}?plan_id=${plans[0].id}${
                    token ? `&token=${token}` : ""
                  }`
                );
              }}
            >
              {`Subscribe to Premium`}
            </div>
          </div>
        </div>

        {/* <div>Prefered payment method</div>
        <div className={styles.inputContainer}>
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
        </div> */}

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
          Continue using the free version
        </p>
      </div>
    </div>
  );
}

export default ChosePremiumPopUp;
