import React, { useContext } from "react";
import styles from "../../styles/MoneyAce/moneyacetask.module.scss";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useRouter } from "next/dist/client/router";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GameApis from "../../actions/apis/GameApis";
import FreeGameApis from "../../actions/apis/FreeGameApis";
import { MainContext } from "../../context/Main";
import { getCookie } from "../../actions/cookieUtils";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
export default function MoneyAceTask({
  data,
  index,
  setstage,
  setgamedata,
  setcurrenttab,
  moneyacedata,
  settaskmodal,
  setquiz,
  setcurrenttask,
  settasks,
  currenttask,
  settoastdata,
}) {
  const router = useRouter();
  const { userdata } = useContext(MainContext);
  async function handlegamepush(gameid) {
    let gamedata = await GameApis.gamedata({ id: gameid });
    if (gamedata && gamedata.data && gamedata.data.data) {
      console.log(gamedata.data.data);
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
  async function completetask() {
    let res = await MoneyAceApis.completetask({ id: data.id });
    if (res && res.data && res.data.success) {
      settasks((prev) => prev.filter((item) => item.id !== currenttask));
      setcurrenttab("xx");
      setcurrenttab("dashboard");
    } else {
      seterror(res?.data?.message || "Error connecting to server");
    }
  }
  return (
    <div className={styles.task}>
      <div className={styles.main}>
        <img
          src={
            data.bg ||
            "https://media.istockphoto.com/photos/powerful-personal-computer-gamer-rig-with-firstperson-shooter-game-on-picture-id1157159213?k=20&m=1157159213&s=612x612&w=0&h=oYVqFen_st-jxHXy3KzZXmbaQlDwo06HJmbZDZJO7KE="
          }
          alt=""
        />
        <div className={styles.text}>
          <p className={styles.name}>{data.name}</p>
          <p className={styles.des}>
            {data.description
              ? data.description.length > 32
                ? data.description.substring(0, 32) + "..."
                : data.description
              : "Complete " + data.name + " task and get rewards."}
          </p>
        </div>
        <div
          className={styles.btn}
          onClick={() => {
            setcurrenttask(data.id);
            if (data.id === "task-08") {
              // Check Bank Account
              completetask();
              return;
            }
            if (data.id === "task-15") {
              // Make UPI & Debit Card
              if (!moneyacedata.is_upi_claim) {
                setcurrenttab("upi");
              } else {
                setcurrenttab("Bank");
              }
              return;
            }
            if (data.id === "task-25") {
              // Fishing Game
              if (!moneyacedata.fishing_course) {
                settoastdata({
                  show: true,
                  msg: "Fishing Course is required",
                  type: "error",
                });
              } else {
                handlegamepush(data.action_id);
              }
              return;
            }
            if (data.id === "task-30") {
              // Pizza Delivery
              if (!moneyacedata.driving_course) {
                settoastdata({
                  show: true,
                  msg: "Driving Course is required",
                  type: "error",
                });
              } else {
                handlegamepush(data.action_id);
              }
              return;
            }

            if (data.action === "game") {
              handlegamepush(data.action_id);
            } else if (data.action === "bank") {
              setcurrenttab("Bank");
            } else if (data.action === "investment") {
              if (!moneyacedata.investing_course) {
                settoastdata({
                  show: true,
                  msg: "Investing Course is required",
                  type: "error",
                });
              }
              setcurrenttab("investmenthub");
            } else if (data.action === "shop") {
              setcurrenttab("store");
            } else if (data.action === "modal") {
              settaskmodal(data);
            } else if (data.action === "quiz") {
              setquiz(data.action_id);
            } else {
              alert("wip..");
            }
          }}
        >
          <div className={styles.btnInside}>START</div>
        </div>
        {/* <div className={styles.right}>
          <PlayArrowRoundedIcon className={styles.playicon} />
        </div> */}
      </div>
    </div>
  );
}
