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

function Footer() {
  const [showterm, setshowterm] = useState(false);
  const [termmode, settermmode] = useState("terms");
  const router = useRouter();
  return (
    <div className={styles.footerSection}>
      {showterm && <Terms setshowterm={setshowterm} termmode={termmode} />}
      <div className={styles.left}>
        <Logo className={styles.logo} />
        <div className={styles.details}>
          <div className={styles.heading}>Surgeup Technologies Pvt Ltd.</div>
          <p className={styles.subheadings}>
            <a href="tel:+918287433304">+91 8287 433 304 </a>
            <a href="mailto:karan@upsurgefi.com">| karan@upsurgefi.com</a>
          </p>
        </div>
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

      <div className={styles.right}>
        <div className={styles.column}>
          <p className={styles.heading}>Products</p>
          <p className={styles.subheading}>Knowledge Quests</p>
          <p className={styles.subheading}>Games Arena</p>
          <p className={styles.subheading}>Chores</p>
          <p className={styles.subheading}>Family Fun</p>
          <p className={styles.subheading}>Tribes</p>
          <p className={styles.subheading}>Live Classes</p>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Resources</p>
          <p className={styles.subheading}>Goal Wizards</p>
          <p className={styles.subheading}>Live Classes</p>
          <p className={styles.subheading}>Tournaments</p>
          <p className={styles.subheading}>Cheat Codes</p>
          <p className={styles.subheading}>Articles</p>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Help & Support</p>
          <p className={styles.subheading}>FAQ’s</p>
          <p className={styles.subheading}>Help Center</p>
          <p className={styles.subheading}>Contact us</p>
        </div>
        <div className={styles.column}>
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
        </div>
        {/* <div className={styles.column}>
          <p className={styles.heading}>Useful Links</p>
          <p className={styles.subheading}>Terms and Conditions</p>
          <p className={styles.subheading}>Privacy Policy</p>
          <p className={styles.subheading}>Pricing</p>
          <p className={styles.subheading}>FAQ’s</p>
        </div> */}
        <div className={styles.socials}>
          <Fb className={styles.social} />
          <Twitter className={styles.social} alt="" />
          <Insta className={styles.social} />
          <YtSvg className={styles.socialyt} />
          <LinkedIN className={styles.socialyt} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
