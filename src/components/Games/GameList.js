import GameCard from "../Dashboard/GameCard";
import styles from "../../styles/WaitlistDashboard/gameList.module.scss";
import { Game_Data } from "../../static_data/Game_Data";

export default function GameList({
  data,
  handlegameclick = () => {},
  gameunicoinrewards = null,
}) {
  return (
    <div className={styles.wrapper}>
      {Object.keys(data).map((item, index) => {
        return (
          <GameCard
            onClick={() =>
              handlegameclick(
                item,
                Game_Data[item].pushto
                  ? Game_Data[item].pushto.split("/")[
                      Game_Data[item].pushto.split("/").length - 1
                    ]
                  : ""
              )
            }
            reward={
              gameunicoinrewards
                ? gameunicoinrewards.includes(item)
                  ? "Completed"
                  : 200
                : null
            }
            data={Game_Data[item]}
            key={"chorecomponent" + index}
          />
        );
      })}
    </div>
  );
}
