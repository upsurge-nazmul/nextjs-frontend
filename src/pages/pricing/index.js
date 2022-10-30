import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
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
        <p className={styles.heading}>
          Start your child&apos;s journey in the <br />
          finance world today.
        </p>
        <div className={styles.priceWrapper}>
          <div className={styles.priceContainer}>
            <p className={styles.name}>Premium</p>
            <div className={styles.price}>
              <img
                src={require("../../assets/pricing/oldPrice.svg").default.src}
                alt={"Old Price"}
                loading="lazy"
                className={styles.oldPrice}
              />
              Free
            </div>
            <p className={styles.description}>(for 12 months)</p>
            <div className={styles.benefitsTitle}>You get access to</div>
            <ul className={styles.benefitsWrapper}>
              <li>12 Educational Games</li>
              <li>6 Knowledge Quests</li>
              <li>1,000 Bonus UniCoins</li>
              <li>Learn about financial literacy and entrepreneurship</li>
              <li>
                Partner Rewards
                <span className={styles.subScript}>(limited access)</span>
              </li>
              <li>Leaderboard and Prizes</li>
              <li>
                Habit Builder
                <span className={styles.subScript}>(Chores)</span>
              </li>
            </ul>
            <div className={styles.actionArea}>
              <button onClick={()=>{setshowauth(true)}} className={styles.claimButton}>Claim Now</button>
              <div className={styles.actionHelper}>(Limited Offer)</div>
            </div>
          </div>
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
}
