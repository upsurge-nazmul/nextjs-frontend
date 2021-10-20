import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import BrokenGameConroller from "../../components/SVGcomponents/BrokenGameConroller";
import Jasper from "../../components/SVGcomponents/Jasper";
import styles from "../../styles/GamePage/gamepage.module.scss";

// streamingAssetsUrl: "StreamingAssets",
// companyName: "DefaultCompany",
// productName: "Don'tOverspend_Upsurge",
// productVersion: "1.0",
const data = {
  CoinSlide: {
    dataUrl: "/Games/CoinSlide/Build/CoinSlide.data",
    frameworkUrl: "/Games/CoinSlide/Build/CoinSlide.framework.js",
    codeUrl: "/Games/CoinSlide/Build/CoinSlide.wasm",
    loaderUrl: "/Games/CoinSlide/Build/CoinSlide.loader.js",
  },
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
    dataUrl: "/Games/MoneyManager/Build/MoneyManager.data",
    frameworkUrl: "/Games/MoneyManager/Build/MoneyManager.framework.js",
    codeUrl: "/Games/MoneyManager/Build/MoneyManager.wasm",
    loaderUrl: "/Games/MoneyManager/Build/MoneyManager.loader.js",
  },
  MoneySlide: {
    dataUrl: "/Games/MoneySlide/Build/MoneySlide.data",
    frameworkUrl: "/Games/MoneySlide/Build/MoneySlide.framework.js",
    codeUrl: "/Games/MoneySlide/Build/MoneySlide.wasm",
    loaderUrl: "/Games/MoneySlide/Build/MoneySlide.loader.js",
  },
  NeedOrWant: {
    dataUrl: "/Games/NeedOrWant/Build/NeedOrWant.data",
    frameworkUrl: "/Games/NeedOrWant/Build/NeedOrWant.framework.js",
    codeUrl: "/Games/NeedOrWant/Build/NeedOrWant.wasm",
    loaderUrl: "/Games/NeedOrWant/Build/NeedOrWant.loader.js",
  },
};

export default function GamePage() {
  const [progression, setProgression] = useState(0);
  const [unitycontext, setunitycontext] = useState(null);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [widthHeight, setwidthHeight] = useState({
    width: 1280,
    height: 720,
  });
  const [stickyheader, setstickyheader] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const router = useRouter();
  const [info, setinfo] = useState({
    device: "computer",
    orientation: "desktop",
  });
  const { gameid } = router.query;
  function handleOnClickFullscreen() {
    unitycontext.setFullscreen(true);
  }

  useEffect(() => {
    console.log(info);
  }, [info]);
  useEffect(() => {
    if (gameid) {
      console.log(gameid);
      setunitycontext(new UnityContext(data[gameid]));
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
        ) : (
          unitycontext && (
            <Unity
              className={`${styles.gameMain} ${stickyheader && styles.sticky}`}
              unityContext={unitycontext}
              matchWebGLToCanvasSize={true}
            />
          )
        )}
      </div>

      <Footer />
    </div>
  );
}
