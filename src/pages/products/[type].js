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
import validator from "validator";
import LoginApis from "../../actions/apis/LoginApis";
export default function Benefits() {
  const router = useRouter();
  const type = router.query.type;
  const [stickyheader, setstickyheader] = useState(false);

  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
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
    const games = document.getElementById("gamessection");
    const chores = document.getElementById("choressection");
    const classes = document.getElementById("classessection");
    function hanldemove(element, index) {
      var headerOffset = 180;
      var elementPosition = getheight(element);
      var offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      // sections[index].scrollIntoView({
      //   behavior: "smooth",
      //   block: "start",
      //   inline: "nearest",
      // });
    }
    if (type) {
      console.log(type);
      if (type === "games") {
        hanldemove(games);
      } else if (type === "chores") {
        hanldemove(chores);
      } else if (type === "liveclasses") {
        hanldemove(classes);
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
  async function check() {
    if (!validator.isEmail(email)) {
      setError("Enter valid email address");
    } else {
      let response = await LoginApis.getwaitlistdetails({ email: email });
      if (response) {
        if (response.data.success) {
          router.push("/waitlist/" + email);
        } else {
          setError(response.data.message);
        }
      } else {
        setError("Error connecting to server");
      }
      // setshowauth(true);
      // setauthmode("parent");
      // setmailfromhome(email);
    }
  }
  return (
    <div className={styles.pricingPage}>
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
      <KnowledgeQuest
        email={email}
        setEmail={setEmail}
        check={check}
        error={error}
        id="knowledge-quest"
      />
      <Games id="gamessection" />
      <Chores
        email={email}
        check={check}
        setEmail={setEmail}
        error={error}
        id="choressection"
      />
      <LiveClasses id="classessection" />
      <Footer />
    </div>
  );
}
