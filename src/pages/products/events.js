import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import JoinUs from "../../components/Home/JoinUs";
import Footer from "../../components/Home/Footer";
import EventsSection from "../../components/PreSignupEvents/EventsSection";
import LiveSection from "../../components/PreSignupEvents/LiveSection";

const PreSignUpEvents = () => {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authMode, setAuthMode] = useState("");

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 1) {
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
      <PageTitle
        title="Pricing for upsurge Financial Literacy Platform for Kids and School Students in India"
        content="Get cost-effective pricing plans of upsurge financial literacy platform for kids, financial literacy courses for kids and entrepreneurship courses with educational games for kids"
      />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        authmode={authMode}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />

      <EventsSection />
      <LiveSection />
      <JoinUs />
      <Footer />
    </div>
  );
};

export default PreSignUpEvents;
