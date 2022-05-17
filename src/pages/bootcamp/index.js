import React, { useState } from "react";
import FaqSection from "../../components/Home/FaqSection";
import Footer from "../../components/Home/Footer";
import JoinUs from "../../components/Home/JoinUs";
import TestiMonial from "../../components/Home/TestiMonial";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import LogoWhite from "../../components/SVGcomponents/LogoWhite";
import styles from "../../styles/summercamp/summercamp.module.scss";
import WaitlistPopUp from "../../components/WaitlistPopUp";
import { useRouter } from "next/dist/client/router";
import ModernInputBox from "../../components/ModernInputBox";
import {
  onlyNum,
  onlyText,
  removenonnumber,
  vaildateEmail,
  vaildatePhone,
} from "../../helpers/validationHelpers";
import TickSvg from "../../components/SVGcomponents/TickSvg";
import Jasper from "../../components/SVGcomponents/Jasper";
import SummerCampApis from "../../actions/apis/SummerCampApis";
import Toast from "../../components/Toast";
import SummerSvg from "../../components/SVGcomponents/SummerSvg";
import BootCampForm from "../../components/bootcamp/BootCampForm";

export default function SummerBootcamp() {
  const [error, seterror] = useState("");
  const [done, setdone] = useState(false);
  const [email, setemail] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  const router = useRouter();
  async function check(e) {
    setshowpopup(true);
  }

  const features1 = [
    {
      image: "https://i.ibb.co/4gzTF1M/512x512.png",
      text: "Merit certificates",
      color: "#4166eb",
    },
    {
      image: "https://i.ibb.co/Pxj1M7t/order.png",
      text: "Goodies for every student!",
      color: "#fdcc03",
    },
    {
      image:
        "https://i.ibb.co/4ZLdNkp/pngkey-com-leadership-icon-png-3030137.png",
      text: "Team-based experiential workshops taken by MBAs, Entrepreneurs, Investors & learning experts",
      color: "#ff6263",
    },
    {
      image: "https://i.ibb.co/vktN76P/clipboard.png",
      text: "Engaging & immersive sessions designed to make learning fun & effective - include activities, group discussions, case studies & real-life projects",
      color: "#41d1be",
    },
  ];
  const features2 = [
    {
      image: "https://i.ibb.co/mtvZpm5/upsurgeround.png",
      color: "#ff9900",
      text: "Access to upsurge - India’s 1st learning-focused gaming platform to learn through play",
    },
    {
      color: "#83eb00",
      image: "https://i.ibb.co/HBHpLqh/blackboard.png",
      text: "MasterClasses on higher education & career development",
    },
    {
      image: "https://i.ibb.co/jrNhdZP/videoconference.png",
      color: "#ff5e98",
      text: "Webinar series with entrepreneurs, startup veterans & other experts",
    },
    {
      image: "https://i.ibb.co/8mHPqJY/win.png",
      color: "#00a7cc",
      text: "2,500 bonus UniCoins to redeem vouchers from brands such as Zomato & Amazon",
    },
  ];
  return (
    <div
      className={styles.summercamp}
      style={{ overflowY: showpopup ? "hidden" : "auto" }}
    >
      <div className={styles.banner}>
        <div className={styles.socials}>
          <a
            href="https://www.facebook.com/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <Fb className={styles.social} />
          </a>
          <a
            href="https://www.instagram.com/upsurge.india/"
            target="_blank"
            rel="noreferrer"
          >
            <Insta className={styles.social} />
          </a>
          <a
            href="https://www.linkedin.com/company/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIN className={styles.social} />
          </a>
        </div>
        <SummerSvg className={styles.summersvg} />
        <LogoWhite className={styles.logo} onClick={() => router.push("/")} />
        <p className={styles.heroheading}>Summer Bootcamp</p>
        <p className={styles.herosubheading}>
          {`First of it’s kind Summer Bootcamp to make children money-wise & entrepreneurial!
`}
        </p>
        <p className={` ${styles.herosubheading} ${styles.subherosubheading}`}>
          June 1 to July 3, 2022 | Registrations Close May 27, 2022
        </p>
        <p className={styles.error}>{error}</p>
        <div className={`${styles.signupBox} ${error && styles.errsignbox}`}>
          <div className={`${styles.button}`} onClick={check}>
            Sign up for a Free Demo
          </div>
        </div>
      </div>
      {showpopup && (
        <BootCampForm
          done={done}
          setdone={setdone}
          settoastdata={settoastdata}
          setshowpopup={setshowpopup}
        />
      )}
      <Toast data={toastdata} />
      <div className={styles.rest}>
        <div className={styles.rewards}>
          <p className={styles.heading} style={{ userSelect: "none" }}>
            About upsurge Summer Bootcamp
          </p>
          <p className={styles.summary}>
            {`First of it’s kind Summer Bootcamp to make children money-wise & entrepreneurial!
`}
          </p>
          <p
            className={styles.summary}
          >{`Team-based experiential workshops in small age-appropriate batches for children of ages 10+`}</p>
          <p className={`${styles.summary} ${styles.boldsummary}`}>
            {`Student teams will compete in challenges and games, & can win prizes upto ₹50,000`}
          </p>
        </div>
        <div className={styles.features}>
          {features1.map((item) => {
            return (
              <div
                className={styles.feature}
                key={item.text}
                style={{ backgroundColor: item.color }}
              >
                <img className={styles.image} src={item.image} alt="" />
                <p className={styles.text}>{item.text}</p>
              </div>
            );
          })}
        </div>
        <div className={`${styles.features} ${styles.featuresecond}`}>
          {features2.map((item) => {
            return (
              <div
                className={styles.feature}
                key={item.text}
                style={{ backgroundColor: item.color }}
              >
                <img className={styles.image} src={item.image} alt="" />
                <p className={styles.text}>{item.text}</p>
              </div>
            );
          })}
        </div>
        <p
          className={styles.widesummary}
        >{`Our quests span 12 hours of workshops designed & taken by our team of MBAs, Entrepreneurs, and experts in finance, experiential learning & academic pedagogy from prestigious institutions such as IIM, ISB & Harvard. Each session is designed to be experiential, collaborative & fun, and will require children to solve problems in teams by thinking creatively - critical 21st century skills that will help students succeed professionally.`}</p>
        <p
          className={styles.widesummary}
          style={{ marginTop: "20px" }}
        >{`Children will also get free registrations for the 1st upsurge Business League. They can submit their business plans & get up to ₹3,00,000 in investment to grow their business!`}</p>
        <p className={styles.heading} style={{ userSelect: "none" }}>
          Children can choose from one of the two quests or do both!
        </p>
        <div className={styles.bottom}>
          <div className={styles.button} onClick={() => setshowpopup(true)}>
            Register Now
          </div>
        </div>
        <div className={styles.questWrapper}>
          <div className={styles.quest}>
            <img src="https://i.ibb.co/BsdHtMY/business.png" alt="" />
            <p className={styles.title}>Entrepreneurship Quest</p>
            <p className={styles.des}>
              {`Let your child embark on their first 0 to 1 journey - from idea to
              business pitch - and imbibe the fundamentals of entrepreneurship.
              Children will work in teams to identify a problem, design a
              solution and then build a company around it! Best business ideas
              stand a chance to win prizes worth over ₹50,000.`}
            </p>
            <p className={styles.des}>
              {`What’s more? Children enrolled in the Entrepreneurship quest can
              also participate in the upsurge Business League, where the best
              business ideas could secure upto ₹3,00,000 in funding from our
              youth-dedicated fund!`}
            </p>
          </div>
          <div className={styles.quest}>
            <img src="https://i.ibb.co/sW3fYzj/money-bag.png" alt="" />
            <p className={styles.title}>{`Money & Investing Quest`}</p>
            <p className={styles.des}>
              {`Wished you were taught about money management & investing earlier
              in your life? Research suggests that children start understanding
              money around the age of 3, so why wait? Through this
              activity-based course, we will cover the 5 pillars of financial
              literacy - Earn, Spend, Save, Invest, & Protect. We will make
              children aware of the most critical financial decisions &
              situations that they will face as adults but in a relevant & fun
              way!`}
            </p>
            <p className={styles.des}>
              {`Children can also participate in our portfolio building
              competitions & win prizes of over ₹50,000 based on their
              performance`}
            </p>
          </div>
        </div>

        <FaqSection />
        <JoinUs />
        <Footer />
      </div>
    </div>
  );
}
