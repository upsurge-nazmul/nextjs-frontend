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
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
const data = {
  CoinSlide: {
    dataUrl: "/Games/CoinSlide/Build/CoinSlide.data",
    frameworkUrl: "/Games/CoinSlide/Build/CoinSlide.framework.js",
    codeUrl: "/Games/CoinSlide/Build/CoinSlide.wasm",
    loaderUrl: "/Games/CoinSlide/Build/CoinSlide.loader.js",
    version: "1.0",
  },
  ShoppingBudget: {
    dataUrl: "/Games/DontOverSpend/Build/Don't_Overspend.data",
    frameworkUrl: "/Games/DontOverSpend/Build/Don't_Overspend.framework.js",
    codeUrl: "/Games/DontOverSpend/Build/Don't_Overspend.wasm",
    loaderUrl: "/Games/DontOverSpend/Build/Don't_Overspend.loader.js",
    version: "1.0",
  },
  BalanceBuilder: {
    dataUrl: "/Games/BalanceBuilder/Build/BalanceBuilder.data",
    frameworkUrl: "/Games/BalanceBuilder/Build/BalanceBuilder.framework.js",
    codeUrl: "/Games/BalanceBuilder/Build/BalanceBuilder.wasm",
    loaderUrl: "/Games/BalanceBuilder/Build/BalanceBuilder.loader.js",
    version: "1.0",
  },
  HighAndLow: {
    dataUrl: "/Games/HighAndLow/Build/HighAndLow.data",
    frameworkUrl: "/Games/HighAndLow/Build/HighAndLow.framework.js",
    codeUrl: "/Games/HighAndLow/Build/HighAndLow.wasm",
    loaderUrl: "/Games/HighAndLow/Build/HighAndLow.loader.js",
    version: "1.0",
  },
  MoneyMath: {
    dataUrl: "/Games/MoneyMath/Build/MoneyMath.data",
    frameworkUrl: "/Games/MoneyMath/Build/MoneyMath.framework.js",
    codeUrl: "/Games/MoneyMath/Build/MoneyMath.wasm",
    loaderUrl: "/Games/MoneyMath/Build/MoneyMath.loader.js",
    version: "1.0",
  },
  MoneyManager: {
    dataUrl: "/Games/MoneyManager/Build/MoneyManager.data",
    frameworkUrl: "/Games/MoneyManager/Build/MoneyManager.framework.js",
    codeUrl: "/Games/MoneyManager/Build/MoneyManager.wasm",
    loaderUrl: "/Games/MoneyManager/Build/MoneyManager.loader.js",
    version: "1.0",
  },
  MoneySlide: {
    dataUrl: "/Games/MoneySlide/Build/MoneySlide.data",
    frameworkUrl: "/Games/MoneySlide/Build/MoneySlide.framework.js",
    codeUrl: "/Games/MoneySlide/Build/MoneySlide.wasm",
    loaderUrl: "/Games/MoneySlide/Build/MoneySlide.loader.js",
    version: "1.0",
  },
  NeedOrWant: {
    dataUrl: "/Games/NeedOrWant/Build/NeedOrWant.data",
    frameworkUrl: "/Games/NeedOrWant/Build/NeedOrWant.framework.js",
    codeUrl: "/Games/NeedOrWant/Build/NeedOrWant.wasm",
    loaderUrl: "/Games/NeedOrWant/Build/NeedOrWant.loader.js",
    version: "1.0",
  },
  // Ludo: {
  //   dataUrl: "/Games/Ludo/Build/Ludo.data",
  //   frameworkUrl: "/Games/Ludo/Build/Ludo.framework.js",
  //   codeUrl: "/Games/Ludo/Build/Ludo.wasm",
  //   loaderUrl: "/Games/Ludo/Build/Ludo.loader.js",
  //   version: "1.0",
  // },
};
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
export default function GamePage({ gamedata }) {
  const [progression, setProgression] = useState(0);
  const [unitycontext, setunitycontext] = useState(null);
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
  const [mode, setmode] = useState(gameid);

  const [info, setinfo] = useState({
    device: "computer",
    orientation: "desktop",
  });
  function handleOnClickFullscreen() {
    unitycontext.setFullscreen(true);
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
  useEffect(function () {
    if (!unitycontext) return;
    unitycontext.on("progress", function (progression) {
      setProgression(progression);
      console.log("progression", progression);
    });
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
    if (!errorshown && widthHeight.width < 860) {
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
        console.log("success");
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

  return (
    <div className={styles.gamePage}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          {widthHeight.width < 860 ? (
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
          ) : (
            unitycontext && (
              <Unity
                className={`${styles.gameMain} ${
                  removeBorder ? styles.removeborder : ""
                }`}
                unityContext={unitycontext}
                matchWebGLToCanvasSize={true}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ params, req }) {
  let gamedata = await GameApis.gamedata({ id: params.gameid });
  if (gamedata && gamedata.data && gamedata.data.data) {
    return { props: { gamedata: gamedata.data.data } };
  }
  return { props: { gamedata: null } };
}
