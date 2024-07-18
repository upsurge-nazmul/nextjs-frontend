import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Home/faqsection.module.scss";
import Faq from "../Help/Faq";
export default function FaqSection({ customfaq }) {
  const faqs = [
    {
      question: "What ages are upsurge games good for?",
      answer: `It’s never too early to build skills and healthy financial habits! At the moment, our quests and games are relevant for kids over the age of 10. `,
    },
    {
      question: "What topics are covered by the games?",
      answer: `Our games are designed to deliver outcomes in financial literacy, entrepreneurship, problem solving, critical thinking, career awareness and real-life situational awareness.`,
    },
    {
      question: `How can I login?`,
      answer: `Once you’ve created your account, you can login using your username and password.`,
    },
    {
      question: `Can multiple students use the same account?`,
      answer: `No - each student should have a unique account with a unique phone number/email`,
    },
    {
      question: `Will I need to give my mobile number to create an account in upsurge?`,
      answer: `We will need your mobile number to verify your account and make sure that you, and only you, can access your account.`,
    },
    {
      question: `Will  I be able to  create an upsurge account, if I am not in India?`,
      answer: `Yes! You can create an account from any part of the world. We also accept international payment options through our payment partners.`,
    },
    {
      question: `Will my information be secured?`,
      answer: `Yes, all the data pertaining to your child will be completely secured and used only to analyze their performance so that we can share the same with you. We do not collect any other data, other than what they do on our platform`,
    },
  ];
  const [current, setcurrent] = useState("");
  const { theme } = useContext(MainContext);
  return (
    <div
      className={`${styles.faqsection} ${
        theme === "dark" && styles.darkfaqsection
      }`}
    >
      <div className={styles.left}>
        <h2 className={styles.heading}>FAQ&#39;s</h2>
      </div>
      <h2 className={styles.mobilehead}>FAQ&#39;s</h2>
      <div className={styles.wrapper}>
        {(customfaq ? customfaq : faqs).map((item, index) => {
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
      </div>
    </div>
  );
}
