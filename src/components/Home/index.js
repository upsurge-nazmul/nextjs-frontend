import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Home/home.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
import { MainContext } from "../../context/Main";
import Header from "../Header/Header";
import LeftPanel from "../LeftPanel";
import AboutSection from "./AboutSection";
import ProductSection from "./ProductSection";
import BlogsSection from "./BlogsSection";
import JoinUs from "./JoinUs";
import Footer from "./Footer";
import Intro from "./Intro";
import Who from "./Who";
import Values from "./Values";
import Benefits from "./Benefits";
import JasperSection from "./JasperSection";
import PartnerSection from "./PartnerSection";
import FaqSection from "./FaqSection";
import TestiMonial from "./TestiMonial";
import Toast from "../Toast";
import Tour from "../Tour/Tour";
import PageTitle from "../PageTitle";
import JodoIntro from "./JodoIntro";
// import { IntercomProvider, useIntercom } from "react-use-intercom";

// const INTERCOM_APP_ID = "tk23vd4p";
function Home({ userdata, page = "" }) {
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
  const [showpopup, setshowpopup] = useState(false);
  const { user } = useContext(MainContext);
  const router = useRouter();
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

  useEffect(() => {
    history.scrollRestoration = "manual";
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
        if (router.query.next) {
          router.push("/?next=" + router.query.next);
        } else router.push("/");
      }
      if (router.query.err === "02") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Your token has expired. Please login again.",
        });
        if (router.query.next) {
          router.push("/?next=" + router.query.next);
        } else router.push("/");
      }
      if (router.query.err == "invalid-pass-link") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Invalid password link",
        });
        router.push("/");
      }
    }
  }, [router.query]);
  const story = [
    {
      position: "bottom",
      ref: "#continue-dashboard-btn",
      isolate: true,
      superimpose: true,
      required: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>Great, now we&apos;re in home page.</p>
          <p
            className={styles.text}
          >{`Press this button to go back to dashboard.`}</p>
        </div>
      ),
      nextFunction: () => {
        router.push(router.query.pushTo);
      },
    },
  ];
  useEffect(() => {
    console.log(document.documentElement.scrollTop);
    if (router.query.showTour) {
      let home = document.querySelector("#home-page-main");
      if (home) {
        home.scrollTop = 0;
      }
      window.scrollY = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [router]);
  return (
    // <IntercomProvider autoBoot appId={INTERCOM_APP_ID}>
    <div
      id="home-page-main"
      className={`${styles.homePage} ${
        showauth || router.query.showTour ? styles.stopscrolling : ""
      }`}
    >
      <PageTitle />
      <div
        className={styles.summerbtn}
        onClick={() => router.push("/business_league")}
      >
        <p className={styles.maintext}>upsurge Business League</p>
        <p className={styles.subtext}>Registration closes 5th October</p>
      </div>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        mailfromhome={mailfromhome}
        stickyheader={stickyheader}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
        settoastdata={settoastdata}
      />

      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Toast data={toastdata} />

      {page === "jodo" ? (
        <JodoIntro
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
          setshowpopup={setshowpopup}
        />
      ) : (
        <Intro
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
          setshowpopup={setshowpopup}
        />
      )}

      <Values insidebenefits />
      <Benefits />
      {/* <How /> */}
      <ProductSection />
      <Who />
      <PartnerSection />
      <JasperSection />
      <AboutSection />
      <BlogsSection />
      <TestiMonial />
      <FaqSection />
      <JoinUs
        setshowauth={setshowauth}
        setauthmode={setauthmode}
        setmailfromhome={setmailfromhome}
      />
      <Footer />
      {router.query.showTour && (
        <Tour story={story} current={0} showtour={true} />
      )}
    </div>
    // </IntercomProvider>
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
