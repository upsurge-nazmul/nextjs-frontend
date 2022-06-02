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
import { MainContext } from "../../context/Main";
import Seo from "../../components/Seo";
export default function Products({ userdata }) {
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
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);
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
      <LiveClasses id="classessection" />
      <JoinUs />
      <Footer />
    </div>
  );
}
export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg || "";
      return { props: {} };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", userdata: null },
    };
  }
}
