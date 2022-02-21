import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import ChoreComponent from "../../../../components/Dashboard/ChoreComponent";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../../styles/ChildActivity/childactivity.module.scss";
import HeadingArrow from "../../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import ChoreApis from "../../../../actions/apis/ChoreApis";
import FreeGameApis from "../../../../actions/apis/FreeGameApis";
import TribeApis from "../../../../actions/apis/TribeApis";
import { getCookie } from "../../../../actions/cookieUtils";
import DashboardApis from "../../../../actions/apis/DashboardApis";
import UniCoinSvg from "../../../../components/SVGcomponents/UniCoinSvg";
import FillSpace from "../../../../components/Dashboard/FillSpace";
import QuizApis from "../../../../actions/apis/QuizApis";
import { Game_Data } from "../../../../static_data/Game_Data";
export default function ChildActivity({
  pendingchores,
  childdetail,
  highestquizscore,
  childTribes,
  recentgames,
}) {
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState(
    childdetail.first_name + "'s progress report" || "Child Activity"
  );
  const [chorearray, setchorearray] = useState(
    pendingchores?.rows ? pendingchores.rows : []
  );
  const [quests, setquests] = useState([]);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    const scrollContainer = document.querySelector("#tribewrapper");
    if (!scrollContainer) return;

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY * 5;
    });
  }, []);
  return (
    <div className={styles.childactivity}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.headsection}>
              <div className={styles.topblock}>
                <img
                  className={styles.avatar}
                  src={childdetail.user_img_url}
                  alt=""
                />
                <div className={styles.right}>
                  <div className={styles.rewardblock}>
                    <UniCoinSvg className={styles.svg} />
                    <p className={styles.number}>
                      {childdetail?.num_unicoins || 0} UniCoins
                    </p>
                  </div>
                  <p className={styles.username}>@{childdetail.user_name}</p>
                  <div className={styles.badge}>
                    <img
                      src={"/images/badges/badge_" + childdetail.level + ".svg"}
                      alt=""
                    />
                    <p className={styles.level}>Level {childdetail.level}</p>
                  </div>
                </div>
              </div>
              {childTribes.length > 0 && (
                <div className={styles.tribeheading}>
                  <h2 className={styles.mainheading}>Tribes</h2>
                </div>
              )}
              <div className={styles.tribes} id="tribewrapper">
                {childTribes.map((tribe) => (
                  <div className={styles.tribe} key={tribe.id}>
                    <img
                      src={
                        tribe.tribe_img_url ||
                        "https://i.ibb.co/v3vVV8r/default-avatar.png"
                      }
                      alt=""
                    />
                    <p className={styles.name}>{tribe.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.leaderboardsection}>
              <h2 className={styles.heading}>Leaderboards</h2>
              <div className={styles.wrapper}>
                <div className={styles.element}>
                  <p className={styles.rank}>250</p>
                  <p className={styles.section}>Money ace</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.rank}>{highestquizscore ?? 0}</p>
                  <p className={styles.section}>Money Quotient</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.rank}>2</p>
                  <p className={styles.section}>Quests</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.rank}>100</p>
                  <p className={styles.section}>Stock simulator</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.flexRight}>
            <div className={styles.choreSection}>
              <h2
                className={styles.mainheading}
                onClick={() => router.push("/dashboard/p/chores")}
              >
                Chores
                <HeadingArrow />
              </h2>

              <div className={styles.wrapper}>
                {chorearray.map((data, index) => {
                  return (
                    <ChoreComponent
                      data={data}
                      settoastdata={settoastdata}
                      key={"chorecomponent" + index}
                    />
                  );
                })}
                {chorearray.length === 0 && (
                  <FillSpace
                    text={"No chores in progress"}
                    extrastyle={{ margin: 0 }}
                  />
                )}
              </div>
            </div>
            <div className={styles.questsection}>
              <h2
                className={styles.heading}
                onClick={() => router.push("/dashboard/p/quests")}
              >
                Quests
                <HeadingArrow />
              </h2>
              <div className="wrapper">
                {quests.length === 0 && (
                  <FillSpace
                    text={"No quest in progress"}
                    extrastyle={{ margin: 0 }}
                  />
                )}
              </div>
            </div>
            <div className={styles.gamessection}>
              <h2 className={styles.heading}>Recently played games</h2>
              <div className={styles.wrapper}>
                {recentgames.map((game) => {
                  return <GameCard data={Game_Data[game]} key={game.id} />;
                })}
                {recentgames.length === 0 && (
                  <FillSpace
                    text={"No recent games"}
                    extrastyle={{ margin: "0" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      let pendinchores = await ChoreApis.getchildchores(
        { id: params.childid, type: "pending" },
        token
      );
      let childdetail = await DashboardApis.getChildDetails(
        {
          id: params.childid,
        },
        token
      );
      let highestquizscore = await QuizApis.highestscore({
        email: response.data.data.email,
      });
      let userTribes = await TribeApis.userTribes(
        {
          userId: params.childid,
        },
        token
      );
      let recentgames = await FreeGameApis.getrecentGames(
        { id: params.childid },
        token
      );

      return {
        props: {
          isLogged: true,
          pendingchores:
            pendinchores && pendinchores.data && pendinchores.data.success
              ? pendinchores.data.data
              : [],
          childdetail:
            childdetail && childdetail.data && childdetail.data.data
              ? childdetail.data.data
              : [],
          highestquizscore: highestquizscore?.data.success
            ? highestquizscore.data.data.score
            : 0,
          childTribes:
            userTribes && userTribes.data && userTribes.data.success
              ? userTribes.data.data
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
