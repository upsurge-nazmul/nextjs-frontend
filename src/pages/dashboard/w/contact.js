import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import QuizApis from "../../../actions/apis/QuizApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import validator from "validator";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
import LogoFullWhte from "../../../components/SVGcomponents/LogoFullWhte";
import Toast from "../../../components/Toast";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/aboutus.module.scss";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
export default function Contact({ userdatafromserver }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("");
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  async function handlesubmit() {
    if (!name) {
      settoastdata({
        show: true,
        type: "error",
        msg: "Name cannot be empty",
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
    <div className={styles.leaderboard}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <p className={styles.heading}>{`Hello! We've been expecting you.`}</p>
          <p className={styles.subheading}>
            Now that you’re here, let’s start a conversation. Send us a message
            or pick up the phone and call us directly.
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
                <a className={styles.iconHolder} href="tel:+918287433304">
                  <PhoneInTalkIcon className={styles.icon} />
                </a>
                <div className={styles.text}>
                  <div className={styles.top}>Phone</div>
                  <div className={styles.bottom}>+91 8287433304</div>
                </div>
              </div>
              <div className={styles.segment}>
                <a
                  className={styles.iconHolder}
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
                onChange={(e) => setName(e.target.value)}
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
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,

          msg: "",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
