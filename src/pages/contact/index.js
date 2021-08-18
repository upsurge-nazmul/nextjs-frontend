import React, { useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Contact/contact.module.scss";

function Contact() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);

  return (
    <div className={styles.contactPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <section className={styles.intro}>
        <p className={styles.heading}>Contact Us</p>
        <div className={styles.content}>
          <p className={styles.details}>
            Thank you for considering us for your family's educational needs.
          </p>
          <p className={styles.details}>
            When you fill out the appointment request form, please be sure to
            upload the form you filled out for the current school year.
          </p>
          <a
            className={styles.button}
            href="https://wa.me/918287433304"
            target="_blank"
          >
            <div className={styles.walogo}>
              <svg viewBox="0 0 496 497">
                <defs>
                  <linearGradient
                    id="a"
                    x1="247.32"
                    x2="247.32"
                    y1="446.09"
                    y2="39.9"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#20b038"></stop>
                    <stop offset="1" stopColor="#60d66a"></stop>
                  </linearGradient>
                  <linearGradient
                    id="b"
                    x1="247.32"
                    x2="247.32"
                    y1="453.37"
                    y2="32.61"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#f9f9f9"></stop>
                    <stop offset="1" stopColor="#fff"></stop>
                  </linearGradient>
                </defs>
                <path d="M37.88 453.37l29.59-108A208 208 0 0 1 39.63 241.1c0-115 93.6-208.49 208.56-208.49a208.57 208.57 0 0 1 208.57 208.66c-.05 115-93.62 208.49-208.57 208.49h-.08a208.41 208.41 0 0 1-99.67-25.38zm115.68-66.73l6.34 3.75a173.18 173.18 0 0 0 88.23 24.16h.06c95.55 0 173.31-77.75 173.35-173.3A173.34 173.34 0 0 0 248.26 67.83c-95.62 0-173.38 77.73-173.42 173.28a172.94 172.94 0 0 0 26.5 92.23l4.13 6.55L88 403.84z"></path>
                <path
                  fill="url(#a)"
                  d="M45.13 446.09l28.57-104.3a200.82 200.82 0 0 1-26.88-100.62c0-111 90.36-201.27 201.34-201.27A201.35 201.35 0 0 1 449.5 241.32c0 111-90.37 201.28-201.33 201.28h-.09a201.31 201.31 0 0 1-96.21-24.49z"
                ></path>
                <path
                  fill="url(#b)"
                  d="M37.88 453.37l29.59-108A208 208 0 0 1 39.63 241.1c0-115 93.6-208.49 208.56-208.49a208.57 208.57 0 0 1 208.57 208.66c-.05 115-93.62 208.49-208.57 208.49h-.08a208.41 208.41 0 0 1-99.67-25.38zm115.68-66.73l6.34 3.75a173.18 173.18 0 0 0 88.23 24.16h.06c95.55 0 173.31-77.75 173.35-173.3A173.34 173.34 0 0 0 248.26 67.83c-95.62 0-173.38 77.73-173.42 173.28a172.94 172.94 0 0 0 26.5 92.23l4.13 6.55L88 403.84z"
                ></path>
                <path
                  fill="#fff"
                  d="M196.07 153.94c-3.91-8.68-8-8.85-11.73-9-3-.14-6.51-.13-10-.13a19.15 19.15 0 0 0-13.89 6.52c-4.78 5.22-18.24 17.82-18.24 43.46s18.67 50.42 21.28 53.9 36.05 57.77 89 78.66c44 17.36 53 13.91 62.53 13s30.83-12.61 35.18-24.78 4.34-22.59 3-24.77-4.78-3.48-10-6.08-30.83-15.22-35.61-16.95-8.25-2.61-11.73 2.61-13.45 16.94-16.5 20.42-6.08 3.92-11.29 1.31-22-8.11-41.9-25.86c-15.5-13.82-26-30.87-29-36.09s-.32-8 2.29-10.63c2.34-2.34 5.21-6.09 7.82-9.13s3.47-5.21 5.21-8.69.87-6.52-.44-9.13-11.35-28.34-15.98-38.64z"
                ></path>
              </svg>
            </div>
            Message us on WhatsApp
          </a>
          <p className={styles.details}>Surgeup Technologies</p>
          <p className={styles.mail}>
            <a href="tel:+918287433304">8287 433 304 </a> |{" "}
            <a href="mailto:karan@upsurgefi.com">karan@upsurgefi.com</a>
          </p>
        </div>
      </section>
      <section className={styles.footer}>
        <div className={styles.triangle}>
          <svg>
            <g fill="#FC6766" fillRule="evenodd" width="53" height="24">
              <path d="M26.5 24L53 0H0z"></path>
            </g>
          </svg>
        </div>
        <div className={styles.content}>
          <p>Copyright © 2021 upsurge India - All Rights Reserved.</p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
