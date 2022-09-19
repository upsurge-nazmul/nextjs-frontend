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

export default function Pricing({ userdata }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const data = [
    {
      name: "Monthly",
      price: "₹599",
      description: "per child, per month",
      benefits: [
        "Knowledge Quests",
        "Games Arena",
        "Chore Management",
        "Family Fun Games & Activities",
      ],
    },
    {
      name: "Half-Yearly",
      price: "₹2999 ",
      description: "( ₹500/month )",
      benefits: [
        "Knowledge Quests",
        "Games Arena",
        "Chore Management",
        "Family Fun Games & Activities",
        "1,000 UniCoins Bonus - Redeemable for discount vouchers",
        "Higher Education Counselling Masterclass",
      ],
    },
    {
      name: "Yearly",
      price: "₹4799",
      description: "( ₹400/month )",
      benefits: [
        "Knowledge Quests",
        "Games Arena",
        "Chore Management",
        "Family Fun Games & Activities",
        "2,500 UniCoin Bonus - Redeemable for discount vouchers",
        "Higher Education Counselling Masterclass",
        "1 free session with your choice of an expert from our panel",
        "Rich Dad, Poor Dad - the personal finance bible",
        "& more fun goodies!",
      ],
    },
  ];
  const { setuserdata, theme } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

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
export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg || "";
      return { props: {} };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", userdata: null },
    };
  }
}
