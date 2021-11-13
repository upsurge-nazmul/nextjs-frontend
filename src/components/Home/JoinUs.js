import React, { useState } from "react";
import styles from "../../styles/Home/join.module.scss";
import validator from "validator";
import LoginApis from "../../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
function JoinUs() {
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const router = useRouter();
  async function handleSignup(e) {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      seterror("Enter valid email address");
    } else {
      let response = await LoginApis.addtonewslettersubs({ email: email });
      if (response) {
        if (response.data.success) {
          if (response.data.message === "Exists") {
            seterror("Already subscribed");
          } else {
            router.push("/subscribed");
          }
        } else {
          seterror(response.data.message);
        }
      } else {
        seterror("Error connecting to server");
      }
      // setshowauth(true);
      // setauthmode("parent");
      // setmailfromhome(email);
    }
  }
  return (
    <section className={styles.joinSection}>
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
        <div className={styles.heading}>Subscribe to upsurge Newsletter.</div>
        <p className={styles.subheading}>
          Get all the information related to Financial Literacy
        </p>
        <div className={styles.emailwrapper}>
          <form onSubmit={(e) => handleSignup(e)}>
            <input
              className={styles.email}
              type="email"
              placeholder="Email"
              onChange={(e) => {
                seterror("");
                setemail(e.target.value);
              }}
            />
          </form>
          <div className={styles.button} onClick={handleSignup}>
            Subscribe
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  );
}

export default JoinUs;
