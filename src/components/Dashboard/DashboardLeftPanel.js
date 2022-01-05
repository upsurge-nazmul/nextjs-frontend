import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Dashboard/dashboardleftpanel.module.scss";
import BlogSvg from "../SVGcomponents/BlogSvg";
import ChoresSvg from "../SVGcomponents/ChoresSvg";
import CoursesSvg from "../SVGcomponents/CoursesSvg";
import GameSvg from "../SVGcomponents/GameSvg";
import HomeSvg from "../SVGcomponents/HomeSvg";
import KidSvg from "../SVGcomponents/KidsSvg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LeaderboardSvg from "../SVGcomponents/LeaderboardSvg";
import Logo from "../SVGcomponents/Logo";
import MiniLogo from "../SVGcomponents/MiniLogo";
import QuizIconSvg from "../SVGcomponents/QuizIconSvg";
import RewardSvg from "../SVGcomponents/RewardSvg";
import StoreSvg from "../SVGcomponents/StoreSvg";
import CalcSvg from "../SVGcomponents/CalcSvg";
import LinkedIN from "../SVGcomponents/LinkedInSvg";
import Insta from "../SVGcomponents/Insta";
import Fb from "../SVGcomponents/Fb";
import Terms from "../Home/Terms";
import PricingSvg from "../SVGcomponents/PricingSvg";
function DashboardLeftPanel({ type, hidelogo, fixed }) {
  const router = useRouter();
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
    <div className={`${styles.dashboardLeftPanel} ${fixed && styles.fixed}`}>
      {showterm && <Terms setshowterm={setshowterm} termmode={termmode} />}

      {hidelogo ? null : width > 1300 ? (
        <Logo
          className={styles.dashboardLogo}
          onClick={() => {
            if (type === "kid") router.push("/dashboard/k");
            if (type === "waitlist") router.push("/dashboard/w");
            else router.push("/dashboard/p");
          }}
        />
      ) : (
        <MiniLogo
          className={styles.miniLogo}
          onClick={() => {
            if (type === "kid") router.push("/dashboard/k");
            if (type === "waitlist") router.push("/dashboard/w");
            else router.push("/dashboard/p");
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
            className={`${styles.tab} ${
              currenttab === "/dashboard/k/store" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/k/store")}
          >
            <StoreSvg className={styles.icon} />

            <p className={styles.tabtitle}>Store</p>
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
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/leaderboards" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/w/leaderboards")}
          >
            <LeaderboardSvg className={styles.icon} />
            <p className={styles.tabtitle}>Leaderboard</p>
          </div>
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/w/games" ||
              currenttab.indexOf("dashboard/w/game") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/games")}
          >
            <GameSvg className={styles.icon} />

            <p className={styles.tabtitle}>Games</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/w/quiz" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/w/quiz")}
          >
            <QuizIconSvg className={styles.icon} />
            <p className={styles.tabtitle}>Quiz</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/w/calculators" ||
              currenttab.indexOf("/dashboard/w/calculator") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/calculators")}
          >
            <CalcSvg className={styles.icon} />
            <p className={styles.tabtitle}>Calculators</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/w/blogs" ||
              currenttab.indexOf("dashboard/w/blog") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/w/blogs")}
          >
            <BlogSvg className={styles.icon} />
            <p className={styles.tabtitle}>Blogs</p>
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
          <div
            className={`${styles.tab} ${
              currenttab === "/dashboard/p/mykids" ? styles.activetab : ""
            }`}
            onClick={() => router.push("/dashboard/p/mykids")}
          >
            <KidSvg className={styles.icon} />
            <p className={styles.tabtitle}>My Kids</p>
          </div>
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
              currenttab === "/dashboard/p/blogs" ||
              currenttab.indexOf("dashboard/p/blog") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/dashboard/p/blogs")}
          >
            <BlogSvg className={styles.icon} />
            <p className={styles.tabtitle}>Blogs</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/courses" || currenttab.indexOf("/courses") !== -1
                ? styles.activetab
                : ""
            }`}
            onClick={() => router.push("/courses")}
          >
            <CoursesSvg className={styles.icon} />
            <p className={styles.tabtitle}>Courses</p>
          </div>
          <div
            className={`${styles.tab}  ${
              currenttab === "/dashboard/p/games" ||
              currenttab.indexOf("/dashboard/p/game") !== -1
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
