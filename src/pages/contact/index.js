import React, { useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import Whatsapp from "../../components/SVGcomponents/Whatsapp";
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
            {`Thank you for considering us for your family's educational needs.`}
          </p>
          <p className={styles.details}>
            When you fill out the appointment request form, please be sure to
            upload the form you filled out for the current school year.
          </p>
          <a
            className={styles.button}
            href="https://wa.me/918287433304"
            target="_blank"
            rel="noreferrer"
          >
            <div className={styles.walogo}>
              <Whatsapp />
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
