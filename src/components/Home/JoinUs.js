import React, { useState } from "react";
import styles from "../../styles/Home/join.module.scss";
import validator from "validator";
import LoginApis from "../../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import WaitlistPopUp from "../WaitlistPopUp";
function JoinUs() {
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  return (
    <section className={styles.joinSection}>
      {showwaitlistblock && (
        <WaitlistPopUp
          email={email}
          setemail={setemail}
          showpopup={showwaitlistblock}
          setshowpopup={setshowwaitlistblock}
        />
      )}
      <div className={`${styles.doodle} ${styles.dl1}`}>
        <Image
          layout="fill"
          objectFit="cover"
          src="https://i.ibb.co/yRsxh0y/Untitled-design-4.png"
          alt=""
        />
      </div>
      <div className={`${styles.doodle} ${styles.dl2}`} />
      <div className={`${styles.doodle} ${styles.dl3}`} />
      <div className={`${styles.doodle} ${styles.dl4}`}>
        <Image
          layout="fill"
          objectFit="cover"
          src="https://i.ibb.co/GtLBxMY/Untitled-design-7.png"
          alt=""
        />
      </div>
      <div className={`${styles.doodle} ${styles.dl5}`} />

      <div className={`${styles.doodle} ${styles.dr1}`}>
        <Image
          layout="fill"
          objectFit="cover"
          src="https://i.ibb.co/92nwnTL/Untitled-design-6.png"
          alt=""
        />
      </div>
      <div className={`${styles.doodle} ${styles.dr2}`} />
      <div className={`${styles.doodle} ${styles.dr3}`} />
      <div className={`${styles.doodle} ${styles.dr4}`} />
      <div className={styles.textContent}>
        <div className={styles.heading}>Sign up for early access</div>
        <p className={styles.subheading}>
          {`We can’t wait to have you onboard and start your child’s journey
          towards financial freedom.`}
        </p>
        <div className={styles.emailwrapper}>
          <div
            className={styles.button}
            onClick={() => setshowwaitlistblock(true)}
          >
            Sign up
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinUs;
