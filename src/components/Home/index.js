import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Home/home.module.scss";
import { MainContext } from "../../context/Main";
import Header from "../Header/Header";
import LeftPanel from "../LeftPanel";
import AboutSection from "./AboutSection";
import ProductSection from "./ProductSection";
import BlogsSection from "./BlogsSection";
import Footer from "./Footer";
import Intro from "./Intro";
import Who from "./Who";
import Benefits from "./Benefits";
import JasperSection from "./JasperSection";
import PartnerSection from "./PartnerSection";
import JoinUs from "./JoinUs";
import FaqSection from "./FaqSection";
import TestiMonial from "./TestiMonial";
import Toast from "../Toast";
import Tour from "../Tour/Tour";
import PageTitle from "../PageTitle";
import JodoIntro from "./JodoIntro";
import { HOME_VARIENTS } from "../../static_data/Home_Data";
import ReferIntro from "./ReferIntro";
import SignupPopup from "../SignupPopup";
import localforage from "localforage";
import PRCoverage from "./PRCoverage";
import HighlightsCounter from "./HighlightsCounter";
import TrendingGamesPopUp from "../TrendingGamesPopUp";
import BecomeFinanciallySmartPopUp from "../BecomeFinanciallySmartPopUp";
import UnicoinsAwards from "../UnicoinsAwards";
import GameView from "../Games/GameView";
import WebglView from "../WebglView";
import RecognizedBy from "./RecognizedBy";
// import { IntercomProvider, useIntercom } from "react-use-intercom";

