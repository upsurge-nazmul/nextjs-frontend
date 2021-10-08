import React from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import Logo from "../../components/SVGcomponents/Logo";
import Twitter from "../../components/SVGcomponents/Twitter";
import YtSvg from "../../components/SVGcomponents/YtSvg";
import styles from "../../styles/waitlist/waitlist.module.scss";
export default function WaitList({ res }) {
  return (
    <div className={styles.waitlist}>
      <Header />
      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.white}></div>
        <div className={styles.ball4}></div>
        <div className={styles.yellow}></div>
        <p className={styles.heading}>{`#${res?.id}`}</p>
        <div className={styles.line}></div>

        <p className={styles.heading2}>
          Thank you, you have been added to our wait list.
        </p>

        <p className={styles.subheading}>
          To stay up to date at all times, follow us on.
        </p>
        <div className={styles.socials}>
          <Fb className={styles.social} />
          <Twitter className={styles.social} alt="" />
          <Insta className={styles.social} />
          <YtSvg className={styles.socialyt} />
          <LinkedIN className={styles.socialyt} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let res = await LoginApis.getwaitlistdetails({ email: params.id });
  return { props: { res: res?.data?.data || "cannot" } };
}
