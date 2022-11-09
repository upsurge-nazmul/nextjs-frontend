import React, { useContext, useState } from "react";
import styles from "../../styles/Home/footer.module.scss";
import { useRouter } from "next/dist/client/router";
import Logo from "../SVGcomponents/Logo";
import Fb from "../SVGcomponents/Fb";
import Insta from "../SVGcomponents/Insta";
import LinkedIN from "../SVGcomponents/LinkedInSvg";
import Terms from "./Terms";
import DiscordSvg from "../SVGcomponents/DiscordSvg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";
import { MainContext } from "../../context/Main";
import Spinner from "../Spinner";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
function Footer({
  setshowauth,
  setauthmode,
  setmailfromhome,
  setshowpopup,
}) {
  const [showterm, setshowterm] = useState(false);
  const [showresources, setshowresources] = useState(false);
  const [showbenefits, setshowbenefits] = useState(false);
  const [loading, setloading] = useState(false);
  const [showhelp, setshowhelp] = useState(false);
  const [showmore, setshowmore] = useState(false);
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const [showproducts, setshowproducts] = useState(false);
  const [termmode, settermmode] = useState("terms");
  const { theme,userdata } = useContext(MainContext);
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
        // setshowpopup(true);
        setshowauth(true);
        setauthmode("");
        setauthmode("email");
        setmailfromhome(email);
      } else {
        seterror(checkemail?.data.message || "Error connecting to server");
      }
      setloading(false);
    }
  }
  return (
    <div
      className={`${styles.footerSection} ${
        theme === "dark" && styles.darkfooterSection
      }`}
      style={{ zIndex: showterm ? 500 : 99 }}
    >
      {showterm && <Terms setshowterm={setshowterm} termmode={termmode} />}
      <div className={styles.background}>
        <div className={styles.curvecontainer}>
          <Curve1 className={styles.curve1} />
          <Curve2 className={styles.curve2} />
        </div>
      </div>
      <div className={styles.top}>
        <div className={styles.left}>
          <Logo
            className={styles.logo}
            onClick={() => router.push("/")}
            dark={theme === "dark"}
          />
           {userdata ? (
          <div
            className={styles.gotobutton}
            onClick={() => {
              if (userdata) {
                if (userdata.is_waiting_active) {
                  router.push("/dashboard/w");
                } else if (userdata.user_type === "parent") {
                  router.push("/dashboard/p");
                } else {
                  router.push("/dashboard/k");
                }
                return;
              }
            }}
          >
            Go to dashboard
          </div>
          ) : (
          <>
           <p className={styles.error}>{error}</p>
          <div className={`${styles.signupBox} ${error && styles.errsignbox}`}>
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
                Sign up
              </div>
            ) : (
              <div className={`${styles.button} ${styles.spinner_btn}`}>
                <Spinner />
              </div>
            )}
          </div>
            </>
            )}
          <div className={styles.brandtext}>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting WhatApp`})}}
              className={styles.whatsapp}
              href="https://wa.me/918851117926"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon className={styles.icon} />
              Connect on WhatsApp
            </a>
            <div className={styles.bottom}>
              <p
                onClick={() => {
                  settermmode("terms");
                  setshowterm(true);
                }}
              >
                Terms & conditions
              </p>
              <p
                onClick={() => {
                  settermmode("privacy");
                  setshowterm(true);
                }}
              >
                Privacy policy
              </p>
            </div>
          </div>

          <div className={styles.socials}>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting Facebook`})}}
              href="https://www.facebook.com/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Fb className={styles.social} />
            </a>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting Instagram`})}}
              href="https://www.instagram.com/upsurge.in/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Insta className={styles.social} />
            </a>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting Linkedin`})}}
              href="https://www.linkedin.com/company/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedIN className={styles.social} />
            </a>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting Discord`})}}
              href="https://discord.gg/grqReT3zDm"
              target="_blank"
              rel="noreferrer"
            >
              <DiscordSvg className={styles.social} />
            </a>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is calling on Phone`})}}
              href="tel:+918851117926"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#4f4f4f" }}
            >
              <PhoneIcon className={styles.social} />
            </a>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is Emailing`})}}
              href="mailto:hello@upsurge.in"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#4f4f4f" }}
            >
              <EmailIcon className={styles.socialyt} />
            </a>
            {/* <a href="">
            <Twitter className={styles.social} alt="" />
          </a> */}
            {/* <a href="">
            <YtSvg className={styles.socialyt} />
          </a> */}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.column}>
            <p className={styles.heading}>Products</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/products/quest")}
            >
              Knowledge quests
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/products/games")}
            >
              Games arena
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/products/chores")}
            >
              Chores
            </p>
            {/* <p className={styles.subheading}>Family Fun</p> */}
            {/* <p className={styles.subheading}>Tribes</p> */}
            <p
              className={styles.subheading}
              onClick={() => router.push("/products/liveclasses")}
            >
              Live classes
            </p>
          </div>

          {/* <div className={styles.column}>
            <p className={styles.heading}>Help & Support</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/faq")}
            >
              FAQs
            </p>
            <p className={styles.subheading}>Help Center</p>
            <p className={styles.subheading}>Contact us</p>
          </div> */}
          {/* <div className={styles.column}>
            <p className={styles.heading}>Financial Calculators</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/calculators/homeLoan")}
            >
              Home Loan Calculator
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/calculators/carLoan")}
            >
              Car Loan Calculator
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/calculators/education")}
            >
              Education Loan Calculator
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/calculators/sip")}
            >
              SIP Loan Calculator
            </p>
          </div> */}
          <div className={styles.column}>
            <p className={styles.heading}>Benefits</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/benefits")}
            >
              Financial literacy
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/benefits/experimential")}
            >
              Experiential learning
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/benefits/entrepreneurship")}
            >
              Entrepreneurship
            </p>
            {/* <p className={styles.subheading}>Help Center</p> */}
            <p
              className={styles.subheading}
              onClick={() => router.push("/benefits/rewards")}
            >
              Rewards
            </p>
          </div>
          <div className={styles.column}>
            <p className={styles.heading}>Resources</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/calculators/education")}
            >
              Education loan calculator
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/calculators/homeLoan")}
            >
              Home loan calculator
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/calculators/carLoan")}
            >
              Car loan calculator
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/quiz")}
            >
              Quiz
            </p>
          </div>
          <div className={styles.column}>
            <p className={styles.heading}>More</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/about-us")}
            >
              About us
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/blogs")}
            >
              Blogs
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/help/faq")}
            >
              FAQs
            </p>
            {/* <p className={styles.subheading}>Help Center</p> */}
            <p
              className={styles.subheading}
              onClick={() => router.push("/contact")}
            >
              Contact us
            </p>
          </div>
        </div>
      </div>
      <div className={styles.mobiletop}>
        <Logo
          className={styles.logo}
          onClick={() => router.push("/")}
          dark={theme === "dark"}
        />
        <div className={styles.column}>
          <p
            className={styles.heading}
            onClick={() => setshowproducts(!showproducts)}
          >
            Products <span>{showproducts ? "-" : "+"}</span>
          </p>
          {showproducts && (
            <>
              <p
                className={styles.subheading}
                onClick={() => router.push("/products/quest")}
              >
                Knowledge quests
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/products/games")}
              >
                Games arena
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/products/chores")}
              >
                Chores
              </p>
              {/* <p className={styles.subheading}>Family Fun</p> */}
              {/* <p className={styles.subheading}>Tribes</p> */}
              <p
                className={styles.subheading}
                onClick={() => router.push("/products/liveclasses")}
              >
                Live classes
              </p>
            </>
          )}
        </div>
        <div className={styles.column}>
          <p
            className={styles.heading}
            onClick={() => setshowbenefits(!showbenefits)}
          >
            Benefits <span>{showbenefits ? "-" : "+"}</span>
          </p>
          {showbenefits && (
            <>
              <p
                className={styles.subheading}
                onClick={() => router.push("/benefits")}
              >
                Financial literacy
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/benefits/experimential")}
              >
                Experiential learning
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/benefits/entrepreneurship")}
              >
                Entrepreneurship
              </p>
              {/* <p className={styles.subheading}>Help Center</p> */}
              <p
                className={styles.subheading}
                onClick={() => router.push("/benefits/rewards")}
              >
                Rewards
              </p>
            </>
          )}
        </div>
        <div className={styles.column}>
          <p
            className={styles.heading}
            onClick={() => setshowresources(!showresources)}
          >
            Resources <span>{showresources ? "-" : "+"}</span>
          </p>
          {showresources && (
            <>
              <p
                className={styles.subheading}
                onClick={() => router.push("/calculators/education")}
              >
                Education loan calculator
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/calculators/homeLoan")}
              >
                Home loan calculator
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/calculators/carLoan")}
              >
                Car loan calculator
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/quiz")}
              >
                Quiz
              </p>
            </>
          )}
        </div>
        {/* <div className={styles.column}>
          <p
            className={styles.heading}
            onClick={() => setshowcalcs(!showcalcs)}
          >
            Financial Calculators <span>{showcalcs ? "-" : "+"}</span>
          </p>
          {showcalcs && (
            <>
              <p
                className={styles.subheading}
                onClick={() => router.push("/calculators/homeLoan")}
              >
                Home Loan Calculator
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/calculators/carLoan")}
              >
                Car Loan Calculator
              </p>
              <p
                className={styles.subheading}
                // onClick={() => router.push("/calculators/carLoan")}
              >
                Education Loan Calculator
              </p>
              <p
                className={styles.subheading}
                // onClick={() => router.push("/calculators/carLoan")}
              >
                SIP Loan Calculator
              </p>
            </>
          )}
        </div> */}
        {/* <div className={styles.column}>
          <p className={styles.heading} onClick={() => setshowhelp(!showhelp)}>
            Help & Support <span>{showhelp ? "-" : "+"}</span>
          </p>
          {showhelp && (
            <>
              <p
                className={styles.subheading}
                onClick={() => router.push("/help/faq")}
              >
                FAQs
              </p>
              <p className={styles.subheading}>Help Center</p>
              <p className={styles.subheading}>Contact us</p>
            </>
          )}
        </div>
         */}
        <div className={styles.column}>
          <p className={styles.heading} onClick={() => setshowmore(!showmore)}>
            More <span>{showmore ? "-" : "+"}</span>
          </p>
          {showmore && (
            <>
              <p
                className={styles.subheading}
                onClick={() => router.push("/about-us")}
              >
                About us
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/blogs")}
              >
                Blogs
              </p>
              <p
                className={styles.subheading}
                onClick={() => router.push("/help/faq")}
              >
                FAQs
              </p>
              {/* <p className={styles.subheading}>Help Center</p> */}
              <p
                className={styles.subheading}
                onClick={() => router.push("/contact")}
              >
                Contact us
              </p>
            </>
          )}
        </div>
        <div className={styles.socials}>
          <a
          onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting Facebook`})}}
            href="https://www.facebook.com/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <Fb className={styles.social} />
          </a>
          {/* <a href="">
            <Twitter className={styles.social} alt="" />
          </a> */}
          <a
          onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting Instagram`})}}
            href="https://www.instagram.com/upsurge.in/"
            target="_blank"
            rel="noreferrer"
          >
            <Insta className={styles.social} />
          </a>
          {/* <a href="">
            <YtSvg className={styles.socialyt} />
          </a> */}
          <a
          onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting LinkedIn`})}}
            href="https://www.linkedin.com/company/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIN className={styles.social} />
          </a>
          <a
          onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is visiting Discord`})}}
              href="https://discord.gg/grqReT3zDm"
              target="_blank"
              rel="noreferrer"
            >
              <DiscordSvg className={styles.social} />
            </a>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is calling on Phone`})}}
              href="tel:+918851117926"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#4f4f4f" }}
            >
              <PhoneIcon className={styles.social} />
            </a>
            <a
            onClick={()=>{mixpanel.track('Social',{'event':`${userdata.email} or Guest is Emailing`})}}
              href="mailto:hello@upsurge.in"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#4f4f4f" }}
            >
              <EmailIcon className={styles.socialyt} />
            </a>
        </div>
        <div className={styles.bottom}>
          <a
            className={styles.whatsapp}
            href="https://wa.me/918851117926"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon className={styles.icon} />
            Connect on WhatsApp
          </a>
          <div className={styles.wrap}>
            <p
              className={styles.terms}
              onClick={() => {
                settermmode("terms");
                setshowterm(true);
              }}
            >
              Terms & conditions
            </p>
            <p
              className={styles.terms}
              onClick={() => {
                settermmode("privacy");
                setshowterm(true);
              }}
            >
              Privacy policy
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottombar}>
        © Surgeup Technologies Private Limited. {new Date().getFullYear()}
      </div>
    </div>
  );
}

export default Footer;
