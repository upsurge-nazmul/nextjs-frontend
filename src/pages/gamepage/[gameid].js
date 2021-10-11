import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/GamePage/gamepage.module.scss";

// streamingAssetsUrl: "StreamingAssets",
// companyName: "DefaultCompany",
// productName: "Don'tOverspend_Upsurge",
// productVersion: "1.0",
const data = {
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
    dataUrl: "/Games/SavingShuffle/Build/SavingShuffle.data",
    frameworkUrl: "/Games/SavingShuffle/Build/SavingShuffle.framework.js",
    codeUrl: "/Games/SavingShuffle/Build/SavingShuffle.wasm",
    loaderUrl: "/Games/SavingShuffle/Build/SavingShuffle.loader.js",
  },
};

export default function GamePage() {
  const [progression, setProgression] = useState(0);
  const [unitycontext, setunitycontext] = useState(null);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const router = useRouter();
  const { gameid } = router.query;
  useEffect(() => {
    if (gameid) {
      console.log(gameid);
      setunitycontext(new UnityContext(data[gameid]));
    }
  }, [gameid]);
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
  return (
    <div className={styles.gamePage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      {unitycontext && (
        <Unity
          className={styles.gameMain}
          unityContext={unitycontext}
          matchWebGLToCanvasSize={true}
        />
      )}
      <Footer />
    </div>
  );
}
