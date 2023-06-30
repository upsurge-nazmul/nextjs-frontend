import GameCard from "../Dashboard/GameCard";
import styles from "../../styles/WaitlistDashboard/gameList.module.scss";
import { Game_Data } from "../../static_data/Game_Data";

export default function GameList({
  data,
  handlegameclick = () => {},
  gameunicoinrewards = null,
  userdata = null,
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
            key={"chorecomponent" + index}
          />
        );
      })}
    </div>
  );
}
