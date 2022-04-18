import React, { useEffect } from "react";
import styles from "../../styles/MoneyAce/games.module.scss";
import { useRouter } from "next/dist/client/router";
import { Game_Data } from "../../static_data/Game_Data";
import BackSvg from "../SVGcomponents/MoneyAce/ui/BackSvg";
export default function MoneyAceGamesPage({ setcurrenttab, canvassize }) {
  useEffect(() => {
    const scrollContainer = document.querySelector("#wrapper");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY * 5;
    });
  }, []);
  const router = useRouter();
  return (
    <div className={styles.gamepage}>
      <div className={styles.wrapper} id="wrapper">
        {Object.keys(Game_Data).map((game) => {
          return (
            <div
              className={styles.game}
              key={game}
              onClick={() =>
                router.push(
                  "/dashboard/w/game/" + (Game_Data[game].changedId || game)
                )
              }
            >
              <p className={styles.name}>{Game_Data[game].name}</p>
              <p className={styles.des}>
                {Game_Data[game].description.length > 15
                  ? Game_Data[game].description.substring(0, 44) + "..."
                  : Game_Data[game].description}
              </p>
              <img
                src={Game_Data[game].img || "/images/games/" + game + ".jpg"}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <BackSvg
        className={styles.back}
        onClick={() => setcurrenttab("dashboard")}
      />
    </div>
  );
}
