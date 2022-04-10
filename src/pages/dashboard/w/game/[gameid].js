import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import FreeGameApis from "../../../../actions/apis/FreeGameApis";
import GameApis from "../../../../actions/apis/GameApis";
import BrokenGameConroller from "../../../../components/SVGcomponents/BrokenGameConroller";
import styles from "../../../../styles/WaitlistDashboard/gamepage.module.scss";
import validator from "validator";
import { db } from "../../../../db";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import { Game_Unity_Data } from "../../../../static_data/Game_Data";
import LoginApis from "../../../../actions/apis/LoginApis";
import { useContext } from "react";
import { MainContext } from "../../../../context/Main";
import LeaderboardComponent from "../../../../components/WaitlistDashboard/LeaderboardComponent";
import Spinner from "../../../../components/Spinner";

export default function GamePage({ userdatafromserver, gamedata }) {
  const [progression, setProgression] = useState(0);
  const [unitycontext, setunitycontext] = useState(null);
  const [isfullscreen, setisfullscreen] = useState(false);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [widthHeight, setwidthHeight] = useState({
    width: 1280,
    height: 720,
  });
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const router = useRouter();
  const { gameid, id } = router.query;

  const [stickyheader, setstickyheader] = useState(false);
  const [errorshown, seterrorshown] = useState(false);
  const [showgame, setshowgame] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [removeBorder, setremoveBorder] = useState(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [error, seterror] = useState("");
  const [nickname, setnickname] = useState("");
  const [mode, setmode] = useState("Games Arena");
  const { userdata, setuserdata } = useContext(MainContext);

  const [info, setinfo] = useState({
    device: "computer",
    orientation: "desktop",
  });
  function handleOnClickFullscreen() {
    unitycontext.setFullscreen(true);
  }
  const gamesWithAuth = ["Ludo", "FinCricket"];

  useEffect(() => {
    if (userdatafromserver) {
      setuserdata(userdatafromserver);
    }
  }, [userdatafromserver]);
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
  useEffect(
    function () {
      if (!unitycontext) return;
      unitycontext.on("Exit", function () {
        router.push("/dashboard/w/games");
      });
      unitycontext.on("progress", function (progression) {
        console.log(progression);
      });
      unitycontext.on("Error", function (code, url, vendor) {
        console.log(code, url, vendor);
        router.push("/dashboard/w/games");
      });
      unitycontext.on("error", function (message) {
        console.log(message);
      });
    },
    [unitycontext]
  );
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
  }, [phone, email, name, nickname]);

  useEffect(() => {
    setTimeout(() => setremoveBorder(true), 10000);
  }, []);
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
        router.push("/dashboard/w/games");
        setisfullscreen(false);
      }
    }
  }, []);
  return (
    <div className={styles.gamePage}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        {unitycontext &&
        progression === 1 &&
        widthHeight.width <= 900 &&
        widthHeight.height < widthHeight.width &&
        !isfullscreen ? (
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
        <div className={styles.mainContent} id="unity-wrapper">
          {widthHeight.width < 900 && widthHeight.height > widthHeight.width ? (
            <div className={styles.mobileerr}>
              <div className={styles.box}>
                <BrokenGameConroller className={styles.jasper} />
                <p className={styles.heading}>
                  Please switch to landscape mode
                </p>
                <p>{`This game only playable in landscape mode.`}</p>
                <div
                  className={styles.button}
                  onClick={() => router.push("/dashboard/w")}
                >
                  Go back
                </div>
              </div>
            </div>
          ) : gamedata && unitycontext ? (
            <Unity
              className={`${styles.gameMain} ${stickyheader && styles.sticky} ${
                removeBorder ? styles.removeborder : ""
              }
              ${
                widthHeight.width < 900 &&
                widthHeight.height < widthHeight.width &&
                styles.mobilegame
              }
              `}
              unityContext={unitycontext}
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
              matchWebGLToCanvasSize={true}
            />
          ) : (
            <p>Incorrect url, game not found.</p>
          )}
        </div>
      </div>
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
      msg = response.data.msg;
      return {
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let gamedata = await GameApis.gamedata({ id: params.gameid });
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          gamedata:
            gamedata && gamedata.data && gamedata.data.data
              ? gamedata.data.data
              : null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
