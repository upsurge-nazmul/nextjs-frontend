import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import PageTitle from "../../components/PageTitle";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import TickSvg from "../../components/SVGcomponents/TickSvg";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Pricing/pricing.module.scss";

export default function Pricing() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showauth, setshowauth] = useState(false);

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
        setshowpopup={setshowpopup}
        showpopup={showpopup}
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
            Premium.
          </div>
          <div className={styles.sectionTitle}>
            Learn about financial literacy and entrepreneurship with
          </div>
          <div className={styles.section}>
            <div className={styles.sectionLeft}>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../../assets/pricing/educational_games.svg")
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
                    require("../../assets/pricing/bonus_unicoins.svg").default
                      .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                />
                1,000 Bonus UniCoins
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
                Habit Builder
              </div>
            </div>
            <div className={styles.sectionRight}>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../../assets/pricing/knowledge_quests.png").default
                      .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                />
                6 Knowledge Quests
              </div>
              <div className={styles.sectionItem}>
                <img
                  src={
                    require("../../assets/pricing/partner_rewards.svg").default
                      .src
                  }
                  alt="Education Games"
                  className={styles.sectionItemImage}
                />
                Partner Rewards
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
                Leaderboard and Prizes
              </div>
            </div>
          </div>
          <div className={styles.actionArea}>
            <button
              className={styles.actionButton}
              onClick={() => {
                setshowauth(true);
              }}
            >
              Get Premium
            </button>
            <div className={styles.pricing}>
              <div className={styles.current}>Free*</div>
              <div className={styles.old}>₹4799</div>
            </div>
          </div>
          <div className={styles.helperArea}>
            <div className={styles.helperText}>*Limited time offer</div>
          </div>
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
}
