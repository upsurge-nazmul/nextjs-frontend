import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/GamePage/gamelist.module.scss";
import Footer from "../../components/Home/Footer";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import JoinUs from "../../components/Home/JoinUs";

export default function GamePage() {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);

  const data = {
    ShoppingBudget: {
      name: "Shopping Budget",
      description:
        "Identify how much is available to spend and making purchase decisions based on that.",
    },
    BalanceBuilder: {
      name: "Balance Builder",
      description: "Identify what is income and what is expense.",
    },
    HighAndLow: {
      name: "High And Low",
      description:
        "Identify currency and arrange in ascending or descending order after adding the money.",
    },
    MoneyMath: {
      name: "Money Math",
      description:
        "Choose what you want to buy, earn some money, and calculate  how much you have left.",
    },
    MoneyManager: {
      name: "Money Manager",
      description:
        "Know the importance of allocating your earnings between spending, saving and donating.",
    },
    MoneySlide: {
      name: "Money Slide",
      description:
        "Identify different types of Money notes and coins and achieve the desired target.",
    },
    NeedOrWant: {
      name: "Need Or Want",
      description: "Identify the difference between needs and wants.",
    },
    Ludo: {
      name: "Ludo",
      description: "ludo ludo ludo.",
    },
  };

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);
  return (
    <div className={styles.gamelist}>
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.contentWrapper}>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <img
          className={styles.icon}
          src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
        <div className={styles.headingSection}>
          <h2 className={styles.heading}>Games</h2>
          <h3 className={styles.subheading}>
            The concepts learnt by the young learners via Knowledge Quest are
            applied in the Games Arena.
          </h3>
        </div>

        <div className={styles.gamelistwrapper}>
          {Object.keys(data).map((item, index) => {
            return (
              <div
                key={"game" + index}
                className={styles.calcCard}
                onClick={() => router.push(`/games/${item}`)}
              >
                <img src={`/images/games/${item}.jpg`} alt="calcicon" />
                <p className={styles.calccardtitle}>{data[item].name}</p>
                <p className={styles.calccardsubtitle}>
                  {data[item].description}
                </p>
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
