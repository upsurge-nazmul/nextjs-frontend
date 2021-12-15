import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
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
import { db } from "../../db";
import { Game_Unity_Data } from "../../static_data/Game_Data";

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
  const [removeBorder, setremoveBorder] = useState(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [error, seterror] = useState("");
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
      checkifcacheexist();
    }
    async function checkifcacheexist() {
      let xx = await db.games.where({ id: gameid }).toArray();
      let context = Game_Unity_Data[gameid];
      if (xx.length > 0) {
        if (xx[0].version !== context.version) {
          x();
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
      } else {
        x();
      }
      setunitycontext(new UnityContext(context));
    }
    async function x() {
      fetch(Game_Unity_Data[gameid].dataUrl, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          // Create blob link to download
          let xx = await db.games.where({ id: gameid }).toArray();
          if (xx.length > 0) {
            await db.games.update(gameid, {
              data: blob,
              version: Game_Unity_Data[gameid].version,
            });
          } else {
            await db.games.add({
              id: gameid,
              data: blob,
              version: Game_Unity_Data[gameid].version,
            });
          }
        });

      fetch(Game_Unity_Data[gameid].codeUrl, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          // Create blob link to download
          let xx = await db.games.where({ id: gameid }).toArray();
          if (xx.length > 0) {
            await db.games.update(gameid, {
              wasm: blob,
              version: Game_Unity_Data[gameid].version,
            });
          } else {
            await db.games.add({
              id: gameid,
              version: Game_Unity_Data[gameid].version,
              wasm: blob,
            });
          }
        });
      fetch(Game_Unity_Data[gameid].frameworkUrl, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          // Create blob link to download
          let xx = await db.games.where({ id: gameid }).toArray();
          if (xx.length > 0) {
            await db.games.update(gameid, {
              framework: blob,
              version: Game_Unity_Data[gameid].version,
            });
          } else {
            await db.games.add({
              id: gameid,
              framework: blob,
              version: Game_Unity_Data[gameid].version,
            });
          }
        });
      fetch(Game_Unity_Data[gameid].loaderUrl, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then(async (blob) => {
          // Create blob link to download
          let xx = await db.games.where({ id: gameid }).toArray();
          if (xx.length > 0) {
            await db.games.update(gameid, {
              loader: blob,
              version: Game_Unity_Data[gameid].version,
            });
          } else {
            await db.games.add({
              id: gameid,
              loader: blob,
              version: Game_Unity_Data[gameid].version,
            });
          }
        });
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
    if (phone && !validator.isMobilePhone(phone)) {
      seterror("Please enter valid phone number");
      return;
    }
    let res = await FreeGameApis.presign({
      playernickname: nickname,
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
    if (showgame) {
      setTimeout(() => setremoveBorder(true), 10000);
    }
  }, [showgame]);

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
              className={`${styles.gameMain} ${stickyheader && styles.sticky} ${
                removeBorder ? styles.removeborder : ""
              }`}
              unityContext={unitycontext}
              matchWebGLToCanvasSize={true}
            />
          )
        )}
      </div>
      <JoinUs />

      <Footer />
    </div>
  );
}
