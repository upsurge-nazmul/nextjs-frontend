import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Home/faqsection.module.scss";
import Faq from "../Help/Faq";
export default function FaqSection({ customfaq }) {
  const faqs = [
    {
      question: "What do we do?",
      answer: `We teach money management and Financial Literacy for Students of age 8 to 18 yrs`,
    },
    {
      question: "How old does my child have to be to join upsurge?",
      answer: `It’s never too early to build healthy financial habits! As a parent, you’ll have to open an account first and then add your children. At the moment, our knowledge quests and games are relevant for kids over the age of 10.`,
    },
    {
      question: "What are some of the Courses (Knowledge Quests) available?",
      answer: `We have immersive gamified courses on 
      Entrepreneurship
      Smart Money Management
      Investing
      Marketing 
      Industry Fundamentals (Hospitality, Media & Entertainment, VC, FMCG etc.)
      Career Quests (Author, Sportsperson, Game Developer)
      and much more
      `,
    },
    {
      question: `What will children learn?`,
      answer: `We aim to empower Financial Literacy for students with the life skills such as Functioning of money in 21st Century, Money Management, Investing and growing money, Building and executing a Business`,
    },
    {
      question: "What skills will the children gain?",
      answer: `Through our courses and games, the children will aslo gain exposure to situations where they will get to develop their
      Problem Solving
      Critical Thinking
      Innovative Thinking
      Communication
      `,
    },
    {
      question: "Why understand personal finance?",
      answer: `The most important skills to build a future are not taught in school. One of the most important aspects of a successful individual is managing money. And what if we told you it's as simple as enrolling your child with us? Our comprehensive program will help your child achieve his/her financial goals
      `,
    },
    {
      question: "Why Entrepreneurship skills?",
      answer: `Entrepreneurship skills help students to ideate their thoughts into viable results. Students learn to identify economic opportunities and act upon them. It teaches innovation, perseverance, dedication, decision-making, and self-confidence.`,
    },
    {
      question: "What does my child need to know to take the courses?",
      answer:
        "Our course are made keeping children in mind - so all they have to know is english comprehension and basic mathematical concepts.",
    },
    {
      question: "What if the student does not like the course?",
      answer:
        "We have a 14 day no question asked refund policy if you enroll with us for 6 months or longer.",
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
        <h2 className={styles.heading}>
          FAQ&#39;s of <br />
          Financial Literacy
        </h2>
      </div>
      <h2 className={styles.mobilehead}>Frequently Asked Questions</h2>
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
