import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";

import styles from "../../styles/waitlist/waitlist.module.scss";
export default function Unsub({ unsubbed }) {
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);
  return (
    <div className={styles.waitlist}>
      <Header
        stickyheader={stickyheader}
        showauth={showauth}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.white}></div>
        <div className={styles.ball4}></div>
        <div className={styles.yellow}></div>
        {unsubbed === "done" && (
          <p
            className={styles.heading}
            style={{ fontSize: "50px", marginBottom: "20px", zIndex: "100" }}
          >
            We hope to see you soon.
          </p>
        )}
        {unsubbed === "done" && <div className={styles.line}></div>}

        <p className={styles.heading2}>
          {unsubbed === "done"
            ? "You have been removed from our Newsletter Subscription."
            : `${router.query.email} is either invalid or not subscribed.`}
        </p>

        <p className={styles.subheading}>
          To stay up to date at all times, follow us on.
        </p>
        <div className={styles.socials}>
          <a
            href="https://www.facebook.com/upsurgeindia/"
            target="_blank"
            rel="noreferrer"
          >
            <Fb className={styles.social} />
          </a>
          <a
            href="https://www.instagram.com/upsurge.in/"
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
        </div>
        <div className={styles.goback} onClick={() => router.push("/")}>
          Go Back
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let res = await LoginApis.unsub({ email: params.email });
  if (res && res.data && res.data.success) {
    return { props: { unsubbed: "done" } };
  } else {
    return { props: { unsubbed: "error" } };
  }
}
