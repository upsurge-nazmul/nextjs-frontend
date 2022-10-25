import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import styles from "../../styles/about/about.module.scss";
import Jasper from "../../components/SVGcomponents/Jasper";
import LoginApis from "../../actions/apis/LoginApis";
import { MainContext } from "../../context/Main";
import PageTitle from "../../components/PageTitle";
import IntegritySvg from "../../components/SVGcomponents/IntegritySvg";
import FunSvg from "../../components/SVGcomponents/FunSvg";
import ExcellenceSvg from "../../components/SVGcomponents/ExcellenceSvg";
import PassionSvg from "../../components/SVGcomponents/PassionSvg";

export default function About({ userdata }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const { setuserdata, theme } = useContext(MainContext);
  useEffect(() => {
    if (userdata) {
      setuserdata(userdata);
    }
  }, [userdata]);

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
    <div
      className={`${styles.aboutPage} ${
        theme === "dark" && styles.darkaboutPage
      }`}
    >
      <PageTitle />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        stickyheader={stickyheader}
        showpopup={showpopup}
        setshowpopup={setshowpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.background}>
            <div className={styles.curvecontainer}>
              <Curve1 className={styles.curve1} />
              <Curve2 className={styles.curve2} />
            </div>
          </div>
          <div className={styles.ball1} />
          <div className={styles.ball2} />
          <div className={styles.ball3} />
          <div className={styles.ball4} />
          <p className={styles.heading}>About us</p>
          <p className={styles.subheading}>
            We are a family-focused financial platform that offers financial
            education for children through interactive educational content,
            games, and gamified real-life responsibility management.
          </p>
        </div>
        <div className={styles.visionSection}>
          <div className={styles.left}>
            <p className={styles.heading}>Our goal = financial freedom</p>
            <p className={styles.des}>
              Financial Freedom is not being very rich or having 5 cars.
              Financial Freedom put simply is when you do not HAVE to work to
              pay your bills. You achieve this freedom when you have enough
              saved up to cover your living expenses for the rest of your life!
            </p>
          </div>
          <div className={styles.imgwrapper}>
            <img src="/images/home/girlvision.png" alt="" />
          </div>
        </div>
        <div className={styles.missionSection}>
          <div className={styles.left}>
            <p className={styles.heading}>Mission upsurge</p>

            <p className={styles.des}>
              We aim to help raise a financially capable generation by
              developing financial literacy and entrepreneurship skills amongst
              children and young adults, to make them capable of making prudent
              financial decisions and achieving their financial freedom.
            </p>
            <div className={styles.lineSpace} />
            <p className={styles.des}>
              We believe that understanding personal finance, career
              development, investing and entrepreneurship are critical life
              skills that have been ignored for far too long, and we are
              committed to promoting financial and entrepreneurial literacy in
              an experiential, fun and effective way. So, working with
              developmental, financial and experiential experts, we have
              prepared a gamified curriculum and exclusive games to encourage
              learning.
            </p>
          </div>
          <div className={styles.imgwrapper}>
            <img
              src="https://imgcdn.upsurge.in/images/Untitled-design-57-removebg.png"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
        <div className={styles.thirdSection}>
          <p className={styles.heading}>Values</p>
          <div className={styles.valueContainer}>
            <div className={styles.values}>
              <div className={styles.valueItem}>
                <IntegritySvg className={styles.valueIcon} />
                <div className={styles.valueContent}>
                  {`Integrity – We do the right thing! We say what we mean, and mean
                what we say. We stick to our commitments, treat everyone
                equitably, and communicate honestly. Unity - We are one! We
                support each other & go above and beyond to help each other.`}
                </div>
              </div>
              <div className={styles.valueItem}>
                <FunSvg className={styles.valueIcon} />
                <div className={styles.valueContent}>
                  {`Fun – We have fun while working, create fun products & ensure
                that users have fun! Creativity & Innovation - Think outside the
                box, & challenge the status-quo Ownership - We own our projects
                like entrepreneurs & are responsible for their success.`}
                </div>
              </div>
            </div>

            <div className={styles.imgwrapper}>
              <Jasper className={styles.jasper} />
            </div>

            <div className={styles.values}>
              <div className={styles.valueItem}>
                <ExcellenceSvg className={styles.valueIcon} />
                <div className={styles.valueContent}>
                  {`Excellence – We pursue excellence to create exceptional products
                & experiences.`}
                </div>
              </div>
              <div className={styles.valueItem}>
                <PassionSvg className={styles.valueIcon} />
                <div className={styles.valueContent}>
                  {`Passion – We are passionate about creating products that users
                love & benefit from Drive - Our passion drives us to do more &
                keep improving!`}
                </div>
              </div>
            </div>
          </div>
        </div>

        <JoinUs />
      </div>
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
