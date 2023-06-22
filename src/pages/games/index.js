import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/GamePage/gamelist.module.scss";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import { Game_Data } from "../../static_data/Game_Data";
import { MainContext } from "../../context/Main";
import PageTitle from "../../components/PageTitle";
import CarouselGames from "../../components/Carousel/CarouselGames/index";
import GameView from "../../components/Games/GameView";
import UnicoinsAwards from "../../components/UnicoinsAwards";
import GameSvg from "../../components/SVGcomponents/GameSvg";
import UniCoinSvg from "../../components/SVGcomponents/UniCoinSvg";
import Buttons from "../../components/Buttons";

export default function GamePage() {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [openGame, setOpenGame] = useState("");
  const [showUnicoinsAwards, setShowUnicoinsAwards] = useState(false);
  const [updateTimesPlayed, setUpdateTimesPlayed] = useState(false);
  const comingsoongames = ["Ludo", "HighAndLow", "MoneyMath"];
  const [unicoins, setUnicoins] = useState(null);
  const {
    userdata,
    theme,
    skipActive,
    setskipActive,
    timesPlayed,
    setTimesPlayed,
  } = useContext(MainContext);
  const [gameOpened, setGameOpened] = useState(null);
  let gameunicoinrewards = null;
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
  useEffect(() => {
    if (!userdata) {
      if (timesPlayed > 0) {
        setShowUnicoinsAwards(true);
        setUnicoins(4000);
        let game = localStorage.getItem("gameOpened");
        console.log(`game`, game);
        setGameOpened(JSON.parse(game));
      }
    }
  }, [updateTimesPlayed]);
  async function handlegameclick(
    title,
    pushto,
    webgl_key,
    premium_plan,
    userPlan,
    isSimulator = false
  ) {
    localStorage.setItem("gameOpened", JSON.stringify(title));
    setOpenGame(pushto ? pushto : title);
  }
  return (
    <div
      className={`${styles.gamelist} ${
        theme === "dark" && styles.darkgamelist
      }`}
    >
      <PageTitle />
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        authmode={authmode}
        setauthmode={setauthmode}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
        gameOpened={gameOpened}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.contentWrapper}>
        {/* <img
          className={styles.icon}
          src="https://imgcdn.upsurge.in/images/unsp/photo-1600080972464-8e5f35f63d08.avif"
          alt=""
        />
        
          */}
        <CarouselGames
          userdata={userdata}
          setshowauth={setshowauth}
          setauthmode={setauthmode}
        />
        <div className={styles.headingSection}>
          <h2 className={styles.heading}>
            Kids see fun. Parents see progress!
          </h2>
          <h3 className={styles.subheading}>
            Get access to the most fun educational financial literacy &
            entrepreneurial games for kids.
            <br />
            <br />
          </h3>
        </div>

        <div className={styles.gamelistwrapper}>
          <h2 className={styles.gameHeading}>More Games</h2>
          <div className={styles.wrapper}>
            {Object.keys(Game_Data).map((item, index) => {
              let reward = gameunicoinrewards
                ? gameunicoinrewards.includes(item)
                  ? "Completed"
                  : 200
                : null;
              return (
                <div
                  key={"game-card-" + index}
                  className={styles.gameCardContainer}
                >
                  <div className={styles.gameCard}>
                    <img
                      src={
                        Game_Data[item]?.img ||
                        (Game_Data[item]?.name &&
                          `/images/games/${Game_Data[item]?.name.replace(
                            / /g,
                            ""
                          )}.png`) ||
                        ""
                      }
                      alt=""
                    />
                    <div className={styles.contentWrapper}>
                      <p className={styles.title}>
                        {Game_Data[item]?.name || ""}
                      </p>
                      <p className={styles.detail}>
                        {Game_Data[item]?.description.length > 40
                          ? Game_Data[item]?.description.substring(0, 40) +
                            "..."
                          : Game_Data[item]?.description || ""}
                      </p>
                      {reward && (
                        <p className={styles.reward}>
                          <UniCoinSvg className={styles.icon} />
                          {reward}
                        </p>
                      )}
                      {/* <div className={styles.chatbtn}>
        <div onClick={()=>{mixpanel.track('Game',{'event':`Game Started ${Game_Data[item].name}`});}} className={styles.chatbtn}>
          Play
          <GameSvg className={styles.icon} />
        </div> */}
                    </div>
                  </div>
                  <div className={styles.actionArea}>
                    <Buttons
                      type={"animated"}
                      handleClick={() =>
                        handlegameclick(
                          item,
                          Game_Data[item].pushto
                            ? Game_Data[item].pushto.split("/")[
                                Game_Data[item].pushto.split("/").length - 1
                              ]
                            : "",
                          Game_Data[item].webgl_key,
                          Game_Data[item].premium_plan,
                          userdata.premium_plan
                        )
                      }
                      // handleClick={() => {

                      //   onClick
                      //     ?
                      //     : () => router.push("/dashboard/k/games");
                      //   mixpanel.track("Game started", {
                      //     event: `Game Started ${Game_Data[item].name}`,
                      //     gameName: `${Game_Data[item].id}`,
                      //   });
                      // }}
                    >
                      <GameSvg className={styles.icon} />
                      Play Now
                    </Buttons>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
      {openGame ? (
        <GameView
          game={openGame}
          setGame={setOpenGame}
          timesPlayed={timesPlayed}
          setTimesPlayed={setTimesPlayed}
          setShowUnicoinsAwards={setShowUnicoinsAwards}
          setUnicoins={setUnicoins}
        />
      ) : (
        ""
      )}
      {!userdata && showUnicoinsAwards ? (
        <UnicoinsAwards
          setShowUnicoinsAwards={setShowUnicoinsAwards}
          unicoins={unicoins}
          setshowauth={setshowauth}
          setauthmode={setauthmode}
        />
      ) : (
        ""
      )}
    </div>
  );
}
