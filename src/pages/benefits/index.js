import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Entrepreneurship from "../../components/Benefits/Entrepreneurship";
import Experimential from "../../components/Benefits/Experimential";
import Financial from "../../components/Benefits/Financial";
import Rewards from "../../components/Benefits/RewardsSection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import styles from "../../styles/Benefits/benefits.module.scss";
import Values from "../../components/Home/Values";
import Skills from "../../components/Benefits/Skills";
import { MainContext } from "../../context/Main";
import LoginApis from "../../actions/apis/LoginApis";
import Seo from "../../components/Seo";
function BenfitsPage({ userdata }) {
  const router = useRouter();
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);

  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
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
  return (
    <div className={`${styles.main} ${theme === "dark" && styles.darkmain}`}>
      <Seo title={"upsurge benefits"} desc={"upsurge benefits"} />
      <Header
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
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <Values insidebenefits />
      <Financial />
      <Experimential />
      <Entrepreneurship />
      <Rewards />
      <Skills />
      <JoinUs />
      <Footer />
    </div>
  );
}

export default BenfitsPage;
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
