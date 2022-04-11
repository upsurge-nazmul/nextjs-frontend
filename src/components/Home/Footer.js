import React, { useState } from "react";
import styles from "../../styles/Home/footer.module.scss";
import { useRouter } from "next/dist/client/router";
import Logo from "../SVGcomponents/Logo";
import Fb from "../SVGcomponents/Fb";
import Insta from "../SVGcomponents/Insta";
import LinkedIN from "../SVGcomponents/LinkedInSvg";
import Terms from "./Terms";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";
function Footer() {
  const [showterm, setshowterm] = useState(false);
  const [showresources, setshowresources] = useState(false);
  const [showbenefits, setshowbenefits] = useState(false);
  const [showhelp, setshowhelp] = useState(false);
  const [showmore, setshowmore] = useState(false);
  const [showproducts, setshowproducts] = useState(false);
  const [termmode, settermmode] = useState("terms");
  const router = useRouter();
  return (
    <div
      className={styles.footerSection}
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
          <Logo className={styles.logo} onClick={() => router.push("/")} />
          <div className={styles.brandtext}>
            <a
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
              <LinkedIN className={styles.socialyt} />
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
              onClick={() => router.push("/benefits/entrepreneuership")}
            >
              Entrepreneuership
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
              onClick={() => router.push("/about")}
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
        <Logo className={styles.logo} onClick={() => router.push("/")} />
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
                onClick={() => router.push("/benefits/entrepreneuership")}
              >
                Entrepreneuership
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
                onClick={() => router.push("/about")}
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
            href="https://www.instagram.com/upsurge.india/"
            target="_blank"
            rel="noreferrer"
          >
            <Insta className={styles.social} />
          </a>
          {/* <a href="">
            <YtSvg className={styles.socialyt} />
          </a> */}
          <a
            href="https://www.linkedin.com/company/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIN className={styles.socialyt} />
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
