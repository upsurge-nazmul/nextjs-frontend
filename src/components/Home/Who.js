import React from "react";
import styles from "../../styles/Home/who.module.scss";
import whoimage from "../../assets/who/who.png";
function Who() {
  return (
    <div className={styles.whoSection}>
      <div className={styles.heading}>
        <span className={styles.highlight}>
          Who <div className={styles.underline}></div>{" "}
        </span>
        are we ?
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imageblock}>
            <svg
              width="66"
              height="66"
              viewBox="0 0 66 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33 0C14.7763 0 0 14.7763 0 33C0 51.2237 14.7763 66 33 66C51.2237 66 66 51.2237 66 33C66 14.7763 51.2237 0 33 0ZM43.6145 33.5083L27.527 45.2129C27.4388 45.2763 27.3349 45.3142 27.2266 45.3223C27.1183 45.3304 27.0098 45.3086 26.9131 45.2591C26.8164 45.2096 26.7353 45.1344 26.6785 45.0418C26.6218 44.9492 26.5917 44.8428 26.5915 44.7342V21.3395C26.5912 21.2307 26.6209 21.1239 26.6776 21.031C26.7342 20.938 26.8154 20.8626 26.9123 20.813C27.0092 20.7634 27.1179 20.7416 27.2264 20.7501C27.3349 20.7585 27.4389 20.7968 27.527 20.8607L43.6145 32.558C43.6905 32.6118 43.7525 32.683 43.7953 32.7657C43.8381 32.8483 43.8604 32.9401 43.8604 33.0331C43.8604 33.1262 43.8381 33.218 43.7953 33.3006C43.7525 33.3833 43.6905 33.4545 43.6145 33.5083Z"
                fill="white"
              />
            </svg>

            <img src={whoimage.src} alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <p>
            We are a{" "}
            <span>
              financial literacy and entrepreneurship development program
            </span>
            for children between the ages of 7 to 18.
          </p>
          <p>
            We believe in practical learning and have developed our own
            curriculums and games to{" "}
            <span>
              make learning fun, effective and rewarding for children.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Who;
