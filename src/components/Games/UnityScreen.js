import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from "../../styles/Games/gameView.module.scss";
import GameLoading from "./GameLoading";

export default function UnityScreen({ data }) {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: data.loaderUrl,
    dataUrl: data.dataUrl,
    frameworkUrl: data.frameworkUrl,
    codeUrl: data.codeUrl,
  });

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        className={isLoaded ? styles.gameScreen : styles.hidden}
      />
      <div className={!isLoaded ? styles.loadingArea : styles.hidden}>
        <GameLoading percentage={loadingProgression} />
      </div>
    </>
  );
}
