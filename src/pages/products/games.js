import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Games from "../../components/Products/Games";
import KnowledgeQuest from "../../components/Products/KnowledgeQuest";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Pricing/pricing.module.scss";
import Chores from "../../components/Products/Chores";
import LiveClasses from "../../components/Products/LiveClasses";
import validator from "validator";
import LoginApis from "../../actions/apis/LoginApis";
import JoinUs from "../../components/Home/JoinUs";
import Toast from "../../components/Toast";
import Seo from "../../components/Seo";
import GameArena from "../../components/Products/GameArena";
import HighlightsCounter from "../../components/Home/HighlightsCounter";
import KidProgress from "../../components/Products/quest/KidProgress";
import ExpertsSection from "../../components/Products/quest/ExpertsSection";
import AllGamesCarousel from "../../components/Products/AllGamesCarousel";

export default function Products() {
  const router = useRouter();
  const type = router.query.type;
  const [stickyheader, setstickyheader] = useState(false);
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [error, setError] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [email, setEmail] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  async function check() {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setError("Enter valid email address");
    } else {
      setshowwaitlistblock(true);
      // let response = await LoginApis.saveemail({ email: email });
      // if (response) {
      //   if (response.data.success) {
      //     router.push("/waitlist/" + email);
      //   } else {
      //     setError(response.data.message);
      //   }
      // } else {
      //   setError("Error connecting to server");
      // }
      // setshowauth(true);
      // setauthmode("parent");
      // setmailfromhome(email);
    }
  }
  return (
    <div className={styles.pricingPage}>
      <Seo
        title={"Investing and compounding games for indian kids"}
        desc={"Investing and compounding games for indian kids"}
      />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        authmode={authmode}
        setauthmode={setauthmode}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <Toast data={toastdata} />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <GameArena setshowpopup={setshowpopup} />
      {/* <Games id="gamessection" /> */}
      <AllGamesCarousel />
      <HighlightsCounter />
      <KidProgress />
      <ExpertsSection />
      <Footer />
    </div>
  );
}
