import React, { useEffect, useState } from "react";
import AuthPage from "../Auth/AuthComponent";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/GeneralComponents/header.module.scss";
import Logo from "../SVGcomponents/Logo";
import HamSvg from "../SVGcomponents/HamSvg";
import HeaderTabSection from "./HeaderTabSection";
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
      className={`${styles.header} ${stickyheader ? styles.sticky : ""}`}
      id="home-page-header"
    >
      <AuthPage
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        mailfromhome={mailfromhome}
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
          className={styles.hamburger}
          onClick={() => {
            setOpenLeftPanel(true);
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
              { name: "Knowledge Quest", pushTo: "/products/quest" },
              {
                name: "Games Arena",
                pushTo: "/products/games",
              },
              {
                name: "Chores",
                pushTo: "/products/chores",
              },
              // { name: "Family Fun", pushTo: "/familyfun" },
              // { name: "Tribes", pushTo: "/p_tribes" },
              { name: "Live Classes", pushTo: "/products/liveclasses" },
            ]}
            pushTo="/products"
          />
          <HeaderTabSection
            title={"Benefits"}
            tabs={[
              { name: "Financial Literacy", pushTo: "/benefits" },
              {
                name: "Experiential Learning",
                pushTo: "/benefits/experimential",
              },
              {
                name: "Entrepreneuership",
                pushTo: "/benefits/entrepreneuership",
              },
              { name: "Rewards", pushTo: "/benefits/rewards" },
              { name: "Skills & Knowledge", pushTo: "/benefits/skills" },
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
              { name: "Financial Calculators", pushTo: "/calculators" },
              { name: "FAQs", pushTo: "/help/faq" },
              { name: "Contact us", pushTo: "/contact" },

              // { name: "Live Classes", pushTo: "/liveclasses" },
            ]}
          />
        </div>
        <div className={styles.signin} onClick={() => setshowpopup(true)}>
          Join us
        </div>
      </div>
    </div>
  );
}

export default Header;
