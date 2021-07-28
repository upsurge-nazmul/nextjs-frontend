import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { eraseCookie } from "../../actions/cookieUtils";
import styles from "../../styles/Dashboard/dashboardheader.module.scss";

function DashboardHeader({ mode, showback, gobackto }) {
  const router = useRouter();
  const [username, setusername] = useState("Tushar");
  const [rotatesetting, setrotatesetting] = useState(false);
  const [bell, setbell] = useState(false);
  const [notifications, setnotifications] = useState(["s"]);
  return (
    <div className={styles.dashboardHeader}>
      <h1 className={styles.dashboardHeading}>
        {mode === "home" ? (
          <>
            Welcome, <span>{username}</span>
          </>
        ) : (
          <span className={showback ? styles.addflex : ""}>
            {showback ? (
              <svg
                width="33"
                height="23"
                viewBox="0 0 33 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => router.push("/" + gobackto)}
              >
                <path
                  d="M3.91523 12.1023L5.12234 12.1023L30.7656 12.1023C31.318 12.1023 31.7659 11.6544 31.7659 11.1021C31.7659 10.5498 31.3179 10.1018 30.7656 10.1018L5.12234 10.1018L3.91526 10.1018L4.76878 9.24824L11.8092 2.20761L12.1627 2.56116L11.8092 2.2076C12.1998 1.81694 12.1999 1.18372 11.8092 0.793026L3.91523 12.1023ZM3.91523 12.1023L4.76878 12.9559L11.8094 19.9965C12.2001 20.3872 12.2001 21.0205 11.8094 21.4112C11.4188 21.8017 10.7853 21.8017 10.3948 21.4112L0.792983 11.8094C0.402295 11.4187 0.402293 10.7854 0.792983 10.3947L0.503713 10.1055L0.792987 10.3947L10.3944 0.793098C10.59 0.597654 10.8452 0.499998 11.1019 0.499998C11.3585 0.499998 11.6138 0.597668 11.8092 0.792954L3.91523 12.1023Z"
                  fill="black"
                  stroke="black"
                />
              </svg>
            ) : null}
            {mode}
          </span>
        )}
      </h1>
      <div className={styles.rightWrapper}>
        <div
          className={`${styles.settings} ${styles.icon} ${
            rotatesetting ? styles.rotate : ""
          }`}
          onMouseEnter={() => setrotatesetting(true)}
          onMouseLeave={() => setrotatesetting(false)}
          onClick={() => {
            eraseCookie("accesstoken");
            router.push("/");
          }}
        >
          <svg
            enable-background="new 0 0 32 32"
            id="Editable-line"
            version="1.1"
            viewBox="0 0 32 32"
          >
            <circle
              cx="16"
              cy="16"
              fill="none"
              id="XMLID_224_"
              r="4"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeMiterlimit="10"
              stroke-width="2"
            />
            <path
              d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z  "
              fill="none"
              id="XMLID_242_"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeMiterlimit="10"
              stroke-width="2"
            />
          </svg>{" "}
        </div>
        <div
          className={`${styles.notification} ${styles.icon} ${
            bell ? styles.bell : ""
          }`}
          onClick={() => router.push("/notifications", { type: "request" })}
          onMouseEnter={() => setbell(true)}
          onMouseLeave={() => setbell(false)}
        >
          {notifications.length > 0 ? <div className={styles.dot}></div> : null}
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 19.5C9.1 19.5 10 18.6 10 17.5H6C6 18.6 6.9 19.5 8 19.5ZM14 13.5V8.5C14 5.43 12.37 2.86 9.5 2.18V1.5C9.5 0.67 8.83 0 8 0C7.17 0 6.5 0.67 6.5 1.5V2.18C3.64 2.86 2 5.42 2 8.5V13.5L0 15.5V16.5H16V15.5L14 13.5ZM12 14.5H4V8.5C4 6.02 5.51 4 8 4C10.49 4 12 6.02 12 8.5V14.5Z"
              fill="black"
            />
          </svg>
        </div>
        <div className={styles.avatar}>
          <img
            src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
