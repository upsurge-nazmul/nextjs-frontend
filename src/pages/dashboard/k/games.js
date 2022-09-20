import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../components/Toast";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/WaitlistDashboard/games.module.scss";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../context/Main";
import LoginApis from "../../../actions/apis/LoginApis";
import FreeGameApis from "../../../actions/apis/FreeGameApis";
import { Game_Data, Simulator_Data } from "../../../static_data/Game_Data";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import MoneyAceBanner from "../../../components/Dashboard/MoneyAceBanner";
import GameApis from "../../../actions/apis/GameApis";
import PageTitle from "../../../components/PageTitle";
function Games({ userdatafromserver, token, gameunicoinrewards, recentgames }) {
  console.log(recentgames);
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Games");
  const [recent_games, setrecent_games] = useState(recentgames);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
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
  async function handlegameclick(title, pushto, isSimulator) {
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

    if (title === "Ludo") {
      let res = await FreeGameApis.presign({
        user_name:
          userdatafromserver.user_name ||
          userdatafromserver.first_name ||
          userdatafromserver.last_name,
        email: userdatafromserver.email,
        phone: userdatafromserver.phone,
        token: token,
        game: title,
        postlogin: true,
      });
      if (res) {
        if (res.data.success) {
          router.push({
            pathname: "/dashboard/k/game/" + (pushto ? pushto : title),
            query: { id: res.data.data },
          });
        } else {
          console.log(res.data.message);
        }
      } else {
        console.log("error connecting server");
      }
    } else {
      router.push("/dashboard/k/game/" + (pushto ? pushto : title));
    }
  }
  return (
    <div className={styles.gamesPage}>
      <PageTitle />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <MoneyAceBanner type="k" />
            {recent_games.length > 0 && (
              <div className={styles.recentSection}>
                <h2 className={styles.heading}>Recently Played</h2>
                <div className={styles.wrapper} id="gamecardwrapper2">
                  {recentgames.map((item, index) => {
                    return (
                      <GameCard
                        onCLick={() =>
                          handlegameclick(
                            item,
                            Game_Data[item].pushto
                              ? Game_Data[item].pushto.split("/")[
                                  Game_Data[item].pushto.split("/").length - 1
                                ]
                              : ""
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
            {/* <div className={styles.availableSection}>
              <h2 className={styles.heading}>
                Simulators
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {Object.keys(Simulator_Data).map((item, index) => {
                  return (
                    <GameCard
                      onCLick={() =>
                        handlegameclick(item, Simulator_Data[item].pushto, true)
                      }
                      data={Simulator_Data[item]}
                      key={"chorecomponent" + index}
                    />
                  );
                })}
              </div>
            </div> */}
            <div className={styles.availableSection}>
              <h2 className={styles.heading}>
                Available Games
                <HeadingArrow />
              </h2>
              <div className={styles.wrapper}>
                {Object.keys(Game_Data).map((item, index) => {
                  return (
                    <GameCard
                      onCLick={() =>
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
                        gameunicoinrewards.includes(item) ? "Completed" : 200
                      }
                      data={Game_Data[item]}
                      key={"chorecomponent" + index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let recentgames = await FreeGameApis.getrecentGames(null, token);
      let gameunicoinrewards = await GameApis.getgameunicoinrewards(
        null,
        token
      );
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          token: token,
          gameunicoinrewards: gameunicoinrewards?.data?.success
            ? gameunicoinrewards.data.data
            : [],
          recentgames:
            recentgames && recentgames.data && recentgames.data.success
              ? recentgames.data.data
              : [],
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
