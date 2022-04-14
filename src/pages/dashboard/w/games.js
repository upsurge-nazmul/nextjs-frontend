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
import { Game_Data } from "../../../static_data/Game_Data";
import VideoModal from "../../../components/VideoModal";
import MoneyAceBanner from "../../../components/Dashboard/MoneyAceBanner";
function Games({ userdatafromserver, token }) {
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Games Arena");
  const [showvideomodal, setshowvideomodal] = useState(false);
  const [recent_games, setrecent_games] = useState([]);
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

  useEffect(() => {
    let x = localStorage.getItem("recent_games");
    if (x) {
      setrecent_games(JSON.parse(x));
    }
  }, []);
  async function handlegameclick(title, pushto) {
    let x = localStorage.getItem("recent_games");
    if (x) {
      x = JSON.parse(x);
      if (!x.includes(title)) {
        if (x.length === 3) {
          x[2] = x[1];
          x[1] = x[0];
          x[0] = title;
        } else {
          x.push(title);
        }
        setrecent_games(x);
        localStorage.setItem("recent_games", JSON.stringify(x));
      }
    } else {
      localStorage.setItem("recent_games", JSON.stringify([title]));
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
            pathname: "/dashboard/w/game/" + (pushto ? pushto : title),
            query: { id: res.data.data },
          });
        } else {
          console.log(res.data.message);
        }
      } else {
        console.log("error connecting server");
      }
    } else {
      router.push("/dashboard/w/game/" + (pushto ? pushto : title));
    }
  }
  return (
    <div className={styles.gamesPage}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            {/* <p className={styles.gameheading}>About upsurge games</p> */}
            <p
              className={styles.description}
            >{`On upsurge, children (and parents) are encouraged to play games based on topics around entrepreneurship & money management, so that they can learn by doing and making decisions. 
Here are some of our games that you and your child can play together. 
`}</p>
            {/* <MoneyAceBanner type="w" /> */}
            {recent_games.length > 0 && (
              <div className={styles.recentSection}>
                <h2 className={styles.heading}>
                  Recently Played
                  <HeadingArrow />
                </h2>
                <div className={styles.wrapper} id="gamecardwrapper2">
                  {recent_games.map((item, index) => {
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
                        reward={200}
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
                      reward={200}
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
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          token: token,
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
