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
import PaymentsApi from "../../actions/apis/PaymentsApi";
import HighlightsCounter from "../../components/Home/HighlightsCounter";
import TestiMonial from "../../components/Home/TestiMonial";
import PRCoverage from "../../components/Home/PRCoverage";

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
  const [plans, setPlans] = useState();

  async function fetchPlans() {
    const res = await PaymentsApi.getPlans();
    if (res && res.data && res.data.success) {
      console.log(res.data.data);
      setPlans(res.data.data);
    }
  }

  useEffect(() => {
    fetchPlans();
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
      <PageTitle
        title="Pricing for upsurge Financial Literacy Platform for Kids and School Students in India"
        content="Get cost-effective pricing plans of upsurge financial literacy platform for kids, financial literacy courses for kids and entrepreneurship courses with educational games for kids"
      />
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
            Power up your child&#39;s financial education with upsurge
            <u className={styles.heading_underline}>Premium.</u>
          </div>
          <div className={styles.subToPremium}>
      <div className={styles.block}>
        <div className={styles.section}>
          <div className={styles.sectionLeft}>
            <h3 className={styles.header}>upsurge Premium</h3>
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
                    <li className={styles.sectionItem}>
                      Events and Challenges
                    </li>
                    <li className={styles.sectionItem}>
                      10,000 Bonus Unicoins
                    </li>
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
                      console.log(plans[1].id);
                      setPremiumPrice(plans[1].id);
                      setAuthMode("parentChild");
                      setshowauth(true);
                      //router.push(`/payments/stripe?plan_id=${plans[1].id}`);
                    }}
                  >
                    {`Buy now`}
                  </div>
                </div>
              </div>
              <p
                className={styles.clickable}
                onClick={() => {
                  setPremiumPrice(null);
                  setAuthMode("parentChild");
                  setshowauth(true);
                }}
              >
                <u>Try free version</u>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sectionSpacing}>
        <HighlightsCounter />
      </div>
      <div className={styles.sectionSpacing}>
        <TestiMonial />
      </div>
      <div className={styles.sectionSpacing}>
        <PRCoverage />
        <button
          onClick={() => {
            console.log(plans[1].id);
            setPremiumPrice(plans[1].id);
            setAuthMode("parentChild");
            setshowauth(true);
          }}
          className={styles.button}
        >
          Buy now
        </button>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
}
