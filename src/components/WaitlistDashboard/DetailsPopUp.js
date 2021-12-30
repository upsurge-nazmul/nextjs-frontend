import React from "react";
import styles from "../../styles/WaitlistDashboard/detailspopup.module.scss";
import Jasper from "../SVGcomponents/Jasper";
export default function DetailsPopUp({
  setshowdetails,
  current,
  earlyaccessno,
}) {
  const data = {
    earlyaccess: {
      heading: `Congratulations !!! Your rewards are:`,
      200: {
        rewards: [
          "Finance master class",
          "Financial dictionary",
          "upsurge cap & bottle",
        ],
        foot: "Earn more unicoins to stay top in the waiting list !",
      },
      400: {
        rewards: ["Financial dictionary", "upsurge cap & bottle"],
        foot: "Earn more unicoins to get more exciting rewards.",
      },
      rest: {
        rewards: [
          "Avail discount on joining upsurge",
          "Earn bonus unicoins !!!",
          "Other exciting rewards",
        ],
        foot: "Earn more unicoins to get more exciting rewards.",
      },
    },
    refferal: {
      heading: "Refer more !!!",
      list: ["Send more than 5 invites and get extra rewards"],
      foot: "",
    },
  };
  return (
    <div className={styles.startscreen}>
      <div className={styles.right}>
        <Jasper
          className={`${styles.jasper} ${
            current !== "earlyaccess" && styles.refjasper
          }`}
        />

        <div className={styles.heading}>{data[current].heading}</div>
        {current === "earlyaccess" ? (
          <ul>
            {data[current][
              earlyaccessno <= 200 ? 200 : earlyaccessno <= 400 ? 400 : "rest"
            ].rewards.map((item, index) => {
              return (
                <li className={styles.text} key={"reward" + index}>
                  {item}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={`${styles.text} ${styles.referraltext}`}>
            Send more than 5 invites and get extra rewards
          </p>
        )}
        {(data[current].foot || current === "earlyaccess") && (
          <div className={styles.foot}>
            {current === "earlyaccess"
              ? data[current][
                  earlyaccessno <= 200
                    ? 200
                    : earlyaccessno <= 400
                    ? 400
                    : "rest"
                ].foot
              : data[current].foot}
          </div>
        )}
        <div className={styles.button} onClick={() => setshowdetails(false)}>
          Close
        </div>
      </div>
    </div>
  );
}
