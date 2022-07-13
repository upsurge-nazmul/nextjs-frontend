import Image from "next/image";
import React from "react";
import { mentors } from "../../static_data/UBL_Data";
import styles from "../../styles/ubl/mentors.module.scss";
import LinkedIN from "../SVGcomponents/LinkedInSvg";

export default function Mentors() {
  return (
    <div className={styles.mentors}>
      <p className={styles.heading}>{`Judges & Mentors`}</p>
      <div className={styles.wrapper}>
        {mentors.map((mentor) => {
          return (
            <div className={styles.role} key={mentor.link}>
              <div
                className={styles.img}
                onClick={() => window.open(mentor.link, "_blank")}
              >
                <div className={styles.hover}>
                  <LinkedIN className={styles.linkedin} />
                </div>
                <Image
                  src={`/images/mentors/${mentor.name.split(" ")[0]}.jpg`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className={styles.name}>{mentor.name}</p>
              <p className={styles.position}>{mentor.des}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
