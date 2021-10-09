import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Games from "../../components/Products/Games";
import KnowledgeQuest from "../../components/Products/KnowledgeQuest";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Pricing/pricing.module.scss";
import Chores from "../../components/Products/Chores";
import LiveClasses from "../../components/Products/LiveClasses";

export default function Benefits() {
  const router = useRouter();
  const type = router.query.type;

  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  useEffect(() => {
    const games = document.getElementById("gamessection");
    const chores = document.getElementById("choressection");
    const classes = document.getElementById("classessection");

    if (type) {
      console.log(type);
      if (type === "games") {
        games.scrollIntoView({
          behavior: "smooth",
        });
      } else if (type === "chores") {
        chores.scrollIntoView({
          behavior: "smooth",
        });
      } else if (type === "liveclasses") {
        classes.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [type]);
  return (
    <div className={styles.pricingPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <KnowledgeQuest id="knowledge-quest" />
      <Games id="gamessection" />
      <Chores id="choressection" />
      <LiveClasses id="classessection" />
      <Footer />
    </div>
  );
}
