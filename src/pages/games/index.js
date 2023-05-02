import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/GamePage/gamelist.module.scss";
import Footer from "../../components/Home/Footer";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import JoinUs from "../../components/Home/JoinUs";
import { Game_Data } from "../../static_data/Game_Data";
import { MainContext } from "../../context/Main";
import { isMobile, isIOS } from "react-device-detect";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import PageTitle from "../../components/PageTitle";
import CarouselGames from "../../components/Carousel/CarouselGames/index";
import AvailableGames from "../../components/DownloadGames/AvailableGames";
import GameCard from "../../components/Dashboard/GameCard";
import GameView from "../../components/Games/GameView";
import UnicoinsAwards from "../../components/UnicoinsAwards";
import GameList from "../../components/Games/GameList";

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
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
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
          <GameList
            data={Game_Data}
            handlegameclick={handlegameclick}
            userdata={userdata}
          />
        </div>
      </div>
      <JoinUs />
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
