import React from "react";
import styles from "../../styles/Benefits/experimential.module.scss";
import GeoObjectsSvg from "../SVGcomponents/GeoObjectsSvg";
export default function Experimential({ id }) {
  return (
    <div className={styles.main} id={id}>
      <GeoObjectsSvg className={styles.geo} />
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.text}>I hear and I forget,</p>{" "}
          <p className={styles.text}>I see and I remember,</p>{" "}
          <p className={styles.text}>
            I do and <strong>I understand.</strong>
          </p>
        </div>
        <div className={styles.right}>
          <p className={styles.subheading}>
            {`Through games, simulators and activities that have been designed by our experiential learning experts, children are able to experience the importance of money management in a virtual environment. 

Playing games reinforces the concepts that the child has learned, and at the same time brings an element of fun to financial literacy and entrepreneurship. And we all know that children learn best when they are having fun!
`}
          </p>
        </div>
      </div>
    </div>
  );
}
