import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
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
import KnowledgeQuestMainSection from "../../components/Products/KnowledgeQuestMainSection";
import { MainContext } from "../../context/Main";
import PageTitle from "../../components/PageTitle";
import TravelSection from "../../components/Products/quest/TravelSection";
import ExpertsSection from "../../components/Products/quest/ExpertsSection";
import ExploreSection from "../../components/Products/quest/ExploreSection";
import SmarterMoneySection from "../../components/Products/quest/SmarterMoneySection";
import TestiMonial from "../../components/Home/TestiMonial";
import HighlightsCounter from "../../components/Home/HighlightsCounter";
import KidProgress from "../../components/Products/quest/KidProgress";

export default function Products() {
  const router = useRouter();
  const type = router.query.type;
  const [stickyheader, setstickyheader] = useState(false);
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [error, setError] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [email, setEmail] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const { theme } = useContext(MainContext);

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
    <div
      className={`${styles.pricingPage} ${
        theme === "dark" && styles.darkquest
      }`}
    >
      <PageTitle
        title="Best Financial Literacy and Entrepreneurship Course and Classes for Kids in India | upsurge Courses"
        content="upsurge is the Best Platform for children to start building wealth through Financial Literacy Courses and Classes in India, also providing Entrepreneurship Course for Kids in India"
      />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        authmode={authmode}
        setauthmode={setauthmode}
        settoastdata={settoastdata}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <Toast data={toastdata} />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <KnowledgeQuest
        email={email}
        setEmail={setEmail}
        check={check}
        authmode={authmode}
        setauthmode={setauthmode}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        error={error}
        showwaitlistblock={showwaitlistblock}
        showauth={showauth}
        settoastdata={settoastdata}
        setshowwaitlistblock={setshowwaitlistblock}
        id="knowledge-quest"
      />
      <TravelSection />
      <TestiMonial />
      <HighlightsCounter />
      <KidProgress />
      <ExpertsSection />
      {/* <ExploreSection /> */}
      {/* <SmarterMoneySection /> */}
      {/* <KnowledgeQuestMainSection
        email={email}
        setEmail={setEmail}
        check={check}
        authmode={authmode}
        setauthmode={setauthmode}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        error={error}
        showwaitlistblock={showwaitlistblock}
        showauth={showauth}
        settoastdata={settoastdata}
        setshowwaitlistblock={setshowwaitlistblock}
        id="knowledge-quest-main"
      /> */}
      {/* <JoinUs /> */}
      <Footer />
    </div>
  );
}
