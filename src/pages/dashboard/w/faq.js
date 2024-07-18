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
import styles from "../../../styles/WaitlistDashboard/faq.module.scss";
import Faq from "../../../components/Help/Faq";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
export default function Contact({ userdatafromserver }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("");
  const [current, setcurrent] = useState("");
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  const faqs = [
    {
      question: "How old does my child have to be to join upsurge?",
      answer: `It’s never too early to build healthy financial habits! As a parent, you’ll have to open an account first and then add your children. At the moment, our quests and games are relevant for kids over the age of 10.`,
    },
    {
      question: "How will I create my child’s username?",
      answer: `Once you’ve created your account as a parent, you can assign each child their own login credentials, and share it with them.`,
    },
    {
      question:
        "Will I be able to add multiple children to my upsurge account?",
      answer: `Yes! There is no limitation on the number of children linked to a parent account`,
    },
    {
      question:
        "Will I need to give my mobile number to create an account in upsurge?",
      answer: `We will need your mobile number to verify your account and make sure that you, and only you, can access your account. When a parent creates an account, we’ll send an OTP as verification that your account is linked to the right mobile number.`,
    },
    {
      question:
        "Will  I be able to  create an upsurge account, if I am not in India?",
      answer: `Yes! You can create an account from any part of the world. We also accept international payment options through our payment partners. .`,
    },
    {
      question: "Will my child's information be secured?",
      answer: `Yes, all the data pertaining to your child will be completely secured and used only to analyze their performance so that we can share the same with you. We do not collect any other data, other than what they do on our platform.`,
    },
  ];
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
          <div className={styles.heading}>Frequently Asked Questions</div>
          {faqs.map((item, index) => {
            return (
              <Faq
                key={"faq" + index}
                question={item.question}
                answer={item.answer}
                current={current}
                setcurrent={setcurrent}
              />
            );
          })}
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
