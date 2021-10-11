import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/GamePage/gamelist.module.scss";
import Footer from "../../components/Home/Footer";

export default function GamePage() {
  const router = useRouter();
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [paths, setpaths] = useState(["home", "calculators"]);
  const [stickyheader, setstickyheader] = useState(false);

  const data = {
    ShoppingBudget: {
      name: "Shopping Budget",
      description:
        "This is demo description, will be replaced with content later.",
    },
    BalanceBuilder: {
      name: "Balance Builder",
      description:
        "This is demo description, will be replaced with content later.",
    },
    HighAndLow: {
      name: "High And Low",
      description:
        "This is demo description, will be replaced with content later.",
    },
    MoneyMath: {
      name: "Money Math",
      description:
        "This is demo description, will be replaced with content later.",
    },
    MoneyManager: {
      name: "Money Manager",
      description:
        "This is demo description, will be replaced with content later.",
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
        <img
          className={styles.icon}
          src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
        <div className={styles.headingSection}>
          <h2 className={styles.heading}>Games</h2>
          <h3 className={styles.subheading}>
            We make digital toys that help your kid learn finance with ease.
          </h3>
        </div>

        <div className={styles.gamelistwrapper}>
          {Object.keys(data).map((item, index) => {
            return (
              <div
                key={"game" + index}
                className={styles.calcCard}
                onClick={() => router.push(`/gamepage/${item}`)}
              >
                <img src={`/images/games/${item}.jpg`} alt="calcicon" />
                <p className={styles.calccardtitle}>{data[item].name}</p>
                <p className={styles.calccardsubtitle}>
                  {data[item].description}
                </p>
                <p className={styles.date}>By Upsurge Team, 5th Aug, 2021</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
