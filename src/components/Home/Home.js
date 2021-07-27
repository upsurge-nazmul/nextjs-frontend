import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import LeftPanel from "../LeftPanel";
import { useHistory } from "react-router-dom";
import AboutSection from "./AboutSection";
import ProductSection from "./ProductSection";
import Why from "./Why";
import How from "./How";
import Reviews from "./Reviews";
import JoinUs from "./JoinUs";
import Footer from "./Footer";
import Intro from "./Intro";
import LoginApis from "../../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Home/footer.module.scss";

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
    <div className={`homePage ${showauth ? "stopscrolling" : ""}`}>
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
