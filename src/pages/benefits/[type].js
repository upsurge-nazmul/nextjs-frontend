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
  function getheight(el) {
    if (!el) {
      return 0;
    }
    var top = el.offsetTop;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
    }
    return top;
  }
  useEffect(() => {
    const experimential = document.getElementById("experimential");
    const entrepreneuership = document.getElementById("entrepreneuership");
    function hanldemove(element, index) {
      var headerOffset = 180;
      var elementPosition = getheight(element);
      var offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    const rewards = document.getElementById("rewards");
    if (type) {
      if (type === "experimential") {
        hanldemove(experimential);
      } else if (type === "entrepreneuership") {
        hanldemove(entrepreneuership);
      } else if (type === "rewards") {
        hanldemove(rewards);
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
