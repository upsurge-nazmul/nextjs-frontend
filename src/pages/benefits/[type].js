import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Entrepreneuership from "../../components/Benefits/Entrepreneuership";
import Experimential from "../../components/Benefits/Experimential";
import Financial from "../../components/Benefits/Financial";
import Rewards from "../../components/Benefits/RewardsSection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";

function BenfitsPage() {
  const router = useRouter();
  const type = router.query.type;
  const [stickyheader, setstickyheader] = useState(false);

  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  useEffect(() => {
    const experimential = document.getElementById("experimential");
    const entrepreneuership = document.getElementById("entrepreneuership");
    const rewards = document.getElementById("rewards");
    if (type) {
      if (type === "experimential") {
        experimential.scrollIntoView({
          behavior: "smooth",
        });
      } else if (type === "entrepreneuership") {
        entrepreneuership.scrollIntoView({
          behavior: "smooth",
        });
      } else if (type === "rewards") {
        rewards.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [type]);

  useEffect(() => {
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
    <div>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Financial id="financialsection" />
      <Experimential id="experimential" />
      <Entrepreneuership id="entrepreneuership" />
      <Rewards id="rewards" />
      <Footer />
    </div>
  );
}

export default BenfitsPage;
