import React, { useContext, useState } from "react";
import styles from "../../styles/Home/join.module.scss";
import validator from "validator";
import LoginApis from "../../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { MainContext } from "../../context/Main";
function JoinUs({ setshowauth, setauthmode, setmailfromhome }) {
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const { userdata, theme } = useContext(MainContext);
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
      setmailfromhome(email);
    }
  }
  return (
    <section className={styles.joinSection}>
      <div className={`${styles.doodle} ${styles.dl1}`}>
        <Image
          layout="fill"
          objectFit="cover"
          src="https://imgcdn.upsurge.in/images/Untitled-design-4.png"
          alt=""
          loading="lazy"
        />
      </div>
      <div className={`${styles.doodle} ${styles.dl2}`} />
      <div className={`${styles.doodle} ${styles.dl3}`} />
      <div className={`${styles.doodle} ${styles.dl4}`}>
        <Image
          layout="fill"
          objectFit="cover"
          src="https://imgcdn.upsurge.in/images/Untitled-design-7.png"
          alt=""
          loading="lazy"
        />
      </div>
      <div className={`${styles.doodle} ${styles.dl5}`} />

      <div className={`${styles.doodle} ${styles.dr1}`}>
        <Image
          layout="fill"
          objectFit="cover"
          src="https://imgcdn.upsurge.in/images/Untitled-design-6.png"
          alt=""
          loading="lazy"
        />
      </div>
      <div className={`${styles.doodle} ${styles.dr2}`} />
      <div className={`${styles.doodle} ${styles.dr3}`} />
      <div className={`${styles.doodle} ${styles.dr4}`} />
      <div className={styles.textContent}>
        <div className={styles.heading}>
          {userdata
            ? "Thank you for joining upsurge newsletter"
            : "Subscribe to upsurge Newsletter."}
        </div>
        <p className={styles.subheading}>
          {userdata
            ? `You can head back to dashboard using the button below.`
            : `Get all the information related to Financial Literacy.`}
        </p>
        <div className={styles.emailwrapper}>
          {!userdata ? (
            <>
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
              <div
                className={`${styles.button} ${!userdata && styles.gotobutton}`}
                onClick={handleSignup}
              >
                {"Subscribe"}
              </div>
            </>
          ) : (
            <div
              className={styles.button}
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
              }}
            >
              Go to dashboard
            </div>
          )}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  );
}

export default JoinUs;
