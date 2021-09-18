import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import QuizApis from "../../actions/apis/QuizApis";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Games/games.module.scss";
import Toast from "../../components/Toast";
import Unity, { UnityContext } from "react-unity-webgl";

function Game({ data, wrongPath }) {
  const gamecards = [
    {
      id: "dontoverspend",
      name: "Don't OverSpend",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ",
      img_url:
        "http://static.fmgsuite.com/media/images/935f4b87-0fa6-4d99-9a9c-9e25ca72a816.jpg",
    },
  ];
  const router = useRouter();
  const { gameid } = router.query;
  console.log(gameid);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [openFull, setopenFull] = useState(false);
  const unityContext = new UnityContext({
    dataUrl: "/Games/DontOverSpend/Build/Don't_Overspend.data",
    frameworkUrl: "/Games/DontOverSpend/Build/Don't_Overspend.framework.js",
    codeUrl: "/Games/DontOverSpend/Build/Don't_Overspend.wasm",
    loaderUrl: "/Games/DontOverSpend/Build/Don't_Overspend.loader.js",
  });

  if (gameid === "main") {
    return (
      <div
        className={`${styles.gamePage} ${openFull ? styles.hideOverFlow : ""}`}
      >
        <Header
          setOpenLeftPanel={setOpenLeftPanel}
          showauth={showauth}
          setshowauth={setshowauth}
        />
        <Toast data={toastdata} />
        <LeftPanel
          openLeftPanel={openLeftPanel}
          setOpenLeftPanel={setOpenLeftPanel}
        />
        <div className={styles.contentWrapper}>
          <div className={styles.gameCardsHolder}>
            <p className={styles.heading}>Available Games</p>
            {gamecards.map((item, index) => (
              <div className={styles.gameCard} key={"gamecard" + index}>
                <img src={item.img_url} alt="" />
                <div className={styles.text}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div
                  className={styles.button}
                  onClick={() => {
                    router.push(`/games/${item.id}`);
                  }}
                >
                  Start Game
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className={styles.gameFullPage}>
        {/* <p className={styles.heading}>Dont Over Spend</p> */}
        <Unity
          className={styles.gameMain}
          unityContext={unityContext}
          matchWebGLToCanvasSize={true}
        />
      </div>
    );
}

export default Game;
