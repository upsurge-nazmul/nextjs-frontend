import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/GamePage/gamelist.module.scss";
import Footer from "../../components/Home/Footer";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import JoinUs from "../../components/Home/JoinUs";
import { Game_Data } from "../../static_data/Game_Data";

export default function GamePage() {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const comingsoongames = ["Ludo", "HighAndLow", "MoneyMath"];
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
        showpopup={showpopup}
        setshowpopup={setshowpopup}
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
            {`On upsurge, children (and parents) are encouraged to play games
            based on topics around entrepreneurship & money management, so that
            they can learn by doing and making decisions. Here are some of our
            games that you and your child can play together.`}
          </h3>
        </div>

        <div className={styles.gamelistwrapper}>
          {Object.keys(Game_Data).map((item, index) => {
            return (
              <div
                key={"game" + index}
                className={styles.gameCard}
                // onClick={() => router.push(`/games/${item}`)}
              >
                <img
                  src={Game_Data[item].img || `/images/games/${item}.png`}
                  alt=""
                />
                <p className={styles.title}>{Game_Data[item].name}</p>
                <p className={styles.detail}>{Game_Data[item].description}</p>
                <p
                  className={styles.activebutton}
                  onClick={() => {
                    if (Game_Data[item].pushto) {
                      return router.push(Game_Data[item].pushto);
                    }
                    router.push("/games/" + item);
                  }}
                >
                  Play
                </p>

                {/* {comingsoongames.includes(item) ? (
                  <p className={styles.button}>Coming Soon....</p>
                ) : (
                  <p
                    className={styles.activebutton}
                    onClick={() => {
                      router.push("/games/" + item);
                    }}
                  >
                    Play
                  </p>
                )} */}
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
