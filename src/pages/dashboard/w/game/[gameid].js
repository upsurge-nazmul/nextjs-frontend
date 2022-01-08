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

export default function GamePage({ userdatafromserver }) {
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
    setTimeout(() => setremoveBorder(true), 10000);
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
                <div
                  className={styles.button}
                  onClick={() => router.push("/dashboard/w")}
                >
                  Go back
                </div>
              </div>

              {/* <Jasper className={styles.jasper} /> */}
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
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
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
