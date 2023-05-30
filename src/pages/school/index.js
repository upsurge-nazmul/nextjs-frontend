import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import Header from "../../components/Header/Header";
import Toast from "../../components/Toast";
import LeftPanel from "../../components/LeftPanel";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/School/school.module.scss";
import Logo from "../../components/SVGcomponents/Logo";
import AuthComponent from "../../components/Auth/AuthComponent";
import GamesBar from "../../components/GamesBar";
function SchoolPage() {
  const [stickyheader, setstickyheader] = useState(false);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  const [showauth, setshowauth] = useState(true);
  const [authmode, setauthmode] = useState("school");
  const [error, setError] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showNav, setShowNav] = useState(true);
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
  return (
    <>
      <PageTitle />
      <Toast data={toastdata} />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.schoolPage}>
        <div className={styles.signUpContainer}>
          <div className={styles.contentWrapper}>
          <div className={styles.flexContainer}>
            <div
              className={
                showNav ? styles.logoContainer : styles.noNavLogoContainer
              }
            >
              <Logo className="logo" dark={false} />
            </div>
            <img
              className={styles.jasper}
              src="/jasperSchool.png"
              alt="Jasper"
            />
          </div>
          <div className={styles.flexContainer2}>
            <h1>Hi ! I&apos;m Jasper</h1>
            <h2>Make your kids money-smart this summer with upsurge</h2>
            <p>Brought to you by Venkateshwara Global School</p>
          </div>
          </div>
          <div className={styles.flexContainer3}>
            <AuthComponent
              showauth={showauth}
              setshowauth={setshowauth}
              authmode={authmode}
              setauthmode={setauthmode}
            />
          </div>
        </div>
          <img className={styles.wave} src="/wave.png" alt="wave" />
      </div>
      <div className={styles.schoolPageGames}>
        <GamesBar />
      </div>
    </>
  );
}

export default SchoolPage;
