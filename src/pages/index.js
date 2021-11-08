import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import LeftPanel from "../components/LeftPanel";
import AboutSection from "../components/Home/AboutSection";
import ProductSection from "../components/Home/ProductSection";
import BlogsSection from "../components/Home/BlogsSection";
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
import JasperSection from "../components/Home/JasperSection";
import PartnerSection from "../components/Home/PartnerSection";
import TestiMonial from "../components/Home/TestiMonial";
import Toast from "../components/Toast";
const INTERCOM_APP_ID = "tk23vd4p";
function Home({ isLogged, userdata }) {
  const { setuserdata } = useContext(MainContext);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mailfromhome, setmailfromhome] = useState("");
  const { user } = useContext(MainContext);
  const router = useRouter();
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
      router.push("/dashboard");
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
  useEffect(() => {
    if (router.query.err) {
      if (router.query.err === "01") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Please login first.",
        });
      }
      if (router.query.err === "02") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Your token has expired. Please login again.",
        });
      }
    }
  }, [router.query]);
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
        <Toast data={toastdata} />

        <Intro
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
        />
        <Who />
        {/* <How /> */}
        <Benefits />
        <ProductSection />
        {/* <PartnerSection /> */}
        <JasperSection />
        <AboutSection />
        <BlogsSection />
        <TestiMonial />
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
