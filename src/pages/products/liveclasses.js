import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Pricing/pricing.module.scss";
import LiveClasses from "../../components/Products/LiveClasses";
import validator from "validator";
import Toast from "../../components/Toast";
import Seo from "../../components/Seo";
import ExpertsSection from "../../components/Products/quest/ExpertsSection";
import KidProgress from "../../components/Products/quest/KidProgress";
import HighlightsCounter from "../../components/Home/HighlightsCounter";
import { useContext } from "react";
import { MainContext } from "../../context/Main";
import LiveClassesSlider from "../../components/Products/LiveClassesSlider";

export default function Products() {
  const router = useRouter();
  const [stickyheader, setstickyheader] = useState(false);
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [error, setError] = useState("");
  const [authmode, setauthmode] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [email, setEmail] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const { userdata } = useContext(MainContext);
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
        title={"Financial workshop for kids and teen in india"}
        desc={"Financial workshop for kids and teen in india"}
      />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        authmode={authmode}
        setauthmode={setauthmode}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <Toast data={toastdata} />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <LiveClasses
        id="classessection"
        setshowpopup={setshowpopup}
        userdata={userdata}
      />
      <LiveClassesSlider />
      <HighlightsCounter />
      <KidProgress />
      <ExpertsSection />
      <Footer />
    </div>
  );
}
