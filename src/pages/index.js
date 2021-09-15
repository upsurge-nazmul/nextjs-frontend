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
const INTERCOM_APP_ID = "a3llo6c5";
function Home() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [mailfromhome, setmailfromhome] = useState("");
  const { user } = useContext(MainContext);
  const history = useRouter();
  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  }, [user]);

  return (
    <IntercomProvider autoBoot appId={INTERCOM_APP_ID}>
      <div
        className={`${styles.homePage} ${showauth ? styles.stopscrolling : ""}`}
      >
        <Header
          setOpenLeftPanel={setOpenLeftPanel}
          showauth={showauth}
          setshowauth={setshowauth}
          authmode={authmode}
          mailfromhome={mailfromhome}
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
        <AboutSection />
        <Who />
        <What />
        <ProductSection />
        <Reviews />
        <JoinUs />
        <Footer />
      </div>
    </IntercomProvider>
  );
}

export default Home;