function Home({ page = "", showNav = true, blog_data }) {
  const gamesRef = useRef();
  const kqRef = useRef();
  const { userdata } = useContext(MainContext);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mailfromhome, setmailfromhome] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [refId, setRefId] = useState();
  const router = useRouter();
  const [showTrendingGames, setShowTrendingGames] = useState(false);
  const [trendingGamesManuallyClosed, setTendingGamesManuallyClosed] =
    useState(false);
  const [showUnicoinsAwards, setShowUnicoinsAwards] = useState(false);
  const [trendingGamesShow, setTrendingGamesShow] = useState(false);
  const [becomeFinanciallySmartShown, setBecomeFinanciallySmartShown] =
    useState(false);
  const [showBecomeFinanciallySmart, setShowBecomeFinanciallySmart] =
    useState(false);
  const [unicoins, setUnicoins] = useState(null);
  const [openGame, setOpenGame] = useState("");
  const [currentChapter, setCurrentChapter] = useState("");
  const [gameOpened, setGameOpened] = useState(null);
  const [kqOpened, setKqOpened] = useState(null);

  useEffect(() => {
    function handleScroll() {
      const showGamesPopUp = userdata
        ? false
        : gamesRef?.current?.offsetTop <= window.scrollY + 250;
      const showKQPopUp = userdata
        ? false
        : kqRef?.current?.offsetTop <= window.scrollY + 250;
      if (!userdata) {
        if (
          !trendingGamesShow &&
          !becomeFinanciallySmartShown &&
          showGamesPopUp
        ) {
          setShowTrendingGames(showGamesPopUp);
          setTrendingGamesShow(showGamesPopUp);
        } else if (
          trendingGamesShow &&
          trendingGamesManuallyClosed &&
          !becomeFinanciallySmartShown &&
          !showUnicoinsAwards &&
          !showauth &&
          showKQPopUp
        ) {
          setShowBecomeFinanciallySmart(showKQPopUp);
          setBecomeFinanciallySmartShown(showKQPopUp);
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    trendingGamesShow,
    trendingGamesManuallyClosed,
    becomeFinanciallySmartShown,
  ]);

  const handleback = () => {
    setCurrentChapter();
  };

  const handleDone = () => {
    setCurrentChapter();
    setShowUnicoinsAwards(true);
    setBecomeFinanciallySmartShown(true);
    setShowBecomeFinanciallySmart(false);
  };

  useEffect(() => {
    history.scrollRestoration = "manual";
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
    if (router.query.err) {
      if (router.query.err === "01") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Please login first.",
        });
        if (router.query.next) {
          router.push("/?next=" + router.query.next);
        } else router.push("/");
      }
      if (router.query.err === "02") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Your token has expired. Please login again.",
        });
        if (router.query.next) {
          router.push("/?next=" + router.query.next);
        } else router.push("/");
      }
      if (router.query.err == "invalid-pass-link") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Invalid password link",
        });
        router.push("/");
      }
    }
  }, [router.query]);

  useEffect(() => {
    // if (showauth) setShowSignupPopup(false);
    localforage.getItem("playedGame", function (err, value) {
      if (value) {
        if (!userdata) {
          setShowSignupPopup(true);
        }
      }
    });
  }, []);

  const story = [
    {
      position: "bottom",
      ref: "#continue-dashboard-btn",
      isolate: true,
      superimpose: true,
      required: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>Great, now we&apos;re in home page.</p>
          <p
            className={styles.text}
          >{`Press this button to go back to dashboard.`}</p>
        </div>
      ),
      nextFunction: () => {
        router.push(router.query.pushTo);
      },
    },
  ];

  useEffect(() => {
    console.log(document.documentElement.scrollTop);
    if (router.query.showTour) {
      let home = document.querySelector("#home-page-main");
      if (home) {
        home.scrollTop = 0;
      }
      window.scrollY = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [router]);

  useEffect(() => {
    if (
      (showTrendingGames && !userdata) ||
      (showBecomeFinanciallySmart && !userdata)
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => (document.body.style.overflowY = "auto");
  }, [showTrendingGames, showBecomeFinanciallySmart]);

  return (
    <div
      id="home-page-main"
      className={`${styles.homePage} ${
        showauth ||
        router.query.showTour ||
        showTrendingGames ||
        showBecomeFinanciallySmart
          ? styles.stopscrolling
          : ""
      }
      `}
    >
      <PageTitle />
      <Header
        userdata={userdata}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        setauthmode={setauthmode}
        mailfromhome={mailfromhome}
        stickyheader={stickyheader}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
        settoastdata={settoastdata}
        page={page}
        showNav={showNav}
        refId={refId}
        gameOpened={gameOpened}
        kqOpened={kqOpened}
      />

      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <SignupPopup
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        mailfromhome={mailfromhome}
        setshowpopup={setshowpopup}
        refId={refId}
        setauthmode={setauthmode}
        setShowSignupPopup={setShowSignupPopup}
        showSignupPopup={showSignupPopup}
      />

      <Toast data={toastdata} />

      <div>
        <p>Live Server: {process.env.NEXT_PUBLIC_LIVE_SERVER}</p>
        <p>Test Server: {process.env.NEXT_PUBLIC_TEST_SERVER}</p>
        <p>Media Bucket: {process.env.NEXT_PUBLIC_MEDIA_BUCKET}</p>
        <p>Game Bucket: {process.env.NEXT_PUBLIC_GAME_BUCKET}</p>
      </div>

      {page === HOME_VARIENTS[0] ? (
        <JodoIntro
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
          setshowpopup={setshowpopup}
        />
      ) : page === HOME_VARIENTS[1] ? (
        <ReferIntro
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
          setshowpopup={setshowpopup}
          setRefId={setRefId}
        />
      ) : (
        <Intro
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
          setshowpopup={setshowpopup}
        />
      )}
      <HighlightsCounter setshowauth={setshowauth} setauthmode={setauthmode} />
      <RecognizedBy />
      <Benefits />
      <Who />
      {/* <Values
        setshowauth={setshowauth}
        setauthmode={setauthmode}
        insidebenefits
      /> */}
      {/* <How /> */}
      <ProductSection setauthmode={setauthmode} setshowauth={setshowauth} />
      <PRCoverage />
      <TestiMonial />
      <div ref={gamesRef}>
        <PartnerSection />
      </div>
      <JasperSection />
      {/* <AboutSection /> */}
      {/* <BlogsSection blogData={blog_data} /> */}
      <FaqSection />
      <div ref={kqRef}>
        <JoinUs
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
        />
      </div>
      {!userdata && showTrendingGames ? (
        <TrendingGamesPopUp
          setShowTrendingGames={setShowTrendingGames}
          setOpenGame={setOpenGame}
          setGameOpened={setGameOpened}
          setTendingGamesManuallyClosed={setTendingGamesManuallyClosed}
          userdata={userdata}
        />
      ) : null}
      {!userdata && showBecomeFinanciallySmart ? (
        <BecomeFinanciallySmartPopUp
          setShowBecomeFinanciallySmart={setShowBecomeFinanciallySmart}
          setUnicoins={setUnicoins}
          setCurrentChapter={setCurrentChapter}
          setKqOpened={setKqOpened}
          userdata={userdata}
        />
      ) : null}
      {!userdata && showUnicoinsAwards ? (
        <UnicoinsAwards
          setShowUnicoinsAwards={setShowUnicoinsAwards}
          unicoins={unicoins}
          setshowauth={setshowauth}
          setauthmode={setauthmode}
        />
      ) : null}
      {!userdata && openGame ? (
        <GameView
          game={openGame}
          setGame={setOpenGame}
          setShowUnicoinsAwards={setShowUnicoinsAwards}
          setUnicoins={setUnicoins}
        />
      ) : (
        ""
      )}
      {!userdata && currentChapter ? (
        <WebglView
          {...{
            gameKey: currentChapter,
            setView: handleback,
            handleDone,
            type: "kq",
          }}
        />
      ) : (
        ""
      )}
      <Footer
        setshowauth={setshowauth}
        setauthmode={setauthmode}
        setmailfromhome={setmailfromhome}
        setshowpopup={setshowpopup}
      />
      {/* {router.query.showTour && (
        <Tour story={story} current={0} showtour={false} />
      )} */}
    </div>
  );
}

export default Home;
