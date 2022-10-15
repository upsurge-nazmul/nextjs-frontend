import { useEffect, useState, useRef } from "react";
import styles from "../../styles/Games/gameView.module.scss";
import { isMobileOnly } from "react-device-detect";
import BrokenGame from "../Games/BrokenGame";
import Unity, { UnityContext } from "react-unity-webgl";
import GameApis from "../../actions/apis/GameApis";
import { db } from "../../db";
import FullScreen from "../SVGcomponents/FullScreen";
import FullScreenExit from "../SVGcomponents/FullScreenExit";
import GameLoading from "./GameLoading";
import FreeGameApis from "../../actions/apis/FreeGameApis";

export default function GameView({
  game,
  setGame,
  externalId = null,
  handleDone = null,
}) {
  const [unityContext, setUnityContext] = useState(null);
  const [gameData, setGameData] = useState();
  const [fullScreen, setFullScreen] = useState(false);
  const [progression, setProgression] = useState(0);
  const unityref = useRef(unityContext);

  useEffect(() => {
    if (!isMobileOnly) {
      if (document) {
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen();
          setFullScreen(true);
        }
      }
    }
  }, []);

  useEffect(() => {
    async function fetchGameData() {
      let res = await GameApis.gamedata({ id: game });
      if (res && res.data && res.data.data) {
        setGameData(res.data.data);
      }
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

      let previos_game_data = await db.games.where("id").equals(game).toArray();
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
    <div className={styles.gameView}>
      {isMobileOnly ? (
        <BrokenGame />
      ) : gameData && unityContext ? (
        <Unity
          ref={unityref}
          unityContext={unityContext}
          matchWebGLToCanvasSize={true}
          className={
            progression === 1 ? styles.gameScreen : styles.hiddenGameScreen
          }
        />
      ) : (
        <div className={styles.noGame}>
          <p className={styles.noGameText}>No Game Found!</p>
        </div>
      )}
      {progression > 0 && progression < 1 ? (
        <div className={styles.loadingArea}>
          <GameLoading percentage={progression} />
        </div>
      ) : (
        ""
      )}
      <div className={styles.actionArea}>
        {handleDone ? (
          <button
            className={styles.doneButton}
            onClick={() => {
              handleDone();
              setFullScreen(false);
              if (!isMobileOnly) document.exitFullscreen();
              setGame();
            }}
          >
            Done
          </button>
        ) : (
          ""
        )}
        <button
          className={styles.fullScreenButton}
          onClick={() => {
            setFullScreen(false);
            if (!isMobileOnly) document.exitFullscreen();
            setGame();
          }}
        >
          {fullScreen ? <span>X</span> : <FullScreen />}
        </button>
      </div>
    </div>
  );
}
