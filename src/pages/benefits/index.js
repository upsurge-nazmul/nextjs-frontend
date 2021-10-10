import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Entrepreneuership from "../../components/Benefits/Entrepreneuership";
import Experimential from "../../components/Benefits/Experimential";
import Financial from "../../components/Benefits/Financial";
import Rewards from "../../components/Benefits/RewardsSection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";

function BenfitsPage() {
  const router = useRouter();

  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);

  return (
    <div>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Financial />
      <Experimential />
      <Entrepreneuership />
      <Rewards />

      <Footer />
    </div>
  );
}

export default BenfitsPage;
