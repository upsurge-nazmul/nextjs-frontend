import React, { useContext } from "react";
import styles from "../../styles/Products/chores.module.scss";
import Image from "next/image";
import WaitlistPopUp from "../WaitlistPopUp";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/dist/client/router";

export default function Chores({
  id,
  email,
  setEmail,
  check,
  error,
  setshowwaitlistblock,
  showwaitlistblock,
  settoastdata,
  authmode,
  setauthmode,
  setshowauth,
  setshowpopup,
}) {
  const { userdata } = useContext(MainContext);
  const router = useRouter();

  return (
    <div className={styles.chores} id={id}>
      {showwaitlistblock && (
        <WaitlistPopUp
          email={email}
          setemail={setEmail}
          settoastdata={settoastdata}
          setshowpopup={setshowwaitlistblock}
        />
      )}
      <div className={styles.top}>
        <div className={styles.heading}>Chores</div>
        <div className={styles.subheading}>
          A fun and engaging way for parents to develop prudent financial
          behaviors in children by assigning them jobs and rewarding them with
          UniCoins – this helps them understand that they have to work to
          fulfill their tasks to earn money.
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
              Join early access
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
        <div className={styles.mobileimage}>
          <Image
            objectFit="contain"
            layout="fill"
            src="https://imgcdn.upsurge.in/images/mobilechore.png"
            alt=""
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.first}>
            <div className={styles.heading}>Importance of Earning</div>
            <div className={styles.description}>
              upsurge teaches that money needs to be earned. It is not simply
              given. This learning helps children learn discipline, become
              responsible and develop time-management skills
            </div>
            <div className={styles.connectorl}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.heading}>Time Management</div>
            <div className={styles.description}>
              Tasks can be assigned to them with a deadline and their
              performance can be evaluated and rated on successful and timely
              completion of such assigned tasks.
            </div>
            <div className={styles.connectorl}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
        <div className={styles.mid}>
          <div className={styles.image}>
            <Image
              objectFit="contain"
              layout="fill"
              src="https://imgcdn.upsurge.in/images/mobilechore.png"
              alt=""
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.first}>
            <div className={styles.heading}>Support long-term goals</div>
            <div className={styles.description}>
              upsurge teaches children to fulfill their long-term goals by
              dividing them into shorter goals and achieving them gradually.
            </div>
            <div className={styles.connectorr}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
          <div className={styles.second}>
            <div className={styles.heading}>
              Teaches real life financial skills
            </div>
            <div className={styles.description}>
              Incentivize and reward them for completing their tasks on time.
              Conversely, impose small penalties for unfinished tasks. This will
              go a long way in inculcating good habits and a sense of
              discipline.
            </div>
            <div className={styles.connectorr}>
              <div className={styles.ball}></div>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
