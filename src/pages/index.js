import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import LeftPanel from "../components/LeftPanel";
import AboutSection from "../components/Home/AboutSection";
import ProductSection from "../components/Home/ProductSection";
import Why from "../components/Home/Why";
import Reviews from "../components/Home/Reviews";
import JoinUs from "../components/Home/JoinUs";
import Footer from "../components/Home/Footer";
import Intro from "../components/Home/Intro";
import LoginApis from "../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/Home/home.module.scss";
import { getCookie } from "../actions/cookieUtils";
import What from "../components/Home/What";
import How from "../components/Home/How";
import Who from "../components/Home/Who";
import { IntercomProvider, useIntercom } from "react-use-intercom";
import { MainContext } from "../context/Main";
import Benefits from "../components/Home/Benefits";
const INTERCOM_APP_ID = "a3llo6c5";
function Home({ isLogged, userdata }) {
  const { setuserdata } = useContext(MainContext);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [mailfromhome, setmailfromhome] = useState("");
  const { user } = useContext(MainContext);
  const history = useRouter();

  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
      history.push("/dashboard");
    }
  }, [userdata]);

  useEffect(() => {
    let homepagediv = document.getElementById("home-page-main");
    let homepageheader = document.getElementById("home-page-header");
    let removethis = homepagediv.addEventListener("scroll", (e) => {
      if (homepagediv.scrollTop > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    });
    return () => removethis;
  }, []);
  return (
    <IntercomProvider autoBoot appId={INTERCOM_APP_ID}>
      <div
        id="home-page-main"
        className={`${styles.homePage} ${showauth ? styles.stopscrolling : ""}`}
      >
        <Header
          setOpenLeftPanel={setOpenLeftPanel}
          showauth={showauth}
          setshowauth={setshowauth}
          authmode={authmode}
          mailfromhome={mailfromhome}
          stickyheader={stickyheader}
        />
        <LeftPanel
          openLeftPanel={openLeftPanel}
          setOpenLeftPanel={setOpenLeftPanel}
        />

        <Intro
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
        />
        <How />
        <Benefits />
        <ProductSection />
        <AboutSection />
        <JoinUs />
        <Footer />
      </div>
    </IntercomProvider>
  );
}

export default Home;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return { props: { isLogged: false, msg } };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response.data.data,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", userdata: null },
    };
  }
}
