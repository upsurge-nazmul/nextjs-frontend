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
function Games() {
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Games");
  const [recent_games, setrecent_games] = useState([]);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
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
  const data = {
    ShoppingBudget: {
      name: "Shopping Budget",
      description:
        "Identify how much is available to spend and making purchase decisions based on that.",
    },
    BalanceBuilder: {
      name: "Balance Builder",
      description: "Identify what is income and what is expense.",
    },
    HighAndLow: {
      name: "High And Low",
      description:
        "Identify currency and arrange in ascending or descending order after adding the money.",
    },
    MoneyMath: {
      name: "Money Math",
      description:
        "Choose what you want to buy, earn some money, and calculate  how much you have left.",
    },
    MoneyManager: {
      name: "Money Manager",
      description:
        "Know the importance of allocating your earnings between spending, saving and donating.",
    },
    MoneySlide: {
      name: "Money Slide",
      description:
        "Identify different types of Money notes and coins and achieve the desired target.",
    },
    NeedOrWant: {
      name: "Need Or Want",
      description: "Identify the difference between needs and wants.",
    },
    Ludo: {
      name: "Ludo",
      description: "Financial Ludo for young adults.",
    },
  };
  useEffect(() => {
    let x = localStorage.getItem("recent_games");
    if (x) {
      setrecent_games(JSON.parse(x));
    }
  }, []);
  function handlegameclick(title) {
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
    router.push("/dashboard/p/game/" + title);
  }
  return (
    <div className={styles.gamesPage}>
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
            {recent_games?.length > 0 && (
              <div className={styles.recentSection}>
                <h2 className={styles.heading}>Recently Played</h2>
                <div className={styles.wrapper} id="gamecardwrapper2">
                  {recent_games.map((item, index) => {
                    return (
                      <GameCard
                        onCLick={() =>
                          handlegameclick(data[item].name.replace(/ /g, ""))
                        }
                        data={data[item]}
                        key={"kidcomponent" + index}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <div className={styles.availableSection}>
              <h2 className={styles.heading}>Available Games</h2>
              <div className={styles.wrapper}>
                {Object.keys(data).map((item, index) => {
                  return (
                    <GameCard
                      onCLick={() =>
                        handlegameclick(data[item].name.replace(/ /g, ""))
                      }
                      data={data[item]}
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
