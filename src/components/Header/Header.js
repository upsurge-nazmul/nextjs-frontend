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
            title={"About us"}
            tabs={[
              { name: "Our Northstar", pushTo: "/northstar" },
              { name: "Team", pushTo: "/team" },
              { name: "Life@upsurge", pushTo: "/lifeatupsurge" },
              { name: "Careers", pushTo: "/careers" },
              { name: "FAQ's", pushTo: "/help" },
            ]}
          />
          <HeaderTabSection
            title={"Benefits"}
            tabs={[
              { name: "Financial Literacy", pushTo: "/benefits/finlitracy" },
              {
                name: "Experiental Learning",
                pushTo: "/benefits/explearning",
              },
              {
                name: "Entrepreneurship",
                pushTo: "/benefits/entrepreneurship",
              },
              { name: "Rewards", pushTo: "/benefits/rewards" },
              { name: "Community", pushTo: "/benefits/community" },
            ]}
          />
          <HeaderTabSection
            title={"Products"}
            tabs={[
              { name: "Knowledge Quest", pushTo: "/products/knowledgequests" },
              {
                name: "Games Arena",
                pushTo: "/products/games",
              },
              {
                name: "Jobs",
                pushTo: "/products/jobs",
              },
              { name: "Family Fun", pushTo: "/products/familyfun" },
              { name: "Tribes", pushTo: "/products/tribes" },
              { name: "Live Classes", pushTo: "/products/liveclasses" },
              { name: "Pricing", pushTo: "/products/pricing" },
            ]}
          />
          <HeaderTabSection
            title={"Play"}
            tabs={[
              { name: "Games", pushTo: "/games" },
              {
                name: "Quizzes",
                pushTo: "/quiz/main",
              },
            ]}
          />

          <HeaderTabSection
            title={"Learn"}
            tabs={[
              { name: "Blogs", pushTo: "/blogs" },
              {
                name: "Cheat Codes",
                pushTo: "/cheatcodes",
              },
              { name: "Financial Calculators", pushTo: "/calculators/main" },
              { name: "Goal Wizard", pushTo: "/goalwizard" },
              { name: "Live Classes", pushTo: "/liveclasses" },
              { name: "Tournaments", pushTo: "/tournaments" },
            ]}
          />
        </div>
        <div className={styles.signin} onClick={() => setshowauth(true)}>
          Sign In
        </div>
      </div>
    </div>
  );
}

export default Header;
