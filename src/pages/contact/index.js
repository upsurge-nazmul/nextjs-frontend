import React, { useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Contact/contact.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import Footer from "../../components/Home/Footer";
import validator from "validator";
import Toast from "../../components/Toast";
import LoginApis from "../../actions/apis/LoginApis";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import LogoFullWhte from "../../components/SVGcomponents/LogoFullWhte";
import { onlyText } from "../../helpers/validationHelpers";
function Contact() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [msg, setMsg] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  async function handlesubmit() {
    if (!name) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Name cannot be empty",
      });
      return;
    }
    if (!email) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Email is required",
      });
      return;
    }
    if (!msg) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Please enter your message",
      });
      return;
    }
    if (!validator.isEmail(email)) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Enter valid email address",
      });
      return;
    }
    let res = await LoginApis.addtocontactmsgs({
      email,
      msg,
      name,
    });
    if (res && res.data.success) {
      settoastdata({
        show: true,
        type: "success",
        msg: "Thank You, We will contact you soon.",
      });
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: "Theres some error try agian later",
      });
    }
  }
  return (
    <div className={styles.contactPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <section className={styles.container}>
        <p className={styles.heading}>{`Hello! We've been expecting you.`}</p>
        <p className={styles.subheading}>
          Now that you’re here, let’s start a conversation. Send us a message or
          pick up the phone and call us directly.
        </p>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.segment}>
              <div className={styles.iconHolder}>
                <LogoFullWhte className={styles.logoicon} />
              </div>
              <div className={styles.text}>
                <div className={styles.top}>Company</div>
                <div className={styles.bottom}>
                  Surgeup Technologies Private Limited.
                </div>
              </div>
            </div>
            <div className={styles.segment}>
              <div className={styles.iconHolder}>
                <LocationOnIcon className={styles.icon} />
              </div>
              <div className={styles.text}>
                <div className={styles.top}>Address</div>
                <div className={styles.bottom}>
                  B-5/30, Safdarjung Enclave New Delhi DL 110029 India
                </div>
              </div>
            </div>
            <div className={styles.segment}>
              <a
                className={`${styles.iconHolder} ${styles.animate}`}
                href="tel:+918851117926"
              >
                <PhoneInTalkIcon className={styles.icon} />
              </a>
              <div className={styles.text}>
                <div className={styles.top}>Phone</div>
                <div className={styles.bottom}>+91 8851117926</div>
              </div>
            </div>
            <div className={styles.segment}>
              <a
                className={`${styles.iconHolder} ${styles.animate}`}
                href="mailto:karan@upsurgefi.com"
              >
                <EmailIcon className={styles.icon} />
              </a>
              <div className={styles.text}>
                <div className={styles.top}>Email</div>
                <div className={styles.bottom}>karan@upsurgefi.com</div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <p className={styles.title}>Send us a message</p>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(onlyText(e.target.value))}
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Your message"
              onChange={(e) => setMsg(e.target.value)}
            />
            <div className={styles.button} onClick={handlesubmit}>
              Send Message
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
