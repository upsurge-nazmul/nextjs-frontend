import React, { useContext } from "react";
import styles from "../../styles/MoneyAce/moneyacetask.module.scss";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useRouter } from "next/dist/client/router";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GameApis from "../../actions/apis/GameApis";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import { MainContext } from "../../context/Main";
import { getCookie } from "../../actions/cookieUtils";
export default function MoneyAceTask({
  data,
  index,
  setstage,
  setgamedata,
  setcurrenttab,
}) {
  const router = useRouter();
  const { userdata } = useContext(MainContext);
  async function handlegamepush(gameid) {
    let gamedata = await GameApis.gamedata({ id: gameid });
    if (gamedata && gamedata.data && gamedata.data.data) {
      setgamedata(gamedata.data.data);
      let res = await FreeGameApis.presign({
        user_name:
          userdata.user_name || userdata.first_name || userdata.last_name,
        email: userdata.email,
        phone: userdata.phone,
        token: getCookie("accesstoken"),
        game: gameid,
        postlogin: true,
      });
      if (res) {
        if (res.data.success) {
          router.push(
            {
              pathname:
                "/dashboard/" +
                (userdata.is_waiting_active
                  ? "w"
                  : userdata.user_type === "kid"
                  ? "k"
                  : "p") +
                "/moneyace",
              query: { id: res.data.data },
            },
            undefined,
            { shallow: true }
          );
        } else {
          console.log(res.data.message);
        }
      } else {
        console.log("error connecting server");
      }
      setstage("game");
    }
  }
  return (
    <div className={styles.task}>
      <div className={styles.bg}>
        <div className={styles.innerbg}></div>
      </div>

      <p className={styles.num}>
        {index + 1 < 10 ? "0" + (index + 1) : index + 1}
      </p>
      <div className={styles.prallelogram}>
        <img src={data.image} alt="" />
        <div className={styles.text}>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.des}>
            {data.description.length > 32
              ? data.description.substring(0, 32) + "..."
              : data.description}
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <PlayArrowRoundedIcon
          className={styles.playicon}
          onClick={() => {
            if (data.type === "game") {
              handlegamepush(data.link_id);
            } else {
              setcurrenttab(data.link_id);
            }
          }}
        />
      </div>
    </div>
  );
}
