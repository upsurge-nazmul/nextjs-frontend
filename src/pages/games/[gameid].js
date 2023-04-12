import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import GameApis from "../../actions/apis/GameApis";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import { isMobile } from "react-device-detect";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import BrokenGameConroller from "../../components/SVGcomponents/BrokenGameConroller";
import styles from "../../styles/GamePage/gamepage.module.scss";
import validator from "validator";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { db } from "../../db";
import { Game_Data } from "../../static_data/Game_Data";
import Loader from "../../components/Loader";
import Spinner from "../../components/Spinner";
import GameLandscapeInfo from "../../components/Home/GameLandscapeInfo";
import { MainContext } from "../../context/Main";
import LoginApis from "../../actions/apis/LoginApis";
import Seo from "../../components/Seo";
import { getGameTitleandDescription } from "../../helpers/seo";
import localforage from "localforage";
let fullscreenenabled = false;
const specialchars = [
  "#",
  "$",
  "%",
  "*",
  "&",
  "(",
  "@",
  "_",
  ")",
  "+",
  "-",
  "&&",
  "||",
  "!",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  "^",
  "~",
  "*",
  "?",
  ":",
  "1",
  "0",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
export default function GamePage({ gamedata, userdata, seodata }) {
  const router = useRouter();
  const [progression, setProgression] = useState(0);
  const { gameid, id } = router.query;
  const [unitycontext, setunitycontext] = useState(null);
  const unityref = useRef(unitycontext);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [errorshown, seterrorshown] = useState(false);
  const [showgame, setshowgame] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [removeBorder, setremoveBorder] = useState(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [error, seterror] = useState("");
  const [isfullscreen, setisfullscreen] = useState(false);
  const [gameDetails, setGameDetails] = useState(Game_Data[gameid]);
  const [showgamelandscapeinfo, setshowgamelandscapeinfo] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const { setuserdata, mobileMode, widthHeight } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

  const handlefullscren = useFullScreenHandle();
  function handleOnClickFullscreenUnity() {
    unityref.current?.send(
      "FullscreenController",
      "UpdateScreen",
      fullscreenenabled ? 1 : 0
    );
  }
  useEffect(() => {
    unityref.current = unitycontext;
  }, [unitycontext]);
  const gamesWithAuth = ["Ludo", "FinCricket"];
  useEffect(() => {
    if (gameid) {
      logclick();
    }
    async function logclick() {
      let res = await GameApis.loggameclick({ id: gameid });
    }
  }, [gameid]);
  useEffect(() => {
    setGameDetails(Game_Data[gameid]);
    if (gameid) {
      checkifcacheexist();
    }
    async function checkifcacheexist() {
      let xx = await db.games.where("id").equals(gameid).toArray();
      let context = gamedata;
      if (xx.length > 0) {
        if (xx[0].version !== context.version) {
          x();
          setunitycontext(new UnityContext(context));
          return;
        }
        let wasm = xx[0].wasm;
        let data = xx[0].data;
        let framework = xx[0].framework;
        let loader = xx[0].loader;

        if (data) {
          context.dataUrl = window.URL.createObjectURL(data);
        }
        if (wasm) {
          context.codeUrl = window.URL.createObjectURL(wasm);
        }
        if (framework) {
          context.frameworkUrl = window.URL.createObjectURL(framework);
        }
        if (loader) {
          context.loaderUrl = window.URL.createObjectURL(loader);
        }
        setunitycontext(new UnityContext(context));
      } else {
        x();
        setunitycontext(new UnityContext(context));
      }
    }
    async function x() {
      if (!gamedata) return;
      let updateData = {
        version: gamedata.version,
        id: gameid,
      };
      console.log("downloading data");
      let datares = await fetch(gamedata.dataUrl, {
        method: "GET",
      });
      let datablob = await datares.blob();
      updateData.data = datablob;
      console.log("downloading code");
      let coderes = await fetch(gamedata.codeUrl, {
        method: "GET",
      });
      let codeblob = await coderes.blob();
      updateData.wasm = codeblob;
      console.log("downloading framework");
      let frameworkres = await fetch(gamedata.frameworkUrl, {
        method: "GET",
      });
      let frameworkblob = await frameworkres.blob();
      updateData.framework = frameworkblob;
      console.log("downloading loader");
      let loaderres = await fetch(gamedata.loaderUrl, {
        method: "GET",
      });
      let loaderblob = await loaderres.blob();
      updateData.loader = loaderblob;

      let previos_game_data = await db.games
        .where("id")
        .equals(gameid)
        .toArray();
      if (previos_game_data.length > 0) {
        console.log("updating game in indexedDb");
        await db.games.update(gameid, updateData);
      } else {
        console.log("adding game in indexedDb");

        try {
          await db.games.add(updateData);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [router]);
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
    if (!gameid) {
      return;
    }
    if (!errorshown && widthHeight.width < 900) {
      logerror();
      seterrorshown(true);
    }
    async function logerror() {
      await GameApis.loggameerror({ id: gameid });
    }
  }, [widthHeight, gameid]);
  useEffect(() => {
    if (id) {
      checktoken();
    }
    async function checktoken() {
      let res = await FreeGameApis.usertoken({
        game_token: id,
      });
      if (res && res.data.success) {
        setshowgame(true);
      } else {
        alert("Id not valid");
      }
    }
  }, [id]);
  useEffect(() => {
    seterror("");
  }, [phone, email, name]);
  async function startgame(tempdata, ismobile) {
    if (tempdata) {
      let res = await FreeGameApis.presign({
        playername: "Anonymous",
        playeremail: "tempuser@upsurge.in",
        number: "",
        game: gameid,
      });
      if (res) {
        if (res.data.success) {
          router.push({
            pathname: "/games/" + gameid,
            query: { id: res.data.data },
          });
        }
      } else {
        alert("error connecting server");
      }
    } else {
      if (!name) {
        seterror("Name is required");
        return;
      }
      if (!email) {
        seterror("Email is required");
        return;
      }
      if (!validator.isEmail(email)) {
        seterror("Please enter valid email address");
        return;
      }
      if (phone && !validator.isMobilePhone(phone, "en-IN")) {
        seterror("Please enter valid phone number");
        return;
      }

      let res = await FreeGameApis.presign({
        playername: name,
        playeremail: email,
        number: phone,
        game: gameid,
      });
      if (res) {
        if (res.data.success) {
          router.push({
            pathname: "/games/" + gameid,
            query: { id: res.data.data },
          });
        }
      } else {
        alert("error connecting server");
      }
    }
    if (ismobile) {
      movetofull();
    }
  }
  useEffect(() => {
    if (progression === 1) {
      setremoveBorder(true);
    }
  }, [progression]);
  useEffect(
    function () {
      if (!unitycontext) return;
      console.log("Pratham", unitycontext);
      unitycontext.on("Score", function (score) {
        localforage.setItem(
          "playedGame",
          JSON.stringify({ gameid, score, unicoins: 300 })
        );
      });
      unitycontext.on("Error", function (code, url, vendor) {
        console.log("debug");
        router.push("/games");
      });
      unitycontext.on("progress", function (progression) {
        setProgression(progression);
        console.log(progression * 100);
      });
      unitycontext.on("Exit", function () {
        router.push("/dashboard/k/games");
      });
      unitycontext.on("Fullscreen", function () {
        if (fullscreenenabled) {
          unitycontext.setFullscreen(false);
          fullscreenenabled = false;
          setisfullscreen(false);
        } else {
          unitycontext.setFullscreen(true);
          fullscreenenabled = true;
          setisfullscreen(true);
        }
      });
    },
    [unitycontext]
  );
  function movetofull() {
    // if already full screen; exit
    // else go fullscreen
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setisfullscreen(false);
      fullscreenenabled = false;
      handleOnClickFullscreenUnity();
    } else {
      let element = document.getElementById("unity-wrapper");
      if (element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
        setisfullscreen(true);
        fullscreenenabled = true;
        handleOnClickFullscreenUnity();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", onFullScreenChange, false);
    document.addEventListener(
      "webkitfullscreenchange",
      onFullScreenChange,
      false
    );
    document.addEventListener("mozfullscreenchange", onFullScreenChange, false);

    function onFullScreenChange() {
      var fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement;

      if (!fullscreenElement) {
        setisfullscreen(false);
        fullscreenenabled = false;
        // router.push("/games");
      }
    }
  }, []);

  return (
    <div className={styles.gamePage}>
      <Seo title={seodata?.title} desc={seodata?.description} />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={widthHeight.width > 900 ? stickyheader : false}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      {showgamelandscapeinfo && (
        <GameLandscapeInfo setshow={setshowgamelandscapeinfo} />
      )}
      {isMobile && (
        <div className={styles.mobileerr}>
          <div className={styles.box}>
            <BrokenGameConroller className={styles.jasper} />
            <p className={styles.heading}>Oh no!</p>
            <p>
              {`This game is not yet available for phones & tablets. Please use
                a laptop or PC to play it.`}
            </p>
            <div className={styles.button} onClick={() => router.push("/")}>
              Go back
            </div>
          </div>
        </div>
      )}
      {showgame && progression < 1 && (
        <div className={styles.mobileloaderwrapper}>
          <Spinner
            progress={`${progression * 100}%`}
            additionalClass={styles.loader}
            color="#4266EB"
          />
          <p>Loading {Math.round(progression * 100)}%</p>
        </div>
      )}
      {!showgame && !isMobile ? (
        <div className={styles.gamedata}>
          <div className={styles.left}>
            <p className={styles.heading}>We need a few more details</p>
            <p className={styles.error}>{error}</p>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => {
                if (
                  e.target.value.length > 1 &&
                  e.target.value[e.target.value.length - 1] === " "
                ) {
                  setname(e.target.value);
                }
                if (!e.target.value[e.target.value.length - 1]) {
                  setname("");
                  return;
                }
                if (
                  specialchars.includes(
                    e.target.value[e.target.value.length - 1].toString()
                  )
                ) {
                  return;
                }
                if (isNaN(e.target.value[e.target.value.length - 1]))
                  setname(e.target.value);
              }}
              placeholder="Name*"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className={styles.input}
              placeholder="Email*"
            />
            <input
              value={phone}
              type="text"
              maxLength={10}
              onChange={(e) => {
                if (!e.target.value[e.target.value.length - 1]) {
                  setphone("");
                  return;
                }
                if (isNaN(e.target.value[e.target.value.length - 1])) {
                  return;
                }
                setphone(e.target.value);
              }}
              className={styles.input}
              placeholder="Phone (optional)"
            />
            <div className={styles.buttons}>
              <div className={styles.startbutton} onClick={startgame}>
                Start Playing
              </div>
              <div
                className={styles.skipbutton}
                onClick={() => {
                  startgame(true);
                }}
              >
                Skip
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <img
              src="https://imgcdn.upsurge.in/images/Artboard-1-1.png"
              alt=""
            />
          </div>
        </div>
      ) : (
        <div
          className={`${styles.gameWrapper} ${
            widthHeight.width <= 900 && styles.mobilewrapper
          } ${isfullscreen && styles.nopadding} ${
            progression < 1 && styles.disable
          }`}
          id="unity-wrapper"
        >
          {showgame && gamedata && unitycontext && (
            <Unity
              id="gameunity"
              className={`${styles.gameMain} ${stickyheader && styles.sticky} ${
                removeBorder ? styles.removeborder : ""
              }
        ${
          widthHeight.width < 900 &&
          widthHeight.height < widthHeight.width &&
          styles.mobilegame
        }
        `}
              style={
                widthHeight.width > 900 && !isMobile
                  ? {
                      visibility: "visible",
                    }
                  : {
                      visibility: isfullscreen ? "visible" : "hidden",
                      position: !isfullscreen ? "absolute" : "static",
                      pointerEvents: !isfullscreen ? "none" : "unset",
                    }
              }
              unityContext={unitycontext}
              matchWebGLToCanvasSize={true}
            />
          )}
        </div>
      )}

      <JoinUs />

      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  let gamedata = await GameApis.gamedata({ id: params.gameid });
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg || "";
      return {
        props: {
          gamedata: (gamedata && gamedata.data && gamedata.data.data) || null,
          seodata: getGameTitleandDescription(params.gameid),
        },
      };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
          gamedata: (gamedata && gamedata.data && gamedata.data.data) || null,
          seodata: getGameTitleandDescription(params.gameid),
        },
      };
    }
  } else {
    return {
      props: {
        isLogged: false,
        msg: "cannot get token",
        userdata: null,
        gamedata: (gamedata && gamedata.data && gamedata.data.data) || null,
        seodata: getGameTitleandDescription(params.gameid),
      },
    };
  }
}
