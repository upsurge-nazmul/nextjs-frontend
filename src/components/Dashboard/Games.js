import { useState, useEffect, useContext, useRef } from "react";
import styles from "../../styles/Dashboard/dashboardGames.module.scss";
import { Game_Data } from "../../static_data/Game_Data";
// import GameCard from "./GameCard";
import GameCard from "../Games/GameCard";
import { MainContext } from "../../context/Main";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import GameView from "../Games/GameView";

export default function DashboardGames({
  title = "Games",
  gameunicoinrewards = null,
  recentgames = null,
  setShowSubToPremium = () => {},
  gameData = "default", // or 'recent_games'
}) {
  const gamesRef = useRef(null);
  const { userdata } = useContext(MainContext);
  const [data, setData] = useState();
  const [openGame, setOpenGame] = useState("");

  useEffect(() => {
    if (gameData === "recent_games") {
      setData(recentgames);
    } else setData(Game_Data);
  }, []);

  useEffect(() => {
    if (gamesRef?.current) {
      const container = gamesRef.current;

      container.addEventListener("wheel", (event) => {
        event.preventDefault();

        const scrollAmountX = event.deltaX;
        const scrollDirectionX = Math.sign(scrollAmountX);

        container.scrollLeft += scrollDirectionX * 50;

        const scrollAmountY = event.deltaY;
        const scrollDirectionY = Math.sign(scrollAmountY);

        container.scrollLeft += scrollDirectionY * 50;
      });
    }
  }, [gamesRef]);

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
          // setrecent_games(recentgames);
          updaterecentgames(recentgames);
        }
      } else {
        // setrecent_games([title]);
        updaterecentgames([title]);
      }
      setOpenGame(pushto ? pushto : title);
      // setOpenGame(webgl_key);
    } else {
      setShowSubToPremium(true);
    }
  }

  return (
    <div className={styles.dashboardGames}>
      <h2 className={styles.mainheading} onClick={() => {}}>
        {title}
        <HeadingArrow />
      </h2>
      <div className={styles.container} ref={gamesRef}>
        {data ? (
          <>
            {Array.isArray(data)
              ? data.map((item, index) => (
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
                    key={"game_array" + index}
                  />
                ))
              : Object.keys(data).map((item, index) => {
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
                          userdata?.premium_plan
                        )
                      }
                      reward={
                        gameunicoinrewards
                          ? gameunicoinrewards.includes(item)
                            ? "Completed"
                            : 1500
                          : null
                      }
                      data={Game_Data[item]}
                      key={"games" + index}
                    />
                  );
                })}
          </>
        ) : (
          <></>
        )}
      </div>
      {openGame ? <GameView game={openGame} setGame={setOpenGame} /> : ""}
      {/* {openGame ? <WebglView gameKey={openGame} setView={setOpenGame} /> : ""} */}
    </div>
  );
}
