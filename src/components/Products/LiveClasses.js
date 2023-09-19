import React from "react";
import styles from "../../styles/Products/classes.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
export default function LiveClasses({ id, userdata, setshowpopup }) {
  const router = useRouter();
  return (
    <div className={styles.liveClasses} id={id}>
      <div className={styles.top}>
        <h1 className={styles.heading}>Live workshops & events</h1>
        <div className={styles.subheading}>
          Live online courses and workshops, designed and taught by our
          co-founders and experts, on important topics around{" "}
          <b>personal finance, career development, and entrepreneurship</b>.
        </div>
        <div className={styles.subheading}>
          These are designed with an experiential focus and are fun, engaging
          and effective! The workshops & classes are supplemented with activity
          sheets, live games, and project work.
        </div>
        <div className={styles.subheading}>
          Students who do well in projects will get{" "}
          <b>certificates, scholarships & even internships</b> Specially
          designed events such as upsurge Olympics & Summer Startup Summit to
          give exposure to high school students
        </div>
        <div className={styles.signupBox}>
          {!userdata ? (
            <div
              className={styles.joinButton}
              onClick={() => {
                // setauthmode("parent");
                setshowpopup(true);
              }}
            >
              Start FREE trial
            </div>
          ) : (
            <div
              className={styles.joinButton}
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
              Go to Dashboard
            </div>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.bgShade}></div>
        <div className={styles.liveclassimg}>
          <Image
            layout="fill"
            objectFit="cover"
            src="https://imgcdn.upsurge.in/images/games/live-class.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
