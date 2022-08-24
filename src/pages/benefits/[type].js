import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import Entrepreneurship from "../../components/Benefits/Entrepreneurship";
import Experimential from "../../components/Benefits/Experimential";
import Financial from "../../components/Benefits/Financial";
import Rewards from "../../components/Benefits/RewardsSection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import Values from "../../components/Home/Values";
import Skills from "../../components/Benefits/Skills";
import LoginApis from "../../actions/apis/LoginApis";
import { MainContext } from "../../context/Main";
import Seo from "../../components/Seo";

function BenfitsPage({ userdata, title }) {
  const router = useRouter();
  const type = router.query.type;
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);

  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

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
    const entrepreneurship = document.getElementById("entrepreneurship");
    const skills = document.getElementById("skills");
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
      } else if (type === "entrepreneurship") {
        hanldemove(entrepreneurship);
      } else if (type === "rewards") {
        hanldemove(rewards);
      } else if (type === "skills") {
        hanldemove(skills);
      }
    }
  }, [router]);

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
      <Seo title={title} desc={title} />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Values insidebenefits />
      <Financial id="financialsection" />
      <Experimential id="experimential" />
      <Entrepreneurship id="entrepreneurship" />
      <Rewards id="rewards" />
      <Skills id="skills" />
      <JoinUs />
      <Footer />
    </div>
  );
}

export default BenfitsPage;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  let title = "upsurge benefits";
  if (params.type === "experimential") {
    title = "Money investment workshop for adults";
  } else if (params.type === "entrepreneurship") {
    title = "Startup workshop for kids and teen in india";
  }
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg || "";
      return { props: { title } };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
          title,
        },
      };
    }
  } else {
    return {
      props: {
        isLogged: false,
        msg: "cannot get token",
        userdata: null,
        title,
      },
    };
  }
}
