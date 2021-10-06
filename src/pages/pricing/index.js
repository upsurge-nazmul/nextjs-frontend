import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import TickSvg from "../../components/SVGcomponents/TickSvg";
import styles from "../../styles/Pricing/pricing.module.scss";

export default function Pricing() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  // const [stickyheader, setstickyheader] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const data = [
    {
      name: "Monthly",
      price: "$20",
      description: "per child, per month",
      benefits: [
        "5 Social Profiles",
        "5 Scheduled Posts Per Profile",
        "400+ Templates",
        "Calendar View",
        "24/7 Support",
      ],
    },
    {
      name: "Half-Yearly",
      price: "$15",
      description: "per child, per month (billed every 6 months)",
      benefits: [
        "10 Social Profiles",
        "25 Scheduled Posts Per Profile",
        "400+ Templates",
        "Calendar View",
        "24/7 VIP Support",
      ],
    },
    {
      name: "Yearly",
      price: "$10",
      description: "per child, per month (billed annually)",
      benefits: [
        "100 Social Profiles",
        "100 Scheduled Posts Per Profile",
        "400+ Templates",
        "Calendar View",
        "24/7 VIP Support",
      ],
    },
  ];
  // useEffect(() => {
  //   const handlescroll = () => {
  //     if (window.scrollY > 1) {
  //       setstickyheader(true);
  //     } else {
  //       setstickyheader(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handlescroll);
  //   return () => window.removeEventListener("scroll", handlescroll);
  // }, []);
  return (
    <div className={styles.pricingPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.container}>
        <p className={styles.heading}>
          Start your kids’ journey in the <br />
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
          {data.map((item) => {
            return (
              <div className={styles.pricecontainer}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.price}>{item.price}</p>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.button}>Start My 15-day Trial</div>
                <div className={styles.hr} />
                <div className={styles.benefitswrapper}>
                  {item.benefits.map((benefit) => {
                    return <p>{benefit}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
