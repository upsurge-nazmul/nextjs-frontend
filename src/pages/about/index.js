import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import LeftPanel from "../../components/LeftPanel";
import CurveJobSection from "../../components/SVGcomponents/CurveJobSection";
import YourPhotoSvg from "../../components/SVGcomponents/YourPhotoSvg";
import styles from "../../styles/about/about.module.scss";

export default function About() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);

  return (
    <div className={styles.aboutPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
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
            We are a financial literacy and entrepreneurship development program
            for children between the ages of 7 to 18. We believe in practical
            learning and have developed our own curriculums and games to make
            learning fun, effective and rewarding for children.
          </p>
        </div>
        <div className={styles.secondheading}>Our Leadership</div>
        <div className={styles.wrapper}>
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
        <div className={styles.secondheading} style={{ marginTop: "100px" }}>
          Our Team
        </div>
        <div className={styles.wrapper} style={{ marginBottom: "100px" }}>
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
        <div className={styles.ctc}>
          <div className={styles.text}>
            Help us build
            <br /> extraordinary things.
          </div>
          <div className={styles.button}>View Careers</div>
          <CurveJobSection className={styles.curve} />
          <YourPhotoSvg className={styles.yourname} />
          <img className={styles.cover} src="/images/jobs.png" alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
