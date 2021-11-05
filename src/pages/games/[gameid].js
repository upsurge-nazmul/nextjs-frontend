import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import GameApis from "../../actions/apis/GameApis";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import BrokenGameConroller from "../../components/SVGcomponents/BrokenGameConroller";
import Jasper from "../../components/SVGcomponents/Jasper";
import styles from "../../styles/GamePage/gamepage.module.scss";

// streamingAssetsUrl: "StreamingAssets",
// companyName: "DefaultCompany",
// productName: "Don'tOverspend_Upsurge",
// productVersion: "1.0",
const data = {
  CoinSlide: {
    dataUrl: "/Games/CoinSlide/Build/CoinSlide.data",
    frameworkUrl: "/Games/CoinSlide/Build/CoinSlide.framework.js",
    codeUrl: "/Games/CoinSlide/Build/CoinSlide.wasm",
    loaderUrl: "/Games/CoinSlide/Build/CoinSlide.loader.js",
  },
  ShoppingBudget: {
    dataUrl: "/Games/DontOverSpend/Build/Don't_Overspend.data",
    frameworkUrl: "/Games/DontOverSpend/Build/Don't_Overspend.framework.js",
    codeUrl: "/Games/DontOverSpend/Build/Don't_Overspend.wasm",
    loaderUrl: "/Games/DontOverSpend/Build/Don't_Overspend.loader.js",
  },
  BalanceBuilder: {
    dataUrl: "/Games/BalanceBuilder/Build/BalanceBuilder.data",
    frameworkUrl: "/Games/BalanceBuilder/Build/BalanceBuilder.framework.js",
    codeUrl: "/Games/BalanceBuilder/Build/BalanceBuilder.wasm",
    loaderUrl: "/Games/BalanceBuilder/Build/BalanceBuilder.loader.js",
  },
  HighAndLow: {
    dataUrl: "/Games/HighAndLow/Build/HighAndLow.data",
    frameworkUrl: "/Games/HighAndLow/Build/HighAndLow.framework.js",
    codeUrl: "/Games/HighAndLow/Build/HighAndLow.wasm",
    loaderUrl: "/Games/HighAndLow/Build/HighAndLow.loader.js",
  },
  MoneyMath: {
    dataUrl: "/Games/MoneyMath/Build/MoneyMath.data",
    frameworkUrl: "/Games/MoneyMath/Build/MoneyMath.framework.js",
    codeUrl: "/Games/MoneyMath/Build/MoneyMath.wasm",
    loaderUrl: "/Games/MoneyMath/Build/MoneyMath.loader.js",
  },
  MoneyManager: {
    dataUrl: "/Games/MoneyManager/Build/MoneyManager.data",
    frameworkUrl: "/Games/MoneyManager/Build/MoneyManager.framework.js",
    codeUrl: "/Games/MoneyManager/Build/MoneyManager.wasm",
    loaderUrl: "/Games/MoneyManager/Build/MoneyManager.loader.js",
  },
  MoneySlide: {
    dataUrl: "/Games/MoneySlide/Build/MoneySlide.data",
    frameworkUrl: "/Games/MoneySlide/Build/MoneySlide.framework.js",
    codeUrl: "/Games/MoneySlide/Build/MoneySlide.wasm",
    loaderUrl: "/Games/MoneySlide/Build/MoneySlide.loader.js",
  },
  NeedOrWant: {
    dataUrl: "/Games/NeedOrWant/Build/NeedOrWant.data",
    frameworkUrl: "/Games/NeedOrWant/Build/NeedOrWant.framework.js",
    codeUrl: "/Games/NeedOrWant/Build/NeedOrWant.wasm",
    loaderUrl: "/Games/NeedOrWant/Build/NeedOrWant.loader.js",
  },
};

export default function GamePage() {
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
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [nickname, setnickname] = useState("");
  const router = useRouter();
  const [info, setinfo] = useState({
    device: "computer",
    orientation: "desktop",
  });
  const { gameid, id } = router.query;
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
      console.log(gameid);
      setunitycontext(new UnityContext(data[gameid]));
    }
  }, [gameid]);
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
      console.log(progression);
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
  async function startgame() {
    if (!name) {
      alert("Name is required");
      return;
    }
    if (!email) {
      alert("Email is required");
    }
    let res = await FreeGameApis.presign({
      playernickname: nickname,
      playername: name,
      playeremail: email,
      number: phone,
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

  return (
    <div className={styles.gamePage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={widthHeight.width > 860 ? stickyheader : false}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.gameWrapper}>
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

            {/* <Jasper className={styles.jasper} /> */}
          </div>
        ) : !showgame ? (
          <div className={styles.gamedata}>
            <div className={styles.left}>
              <p className={styles.heading}>We need a few more details</p>
              <input
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                className={styles.input}
                value={nickname}
                onChange={(e) => setnickname(e.target.value)}
                placeholder="Nickname"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className={styles.input}
                placeholder="Email"
              />
              <input
                value={phone}
                type="text"
                onChange={(e) => setphone(e.target.value)}
                className={styles.input}
                placeholder="Phone (optional)"
              />
              <div className={styles.buttons}>
                <div className={styles.startbutton} onClick={startgame}>
                  Start Playing
                </div>
                {!gamesWithAuth.includes(gameid) && (
                  <div
                    className={styles.skipbutton}
                    onClick={() => setshowgame(true)}
                  >
                    Skip
                  </div>
                )}
              </div>
            </div>
            <div className={styles.right}>
              <img src="https://i.ibb.co/yV2H2FY/Artboard-1-1.png" alt="" />
            </div>
          </div>
        ) : (
          unitycontext && (
            <Unity
              className={`${styles.gameMain} ${stickyheader && styles.sticky}`}
              unityContext={unitycontext}
              matchWebGLToCanvasSize={true}
            />
          )
        )}
      </div>

      <Footer />
    </div>
  );
}
