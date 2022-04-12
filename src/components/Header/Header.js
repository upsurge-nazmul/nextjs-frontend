import React, { useEffect, useState, useContext } from "react";
import AuthPage from "../Auth/AuthComponent";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/GeneralComponents/header.module.scss";
import Logo from "../SVGcomponents/Logo";
import HamSvg from "../SVGcomponents/HamSvg";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HeaderTabSection from "./HeaderTabSection";
import { MainContext } from "../../context/Main";
import WaitlistPopUp from "../WaitlistPopUp";
function Header({
  setOpenLeftPanel,
  showauth,
  setshowauth,
  authmode,
  mailfromhome,
  stickyheader,
  showpopup,
  setshowpopup,
  settoastdata,
}) {
  const router = useRouter();
  const [email, setemail] = useState(mailfromhome || "");
  const [showticker, setshowticker] = useState(true);
  const { userdata } = useContext(MainContext);
  // [
  //   { name: "Our Northstar", pushTo: "/northstar" },
  //   { name: "Team", pushTo: "/team" },
  //   { name: "Life@upsurge", pushTo: "/lifeatupsurge" },
  //   { name: "Careers", pushTo: "/careers" },
  //   { name: "FAQ's", pushTo: "/faq" },
  // ]
  function clickedHeader() {
    router.push("/");
  }
  useEffect(() => {
    if (showauth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => (document.body.style.overflowY = "auto");
  }, [showauth]);
  useEffect(() => {
    if (mailfromhome) {
      setemail(mailfromhome);
    }
  }, [mailfromhome]);
  return (
    <div
      className={`${styles.header} ${stickyheader ? styles.sticky : ""} ${
        showticker && !userdata && styles.stickywithannouncement
      }`}
      id="home-page-header"
    >
      {showticker && !userdata && (
        <div className={styles.ticker}>
          <p>Join our Early Access program today to win exciting prizes!</p>
          <div
            className={styles.btn}
            onClick={() => router.push("/earlyaccess")}
          >
            Explore
          </div>
          <CloseRoundedIcon
            className={styles.cross}
            onClick={() => setshowticker(false)}
          />
        </div>
      )}
      <AuthPage
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        mailfromhome={mailfromhome}
        setshowpopup={setshowpopup}
      />
      {showpopup && (
        <WaitlistPopUp
          email={email}
          setemail={setemail}
          setshowpopup={setshowpopup}
          showpopup={showpopup}
          settoastdata={settoastdata}
        />
      )}
      <div className={styles.container}>
        <div
          className={`${styles.hamburger} ${showticker && styles.hamticker}`}
          onClick={() => {
            setOpenLeftPanel((prev) => !prev);
          }}
        >
          <HamSvg />
        </div>
        <div className={styles.logoContainer}>
          <Logo onClick={clickedHeader} className="logo" />
        </div>
        <div className={styles.nav}>
          <HeaderTabSection
            title={"Products"}
            tabs={[
              { name: "Knowledge quests", pushTo: "/products/quest" },
              {
                name: "Games arena",
                pushTo: "/products/games",
              },
              {
                name: "Chores",
                pushTo: "/products/chores",
              },
              // { name: "Family Fun", pushTo: "/familyfun" },
              // { name: "Tribes", pushTo: "/p_tribes" },
              { name: "Live workshops", pushTo: "/products/liveclasses" },
            ]}
            pushTo="/products"
          />
          <HeaderTabSection
            title={"Benefits"}
            tabs={[
              { name: "Financial literacy", pushTo: "/benefits" },
              {
                name: "Experiential learning",
                pushTo: "/benefits/experimential",
              },
              {
                name: "Entrepreneuership",
                pushTo: "/benefits/entrepreneuership",
              },
              { name: "Rewards", pushTo: "/benefits/rewards" },
              { name: "21st century skills", pushTo: "/benefits/skills" },
              ,
            ]}
            pushTo="/benefits"
          />
          <HeaderTabSection title={"Games"} tabs={[]} pushTo="/games" />
          <HeaderTabSection title={"Quiz"} tabs={[]} pushTo="/quiz" />

          {/* <HeaderTabSection
            title={"Resources"}
            tabs={[
              { name: "Goal Wizard", pushTo: "/goalwizard" },
              { name: "Live Classes", pushTo: "/p_liveclasses" },
              { name: "Tournaments", pushTo: "/tournaments" },
              {
                name: "Cheat Codes",
                pushTo: "/cheatcodes",
              },
              { name: "Articles", pushTo: "/blogs" },
            ]}
          /> */}
          <HeaderTabSection title={"Pricing"} tabs={[]} pushTo="/pricing" />
          {/* <HeaderTabSection title={"FAQ’s"} tabs={[]} pushTo="/faq" /> */}

          <HeaderTabSection
            title={"More"}
            tabs={[
              { name: "About us", pushTo: "/about" },
              { name: "Blogs", pushTo: "/blogs" },
              { name: "Financial calculators", pushTo: "/calculators" },
              { name: "FAQs", pushTo: "/help/faq" },
              { name: "Contact us", pushTo: "/contact" },

              // { name: "Live Classes", pushTo: "/liveclasses" },
            ]}
          />
        </div>
        <div
          className={`${styles.signin} ${styles.dashboardbtn}`}
          onClick={() => {
            if (userdata) {
              if (userdata.is_waiting_active) {
                router.push("/dashboard/w");
              } else if (userdata.user_type === "parent") {
                router.push("/dashboard/p");
              } else {
                router.push("/dashboard/k");
              }
              return;
            }
            setshowauth(true);
          }}
        >
          {userdata ? "Go to Dashboard" : "Sign in"}
        </div>
      </div>
    </div>
  );
}

export default Header;
