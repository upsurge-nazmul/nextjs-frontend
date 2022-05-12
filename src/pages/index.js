import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import LeftPanel from "../components/LeftPanel";
import AboutSection from "../components/Home/AboutSection";
import ProductSection from "../components/Home/ProductSection";
import BlogsSection from "../components/Home/BlogsSection";
import Head from "next/head";
import JoinUs from "../components/Home/JoinUs";
import Footer from "../components/Home/Footer";
import Intro from "../components/Home/Intro";
import LoginApis from "../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/Home/home.module.scss";
import Who from "../components/Home/Who";
import Values from "../components/Home/Values";
import { IntercomProvider, useIntercom } from "react-use-intercom";
import { MainContext } from "../context/Main";
import Benefits from "../components/Home/Benefits";
import JasperSection from "../components/Home/JasperSection";
import PartnerSection from "../components/Home/PartnerSection";
import FaqSection from "../components/Home/FaqSection";
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
  const [showpopup, setshowpopup] = useState(false);
  const { user } = useContext(MainContext);
  const router = useRouter();
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
  return (
    <IntercomProvider autoBoot appId={INTERCOM_APP_ID}>
      <div
        id="home-page-main"
        className={`${styles.homePage} ${showauth ? styles.stopscrolling : ""}`}
      >
        <Head>
          <title>upsurge | money, made easy.</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div
          className={styles.summerbtn}
          onClick={() => router.push("/summer-bootcamp")}
        >
          <p className={styles.maintext}>Summer Bootcamp</p>
          <p className={styles.subtext}>Registrations close May 27</p>
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

        <Intro
          setshowauth={setshowauth}
          setauthmode={setauthmode}
          setmailfromhome={setmailfromhome}
          setshowpopup={setshowpopup}
        />
        <Values insidebenefits />
        <Who />
        {/* <How /> */}
        <Benefits />
        <ProductSection />
        <PartnerSection />
        <JasperSection />
        <AboutSection />
        <BlogsSection />
        <TestiMonial />
        <FaqSection />
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
