import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/GamePage/gamelist.module.scss";
import Footer from "../../components/Home/Footer";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import JoinUs from "../../components/Home/JoinUs";
import { Game_Data } from "../../static_data/Game_Data";
import { MainContext } from "../../context/Main";
import LoginApis from "../../actions/apis/LoginApis";
import { isMobile } from "react-device-detect";
import FreeGameApis from "../../actions/apis/FreeGameApis";
export default function GamePage({ userdata }) {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const comingsoongames = ["Ludo", "HighAndLow", "MoneyMath"];
  const { setuserdata, theme } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);
  async function handleclick(item) {
    if (item === "Ludo" && isMobile) {
      let res = await FreeGameApis.presign({
        playername: "Anonymous",
        playeremail: "tempuser@upsurge.in",
        number: "",
        game: item,
      });
      if (res) {
        if (res.data.success) {
          router.push({
            pathname: "/games/Ludo",
            query: { id: res.data.data },
          });
        } else {
          console.log(res.data.message);
        }
      } else {
        console.log("error connecting server");
      }
    } else {
      if (Game_Data[item]?.pushto) {
        return router.push(Game_Data[item].pushto);
      }
      router.push("/games/" + item);
    }
  }
  return (
    <div
      className={`${styles.gamelist} ${
        theme === "dark" && styles.darkgamelist
      }`}
    >
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.contentWrapper}>
        <Curve1 className={styles.curve1} />
        <Curve2 className={styles.curve2} />
        <img
          className={styles.icon}
          src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
        <div className={styles.headingSection}>
          <h2 className={styles.heading}>Games</h2>
          <h3 className={styles.subheading}>
            {`On upsurge, children (and parents) are encouraged to play games
            based on topics around entrepreneurship & money management, so that
            they can learn by doing and making decisions. Here are some of our
            games that you and your child can play together.`}
          </h3>
        </div>

        <div className={styles.gamelistwrapper}>
          {Object.keys(Game_Data).map((item, index) => {
            return (
              <div
                key={"game" + index}
                className={styles.gameCard}
                // onClick={() => router.push(`/games/${item}`)}
              >
                <img
                  src={Game_Data[item].img || `/images/games/${item}.png`}
                  alt=""
                />
                <p className={styles.title}>{Game_Data[item].name}</p>
                <p className={styles.detail}>{Game_Data[item].description}</p>
                <p
                  className={styles.activebutton}
                  onClick={() => handleclick(item)}
                >
                  Play
                </p>

                {/* {comingsoongames.includes(item) ? (
                  <p className={styles.button}>Coming Soon....</p>
                ) : (
                  <p
                    className={styles.activebutton}
                    onClick={() => {
                      router.push("/games/" + item);
                    }}
                  >
                    Play
                  </p>
                )} */}
              </div>
            );
          })}
        </div>
      </div>
      <JoinUs />
      <Footer />
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
      msg = response.data.msg || "";
      return { props: {} };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", userdata: null },
    };
  }
}
