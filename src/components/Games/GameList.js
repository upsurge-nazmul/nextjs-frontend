import GameCard from "./GameCard";
// import GameCard from "../Dashboard/GameCard";
import styles from "../../styles/Dashboard/gameList.module.scss";
import { Game_Data } from "../../static_data/Game_Data";

export default function GameList({
  data,
  handlegameclick = () => {},
  userdata = null,
}) {
  return (
    <div className={styles.wrapper}>
      {Array.isArray(data)
        ? data.map((item, index) => (
            <GameCard
              onClick={() =>
                // handlegameclick(
                //   item,
                //   item.pushto
                //     ? item.pushto.split("/")[item.pushto.split("/").length - 1]
                //     : "",
                //   item.webgl_key,
                //   item.premium_plan,
                //   userdata.premium_plan
                // )
                handlegameclick(item)
              }
              data={item}
              key={"game_array" + index}
            />
          ))
        : Object.keys(data).map((item, index) => (
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
              data={Game_Data[item]}
              key={"games" + index}
            />
          ))}
    </div>
  );
}
