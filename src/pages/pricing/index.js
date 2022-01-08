import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import TickSvg from "../../components/SVGcomponents/TickSvg";
import styles from "../../styles/Pricing/pricing.module.scss";

export default function Pricing() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const data = [
    {
      name: "Monthly",
      price: "₹599",
      description: "per child, per month",
      benefits: ["Knowledge Quest", "Games Arena", "Family Fun"],
    },
    {
      name: "Half-Yearly",
      price: "₹499",
      description: "per child, per month (billed every 6 months)",
      benefits: [
        "1000 UniCoins bonus",
        "Masterclass videos",
        "Knowledge Quest",
        "Games Arena",
        "Family Fun",
      ],
    },
    {
      name: "Yearly",
      price: "₹399",
      description: "per child, per month (billed annually)",
      benefits: [
        "2500 UniCoins bonus",
        "Masterclass sessions and videos",
        "Career development session",
        "Knowledge Quest",
        "Games Arena",
        "Family Fun",
      ],
    },
  ];
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
    <div className={styles.pricingPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <div className={styles.mainContent}>
        <p className={styles.heading}>
          Start your kid’s journey in the <br />
          finance world today.
        </p>
        <div className={styles.featurewrapper}>
          <div className={styles.feature}>
            <TickSvg className={styles.tick} />
            Free 15-day trial
          </div>
          <div className={styles.feature}>
            <TickSvg className={styles.tick} />
            Add upto 5 kids
          </div>
          <div className={styles.feature}>
            <TickSvg className={styles.tick} />
            Cancel Anytime
          </div>
        </div>
        <div className={styles.pricewrapper}>
          {data.map((item, index) => {
            return (
              <div className={styles.pricecontainer} key={"price" + index}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.price}>{item.price}</p>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.hr} />
                <div className={styles.benefitswrapper}>
                  {item.benefits.map((benefit, index) => {
                    return <p key={"benefit" + index}>{benefit}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
}
