import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Dashboard/dashboardleftpanel.module.scss";
import BlogSvg from "../SVGcomponents/BlogSvg";
import ChoresSvg from "../SVGcomponents/ChoresSvg";
import CoursesSvg from "../SVGcomponents/CoursesSvg";
import GameSvg from "../SVGcomponents/GameSvg";
import HomeSvg from "../SVGcomponents/HomeSvg";
import KidSvg from "../SVGcomponents/KidsSvg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LeaderboardSvg from "../SVGcomponents/LeaderboardSvg";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Logo from "../SVGcomponents/Logo";
import MiniLogo from "../SVGcomponents/MiniLogo";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import QuizIconSvg from "../SVGcomponents/QuizIconSvg";
import RewardSvg from "../SVGcomponents/RewardSvg";
import StoreSvg from "../SVGcomponents/StoreSvg";
import CryptoSvg from "../SVGcomponents/CryptoSimulator/CryptoSvg";
import CalcSvg from "../SVGcomponents/CalcSvg";
import LinkedIN from "../SVGcomponents/LinkedInSvg";
import Insta from "../SVGcomponents/Insta";
import Fb from "../SVGcomponents/Fb";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Terms from "../Home/Terms";
import PricingSvg from "../SVGcomponents/PricingSvg";
import LeftPannelToggle from "./LeftPannelToggle";
import StockSvg from "../SVGcomponents/StockSimulator/StockSvg";
import GroupsIcon from "@mui/icons-material/Groups";
import { MainContext } from "../../context/Main";
function DashboardLeftPanel({ type, hidelogo, fixed }) {
  const router = useRouter();
  const { theme } = useContext(MainContext);
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
    >
      {showterm && <Terms setshowterm={setshowterm} termmode={termmode} />}

      {hidelogo ? null : width > 1300 ? (
        <Logo
          dark={theme === "dark"}
          className={styles.dashboardLogo}
          onClick={() => {
            router.push("/");
            // if (type === "kid") router.push("/dashboard/k");
            // if (type === "waitlist") router.push("/dashboard/w");
            // else router.push("/dashboard/p");
          }}
        />
      ) : (
        <MiniLogo
          dark={theme === "dark"}
          className={styles.miniLogo}
          onClick={() => {
            router.push("/");

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
            className={`${styles.tab} ${
              currenttab === "/dashboard/k/chores" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/k/chores")}
          >
            <ChoresSvg className={styles.icon} />
            <p className={styles.tabtitle}>Chores</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/k/quest" ||
              currenttab.indexOf("/dashboard/k/quest") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/k/quest")}
          >
            <CoursesSvg className={styles.icon} />
            <p className={styles.tabtitle}>Knowledge Quest</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/k/games" ||
              currenttab.indexOf("/dashboard/k/game") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/k/games")}
          >
            <GameSvg className={styles.icon} />
            <p className={styles.tabtitle}>Games</p>
          </div>
          <div
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
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/k/store" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/k/store")}
          >
            <StoreSvg className={styles.icon} />

            <p className={styles.tabtitle}>Store</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/k/stocksimulator/[page]"
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/k/stocksimulator/home")}
          >
            <StockSvg className={styles.icon} />
            <p className={styles.tabtitle}>Stock Simulator</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/k/cryptosimulator/[page]"
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/k/cryptosimulator/home")}
          >
            <CryptoSvg className={styles.icon} />
            <p className={styles.tabtitle}>Crypto Simulator</p>
          </div>
          <LeftPannelToggle
            name="Resources"
            currenttab={currenttab}
            isActive={
              currenttab.indexOf("/dashboard/k/blog") !== -1 ||
              currenttab.indexOf("/dashboard/k/calculator") !== -1 ||
              currenttab.indexOf("/dashboard/k/quiz") !== -1 ||
              currenttab.indexOf("/dashboard/k/dailyquestion") !== -1 ||
              currenttab.indexOf("/dashboard/k/leaderboards") !== -1
            }
            items={[
              {
                name: "Blogs",
                pushto: "/dashboard/k/blogs",
                icon: <BlogSvg />,
              },
              {
                name: "Calculators",
                pushto: "/dashboard/k/calculators",
                icon: <CalcSvg />,
              },
              {
                name: "Quiz",
                pushto: "/dashboard/k/quiz",
                icon: <QuizIconSvg />,
              },
              {
                name: "Leaderboards",
                pushto: "/dashboard/k/leaderboards",
                icon: <LeaderboardSvg />,
              },
              {
                name: "Question a day",
                pushto: "/dashboard/k/dailyquestion",
                icon: <QuizIconSvg />,
              },
            ]}
            icon={<AssessmentOutlinedIcon />}
          />
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
            <p className={styles.tabtitle}>Knowledge Quest</p>
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
          </div>
          <div
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
            icon={<AssessmentOutlinedIcon />}
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
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/chores" ||
              currenttab.indexOf("/dashboard/p/managechore") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/p/chores")}
          >
            <ChoresSvg className={styles.icon} />
            <p className={styles.tabtitle}>Chores</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/p/quests" ||
              currenttab.indexOf("/dashboard/p/quest") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/p/quests")}
          >
            <CoursesSvg className={styles.icon} />
            <p className={styles.tabtitle}>Quests</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/p/games" ||
              currenttab.indexOf("/dashboard/p/game") !== -1 ||
              currenttab.indexOf("dashboard/w/moneyace") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/p/games")}
          >
            <GameSvg className={styles.icon} />
            <p className={styles.tabtitle}>Games</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/store" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/p/store")}
          >
            <StoreSvg className={styles.icon} />
            <p className={styles.tabtitle}>Store</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/partners" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/p/partners")}
          >
            <GroupsOutlinedIcon className={styles.partnericon} />
            <p className={styles.tabtitle}>Partners</p>
          </div>
          <LeftPannelToggle
            name="Resources"
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

              {
                name: "Quiz",
                pushto: "/dashboard/p/quiz",
                icon: <QuizIconSvg />,
              },
              {
                name: "Quiz leaderboard",
                pushto: "/dashboard/p/leaderboard",
                icon: <LeaderboardSvg />,
              },
              {
                name: "Question a day",
                pushto: "/dashboard/p/dailyquestion",
                icon: <QuizIconSvg />,
              },
            ]}
            icon={<AssessmentOutlinedIcon />}
          />
        </div>
      )}
      <div className={styles.bottom}>
        <div className={styles.brandtext}>
          <div className={styles.socials}>
            <a
              href="https://www.facebook.com/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
            >
              <Fb className={styles.social} />
            </a>
            <a
              href="https://www.instagram.com/upsurge.india/"
              target="_blank"
              rel="noreferrer"
            >
              <Insta className={styles.social} />
            </a>
            <a
              href="https://www.linkedin.com/company/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedIN className={styles.socialyt} />
            </a>
          </div>
          <a
            className={styles.whatsapp}
            href="https://wa.me/918287433304"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon className={styles.icon} />
            Connect on whatsapp
          </a>
          <div className={styles.terms}>
            <p
              onClick={() => {
                settermmode("terms");
                setshowterm(true);
              }}
            >
              Terms & Conditions
            </p>
            <p
              onClick={() => {
                settermmode("privacy");
                setshowterm(true);
              }}
            >
              Privacy Policy
            </p>
          </div>
          <div className={styles.copyright}>
            © Surgeup Technologies Private Limited. {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLeftPanel;
