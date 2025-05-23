import { useEffect, useRef, useState, useContext } from "react";
import styles from "../../styles/Games/gameViewOld.module.scss";
import { isMobileOnly } from "react-device-detect";
import Unity, { UnityContext } from "react-unity-webgl";
import GameApis from "../../actions/apis/GameApis";
import { db } from "../../db";
import GameLoading from "./GameLoading";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import { CircularProgress } from "@mui/material";
import ActionArea from "./ActionArea";
import { useRouter } from "next/router";
import { MainContext } from "../../context/Main";

export default function GameView({
  chapterId,
  game,
  setGame,
  externalId = null,
  handleDone = null,
}) {
  const gameRef = useRef();
  const router = useRouter();
  const [unityContext, setUnityContext] = useState(null);
  const [gameData, setGameData] = useState();
  const [fullScreen, setFullScreen] = useState(false);
  const [progression, setProgression] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userdata } = useContext(MainContext);
  useEffect(() => {
    if (gameRef && gameRef.current) {
      if (gameRef.current.requestFullscreen) {
        gameRef.current.requestFullscreen();
        setFullScreen(true);
        if (isMobileOnly) {
          if (window.screen.orientation.lock) {
            window.screen.orientation
              .lock("landscape")
              .then(() => console.log("orientaion landscape"))
              .catch((e) => console.log(e.message));
          } else {
            console.log("Screen rotation is not supported");
          }
        }
      }
      if (gameRef.current.webkitRequestFullScreen)
        gameRef.current.webkitRequestFullScreen();
    }
  }, [gameRef]);

  useEffect(() => {
    async function fetchGameData() {
      setLoading(true);
      let res = await GameApis.gamedata({ id: game });
      if (res && res.data && res.data.data) {
        setGameData(res.data.data);
      }
      setLoading(false);
    }
    fetchGameData();
  }, []);

  useEffect(() => {
    if (!gameData) {
      return null;
    }
    if (game) {
      checkifcacheexist();
    }
    async function checkifcacheexist() {
      let xx = await db.games.where("id").equals(game).toArray();
      let context = gameData;
      if (xx.length > 0) {
        if (xx[0].version !== context.version) {
          x();
          setUnityContext(new UnityContext(context));
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
        setUnityContext(new UnityContext(context));
      } else {
        x();
        setUnityContext(new UnityContext(context));
      }
    }
    async function x() {
      try {
        if (!gameData) {
          return;
        }
        let updateData = {
          version: gameData.version,
          id: game,
        };
        console.log("downloading data");
        let datares = await fetch(gameData?.dataUrl, {
          method: "GET",
        });
        let datablob = await datares.blob();
        updateData.data = datablob;
        console.log("downloading code");
        let coderes = await fetch(gameData?.codeUrl, {
          method: "GET",
        });
        let codeblob = await coderes.blob();
        updateData.wasm = codeblob;
        console.log("downloading framework");
        let frameworkres = await fetch(gameData?.frameworkUrl, {
          method: "GET",
        });
        let frameworkblob = await frameworkres.blob();
        updateData.framework = frameworkblob;
        console.log("downloading loader");
        let loaderres = await fetch(gameData?.loaderUrl, {
          method: "GET",
        });
        let loaderblob = await loaderres.blob();
        updateData.loader = loaderblob;

        let previos_game_data = await db.games
          .where("id")
          .equals(game)
          .toArray();
        if (previos_game_data.length > 0) {
          console.log("updating game in indexedDb");
          await db.games.update(game, updateData);
        } else {
          console.log("adding game in indexedDb");

          try {
            await db.games.add(updateData);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [gameData]);

  useEffect(
    function () {
      if (!unityContext) return;
      unityContext.on("Exit", function () {
        router.push("/dashboard/k/games");
      });
      unityContext.on("progress", function (progress) {
        console.log("progress", progress);
        setProgression(progress);

        unityContext.on("OnSeceneLoaded", function () {
          unityContext.send("Game Data", "SetUserID", userdata?.id);
        });
      });
      unityContext.on("Error", function (code, url, vendor) {
        console.log("code url vendor", code, url, vendor);
        router.push("/dashboard/k/games");
      });
      unityContext.on("error", function (message) {
        console.log("error", message);
      });
      unityContext.on("Score", async function (score) {
        let res = await GameApis.unicoinreward({ gameId: game });
        if (res?.data?.success) {
          console.log("Score success rewards alloted");
        } else {
          console.log(res?.data?.message || "");
        }
      });
    },
    [unityContext]
  );

  useEffect(() => {
    if (externalId) {
      checktoken();
    }
    async function checktoken() {
      let res = await FreeGameApis.usertoken({
        game_token: externalId,
      });
      if (res && res.data.success) {
        console.log("verified id: ", externalId);
      } else {
        alert("Id not valid");
      }
    }
  }, [externalId]);

  return (
    <div className={styles.gameView} ref={gameRef}>
      {loading ? (
        <div className={styles.loadingScreen}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {
            // isMobileOnly ? (
            //   <BrokenGame />
            // ) :
            gameData && unityContext ? (
              <Unity
                unityContext={unityContext}
                matchWebGLToCanvasSize={true}
                className={
                  progression === 1
                    ? styles.gameScreen
                    : styles.hiddenGameScreen
                }
              />
            ) : (
              <div className={styles.noGame}>
                <p className={styles.noGameText}>No Game Found!</p>
              </div>
            )
          }
          {progression > 0 && progression < 1 ? (
            <div className={styles.loadingArea}>
              <GameLoading percentage={progression} />
            </div>
          ) : (
            ""
          )}
        </>
      )}
      {!loading && (
        <ActionArea
          onClose={() => {
            setFullScreen(false);
            document.exitFullscreen();
            mixpanel.track("Game Closed", { event: `Game closed` });
            setGame();
            setUnityContext(null);
          }}
          onDone={() => {
            handleDone();
            mixpanel.track("Knowledge Quest", {
              event: `Quest Finished ${chapterId}`,
            });
            setFullScreen(false);
            document.exitFullscreen();
            setGame();
          }}
          fullScreen={fullScreen}
          showDone={handleDone}
        />
      )}
    </div>
  );
}
