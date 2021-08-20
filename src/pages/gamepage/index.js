import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";
const unityContext = new UnityContext({
  loaderUrl: "../../Games/DontOverSpend/Build/Don't_Overspend.loader.js",
  dataUrl: "../../Games/DontOverSpend/Build/Don't_Overspend.data.br",
  frameworkUrl:
    "../../Games/DontOverSpend/Build/Don't_Overspend.framework.js.br",
  codeUrl: "../../Games/DontOverSpend/Build/Don't_Overspend.wasm.br",
});

// streamingAssetsUrl: "StreamingAssets",
// companyName: "DefaultCompany",
// productName: "Don'tOverspend_Upsurge",
// productVersion: "1.0",

function index() {
  return (
    <div>
      <Unity unityContext={unityContext} />;
    </div>
  );
}

export default index;
