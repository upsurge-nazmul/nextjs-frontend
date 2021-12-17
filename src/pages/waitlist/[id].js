import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import styles from "../../styles/waitlist/waitlist.module.scss";
export default function WaitList({ res }) {
  const [showauth, setshowauth] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!res.id) {
      router.push("/");
    }
  });
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
      />
      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.white}></div>
        <div className={styles.ball4}></div>
        <div className={styles.yellow}></div>
        <p className={styles.heading}>{`#${res?.id}`}</p>
        <div className={styles.line}></div>

        <p className={styles.heading2}>
          Thank you, you have early access to our platform now.
        </p>
        <p className={styles.heading3}>
          For more information, please check your email.
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
  let res = await LoginApis.getwaitlistdetails({ email: params.id });
  return { props: { res: res?.data?.data || "cannot" } };
}
