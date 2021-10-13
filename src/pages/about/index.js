import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import CurveJobSection from "../../components/SVGcomponents/CurveJobSection";
import YourPhotoSvg from "../../components/SVGcomponents/YourPhotoSvg";
import styles from "../../styles/about/about.module.scss";

export default function About() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);

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
    <div className={styles.aboutPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        stickyheader={stickyheader}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.ball1} />
          <div className={styles.ball2} />
          <div className={styles.ball3} />
          <div className={styles.ball4} />
          <p className={styles.heading}>About Us</p>
          <p className={styles.subheading}>
            A family-focused financial suite, offering financial education for
            kids through interactive educational content, games, and gamified
            real-life task and behavior management.
          </p>
        </div>
        <div className={styles.visionSection}>
          <div className={styles.left}>
            <p className={styles.des}>
              To develop financial literacy and entrepreneurship skills amongst
              children and young adults to make them financially successful and
              better decision makers
            </p>
          </div>
          <div className={styles.imgwrapper}>
            <img src="https://i.ibb.co/jLjKJ4x/Untitled-design-32.png" alt="" />
          </div>
        </div>
        <div className={styles.missionSection}>
          <div className={styles.left}>
            <p className={styles.des}>
              We believe that understanding personal finance, career
              development, investing and entrepreneurship are critical life
              skills, and we are committed to promoting financial and
              entrepreneurial literacy in an experiential, fun and effective
              way.
            </p>
          </div>
          <div className={styles.imgwrapper}>
            <img
              src="https://i.ibb.co/Tq2s48b/Untitled-design-33-removebg-preview.png"
              alt=""
            />
          </div>
        </div>
        <div className={styles.thirdSection}>
          <div className={styles.left}>
            <p className={styles.des}>
              Join us in our journey to make the next generation better equipped
              to be financially successful. Working with developmental,
              financial and experiential experts, we have prepared a gamified
              curriculum to encourage learning, and our proprietary games to
              make learning fun and effective. In addition, children earn
              UniCoins, our virtual currency, by completing quests, playing
              games, and completing chores - rewards they can redeem against
              real prizes from a curated selection of brands.
            </p>
          </div>
          <div className={styles.imgwrapper}>
            <img
              src="https://i.ibb.co/Xpd6HLk/Whats-App-Image-2021-10-13-at-7-34-07-PM-removebg-preview.png"
              alt=""
            />
          </div>
        </div>

        <JoinUs />

        {/* <div className={styles.wrapper}>
          <div className={styles.role}>
            <img
              src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <p className={styles.name}>Varun Jairath</p>
            <p className={styles.position}>Co-Founder</p>
          </div>
          <div className={styles.role}>
            <img
              src="https://images.unsplash.com/photo-1474293507615-951863a0f942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
            <p className={styles.name}>Karan Baweja</p>
            <p className={styles.position}>Co-Founder</p>
          </div>
        </div>
        */}
        {/* <div className={styles.secondheading} style={{ marginTop: "100px" }}>
          Mission
        </div>
        <p className={styles.des}>
          Make learning financial literacy and entrepreneurship fun
        </p> */}
        {/* <div className={styles.wrapper} style={{ marginBottom: "100px" }}>
          <div className={styles.team}>
            <img
              src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <p className={styles.name}>Temp</p>
            <p className={styles.position}>Developer</p>
          </div>
          <div className={styles.team}>
            <img
              src="https://images.unsplash.com/photo-1474293507615-951863a0f942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
            <p className={styles.name}>Temp</p>
            <p className={styles.position}>Developer</p>
          </div>
          <div className={styles.team}>
            <img
              src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <p className={styles.name}>Temp</p>
            <p className={styles.position}>Developer</p>
          </div>
          <div className={styles.team}>
            <img
              src="https://images.unsplash.com/photo-1474293507615-951863a0f942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
            <p className={styles.name}>Temp</p>
            <p className={styles.position}>Developer</p>
          </div>
          <div className={styles.team}>
            <img
              src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <p className={styles.name}>Temp</p>
            <p className={styles.position}>Developer</p>
          </div>
          <div className={styles.team}>
            <img
              src="https://images.unsplash.com/photo-1474293507615-951863a0f942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
            <p className={styles.name}>Temp</p>
            <p className={styles.position}>Developer</p>
          </div>
          <div className={styles.team}>
            <img
              src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <p className={styles.name}>Temp</p>
            <p className={styles.position}>Developer</p>
          </div>
          <div className={styles.team}>
            <img
              src="https://images.unsplash.com/photo-1474293507615-951863a0f942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
            <p className={styles.name}>Temp</p>
            <p className={styles.position}>Developer</p>
          </div>
        </div>
         */}
        {/* <div className={styles.ctc}>
          <div className={styles.text}>
            Help us build
            <br /> extraordinary things.
          </div>
          <div className={styles.button}>View Careers</div>
          <CurveJobSection className={styles.curve} />
          <YourPhotoSvg className={styles.yourname} />
          <img className={styles.cover} src="/images/jobs.png" alt="" />
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
