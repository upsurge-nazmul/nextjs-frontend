import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Dashboard/dashboardleftpanel.module.scss";
import BlogSvg from "../SVGcomponents/BlogSvg";
import ChoresSvg from "../SVGcomponents/ChoresSvg";
import CoursesSvg from "../SVGcomponents/CoursesSvg";
import GameSvg from "../SVGcomponents/GameSvg";
import HomeSvg from "../SVGcomponents/HomeSvg";
import LeaderboardSvg from "../SVGcomponents/LeaderboardSvg";
import GroupsOutlinedIcon from "../SVGcomponents/GroupsOutlined";
import Logo from "../SVGcomponents/Logo";
import MiniLogo from "../SVGcomponents/MiniLogo";
import ResourcesSvg from "../SVGcomponents/ResourcesSvg";
import QuizIconSvg from "../SVGcomponents/QuizIconSvg";
import RewardSvg from "../SVGcomponents/RewardSvg";
import StoreSvg from "../SVGcomponents/StoreSvg";
import CalcSvg from "../SVGcomponents/CalcSvg";
import LinkedIN from "../SVGcomponents/LinkedInSvg";
import Insta from "../SVGcomponents/Insta";
import Fb from "../SVGcomponents/Fb";
import DiscordSvg from "../SVGcomponents/DiscordSvg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Terms from "../Home/Terms";
import PricingSvg from "../SVGcomponents/PricingSvg";
import LeftPannelToggle from "./LeftPannelToggle";
import StockSvg from "../SVGcomponents/StockSimulator/StockSvg";
import { MainContext } from "../../context/Main";
function DashboardLeftPanel({
  type,
  hidelogo,
  fixed,
  disableClicks,
  setStoryIndex,
}) {
  const router = useRouter();
  const { theme, userdata } = useContext(MainContext);
  const [width, setwidth] = useState(1000);
  const [currenttab, setcurrenttab] = useState("");
  const [showterm, setshowterm] = useState(false);
  const [termmode, settermmode] = useState("terms");
  useEffect(() => {
    setcurrenttab(router.pathname);
  }, [router]);
  useEffect(() => {
    function updateSize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      setwidth(w);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <div
      className={`${styles.dashboardLeftPanel} ${fixed && styles.fixed} ${
        theme === "dark" && styles.dashboardDark
      }`}
      style={
        disableClicks ? { pointerEvents: "none", cursor: "not-allowed" } : {}
      }
    >
      {showterm && <Terms setshowterm={setshowterm} termmode={termmode} />}

      {hidelogo ? null : width > 1300 ? (
        <Logo
          id="upsurge-logo"
          dark={theme === "dark"}
          className={styles.dashboardLogo}
          onClick={() => {
            if (!userdata.intro_guide_completed) {
              router.push("/");
               // "/?showTour=true&pushTo=/dashboard/" +
                 // (userdata.user_type === "parent" ? "p/" : "k/") +
                 // "?storyIndex=2"
            //  );
            } else router.push("/");
            // if (type === "kid") router.push("/dashboard/k");
            // if (type === "waitlist") router.push("/dashboard/w");
            // else router.push("/dashboard/p");
          }}
        />
      ) : (
        <MiniLogo
          id="upsurge-logo"
          dark={theme === "dark"}
          className={styles.miniLogo}
          onClick={() => {
            if (!userdata.intro_guide_completed) {
              router.push("/");
              //  "/?showTour=true&pushTo=/dashboard/" +
               //   (userdata.type === "parent" ? "p/" : "k/") +
                //  "?storyIndex=2"
             // );
            } else router.push("/");

            // if (type === "kid") router.push("/dashboard/k");
            // if (type === "waitlist") router.push("/dashboard/w");
            // else router.push("/dashboard/p");
          }}
        />
      )}
      {type === "kid" ? (
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/k" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/k")}
          >
            <HomeSvg className={styles.icon} />
            <p className={styles.tabtitle}>Dashboard</p>
          </div>

          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/k/games" ||
              currenttab.indexOf("/dashboard/k/game") !== -1 ||
              currenttab.indexOf("/dashboard/k/stocksimulator") !== -1 ||
              currenttab.indexOf("/dashboard/k/cryptosimulator") !== -1
                ? styles.activetab
                : ""
            }`}
            id="games-leftpanel"
            onClick={() => router.push("/dashboard/k/games")}
          >
            <GameSvg className={styles.icon} />
            <p className={styles.tabtitle}>Games</p>
          </div>

          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/k/quest" ||
              currenttab.indexOf("/dashboard/k/quest") !== -1
                ? styles.activetab
                : ""
            }`}
            id="quest-leftpanel"
            onClick={() => router.push("/dashboard/k/quest")}
          >
            <CoursesSvg className={styles.icon} />
            <p className={styles.tabtitle}>Knowledge Quests</p>
          </div>

          <div
            id="chores-leftpanel"
            className={`${styles.tab} ${
              currenttab === "/dashboard/k/chores" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/k/chores")}
          >
            <ChoresSvg className={styles.icon} />
            <p className={styles.tabtitle}>Chores</p>
          </div>

          {/* <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/k/tribes" ||
              currenttab.indexOf("/dashboard/k/tribes") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/k/tribes")}
          >
            <PeopleOutlineIcon className={styles.icon} />
            <p className={styles.tabtitle}>Tribes</p>
          </div> */}
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/k/store" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/k/store")}
            id="store-leftpanel"
          >
            <StoreSvg className={styles.icon} />

            <p className={styles.tabtitle}>Rewards</p>
          </div>
        </div>
      ) : type === "waitlist" ? (
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w" ||
              currenttab === "/dashboard/w/editprofile"
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w")}
          >
            <HomeSvg className={styles.icon} />
            <p className={styles.tabtitle}>Dashboard</p>
          </div>

          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/w/quest" ||
              currenttab.indexOf("/dashboard/w/quest") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/quest")}
          >
            <CoursesSvg className={styles.icon} />
            <p className={styles.tabtitle}>Knowledge Quests</p>
          </div>

          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/quiz" ||
              currenttab.indexOf("/dashboard/w/quiz") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/quiz")}
          >
            <QuizIconSvg className={styles.icon} />
            <p className={styles.tabtitle}>Money Quotient</p>
          </div>

          {/* <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/stocksimulator/[page]"
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/stocksimulator/home")}
          >
            <StockSvg className={styles.icon} />
            <p className={styles.tabtitle}>Stock Simulator</p>
          </div> */}
          {/* <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/cryptosimulator/[page]"
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/cryptosimulator/home")}
          >
            <CryptoSvg className={styles.icon} />
            <p className={styles.tabtitle}>Crypto Simulator</p>
          </div> */}

          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/games" ||
              currenttab.indexOf("dashboard/w/game") !== -1 ||
              currenttab.indexOf("dashboard/w/moneyace") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/games")}
          >
            <GameSvg className={styles.icon} />

            <p className={styles.tabtitle}>Games</p>
          </div>

          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/leaderboards" ||
              currenttab.indexOf("/dashboard/w/leaderboards") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/leaderboards")}
          >
            <LeaderboardSvg className={styles.icon} />

            <p className={styles.tabtitle}>Leaderboards</p>
          </div>

          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/rewards" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/w/rewards")}
          >
            <RewardSvg className={styles.icon} />
            <p className={styles.tabtitle}>Rewards</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/pricing" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/w/pricing")}
          >
            <PricingSvg className={styles.icon} />
            <p className={styles.tabtitle}>Pricing</p>
          </div>
          <LeftPannelToggle
            name="Resources"
            currenttab={currenttab}
            isActive={
              currenttab.indexOf("/dashboard/w/blog") !== -1 ||
              currenttab.indexOf("/dashboard/w/calculator") !== -1
            }
            items={[
              {
                name: "Blogs",
                pushto: "/dashboard/w/blogs",
                icon: <BlogSvg />,
              },
              {
                name: "Calculators",
                pushto: "/dashboard/w/calculators",
                icon: <CalcSvg />,
              },
            ]}
            icon={<ResourcesSvg />}
          />
        </div>
      ) : (
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/p")}
          >
            <HomeSvg className={styles.icon} />
            <p className={styles.tabtitle}>Dashboard</p>
          </div>
          {/* <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/mykids" ||
              currenttab.indexOf("/dashboard/p/child") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/p/mykids")}
          >
            <KidSvg className={styles.icon} />
            <p className={styles.tabtitle}>My Kids</p>
          </div> */}
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/p/games" ||
              currenttab.indexOf("/dashboard/p/game") !== -1 ||
              currenttab.indexOf("dashboard/w/moneyace") !== -1
                ? styles.activetab
                : ""
            }`}
            id="games-leftpanel"
            onClick={() => router.push("/dashboard/p/games")}
          >
            <GameSvg className={styles.icon} />
            <p className={styles.tabtitle}>Games</p>
          </div>

          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/p/quests" ||
              currenttab.indexOf("/dashboard/p/quest") !== -1
                ? styles.activetab
                : ""
            }`}
            id="quest-leftpanel"
            onClick={() => router.push("/dashboard/p/quest/upsurge-quest")}
          >
            <CoursesSvg className={styles.icon} />
            <p className={styles.tabtitle}>Quests</p>
          </div>

          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/chores" ||
              currenttab.indexOf("/dashboard/p/managechore") !== -1
                ? styles.activetab
                : ""
            }`}
            id="chores-leftpanel"
            onClick={() => {
              if (!userdata.intro_guide_completed) {
                router.push(
                  "/dashboard/p/chores"
                 // "/dashboard/p/chores?showTour=true&pushTo=/dashboard/p/?storyIndex=10"
                );
              } else {
                router.push("/dashboard/p/chores");
              }
            }}
          >
            <ChoresSvg className={styles.icon} />
            <p className={styles.tabtitle}>Chores</p>
          </div>

          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/store" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/p/store")}
            id="store-leftpanel"
          >
            <StoreSvg className={styles.icon} />
            <p className={styles.tabtitle}>Rewards</p>
          </div>

          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/partners" ? styles.activetab : ""
            }`}
            onClick={() => {
              if (router.query.showTour) {
                //router.push("/dashboard/p/partners?showTour=true");
                router.push("/dashboard/p/partners");
                return;
              }
              router.push("/dashboard/p/partners");
            }}
            id="partners-leftpanel"
          >
            <GroupsOutlinedIcon className={styles.partnericon} />
            <p className={styles.tabtitle}>Partners</p>
          </div>
          <LeftPannelToggle
            name="Resources"
            id="toggle-leftpanel"
            setStoryIndex={setStoryIndex}
            currenttab={currenttab}
            isActive={
              currenttab.indexOf("/dashboard/p/blog") !== -1 ||
              currenttab.indexOf("/dashboard/p/calculator") !== -1 ||
              currenttab.indexOf("/dashboard/p/quiz") !== -1 ||
              currenttab.indexOf("/dashboard/p/dailyquestion") !== -1 ||
              currenttab.indexOf("/dashboard/p/leaderboard") !== -1
            }
            items={[
              {
                name: "Blogs",
                pushto: "/dashboard/p/blogs",
                icon: <BlogSvg />,
              },
              {
                name: "Calculators",
                pushto: "/dashboard/p/calculators",
                icon: <CalcSvg />,
              },

              //{
              //  name: "Quiz",
              //  pushto: "/dashboard/p/quiz",
              //  icon: <QuizIconSvg />,
              //},
              //{
              //  name: "Quiz leaderboard",
              //  pushto: "/dashboard/p/leaderboard",
              //  icon: <LeaderboardSvg />,
              //},
              {
                name: "Question of the day",
                pushto: "/dashboard/p/dailyquestion",
                icon: <QuizIconSvg />,
              },
            ]}
            icon={<ResourcesSvg />}
          />
        </div>
      )}

      <div className={styles.bottom}>
        <div className={styles.brandtext}>
          <div className={styles.socials}>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} is visiting Facebook`})}}
            href="https://www.facebook.com/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
            >
              <Fb className={styles.social} />
            </a>
            <a
              onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} is visiting Instagram`})}}
              href="https://www.instagram.com/upsurge.in/"
              target="_blank"
              rel="noreferrer"
              >
              <Insta className={styles.social} />
            </a>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} is visiting Linkedin`})}}
            href="https://www.linkedin.com/company/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
            >
              <LinkedIN className={styles.social} />
            </a>
            <a
              onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} is visiting Discord`})}}
              href="https://discord.gg/grqReT3zDm"
              target="_blank"
              rel="noreferrer"
              >
              <DiscordSvg className={styles.social} />
            </a>
            <a
              onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} is visiting WhatApp`})}}
              href="https://wa.me/918851117926"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#4f4f4f" }}
            >
              <WhatsAppIcon
                className={styles.socialyt}
                style={{ color: "#4f4f4f" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLeftPanel;
