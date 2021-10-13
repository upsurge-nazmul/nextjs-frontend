import React, { useEffect, useState } from "react";
import HelpHeader from "../../components/Help/HelpHeader";
import image from "../../assets/help/help.png";
import Faq from "../../components/Help/Faq";
import Fab from "../../components/Help/Fab";
import styles from "../../styles/Help/help.module.scss";
import BallsSvg from "../../components/SVGcomponents/BallsSvg";
import SearchSvg from "../../components/SVGcomponents/SearchSvg";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";

function Help() {
  const router = useRouter();
  const { type } = router.query;
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const faqs = [
    {
      question: "How old does my kid have to be to join Upsurge?",
      answer: `It’s never too early to build healthy financial habits! As a parent, you’ll have to open an account first and then add your children. At the moment, our knowledge quests and games are relevant for kids over the age of 10.`,
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
  useEffect(() => {
    if (!type) return;
    let faq = document.getElementById("faq");
    if (!faq) return;
    faq.scrollIntoView({
      behavior: "smooth",
    });
  }, [type]);
  return (
    <div className={styles.helpPage}>
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.frontpage}>
        <div className={styles.left}>
          <div className={styles.heading}>Welcome to Upsurge!</div>
          <div className={styles.subheading}>What do you need help with?</div>
          <div className={styles.searchbar}>
            <input type="text" placeholder="Type your question here . . ." />
            <div className={styles.searchicon}>
              <SearchSvg />
            </div>
          </div>
          <div className={styles.ballsvg}>
            <BallsSvg />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.back}></div>
          <img src={image.src} alt="" />
        </div>
      </div>

      <div className={styles.faqpage} id="faq">
        <div className={styles.heading}>Frequently Asked Questions</div>
        {faqs.map((item, index) => {
          return (
            <Faq
              key={"faq" + index}
              question={item.question}
              answer={item.answer}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Help;
