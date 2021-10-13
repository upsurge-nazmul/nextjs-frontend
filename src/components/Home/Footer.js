import React, { useState } from "react";
import styles from "../../styles/Home/footer.module.scss";
import { useRouter } from "next/dist/client/router";
import Logo from "../SVGcomponents/Logo";
import Twitter from "../SVGcomponents/Twitter";
import Fb from "../SVGcomponents/Fb";
import Insta from "../SVGcomponents/Insta";
import YtSvg from "../SVGcomponents/YtSvg";
import LinkedIN from "../SVGcomponents/LinkedInSvg";
import Terms from "./Terms";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
function Footer() {
  const [showterm, setshowterm] = useState(false);
  const [showresources, setshowresources] = useState(false);
  const [showcalcs, setshowcalcs] = useState(false);
  const [showhelp, setshowhelp] = useState(false);
  const [showmore, setshowmore] = useState(false);
  const [showproducts, setshowproducts] = useState(false);
  const [termmode, settermmode] = useState("terms");
  const router = useRouter();
  return (
    <div className={styles.footerSection}>
      {showterm && <Terms setshowterm={setshowterm} termmode={termmode} />}
      <div className={styles.top}>
        <div className={styles.left}>
          <Logo className={styles.logo} />
        </div>

        <div className={styles.right}>
          <div className={styles.column}>
            <p className={styles.heading}>Products</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/products/quest")}
            >
              Knowledge Quests
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/products/games")}
            >
              Games Arena
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
              Live Classes
            </p>
          </div>
          {/* <div className={styles.column}>
            <p className={styles.heading}>Resources</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/gamepage/ShoppingBudget")}
            >
              Shopping Budget
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/gamepage/BalanceBuilder")}
            >
              Balance Builder
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/gamepage/HighAndLow")}
            >
              High And Low
            </p>
             <p className={styles.subheading}>Cheat Codes</p>
            <p className={styles.subheading}>Quizzes</p>
          </div> */}
          {/* <div className={styles.column}>
            <p className={styles.heading}>Help & Support</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/faq")}
            >
              FAQ’s
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
          </div>*/}
          <div className={styles.column}>
            <p className={styles.heading}>Benefits</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/benefits")}
            >
              Financial Literacy
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/benefits/experimential")}
            >
              Experimential Learning
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
            <p className={styles.heading}>More</p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/blogs")}
            >
              Blogs
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/about")}
            >
              About Us
            </p>
            <p
              className={styles.subheading}
              onClick={() => router.push("/faq")}
            >
              FAQ’s
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
        <Logo className={styles.logo} />
        <div className={styles.column}>
          <p
            className={styles.heading}
            onClick={() => setshowproducts(!showproducts)}
          >
            Products <span>{showproducts ? "-" : "+"}</span>
          </p>
          {showproducts && (
            <>
              <p className={styles.subheading}>Knowledge Quests</p>
              <p className={styles.subheading}>Games Arena</p>
              <p className={styles.subheading}>Chores</p>
              <p className={styles.subheading}>Family Fun</p>
              <p className={styles.subheading}>Tribes</p>
              <p className={styles.subheading}>Live Classes</p>
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
              <p className={styles.subheading}>Goal Wizards</p>
              <p className={styles.subheading}>Live Classes</p>
              <p className={styles.subheading}>Tournaments</p>
              <p className={styles.subheading}>Cheat Codes</p>
              <p className={styles.subheading}>Articles</p>
            </>
          )}
        </div>
        <div className={styles.column}>
          <p className={styles.heading} onClick={() => setshowhelp(!showhelp)}>
            Help & Support <span>{showhelp ? "-" : "+"}</span>
          </p>
          {showhelp && (
            <>
              <p
                className={styles.subheading}
                onClick={() => router.push("/faq")}
              >
                FAQ’s
              </p>
              <p className={styles.subheading}>Help Center</p>
              <p className={styles.subheading}>Contact us</p>
            </>
          )}
        </div>
        <div className={styles.column}>
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
        </div>
        <div className={styles.column}>
          <p className={styles.heading} onClick={() => setshowmore(!showmore)}>
            More <span>{showmore ? "-" : "+"}</span>
          </p>
          {showmore && (
            <p
              className={styles.subheading}
              onClick={() => router.push("/about")}
            >
              About Us
            </p>
          )}
        </div>
        <div className={styles.socials}>
          <a href="https://www.facebook.com/upsurgeindia/">
            <Fb className={styles.social} />
          </a>
          {/* <a href="">
            <Twitter className={styles.social} alt="" />
          </a> */}
          <a href="https://www.instagram.com/upsurge.india/">
            <Insta className={styles.social} />
          </a>
          {/* <a href="">
            <YtSvg className={styles.socialyt} />
          </a> */}
          <a href="https://www.linkedin.com/company/upsurgeindia/">
            <LinkedIN className={styles.socialyt} />
          </a>
        </div>
        <div className={styles.bottom}>
          <p className={styles.heading}>© Surgeup Technologies Pvt Ltd.</p>
          <p className={styles.subheadings}>
            Contact us at <a href="tel:+918287433304">{": +91 8287433304 "}</a>|
            <a href="mailto:karan@upsurgefi.com">karan@upsurgefi.com</a>
          </p>
          <a className={styles.whatsapp} href="https://wa.me/918287433304">
            <WhatsAppIcon className={styles.icon} />
            Connect on whatsapp
          </a>
          <div className={styles.wrap}>
            <p
              className={styles.terms}
              onClick={() => {
                settermmode("terms");
                setshowterm(true);
              }}
            >
              Terms & Conditions
            </p>
            <p
              onClick={() => {
                settermmode("privacy");
                setshowterm(true);
              }}
            >
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
      <div className={styles.brand}>
        <div className={styles.brandtext}>
          <div className={styles.heading}>Surgeup Technologies Pvt Ltd.</div>
          <p className={styles.subheadings}>
            Contact us at <a href="tel:+918287433304">{": +91 8287433304 "}</a>|
            <a href="mailto:karan@upsurgefi.com">karan@upsurgefi.com</a>
          </p>
          <a className={styles.whatsapp} href="https://wa.me/918287433304">
            <WhatsAppIcon className={styles.icon} />
            Connect on whatsapp
          </a>
          <div className={styles.bottom}>
            <p
              onClick={() => {
                settermmode("terms");
                setshowterm(true);
              }}
            >
              Terms & Conditions
            </p>
            <p
              onClick={() => {
                settermmode("privacy");
                setshowterm(true);
              }}
            >
              Privacy Policy
            </p>
          </div>
        </div>

        <div className={styles.socials}>
          <a href="https://www.facebook.com/upsurgeindia/">
            <Fb className={styles.social} />
          </a>
          <a href="https://www.instagram.com/upsurge.india/">
            <Insta className={styles.social} />
          </a>
          <a href="https://www.linkedin.com/company/upsurgeindia/">
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
    </div>
  );
}

export default Footer;
