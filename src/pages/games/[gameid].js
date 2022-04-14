import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import GameApis from "../../actions/apis/GameApis";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import BrokenGameConroller from "../../components/SVGcomponents/BrokenGameConroller";
import styles from "../../styles/GamePage/gamepage.module.scss";
import validator from "validator";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { db } from "../../db";
import { Game_Unity_Data } from "../../static_data/Game_Data";
import Loader from "../../components/Loader";
import Spinner from "../../components/Spinner";
import GameLandscapeInfo from "../../components/Home/GameLandscapeInfo";
import { MainContext } from "../../context/Main";
import LoginApis from "../../actions/apis/LoginApis";

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
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [widthHeight, setwidthHeight] = useState({
    width: 1280,
    height: 720,
  });
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
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

  const handlefullscren = useFullScreenHandle();
  function handleOnClickFullscreen() {
    unitycontext.setFullscreen(true);
    setisfullscreen(true);
  }
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
    function updateSize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      document.documentElement.style.setProperty("--width", w + "px");
      document.documentElement.style.setProperty("--height", h + "px");
      setwidthHeight({
        width: w,
        height: h,
      });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
  async function startgame() {
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
  useEffect(() => {
    if (progression === 1) {
      setremoveBorder(true);
    }
  }, [progression]);
  useEffect(
    function () {
      if (!unitycontext) return;
      unitycontext.on("Score", function (score) {
        console.log(score);
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
        router.push("/games");
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
    } else {
      let element = document.getElementById("unity-wrapper");
      console.log(element);
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
    }
  }
  useEffect(() => {
    window.screen.orientation.onchange = function () {
      if (this.type.startsWith("landscape")) {
        movetofull();
      } else {
        document.webkitExitFullscreen();
      }
    };
  }, []);
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
        router.push("/games");
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
      {unitycontext &&
      progression === 1 &&
      widthHeight.width <= 900 &&
      widthHeight.height < widthHeight.width ? (
        <div className={styles.start}>
          <p className={styles.btn} onClick={movetofull}>
            Start
          </p>
        </div>
      ) : (
        widthHeight.width <= 900 &&
        widthHeight.height < widthHeight.width && (
          <div className={styles.mobilespinner}>
            <Spinner
              progress={`${progression * 100}%`}
              additionalClass={styles.loader}
              color="#4266EB"
              topcolor="white"
            />
            <p>Loading {Math.round(progression * 100)}%</p>
          </div>
        )
      )}
      <div
        className={`${styles.gameWrapper} ${
          widthHeight.width <= 900 && styles.mobilewrapper
        } ${isfullscreen && styles.nopadding}`}
        id="unity-wrapper"
      >
        {showgame && progression < 1 && (
          <div className={styles.loaderwrapper}>
            <Spinner
              progress={`${progression * 100}%`}
              additionalClass={styles.loader}
              color="#4266EB"
            />
            <p>Loading {Math.round(progression * 100)}%</p>
          </div>
        )}
        {widthHeight.width < 900 && widthHeight.height > widthHeight.width ? (
          <div className={styles.mobileerr}>
            <div className={styles.box}>
              <img
                src="https://i.ibb.co/VBSv3s9/to-landscape.gif"
                className={styles.jasper}
              />
              <p className={styles.heading}>Please switch to landscape mode</p>
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
        ) : gamedata && !showgame && widthHeight.width > 900 ? (
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
                  onClick={() => setshowgame(true)}
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
              widthHeight.width > 900
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
        ) : (
          <p>Incorrect url, game not found.</p>
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
  let gamedata = await GameApis.gamedata({ id: params.gameid });
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
