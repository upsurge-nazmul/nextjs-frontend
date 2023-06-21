import { useEffect, useState } from "react";
import SchoolHeroSection from "../../components/School/HeroSection";
import PageTitle from "../../components/PageTitle";
import Header from "../../components/Header/Header";
import Toast from "../../components/Toast";
import LeftPanel from "../../components/LeftPanel";
import JoinUs from "../../components/Home/JoinUs";
import Footer from "../../components/Home/Footer";
import ProgramSection from "../../components/School/ProgramSection";
import ReadMoreSection from "../../components/School/ReadMoreSection";
import FinancialSection from "../../components/School/FinancialSection";
import EntrepreneurshipSection from "../../components/School/EntrepreneurshipSection";
import SkillsSection from "../../components/School/SkillsSection";
import WhyChoose from "../../components/School/WhyChoose";
import PartnerSchoolSection from "../../components/School/PartnerSchoolSection";
import TestimonialsSection from "../../components/School/TestimonialsSection";
import ContactUsSection from "../../components/School/ContactUsSection";
import ContactForm from "../../components/School/ContactForm";

function SchoolsPage() {
  const [stickyheader, setstickyheader] = useState(false);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [authmode, setauthmode] = useState("");
  const [error, setError] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    history.scrollRestoration = "manual";
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
    <>
      <PageTitle />
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
      <SchoolHeroSection />
      <ProgramSection />
      <ReadMoreSection />
      {/* <FinancialSection /> */}
      {/* <EntrepreneurshipSection /> */}
      {/* <SkillsSection /> */}
      <WhyChoose />
      <PartnerSchoolSection />
      <TestimonialsSection />
      <ContactUsSection />
      <ContactForm />
      <Footer />
    </>
  );
}

export default SchoolsPage;
