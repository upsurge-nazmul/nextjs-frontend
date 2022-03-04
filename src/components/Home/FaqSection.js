import React from "react";
import styles from "../../styles/Home/faqsection.module.scss";
import Faq from "../Help/Faq";
export default function FaqSection() {
  const faqs = [
    {
      question: "How old does my kid have to be to join upsurge?",
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
  return (
    <div className={styles.faqsection}>
      <div className={styles.heading}>
        Frequently <br /> Asked <br />
        Questions
      </div>
      <div className={styles.mobilehead}>Frequently Asked Questions</div>
      <div className={styles.wrapper}>
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
    </div>
  );
}
