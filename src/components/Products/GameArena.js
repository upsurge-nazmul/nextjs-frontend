import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/router";
import styles from "../../styles/Products/games-arena.module.scss";

const GameArena = ({ setshowpopup }) => {
  const { theme, userdata } = useContext(MainContext);
  const router = useRouter();
  return (
    <div className={`${styles.questSection}`}>
      <div className={styles.textcontainer}>
        <h1 className={styles.heading}>Games Arena</h1>
        {/* <div className={styles.subheading}>
          <b>Interactive courses</b> that cover fundamentals of{" "}
          <b>
            finance, including earning, budgeting, saving, investing, and
            entrepreneurship
          </b>
          .
        </div> */}
        <div className={styles.subheading}>
          Enable your child to experience the importance of{" "}
          <b>money management</b> in a virtual environment. Our platform has
          multiple games to reinforce concepts and help the child understand{" "}
          <b>personal finance, and entrepreneurship</b> in a fun and compelling
          way. Through our leaderboards, they can compete against their peers
          across countries, and their performances will be rewarded with{" "}
          <b>UniCoins</b> which can be redeemed to get <b>discounts</b> on some
          of their favorite brands
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

      <div className={styles.lap}>
        <div className={styles.wrap}>
          <video
            className={styles.video}
            controls
            muted
            loop
            poster="https://imgcdn.upsurge.in/images/pricing-video-picture.png"
          >
            <source src="/intro.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>
    </div>
  );
};

export default GameArena;
