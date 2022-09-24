import React, { useState, useContext, useEffect, useRef } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import Welcome from "../../../components/MoneyAce/Welcome";
import Unity, { UnityContext } from "react-unity-webgl";
import { useRouter } from "next/dist/client/router";
import Toast from "../../../components/Toast";
import styles from "../../../styles/kidDashboard/moneyace.module.scss";
import { MainContext } from "../../../context/Main";
import { db } from "../../../db";
import BrokenGameConroller from "../../../components/SVGcomponents/BrokenGameConroller";
import MoneyAceDashboard from "../../../components/MoneyAce/MoneyAceDashboard";
import Spinner from "../../../components/Spinner";
import MoneyAceApis from "../../../actions/apis/MoneyAceApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import GameLandscapeInfo from "../../../components/Home/GameLandscapeInfo";
import { getCookie } from "../../../actions/cookieUtils";
let fullscreenenabled = false;

export default function Moneyace({ userdatafromserver, moneyacedata }) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [moneyaceuserdata, setmoneyaceuserdata] = useState(moneyacedata);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [volume, setvolume] = useState(1);
  const [stage, setstage] = useState("welcome");
  const [unitycontext, setunitycontext] = useState(null);
  const unityref = useRef(unitycontext);
  const [gamedata, setgamedata] = useState(null);
  const [progression, setProgression] = useState(0);
  const [isfullscreen, setisfullscreen] = useState(false);
  const [showgamelandscapeinfo, setshowgamelandscapeinfo] = useState(false);
  const [muted, setmuted] = useState(false);
  const [tasks, settasks] = useState([]);
  const [canvassize, setcanvassize] = useState({ width: 800, height: 800 });
  const router = useRouter();
  useEffect(() => {
    function handleResize() {
      let x = document.getElementById("GameCanvas");
      if (x) setcanvassize({ width: x.clientWidth, height: x.clientHeight });
    }
    window.addEventListener("resize", handleResize);
  }, []);
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
    if (!userdatafromserver) return;
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  useEffect(() => {
    gettasks();
    async function gettasks() {
      let res = await MoneyAceApis.getTasks();
      if (res && res.data && res.data.success) {
        settasks(res.data.data);
      }
    }
  }, []);
  useEffect(() => {
    if (gamedata) {
      checkifcacheexist();
    }
    async function checkifcacheexist() {
      let xx = await db.games.where("id").equals(gamedata.id).toArray();
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
        id: gamedata.id,
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
        .equals(gamedata.id)
        .toArray();
      if (previos_game_data.length > 0) {
        console.log("updating game in indexedDb");
        await db.games.update(gamedata.id, updateData);
      } else {
        console.log("adding game in indexedDb");

        try {
          await db.games.add(updateData);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [gamedata]);
  useEffect(
    function () {
      if (!unitycontext) return;
      unitycontext.on("Score", function (score) {
        console.log("Game COmpleted", score);
        // MoneyAceApis.updatescore({ score: score, gameId: gamedata.id });
      });
      unitycontext.on("Error", function (code, url, vendor) {
        console.log("debug");
        router.reload();
      });
      unitycontext.on("progress", function (progression) {
        setProgression(progression);

        console.log(progression * 100);
      });
      unitycontext.on("Exit", function () {
        router.reload();
      });
      unitycontext.on("Fullscreen", function () {
        movetofull();
      });
    },
    [unitycontext]
  );
  useEffect(() => {
    if (progression === 1 && unitycontext) {
      handleSendToken();
      handleOnClickFullscreenUnity();
    }
  }, [progression, unitycontext]);
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
      let element = document.getElementById("GameCanvas");
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
        // router.push("/games");
      }
    }
  }, []);
  return (
    <div className={styles.moneyAce}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <div
        className={`${styles.contentWrapper} ${
          isfullscreen && styles.contentWrapperFull
        }`}
      >
        <DashboardHeader mode={"Money Ace"} settoastdata={settoastdata} />
        <div
          className={`${styles.mainContent} ${
            isfullscreen && styles.mainContentfull
          }`}
          id="GameCanvas"
        >
          {showgamelandscapeinfo && (
            <GameLandscapeInfo setshow={setshowgamelandscapeinfo} />
          )}

          {widthHeight.width <= 900 &&
          widthHeight.height > widthHeight.width &&
          !isfullscreen ? (
            <div className={styles.mobileerr}>
              <div className={styles.box}>
                <img
                  src="https://imgcdn.upsurge.in/images/to-landscape.gif"
                  className={styles.jasper}
                  alt="to-landscape"
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
            </div>
          ) : widthHeight.width <= 900 &&
            widthHeight.height < widthHeight.width &&
            !isfullscreen ? (
            <div className={styles.mobileerr}>
              <div className={styles.box}>
                <img
                  src="https://imgcdn.upsurge.in/images/to-landscape.gif"
                  className={styles.jasper}
                  alt="to-landscape"
                />
                <p className={styles.heading}>
                  This game can only be played on fullscreen in your phone.
                </p>
                <div className={styles.button} onClick={movetofull}>
                  Go to fullscreen
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`${styles.gameMain} ${
                widthHeight.width >= widthHeight.height * 2 &&
                styles.extralargegaimMain
              }`}
              style={{ width: isfullscreen ? "100%" : "90%" }}
            >
              {stage === "welcome" ? (
                <Welcome
                  muted={muted}
                  setmuted={setmuted}
                  setvolume={setvolume}
                  volume={volume}
                  moneyacedata={moneyacedata}
                  avatarUrl={userdatafromserver.user_img_url}
                  username={userdatafromserver.user_name}
                  fullName={
                    userdatafromserver.first_name +
                    " " +
                    (userdatafromserver.last_name || "")
                  }
                  setstage={setstage}
                />
              ) : stage === "dashboard" ? (
                <MoneyAceDashboard
                  muted={muted}
                  setmuted={setmuted}
                  setvolume={setvolume}
                  volume={volume}
                  setgamedata={setgamedata}
                  tasks={tasks}
                  canvassize={canvassize}
                  moneyacedata={moneyaceuserdata}
                  setmoneyacedata={setmoneyaceuserdata}
                  settoastdata={settoastdata}
                  settasks={settasks}
                  avatarUrl={userdatafromserver?.user_img_url}
                  username={userdatafromserver?.user_name}
                  fullName={
                    userdatafromserver?.first_name +
                    " " +
                    userdatafromserver?.last_name
                  }
                  stage={stage}
                  setstage={setstage}
                />
              ) : stage === "game" ? (
                <div className={styles.gameDiv}>
                  {progression < 1 && (
                    <div className={styles.loaderwrapper}>
                      <Spinner
                        progress={`${progression * 100}%`}
                        additionalClass={styles.loader}
                        color="#4266EB"
                      />
                      <p>Loading {Math.round(progression * 100)}%</p>
                    </div>
                  )}
                  {widthHeight.width < 860 && !isfullscreen ? (
                    <div className={styles.mobileerr}>
                      <div className={styles.box}>
                        <img
                          src="https://imgcdn.upsurge.in/images/to-landscape.gif"
                          className={styles.jasper}
                          alt="to-landscape"
                        />
                        <p className={styles.heading}>
                          This game can only be played on fullscreen in your
                          phone.
                        </p>
                        <p>{`This game only playable in landscape mode.`}</p>
                        <div
                          className={styles.button}
                          onClick={() => setshowgamelandscapeinfo(true)}
                        >
                          Know more
                        </div>
                      </div>
                    </div>
                  ) : (
                    unitycontext && (
                      <Unity
                        className={`${
                          progression < 1 ? styles.none : styles.gameMain
                        }`}
                        unityContext={unitycontext}
                        ref={unityref}
                        matchWebGLToCanvasSize={true}
                      />
                    )
                  )}
                </div>
              ) : null}
            </div>
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
      let moneyacedata = await MoneyAceApis.getMoneyAceData(null, token);
      return {
        props: {
          userdatafromserver:
            response && response.data && response.data.data
              ? response.data.data
              : [],
          moneyacedata:
            moneyacedata && moneyacedata.data && moneyacedata.data.success
              ? moneyacedata.data.data
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
