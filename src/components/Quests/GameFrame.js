import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Main";
import { db } from "../../db";
import styles from "../../styles/Quest/gameframe.module.scss";
import { scrollParentToChild } from "../../helpers/domHelpers";
import Unity, { UnityContext } from "react-unity-webgl";
import Spinner from "../Spinner";
import BrokenGameConroller from "../SVGcomponents/BrokenGameConroller";
import { useRouter } from "next/dist/client/router";
export default function GameFrame({ gamedata, setmode }) {
  const [progression, setProgression] = useState(0);
  const [removeBorder, setremoveBorder] = useState(false);
  const [unitycontext, setunitycontext] = useState(null);
  const { widthHeight, setwidthHeight } = useContext(MainContext);
  const router = useRouter();
  useEffect(() => {
    if (!gamedata) return;
    checkifcacheexist();
    async function checkifcacheexist() {
      let xx = await db.games.where("id").equals("NeedOrWant").toArray();
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
        id: "NeedOrWant",
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
        .equals("NeedOrWant")
        .toArray();
      if (previos_game_data.length > 0) {
        console.log("updating game in indexedDb");
        await db.games.update("NeedOrWant", updateData);
      } else {
        console.log("adding game in indexedDb");

        try {
          await db.games.add(updateData);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (!unitycontext) return;
    let parent = document.getElementById("quest-main");
    let child = document.getElementById("unity-wrapper");
    if (parent && child) {
      scrollParentToChild(parent, child, 0);
    }
  }, [unitycontext]);
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
        setmode("map");
      });
    },
    [unitycontext]
  );
  useEffect(() => {
    if (progression === 1) {
      setremoveBorder(true);
    }
  }, [progression]);
  return (
    <div
      className={`${styles.gameWrapper} ${
        widthHeight.width <= 860 && styles.mobilewrapper
      }`}
      id="unity-wrapper"
    >
      {/*  */}
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
      {widthHeight.width < 860 && widthHeight.height > widthHeight.width ? (
        <div className={styles.mobileerr}>
          <div className={styles.box}>
            <BrokenGameConroller className={styles.jasper} />
            <p className={styles.heading}>Please switch to landscape mode</p>
            <p>{`This game only playable in landscape mode.`}</p>
            <div className={styles.button} onClick={() => router.push("/")}>
              Go back
            </div>
          </div>

          {/* <Jasper className={styles.jasper} /> */}
        </div>
      ) : gamedata && unitycontext ? (
        <Unity
          className={`${styles.gameMain}  ${
            removeBorder ? styles.removeborder : ""
          }`}
          id="unity-game"
          style={
            widthHeight.width > 860
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
  );
}
