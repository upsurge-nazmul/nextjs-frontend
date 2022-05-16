import React, { useContext, useState } from "react";
import styles from "../../styles/Home/join.module.scss";
import validator from "validator";
import LoginApis from "../../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import WaitlistPopUp from "../WaitlistPopUp";
import { MainContext } from "../../context/Main";
function JoinUs() {
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const { userdata, theme } = useContext(MainContext);
  const [showwaitlistblock, setshowwaitlistblock] = useState(false);
  const router = useRouter();
  return (
    <section
      className={`${styles.joinSection} ${
        theme === "dark" && styles.darkjoinSection
      }`}
    >
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
        <div className={styles.heading}>
          {userdata
            ? "Thank you for joining early access"
            : "Sign up for early access"}
        </div>
        <p className={styles.subheading}>
          {userdata
            ? `You can head back to dashboard using the button below.`
            : `We can’t wait to have you onboard and start your child’s journey
          towards financial freedom.`}
        </p>
        <div className={styles.emailwrapper}>
          <div
            className={`${styles.button} ${userdata && styles.gotobutton}`}
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
              setshowwaitlistblock(true);
            }}
          >
            {userdata ? "Go to Dashboard" : "Sign up"}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinUs;
