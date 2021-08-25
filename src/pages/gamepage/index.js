import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import styles from "../../styles/GamePage/gamepage.module.scss";
const unityContext = new UnityContext({
  dataUrl: "/Games/DontOverSpend/Build/Don't_Overspend.data",
  frameworkUrl: "/Games/DontOverSpend/Build/Don't_Overspend.framework.js",
  codeUrl: "/Games/DontOverSpend/Build/Don't_Overspend.wasm",
  loaderUrl: "/Games/DontOverSpend/Build/Don't_Overspend.loader.js",
});

// streamingAssetsUrl: "StreamingAssets",
// companyName: "DefaultCompany",
// productName: "Don'tOverspend_Upsurge",
// productVersion: "1.0",

function index() {
  const [progression, setProgression] = useState(0);

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
      console.log(progression);
    });
  }, []);
  return (
    <div className={styles.gamePage}>
      {/* <p className={styles.heading}>Dont Over Spend</p> */}
      <Unity
        className={styles.gameMain}
        unityContext={unityContext}
        matchWebGLToCanvasSize={true}
      />
    </div>
  );
}

export default index;
