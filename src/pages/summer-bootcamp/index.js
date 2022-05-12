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
import styles from "../../styles/summercamp/summercamp.module.scss";
import HowEarlyAccess from "../../components/Home/HowEarlyAccess";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
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

export default function SummerBootcamp() {
  const [error, seterror] = useState("");
  const [done, setdone] = useState(false);
  const [email, setemail] = useState("");
  const [formdata, setformdata] = useState({
    child_name: "",
    age: "",
    class: "",
    school: "",
    parent_name: "",
    phone_number: "",
    selected_quests: 2,
    email: "",
    city: "",
    timing: "",
  });
  const [loading, setloading] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const timings = [
    "Thursday, May 18, 5pm to 6:30pm",
    "Saturday, May 21, 11am to 12:30pm",
    "Saturday, May 21, 5pm to 6:30pm ",
    "Sunday, May 22, 11am to 12:30pm",
    "Sunday, May 22, 5pm to 6:30pm ",
  ];
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
    let div = document.getElementById("signup");
    console.log(div);
    if (div) {
      div.scrollIntoView();
    }
  }
  async function register() {
    setloading(true);
    if (!formdata.child_name) {
      setloading(false);
      return settoastdata({
        show: true,
        type: "error",
        msg: "Child name is required",
      });
    }
    if (!formdata.parent_name) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Parent name is required",
      });
    }
    if (!formdata.school) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "School is required",
      });
    }
    if (!formdata.city) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "City is required",
      });
    }
    if (!formdata.timing) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Timing is required",
      });
    }
    if (formdata.selected_quests === 0) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Minimum 1 quest is required",
      });
    }
    if (!formdata.age) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Age is required",
      });
    }
    if (formdata.age < 10) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Minimum age is 10",
      });
    }
    if (!formdata.class) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Class is required",
      });
    }
    if (!formdata.phone_number) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Phone number is required",
      });
    }
    if (!vaildatePhone(formdata.phone_number)) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid phone number",
      });
    }
    if (!formdata.email) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Email is required",
      });
    }
    if (!vaildateEmail(formdata.email)) {
      setloading(false);

      return settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid email",
      });
    }
    let res = await SummerCampApis.register({ data: formdata });
    if (res?.data?.success) {
      settoastdata({
        show: true,
        type: "success",
        msg: res?.data?.message || "Error connecting to server",
      });
      setdone(true);
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: res?.data?.message || "Error connecting to server",
      });
    }
    setloading(false);
  }
  return (
    <div className={styles.summercamp}>
      {showpopup && (
        <WaitlistPopUp
          email={email}
          setemail={setemail}
          setshowpopup={setshowpopup}
          showpopup={showpopup}
          settoastdata={settoastdata}
        />
      )}
      <Toast data={toastdata} />
      <div className={styles.top}>
        <div className={styles.head}>
          <div className={styles.main}>
            <LogoWhite
              className={styles.logo}
              onClick={() => router.push("/")}
            />
            <p className={styles.heroheading}>Summer Bootcamp</p>
            <p className={styles.herosubheading}>
              {`For children of ages 10 & up in age-appropriate batches.`}
            </p>
            <p
              className={` ${styles.herosubheading} ${styles.subherosubheading}`}
            >
              Demo Classes from May 18 to 22 - Registrations close May 27
            </p>
            <p className={styles.error}>{error}</p>
            <div
              className={`${styles.signupBox} ${error && styles.errsignbox}`}
            >
              <div className={`${styles.button}`} onClick={check}>
                Register Now
              </div>
            </div>
          </div>
          <Jasper className={styles.background} />
          {/* <img
            className={styles.background}
            src="https://i.ibb.co/LrJ6yx0/shutterstock-1485962585-1-removebg.png"
            alt=""
          /> */}
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
          <p className={styles.heading} style={{ userSelect: "none" }}>
            About upsurge Summer Bootcamp
          </p>
          <div className={styles.featurewrapper}>
            <div className={styles.feature}>
              {`For children of ages 10 & up in age-appropriate batches`}
            </div>
            <div className={styles.feature}>
              Demo Classes from May 18 to 22 - Registrations close May 27
            </div>
            <div className={styles.feature}>
              Program to run from June 1 to July 3
            </div>
            <div className={styles.feature}>
              {`Priced at ₹2,999 for 1 quest, & ₹5,000 for both quests- every
              child will receive certificates, goodies, freebies & compete for
              ₹50,000 in prizes`}
            </div>
          </div>
          <p className={styles.summary}>
            {`The quests will consist of 90-minute workshops designed & led by our
            team of MBAs & Entrepreneurs, and experts in finance, experiential
            learning & academic pedagogy from IIM, ISB & Harvard. Each session
            is designed to be experiential & fun, and would give children the
            opportunity to understand concepts and apply them to solve problems
            & complete activities, while working in teams.`}
          </p>
          <p className={`${styles.summary} ${styles.boldsummary}`}>
            {`Free registrations for upsurge Business League & a chance to get up to ₹3,00,000 investment/rewards for your child’s business ideas`}
          </p>
        </div>
        {!done ? (
          <div className={styles.signup} id="signup">
            <p className={styles.heading} style={{ userSelect: "none" }}>
              Sign Up!
            </p>
            <div className={styles.form}>
              <ModernInputBox
                value={formdata.child_name}
                extraclass={formdata.child_name && styles.input}
                placeholderClass={formdata.child_name && styles.placehholder}
                placeholder={"Name of Child"}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    child_name: onlyText(e.target.value).trim(),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.age}
                extraclass={formdata.age && styles.input}
                placeholderClass={formdata.age && styles.placehholder}
                placeholder={"Age of Child"}
                onChange={(e) => {
                  if (e.target.value > 30) {
                    return;
                  }
                  setformdata((prev) => ({
                    ...prev,
                    age: removenonnumber(e.target.value).trim(),
                  }));
                }}
              />
              <ModernInputBox
                value={formdata.class}
                extraclass={formdata.class && styles.input}
                placeholderClass={formdata.class && styles.placehholder}
                placeholder={"Class/Grade"}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    class: e.target.value.trim(),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.school}
                placeholder={"School Name"}
                extraclass={formdata.school && styles.input}
                placeholderClass={formdata.school && styles.placehholder}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    school: onlyText(e.target.value).trim(),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.parent_name}
                placeholder={"Parent's Name"}
                extraclass={formdata.parent_name && styles.input}
                placeholderClass={formdata.parent_name && styles.placehholder}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    parent_name: onlyText(e.target.value).trim(),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.phone_number}
                placeholder={"Phone Number"}
                maxLength={10}
                extraclass={formdata.phone_number && styles.input}
                placeholderClass={formdata.phone_number && styles.placehholder}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    phone_number: removenonnumber(e.target.value).trim(),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.email}
                extraclass={formdata.email && styles.input}
                placeholderClass={formdata.email && styles.placehholder}
                placeholder={"Email"}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    email: e.target.value.trim(),
                  }))
                }
              />
              <ModernInputBox
                value={formdata.city}
                placeholder={"City"}
                extraclass={formdata.city && styles.input}
                placeholderClass={formdata.city && styles.placehholder}
                onChange={(e) =>
                  setformdata((prev) => ({
                    ...prev,
                    city: onlyText(e.target.value).trim(),
                  }))
                }
              />
              <div className={styles.selector}>
                <p className={styles.head}>
                  What journey would you like to embark upon?
                </p>
                <div className={styles.wrapper}>
                  <div
                    className={`${styles.option} ${
                      (formdata.selected_quests === 1 ||
                        formdata.selected_quests === 3) &&
                      styles.selectedoption
                    }`}
                    onClick={() => {
                      if (formdata.selected_quests === 0) {
                        setformdata((prev) => ({
                          ...prev,
                          selected_quests: 1,
                        }));
                      } else if (formdata.selected_quests === 1) {
                        setformdata((prev) => ({
                          ...prev,
                          selected_quests: 0,
                        }));
                      } else if (formdata.selected_quests === 3) {
                        setformdata((prev) => ({
                          ...prev,
                          selected_quests: 2,
                        }));
                      } else {
                        setformdata((prev) => ({
                          ...prev,
                          selected_quests: 3,
                        }));
                      }
                    }}
                  >
                    {(formdata.selected_quests === 1 ||
                      formdata.selected_quests === 3) && (
                      <TickSvg className={styles.tick} />
                    )}
                    From 0 to 1 - Entrepreneurship Quest
                  </div>
                  <div
                    className={`${styles.option} ${
                      (formdata.selected_quests === 2 ||
                        formdata.selected_quests === 3) &&
                      styles.selectedoption
                    }`}
                    onClick={() => {
                      if (formdata.selected_quests === 0) {
                        setformdata((prev) => ({
                          ...prev,
                          selected_quests: 2,
                        }));
                      } else if (formdata.selected_quests === 2) {
                        setformdata((prev) => ({
                          ...prev,
                          selected_quests: 0,
                        }));
                      } else if (formdata.selected_quests === 3) {
                        setformdata((prev) => ({
                          ...prev,
                          selected_quests: 1,
                        }));
                      } else {
                        setformdata((prev) => ({
                          ...prev,
                          selected_quests: 3,
                        }));
                      }
                    }}
                  >
                    {(formdata.selected_quests === 2 ||
                      formdata.selected_quests === 3) && (
                      <TickSvg className={styles.tick} />
                    )}
                    Money Matters - Financial Literacy & Investment Quest
                  </div>
                  <div className={styles.price}>
                    {formdata.selected_quests === 0
                      ? "Please select atleast one quest"
                      : formdata.selected_quests === 1
                      ? "Total price will be ₹2,999"
                      : formdata.selected_quests === 2
                      ? "Total price will be ₹2,999"
                      : "Total price will be ₹5,000"}
                  </div>
                </div>
              </div>
              <div className={styles.selector}>
                <p className={styles.head}>
                  Please chose the preferred slot for a demo class
                </p>
                <div className={styles.wrapper}>
                  {timings.map((time) => {
                    return (
                      <div
                        className={`${styles.option} ${
                          formdata.timing === time && styles.selectedoption
                        }`}
                        key={time}
                        onClick={() => {
                          setformdata((prev) => ({
                            ...prev,
                            timing: time,
                          }));
                        }}
                      >
                        {formdata.timing === time && (
                          <TickSvg className={styles.tick} />
                        )}
                        {time}
                      </div>
                    );
                  })}
                </div>
              </div>

              {!loading ? (
                <div className={`${styles.button}`} onClick={register}>
                  Sign Up
                </div>
              ) : (
                <div className={`${styles.button} ${styles.spinner_btn}`}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.rewards}>
            <p className={styles.heading} style={{ userSelect: "none" }}>
              Your response has been recorded.
            </p>
            <p className={`${styles.summary} ${styles.boldsummary}`}>
              Thank you for showing interest in kickstarting your child’s
              journey toward their financial freedom!
            </p>
            <p className={styles.summary}>
              You will soon get an email with the next steps & more details on
              the upsurge Summer Bootcamp
            </p>
          </div>
        )}
        <FaqSection />
        <JoinUs />
        <Footer />
      </div>
    </div>
  );
}
