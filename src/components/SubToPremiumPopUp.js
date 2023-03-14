import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/GeneralComponents/subToPremium.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function SubToPremiumPopUp({ setShowSubToPremium }) {
  const router = useRouter();
  console.log("Showing");
  return (
    <div className={styles.subToPremium}>
      <div
        className={styles.background}
        onClick={() => {
          setShowSubToPremium(false);
        }}
      ></div>
      <div className={styles.block}>
        <div className={styles.cross} onClick={() => setShowSubToPremium(false)}>
          <CancelOutlinedIcon className={styles.icon} />
        </div>
        <h2>Uh-Oh!</h2>
        <h3>This feature is only available to the Premium Users.</h3>
        <p>
            Upgrade today to premium and enjoy {/* Change the premium family to something more catchy*/}
        </p>
        <div className={styles.section}>
            <div className={styles.sectionLeft}>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/educational_games.svg")
                      .default.src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                  />
                12+ Educational Games
              </div>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/bonus_unicoins_red.svg").default
                      .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                />
                5 Flagship Games
              </div>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/habit_builder.svg").default
                      .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                />
               5 Workshop Invites 
               <p className={styles.small_fontsize}>
               (Worth ₹5000)
               </p>
              </div>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/bonus_unicoins_red.svg").default
                    .src
                  }
                  alt="Avatar Sets"
                  className={styles.sectionItemImage}
                  />
                Avatar Sets
              </div>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/partner_rewards.svg").default
                      .src
                  }
                  alt="Certificate Games"
                  className={styles.sectionItemImage}
                />
                Certificates
              </div>
            </div>
            <div className={styles.sectionRight}>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/kq_red.png").default
                    .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                />
                20 Knowledge Quests
              </div>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/partner_rewards.svg").default
                    .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                  />
                Unlimited Voucher Redemption and 10000 Bonus Unicoins.
              </div>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/bonus_unicoins_red.svg")
                      .default.src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                />
                Free Access to events and Challenges - Win rewards worth ₹25,000 every month
              </div>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../assets/pricing/upsurge_goodie.svg").default
                      .src
                    }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                />
                upsurge Goodie Bag
              </div>
            </div>
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
            router.push(`/payments/stripe?plan_id=${1002}`);
          }}
        >
          Upgrade Now!
        </div>
      </div>
    </div>
  );
}

export default SubToPremiumPopUp;
