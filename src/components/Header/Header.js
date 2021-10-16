import React, { useState } from "react";
import AuthPage from "../Auth/AuthComponent";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/GeneralComponents/header.module.scss";
import Logo from "../SVGcomponents/Logo";
import HamSvg from "../SVGcomponents/HamSvg";
import HeaderTabSection from "./HeaderTabSection";

function Header({
  setOpenLeftPanel,
  showauth,
  setshowauth,
  authmode,
  mailfromhome,
  stickyheader,
}) {
  const router = useRouter();
  // [
  //   { name: "Our Northstar", pushTo: "/northstar" },
  //   { name: "Team", pushTo: "/team" },
  //   { name: "Life@upsurge", pushTo: "/lifeatupsurge" },
  //   { name: "Careers", pushTo: "/careers" },
  //   { name: "FAQ's", pushTo: "/faq" },
  // ]
  function clickedHeader() {
    if (router.route === "/") {
      let homepagemain = document.getElementById("home-page-main");
      homepagemain.scrollTop = 0;
    } else {
      router.push("/");
    }
  }
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
          />
          <HeaderTabSection
            title={"Benefits"}
            tabs={[
              { name: "Financial Literacy", pushTo: "/benefits" },
              {
                name: "Experimential Learning",
                pushTo: "/benefits/experimential",
              },
              {
                name: "Entrepreneuership",
                pushTo: "/benefits/entrepreneuership",
              },
              { name: "Rewards", pushTo: "/benefits/rewards" },
            ]}
            pushTo="/benefits"
          />
          {/* <HeaderTabSection title={"Games"} tabs={[]} pushTo="/gamepage" /> */}
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
          {/* <HeaderTabSection title={"Pricing"} tabs={[]} pushTo="/pricing" /> */}
          {/* <HeaderTabSection title={"FAQ’s"} tabs={[]} pushTo="/faq" /> */}

          <HeaderTabSection
            title={"More"}
            tabs={[
              { name: "About us", pushTo: "/about" },

              { name: "Blogs", pushTo: "/blogs" },

              // { name: "Financial Calculators", pushTo: "/calculators" },
              { name: "FAQ's", pushTo: "/help/faq" },
              { name: "Contact us", pushTo: "/contact" },

              // { name: "Live Classes", pushTo: "/liveclasses" },
            ]}
          />
        </div>
        {/* <div className={styles.signin} onClick={() => setshowauth(true)}>
          Sign In
        </div> */}
      </div>
    </div>
  );
}

export default Header;
