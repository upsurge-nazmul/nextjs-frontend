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
import Spinner from "../../components/Spinner";
import styles from "../../styles/Home/earlyaccess.module.scss";
import HowEarlyAccess from "../../components/Home/HowEarlyAccess";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import WaitlistPopUp from "../../components/WaitlistPopUp";
import { useRouter } from "next/dist/client/router";
import PartnerSection from "../../components/Home/PartnerSection";
import TickSvg from "../../components/SVGcomponents/TickSvg";

export default function SummerBootcamp() {
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const data = [
    {
      name: "1-5",
      benefits: [
        "3 months of free access to upsurge",
        // "Finance master class",
        // "Financial dictionary",
        // "upsurge cap & bottle",
        // "20% discount on yearly subscription",
      ],
    },
    {
      name: "6-25",
      benefits: [
        "Get annual subscription at ₹2399",
        // "Financial dictionary",
        // "upsurge cap",
        // "upsurge bottle",
        // "20% discount on yearly subscription",
      ],
    },
    {
      name: "26-100",
      benefits: [
        "Get annual subscription at ₹2999",
        // "Avail discount on joining upsurge",
        // "Earn bonus unicoins",
        // "Other exciting rewards",
        // "20% discount on yearly subscription",
      ],
    },
    {
      name: "100+",
      benefits: [
        "Get annual subscription at ₹3599",
        // "Avail discount on joining upsurge",
        // "Earn bonus unicoins",
        // "Other exciting rewards",
        // "20% discount on yearly subscription",
      ],
    },
  ];
  const annualpricing = [
    "Knowledge Quests",
    "Games Arena",
    "Chore Management",
    "Family Fun Games & Activities",
    "2,500 UniCoin Bonus - Redeemable for discount vouchers",
    "Higher Education Counselling Masterclass",
    "1 free session with your choice of an expert from our panel",
    "Rich Dad, Poor Dad - the personal finance bible & more fun goodies!",
    ,
  ];
  const router = useRouter();
  async function check(e) {
    e?.preventDefault();
    setloading(true);
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
      setloading(false);
    } else {
      let checkemail = await LoginApis.checkemail({ email, waitlist: true });
      if (checkemail && checkemail.data && !checkemail.data.success) {
        setshowpopup(true);
      } else {
        seterror(checkemail?.data.message || "Error connecting to server");
      }
      setloading(false);
    }
  }
  return (
    <div className={styles.earlyaccess}>
      {showpopup && (
        <WaitlistPopUp
          email={email}
          setemail={setemail}
          setshowpopup={setshowpopup}
          showpopup={showpopup}
          settoastdata={settoastdata}
        />
      )}
      <div className={styles.top}>
        <div className={styles.head}>
          <div className={styles.main}>
            <LogoWhite
              className={styles.logo}
              onClick={() => router.push("/")}
            />
            <p className={styles.heroheading}>Money, made easy.</p>
            <p className={styles.herosubheading}>
              {`Kickstart your child’s entrepreneurial & financial development
              with upsurge - India’s 1st gaming universe focussed on empowering
              children with critical 21st-century skills & knowledge, and the
              tools to have a better life.`}
            </p>
            <p className={styles.error}>{error}</p>
            <div
              className={`${styles.signupBox} ${error && styles.errsignbox}`}
            >
              <form onSubmit={(e) => check(e)}>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    seterror("");
                    setemail(e.target.value.trim());
                  }}
                />
              </form>
              {!loading ? (
                <div className={`${styles.button}`} onClick={check}>
                  Join early access
                </div>
              ) : (
                <div className={`${styles.button} ${styles.spinner_btn}`}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
          <img
            className={styles.background}
            src="https://i.ibb.co/LrJ6yx0/shutterstock-1485962585-1-removebg.png"
            alt=""
          />
          <div className={styles.shadow}>
            <div className={styles.curvecontainer}>
              <Curve1 className={styles.curve1} />
              <Curve2 className={styles.curve2} />
            </div>
          </div>
          <div className={styles.mobileshadow} />
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
        </div>
      </div>
      <div className={styles.rest}>
        <div className={styles.rewards}>
          <HowEarlyAccess />

          <p className={styles.heading} style={{ userSelect: "none" }}>
            Know more about your Early Access rewards.
          </p>
          {/* <div className={styles.featurewrapper}>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Earn UniCoins by money quotient
            </div>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Earn UniCoins by inviting friends
            </div>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Earn UniCoins by plaing daily quiz
            </div>
          </div> */}
          <div className={styles.wrapper}>
            {data.map((item, index) => {
              return (
                <div className={styles.pricecontainer} key={"price" + index}>
                  <p className={styles.name}>Benefits for rank</p>
                  <p className={styles.price}>{item.name}</p>
                  <p className={styles.description}>{item.description}</p>
                  <div className={styles.hr} />
                  <div className={styles.benefitswrapper}>
                    {item.benefits.map((benefit, index) => {
                      return <p key={"benefit" + index}>{benefit}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.des2}>
            <p className={styles.desheading}>Benefits of annual subscription</p>
            <div className={styles.wrapper}>
              {annualpricing.map((item) => {
                return <p key={item}>{item}</p>;
              })}
            </div>
          </div>
          <PartnerSection dashboard={true} />
        </div>
        <TestiMonial />
        <FaqSection />
        <JoinUs />
        <Footer />
      </div>
    </div>
  );
}
