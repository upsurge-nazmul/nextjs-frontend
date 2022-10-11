import { useEffect, useState, useRef } from "react";
import styles from "../../styles/Games/gameView.module.scss";
import { isMobile } from "react-device-detect";
import BrokenGame from "../Games/BrokenGame";
import Unity, { UnityContext } from "react-unity-webgl";
import GameApis from "../../actions/apis/GameApis";
import { db } from "../../db";
import FullScreen from "../SVGcomponents/FullScreen";
import FullScreenExit from "../SVGcomponents/FullScreenExit";

export default function GameView({ game, setGame }) {
  const [unityContext, setUnityContext] = useState(null);
  const [gameData, setGameData] = useState();
  const [fullScreen, setFullScreen] = useState(false);
  const unityref = useRef(unityContext);

  useEffect(() => {
    if (document) {
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
        setFullScreen(true);
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

  return (
    <div className={styles.gameView}>
      {isMobile ? (
        <BrokenGame goBackTo={"/k/games"} />
      ) : gameData && unityContext ? (
        <Unity
          ref={unityref}
          unityContext={unityContext}
          matchWebGLToCanvasSize={true}
          className={styles.gameScreen}
        />
      ) : (
        <div className={styles.noGame}>
          <p className={styles.noGameText}>No Game Found!</p>
        </div>
      )}
      <div className={styles.actionArea}>
        <button
          className={styles.fullScreenButton}
          onClick={() => {
            setFullScreen(false);
            document.exitFullscreen();
            setGame();
          }}
        >
          {fullScreen ? <FullScreenExit /> : <FullScreen />}
        </button>
      </div>
    </div>
  );
}
