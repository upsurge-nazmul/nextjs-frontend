import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Pricing/pricing.module.scss";

const PREMIUM_PRICE = 1799;

export default function Pricing() {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authMode, setAuthMode] = useState("");
  const [premiumPrice, setPremiumPrice] = useState();

  const { theme } = useContext(MainContext);

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 1) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  // const handleBuyPremium = () => {
  //   console.log("buy premium");
  //   setPremiumPrice(PREMIUM_PRICE);
  // };

  return (
    <div
      className={`${styles.pricingPage} ${
        theme === "dark" && styles.darkpricingPage
      }`}
    >
      <PageTitle />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        authmode={authMode}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
        premiumPrice={premiumPrice}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />

      <div className={styles.mainContent}>
        <div className={styles.contentLeft}>
          <img
            src={require("../../assets/Jasper/10.png").default.src}
            alt={"jasper"}
            className={styles.jasper}
          />
        </div>
        <div className={styles.contentRight}>
          <div className={styles.heading}>
            Power up your child’s journey in the finance world with upsurge
            <u className={styles.heading_underline}>Premium.</u>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.contentPlanFreemium}>
              <div className={styles.contentTagFreemium}>Premium</div>
              <div className={styles.section}>
              <div className={styles.sectionItem}>
                  <img
                    src={
                      require("../../assets/pricing/knowledge_quests.png")
                        .default.src
                    }
                    alt="Education Games"
                    className={styles.sectionItemImage}
                  />
                  20 Knowledge Quests
                </div>
                <div className={styles.sectionItem}>
                  <img
                    src={
                      require("../../assets/pricing/educational_games.svg")
                        .default.src
                    }
                    alt="Education Games"
                    className={styles.sectionItemImage}
                  />
                  16 Educational Games
                </div>
                <div className={styles.sectionItem}>
                  <img
                    src={
                      require("../../assets/pricing/bonus_unicoins.svg").default
                        .src
                    }
                    alt="Education Games"
                    className={styles.sectionItemImage}
                  />
                  5 Flagship Game{" "}
                  <p className={styles.small_fontsize}>(1000 hours)</p>
                </div>
                <div className={styles.sectionItem}>
                  <img
                    src={
                      require("../../assets/pricing/habit_builder.svg").default
                        .src
                    }
                    alt="Education Games"
                    className={styles.sectionItemImage}
                  />
                  Events and Challenges
                </div>
                <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/partner_rewards.svg")
                          .default.src
                      }
                      alt="Avatar Sets"
                      className={styles.sectionItemImage}
                    />
                    10,000 Bonus Unicoins
                  </div>
                <div className={styles.sectionItem}>
                  <img
                    src={
                      require("../../assets/pricing/partner_rewards.svg")
                        .default.src
                    }
                    alt="Education Games"
                    className={styles.sectionItemImage}
                  />
                  Redeem Vouchers
                </div>
                <div className={styles.sectionItem}>
                  <img
                    src={
                      require("../../assets/pricing/leaderboard_prizes.svg")
                        .default.src
                    }
                    alt="Education Games"
                    className={styles.sectionItemImage}
                  />
                  Leaderboard Access
                </div>
                <div className={styles.sectionItem}>
                  <img
                    src={
                      require("../../assets/pricing/partner_rewards.svg")
                        .default.src
                    }
                    alt="Education Games"
                    className={styles.sectionItemImage}
                  />
                  Win monthly rewards worth <div className={styles.small_fontsize}><u><b>₹25,000/-</b></u></div>
                </div>
              </div>
              <div className={styles.actionArea}>
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
                <button
                  className={styles.actionButton}
                  onClick={() => {
                    setAuthMode("parent");
                    setshowauth(true);
                    setPremiumPrice(null);
                  }}
                >
                  Subscribe to Premium
                </button>
              </div>
            </div>
            <div className={styles.contentPlanPremium}>
              <div className={styles.contentTagPremium}>Best Value</div>
              <div className={styles.section}>
                <div className={styles.sectionLeft}>
                <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/knowledge_quests.png")
                          .default.src
                      }
                      alt="Education Games"
                      className={styles.sectionItemImage}
                    />
                    20 Knowledge Quests
                  </div>
                  <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/educational_games.svg")
                          .default.src
                      }
                      alt="Education Games"
                      className={styles.sectionItemImage}
                    />
                    16 Educational Games
                  </div>
                  <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/bonus_unicoins.svg")
                          .default.src
                      }
                      alt="Education Games"
                      className={styles.sectionItemImage}
                    />
                    5 Flagship Games <p className={styles.small_fontsize}>(1000 hours)</p>
                  </div>
                  <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/habit_builder.svg")
                          .default.src
                      }
                      alt="Education Games"
                      className={styles.sectionItemImage}
                    />
                    Events and Challenges
                  </div>
                  <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/partner_rewards.svg")
                          .default.src
                      }
                      alt="Unicoins"
                      className={styles.sectionItemImage}
                    />
                    20,000 Bonus Unicoins
                  </div>
                  <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/partner_rewards.svg")
                          .default.src
                      }
                      alt=""
                      className={styles.sectionItemImage}
                    />
                    Redeem Vouchers
                  </div>
                </div>
                <div className={styles.sectionRight}>
                  <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/leaderboard_prizes.svg")
                          .default.src
                      }
                      alt="Education Games"
                      className={styles.sectionItemImage}
                    />
                   Win monthly rewards worth <div className={styles.small_fontsize}><u><b>₹1,00,000/-</b></u></div>
                  </div>
                  <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/partner_rewards.svg")
                          .default.src
                      }
                      alt="Education Games"
                      className={styles.sectionItemImage}
                    />
                  Invitation to Online Workshops
                  </div>
                  <div className={styles.sectionItem}>
                    <img
                      src={
                        require("../../assets/pricing/partner_rewards.svg")
                          .default.src
                      }
                      alt="Education Games"
                      className={styles.sectionItemImage}
                    />
                    <div className={styles.sectionItemGolden}>Upsurge branded goodies(worth ₹2,500)</div>
                  </div>
                </div>
              </div>
              <div className={styles.actionArea}>
              <div className={styles.pricing}>
              <div className={styles.pricingSectionTop}>
                <p className={styles.slashedPrice}>₹4799</p>{" "}
                <p className={styles.actualPrice}>₹2499</p>{" "}
              </div>
              <div className={styles.pricingSectionBottom}>
                <p className={styles.smallfont}>(limited period offer)</p>
              </div>
            </div>
                <button
                  className={styles.actionButtonPremium}
                  onClick={() => {
                    // setAuthMode("parent");
                    // setshowauth(true);
                    // setPremiumPrice(PREMIUM_PRICE);
                    // handleBuyPremium();
                  }}
                >
                  Subscribe to Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
}
