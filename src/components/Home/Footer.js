import React from "react";
import styles from "../../styles/Home/footer.module.scss";
import { useRouter } from "next/dist/client/router";
import Logo from "../SVGcomponents/Logo";
import Twitter from "../SVGcomponents/Twitter";
import Fb from "../SVGcomponents/Fb";
import Insta from "../SVGcomponents/Insta";

function Footer() {
  const router = useRouter();
  return (
    <div className={styles.footerSection}>
      <div className={styles.left}>
        <Logo className={styles.logo} />
        <div className={styles.bottom}>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.column}>
          <p className={styles.heading}>About Us</p>
          <p className={styles.subheading}>Our Northstar</p>
          <p className={styles.subheading}>Life@upsurge</p>
          <p className={styles.subheading}>Careers</p>
          <p className={styles.subheading}>FAQ’s</p>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Benefits</p>
          <p className={styles.subheading}>Financial Literacy</p>
          <p className={styles.subheading}>Experiential Learning</p>
          <p className={styles.subheading}>Entrepreneurship</p>
          <p className={styles.subheading}>Rewards</p>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Products</p>
          <p className={styles.subheading}>Knowledge Quest</p>
          <p className={styles.subheading}>Games Arena</p>
          <p className={styles.subheading}>Jobs</p>
          <p className={styles.subheading}>Family Fun</p>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Calculators</p>
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
        <div className={styles.column}>
          <p className={styles.heading}>Useful Links</p>
          <p className={styles.subheading}>Terms and Conditions</p>
          <p className={styles.subheading}>Privacy Policy</p>
          <p className={styles.subheading}>Pricing</p>
          <p className={styles.subheading}>FAQ’s</p>
        </div>
        <div className={styles.socials}>
          <Fb className={styles.social} />
          <Twitter className={styles.social} alt="" />
          <Insta className={styles.social} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
