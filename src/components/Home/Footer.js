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
          <p className={styles.heading}>Products</p>
          <p className={styles.subheading}>Retirement Calculator</p>
          <p className={styles.subheading}>Finance Courses</p>
          <p className={styles.subheading}>Finance Games</p>
          <p className={styles.subheading}>Budget Maker</p>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>About</p>
          <p className={styles.subheading}>Our Story</p>
          <p className={styles.subheading}>Benefits</p>
          <p className={styles.subheading}>Team</p>
          <p className={styles.subheading}>Careers</p>
        </div>
        <div className={styles.column}>
          <p className={styles.heading}>Help</p>
          <p className={styles.subheading} onClick={() => router.push("/help")}>
            FAQs
          </p>
          <p
            className={styles.subheading}
            onClick={() => router.push("/contact")}
          >
            Contact Us
          </p>
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
