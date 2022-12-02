import React, { useEffect, useState, useContext } from "react";
import AuthPage from "../Auth/AuthComponent";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/GeneralComponents/header.module.scss";
import Logo from "../SVGcomponents/Logo";
import HamSvg from "../SVGcomponents/HamSvg";
import HeaderTabSection from "./HeaderTabSection";
import { MainContext } from "../../context/Main";
import WaitlistPopUp from "../WaitlistPopUp";
import { HOME_VARIENTS } from "../../static_data/Home_Data";
import LoginApis from "../../actions/apis/LoginApis";

function Header({
  setOpenLeftPanel,
  showauth,
  setshowauth,
  authmode,
  setauthmode,
  mailfromhome,
  stickyheader,
  showpopup,
  setshowpopup,
  settoastdata,
  showNav = true,
  page = "",
  refId = null,
}) {
  const router = useRouter();
  const [email, setemail] = useState(mailfromhome || "");
  const { userdata, setuserdata, theme } = useContext(MainContext);
  useEffect(() => {
    async function fetchAuth() {
      let response = await LoginApis.checktoken({});
      if (response && response.data && response.data.success) {
        setuserdata(response.data.data);
      }
    }
    fetchAuth();
  }, []);
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
        theme === "dark" && styles.darkheader
      }`}
      id="home-page-header"
    >
      <AuthPage
        showauth={showauth}
        setshowauth={setshowauth}
        authmode={authmode}
        mailfromhome={mailfromhome}
        setshowpopup={setshowpopup}
        refId={refId}
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
        {showNav && (
          <div
            className={`${styles.hamburger} `}
            onClick={() => {
              setOpenLeftPanel((prev) => !prev);
            }}
          >
            <HamSvg />
          </div>
        )}
        <div
          className={showNav ? styles.logoContainer : styles.noNavLogoContainer}
        >
          <Logo
            onClick={clickedHeader}
            className="logo"
            dark={theme === "dark" ? true : false}
          />
        </div>
        {showNav && (
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
            <HeaderTabSection title={"Games"} tabs={[]} pushTo="/games" />

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
              title={"Resources"}
              tabs={[
                { name: "About us", pushTo: "/about-us" },
                { name: "Team", pushTo: "/team" },
                { name: "Blogs", pushTo: "/blogs" },
                { name: "Financial calculators", pushTo: "/calculators" },
                // { name: "Careers", pushTo: "/careers" },
                { name: "FAQs", pushTo: "/help/faq" },
                { name: "Contact us", pushTo: "/contact" },

                // { name: "Live Classes", pushTo: "/liveclasses" },
              ]}
            />
            <HeaderTabSection
              title={"Contact Us"}
              tabs={[]}
              pushTo="/contact"
            />
          </div>
        )}
        <div
          id="continue-dashboard-btn"
          className={`${styles.signin} ${styles.dashboardbtn}`}
          onClick={() => {
            if (router.query.pushTo) {
              router.push(router.query.pushTo);
              return;
            }
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
            setauthmode("login");
          }}
        >
          {userdata
            ? "Go to Dashboard"
            : page === HOME_VARIENTS[0]
            ? "Try for free"
            : "Sign in"}
        </div>
      </div>
    </div>
  );
}

export default Header;
