import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Toast from "../Toast";
import DashboardLeftPanel from "../Dashboard/DashboardLeftPanel";
import GameCard from "../Dashboard/GameCard";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import styles from "../../styles/Dashboard/games.module.scss";
import { MainContext } from "../../context/Main";
import { Game_Data, Simulator_Data } from "../../static_data/Game_Data";
import DashboardHeader from "../Dashboard/DashboardHeader";
import PageTitle from "../PageTitle";
import GameView from "./GameView";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import SubToPremiumPopUp from "../SubToPremiumPopUp";
import GameList from "./GameList";
import AvailableGames from "../DownloadGames/AvailableGames";

function Games({
  userdatafromserver = null,
  gameunicoinrewards = null,
  recentgames = null,
  accountType = "",
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const { userdata, setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Games");
  const [recent_games, setrecent_games] = useState(recentgames);
  const [showSubToPremium, setShowSubToPremium] = useState(false);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [openGame, setOpenGame] = useState("");
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);

  useEffect(() => {
    const scrollContainer1 = document.querySelector("#gamecardwrapper1");
    const scrollContainer2 = document.querySelector("#gamecardwrapper2");
    if (!scrollContainer1) return;
    if (!scrollContainer2) return;
    scrollContainer1.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer1.scrollLeft += evt.deltaY;
    });
    scrollContainer2.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer2.scrollLeft += evt.deltaY;
    });
    return () => {
      scrollContainer1.removeEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer1.scrollLeft += evt.deltaY;
      });
      scrollContainer2.removeEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer2.scrollLeft += evt.deltaY;
      });
    };
  }, []);

  async function updaterecentgames(gamearr) {
    let gamestring = "";
    for (let i = 0; i < gamearr.length; i++) {
      if (i !== gamearr.length - 1) {
        gamestring += gamearr[i] + ",";
      } else gamestring += gamearr[i];
    }
    FreeGameApis.updateRecentGames({ games: gamestring });
  }

  async function handlegameclick(
    title,
    pushto,
    webgl_key,
    premium_plan,
    userPlan,
    isSimulator = false
  ) {
    if (userPlan >= premium_plan) {
      console.log("Going forward");
      if (isSimulator) {
        return router.push(pushto);
      }
      if (recentgames.length > 0) {
        if (!recentgames.includes(title)) {
          if (recentgames.length === 3) {
            recentgames[2] = recentgames[1];
            recentgames[1] = recentgames[0];
            recentgames[0] = title;
          } else {
            recentgames.push(title);
          }
          setrecent_games(recentgames);
          updaterecentgames(recentgames);
        }
      } else {
        setrecent_games([title]);
        updaterecentgames([title]);
      }
      setOpenGame(pushto ? pushto : title);
      // setOpenGame(webgl_key);
    } else {
      setShowSubToPremium(true);
    }
  }

  return (
    <div className={styles.gamesPage}>
      <PageTitle title={`upsurge | Games`} />
      <DashboardLeftPanel type={accountType} />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          {/* <MoneyAceBanner type={accountType === "kid" ? "k" : "p"} /> */}
          {showSubToPremium && (
            <SubToPremiumPopUp setShowSubToPremium={setShowSubToPremium} />
          )}
          {recent_games && recent_games.length > 0 && (
            <div className={styles.recentSection}>
              <h2 className={styles.heading}>
                Recently Played <HeadingArrow />
              </h2>
              <div className={styles.wrapper} id="gamecardwrapper2">
                {recentgames.map((item, index) => {
                  return (
                    <GameCard
                      onClick={() =>
                        handlegameclick(
                          item,
                          Game_Data[item].pushto
                            ? Game_Data[item].pushto.split("/")[
                                Game_Data[item].pushto.split("/").length - 1
                              ]
                            : "",
                          Game_Data[item].webgl_key,
                          Game_Data[item].premium_plan,
                          userdata.premium_plan
                        )
                      }
                      data={Game_Data[item]}
                      key={"kidcomponent" + index}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div className={styles.availableSection}>
            <h2 className={styles.heading}>
              Online Games
              <HeadingArrow />
            </h2>
            <GameList
              data={Game_Data}
              handlegameclick={handlegameclick}
              gameunicoinrewards={gameunicoinrewards}
              userdata={userdata}
            />
          </div>
          <AvailableGames />
        </div>
      </div>
      {openGame ? <GameView game={openGame} setGame={setOpenGame} /> : ""}
      {/* {openGame ? <WebglView gameKey={openGame} setView={setOpenGame} /> : ""} */}
    </div>
  );
}

export default Games;
