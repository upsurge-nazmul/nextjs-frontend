import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import FreeGameApis from "../../../actions/apis/FreeGameApis";
import GameApis from "../../../actions/apis/GameApis";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Home/Footer";
import { isMobile } from "react-device-detect";
import JoinUs from "../../../components/Home/JoinUs";
import LeftPanel from "../../../components/LeftPanel";
import BrokenGameConroller from "../../../components/SVGcomponents/BrokenGameConroller";
import styles from "../../../styles/GamePage/gamepage.module.scss";
import validator from "validator";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { db } from "../../../db";
import { Game_Unity_Data } from "../../../static_data/Game_Data";
import Loader from "../../../components/Loader";
import Spinner from "../../../components/Spinner";
import GameLandscapeInfo from "../../../components/Home/GameLandscapeInfo";
import { MainContext } from "../../../context/Main";
import LoginApis from "../../../actions/apis/LoginApis";
import { getCookie } from "../../../actions/cookieUtils";
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
export default function GamePage({ gamedata, userdata }) {
  const [progression, setProgression] = useState(0);
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
  const router = useRouter();
  const [showgamelandscapeinfo, setshowgamelandscapeinfo] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const { gameid, id } = router.query;
  const { setuserdata, mobileMode, widthHeight } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

  function handleOnClickFullscreenUnity() {
    unityref.current?.send(
      "FullscreenController",
      "UpdateScreen",
      fullscreenenabled ? 1 : 0
    );
  }
  function handleSendToken() {
    unitycontext?.send("TokenController", "SetToken", getCookie("accesstoken"));
  }
  useEffect(() => {
    if (progression === 1 && unitycontext) {
      console.log("calling from frontend");
      handleSendToken();
      handleOnClickFullscreenUnity();
    }
  }, [progression, unitycontext]);

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
    if (gameid) {
      checkifcacheexist();
    }
    async function checkifcacheexist() {
      setunitycontext(new UnityContext(gamedata));
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
    let res = await FreeGameApis.presign({
      playername: "Test",
      playeremail: "tempuser@upsurge.in",
      number: "",
      game: gameid,
    });
    if (res) {
      if (res.data.success) {
        router.push({
          pathname: "/games/test/" + gameid,
          query: { id: res.data.data },
        });
      }
    } else {
      alert("error connecting server");
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
      unitycontext.on("Score", function (score) {
        console.log("this is score", score);
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
        if (router.query.gobackto) {
          return router.push(router.query.gobackto);
        }
        router.push("/games");
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
      unitycontext.on("GameId", function (gameid) {
        if (!gameid) return;
        router.push("/games/test/" + gameid + `?gobackto=${router.asPath}`);
        router.reload();
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

      {
        // mobile mode
        mobileMode ? (
          !showgame ? (
            widthHeight.height < widthHeight.width ? (
              <div className={styles.mobilegamedata}>
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
                    <div
                      className={styles.startbutton}
                      onClick={() => startgame(false, true)}
                    >
                      Start Playing
                    </div>
                    <div
                      className={styles.skipbutton}
                      onClick={() => startgame(true, true)}
                    >
                      Skip
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <img src="https://i.ibb.co/yV2H2FY/Artboard-1-1.png" alt="" />
                </div>
              </div>
            ) : (
              <div className={styles.mobileerr}>
                <div className={styles.box}>
                  <img
                    src="https://i.ibb.co/VBSv3s9/to-landscape.gif"
                    className={styles.jasper}
                    alt="to landscape"
                  />
                  <p className={styles.heading}>
                    Please switch to landscape mode
                  </p>
                  <p>{`This game only playable in landscape mode.`}</p>
                  <div
                    className={styles.button}
                    onClick={() => setshowgamelandscapeinfo(true)}
                  >
                    Know more
                  </div>
                </div>

                {/* <Jasper className={styles.jasper} /> */}
              </div>
            )
          ) : progression < 1 ? (
            <div className={styles.mobileloaderwrapper}>
              <Spinner
                progress={`${progression * 100}%`}
                additionalClass={styles.loader}
                color="#4266EB"
              />
              <p>Loading {Math.round(progression * 100)}%</p>
            </div>
          ) : widthHeight.height > widthHeight.width ? (
            <div className={styles.mobileerr}>
              <div className={styles.box}>
                <img
                  src="https://i.ibb.co/VBSv3s9/to-landscape.gif"
                  className={styles.jasper}
                  alt="to landscape"
                />
                <p className={styles.heading}>
                  Please switch to landscape mode
                </p>
                <p>{`This game only playable in landscape mode.`}</p>
                <div
                  className={styles.button}
                  onClick={() => setshowgamelandscapeinfo(true)}
                >
                  Know more
                </div>
              </div>

              {/* <Jasper className={styles.jasper} /> */}
            </div>
          ) : (
            <div className={styles.start}>
              <div className={styles.box}>
                <p className={styles.name}>
                  Game is ready, click the below button to start game.
                </p>
                <p className={styles.btn} onClick={movetofull}>
                  Start game
                </p>
              </div>
            </div>
          )
        ) : (
          <div
            className={`${styles.gameWrapper} ${
              widthHeight.width <= 900 && styles.mobilewrapper
            } ${isfullscreen && styles.nopadding}`}
            id="unity-wrapper"
          >
            {gamedata && !showgame && widthHeight.width > 900 ? (
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
                      onClick={() => startgame(true)}
                    >
                      Skip
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <img src="https://i.ibb.co/yV2H2FY/Artboard-1-1.png" alt="" />
                </div>
              </div>
            ) : gamedata && unitycontext ? (
              <div />
            ) : (
              <p>Incorrect url, game not found.</p>
            )}
          </div>
        )
      }
      <div
        className={`${styles.gameWrapper} ${
          widthHeight.width <= 900 && styles.mobilewrapper
        } ${isfullscreen && styles.nopadding}`}
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

      <JoinUs />

      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  let gamedata = await GameApis.gamedata({ id: params.gameid, test: true });
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg || "";
      return {
        props: {
          gamedata: (gamedata && gamedata.data && gamedata.data.data) || null,
        },
      };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
          gamedata: (gamedata && gamedata.data && gamedata.data.data) || null,
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
      },
    };
  }
}
