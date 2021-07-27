import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import LeftPanel from "../components/LeftPanel";
import AboutSection from "../components/Home/AboutSection";
import ProductSection from "../components/Home/ProductSection";
import Why from "../components/Home/Why";
import How from "../components/Home/How";
import Reviews from "../components/Home/Reviews";
import JoinUs from "../components/Home/JoinUs";
import Footer from "../components/Home/Footer";
import Intro from "../components/Home/Intro";
import LoginApis from "../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/Home/home.module.scss";

function Home() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [mailfromhome, setmailfromhome] = useState("");
  const history = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("accesstoken")) return;
    checktoken();
    async function checktoken() {
      let response = await LoginApis.checktoken({
        token: localStorage.getItem("accesstoken"),
      });
      if (response && response.data.success) {
        history.push("/dashboard");
      }
    }
  }, []);

  return (
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
      <AboutSection />
      <ProductSection />
      <Why />
      <How />
      <Reviews />
      <JoinUs />
      <Footer />
    </div>
  );
}

export default Home;
