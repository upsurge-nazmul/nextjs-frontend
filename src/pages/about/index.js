import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import LeftPanel from "../../components/LeftPanel";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import styles from "../../styles/about/about.module.scss";
import Image from "next/image";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import Jasper from "../../components/SVGcomponents/Jasper";
export default function About() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const team = [
    {
      name: "Karan Baweja",
      img: "",
      role: "",
      link: "",
    },
    {
      name: "Rashi Thakur",
      img: "",
      role: "",
      link: "",
    },
    {
      name: "Saurabh Dixit",
      img: "",
      role: "",
      link: "",
    },
    {
      name: "Amit",
      img: "",
      role: "",
      link: "",
    },
    {
      name: "Abhishek",
      img: "",
      role: "",
      link: "",
    },
  ];
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
          <p className={styles.heading}>About Us</p>
          <p className={styles.subheading}>
            We are a family-focused financial platform that offers financial
            education for children through interactive educational content,
            games, and gamified real-life responsibility management.
          </p>
        </div>
        <div className={styles.visionSection}>
          <div className={styles.left}>
            <p className={styles.heading}>Our Goal = Financial Freedom</p>
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
          </div>
          <div className={styles.imgwrapper}>
            <img
              src="https://i.ibb.co/wc7Dh1d/Untitled-design-57-removebg.png"
              alt=""
            />
          </div>
        </div>
        <div className={styles.thirdSection}>
          <div className={styles.left}>
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
            <Jasper className={styles.jasper} />
          </div>
        </div>
        {/* <p className={styles.teamheading}>Team Upsurge</p>

        <div className={styles.wrapper}>
          <div className={styles.role}>
            <div className={styles.img}>
              <div className={styles.hover}>
                <LinkedIN className={styles.linkedin} />
              </div>
              <Image
                src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className={styles.name}>Karan Baweja</p>
            <p className={styles.position}>Founder</p>
          </div>
          <div className={styles.role}>
            <div className={styles.img}>
              <div className={styles.hover}>
                <LinkedIN className={styles.linkedin} />
              </div>
              <Image
                src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className={styles.name}>Rashi Thakur</p>
            <p className={styles.position}>{`Learning & Development`}</p>
          </div>
          <div className={styles.role}>
            <div className={styles.img}>
              <div className={styles.hover}>
                <LinkedIN className={styles.linkedin} />
              </div>
              <Image
                src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className={styles.name}>Saurabh Dixit</p>
            <p className={styles.position}>{`Product & Technology Leader`}</p>
          </div>
          <div className={styles.role}>
            <div className={styles.img}>
              <div className={styles.hover}>
                <LinkedIN className={styles.linkedin} />
              </div>
              <Image
                src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className={styles.name}>Amit</p>
            <p className={styles.position}>{`Game Development Leader`}</p>
          </div>
          <div className={styles.role}>
            <div
              className={styles.img}
              onClick={() => window.open("http://google.com", "_blank")}
            >
              <div className={styles.hover}>
                <LinkedIN className={styles.linkedin} />
              </div>
              <Image
                src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className={styles.name}>Abhishek</p>
            <p className={styles.position}>{`Game Development Leader`}</p> 
          </div>
        </div>
        <p className={styles.teamheading}>Our Mentors</p>

        <div className={styles.wrapper}>
          <div className={styles.role}>
            <img
              src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGJ1aXNpbmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <p className={styles.name}>Varun Jairath</p>
          </div>
          <div className={styles.role}>
            <img
              src="https://images.unsplash.com/photo-1474293507615-951863a0f942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
            <p className={styles.name}>Anoop Jairath</p>
            <p className={styles.position}>{`Learning & Development`}</p>
          </div>
          <div className={styles.role}>
            <img
              src="https://images.unsplash.com/photo-1474293507615-951863a0f942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
            <p className={styles.name}>Medha Narayanan</p>
            <p className={styles.position}>{`Product & Technology Leader`}</p>
          </div>
          <div className={styles.role}>
            <img
              src="https://images.unsplash.com/photo-1474293507615-951863a0f942?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80"
              alt=""
            />
            <p className={styles.name}>{`Akshay Singh (tentative)`}</p>
          </div>
        </div> 
        {/*  */}
        <JoinUs />

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
