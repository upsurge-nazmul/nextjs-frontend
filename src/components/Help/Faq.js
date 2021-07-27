import React, { useState } from "react";
import styles from "../../styles/Help/faq.module.scss";

function Faq({ question, answer }) {
  const [show, setshow] = useState(false);
  return (
    <div className={styles.faqcomponent}>
      <div
        className={`${styles.top} ${show ? styles.faqopened : ""}`}
        onClick={() => setshow(!show)}
      >
        <div className={styles.icon}>
          {!show ? (
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.394 8.04602L1.8495 13.584C1.0395 14.0535 0 13.485 0 12.5385V1.46252C0 0.517522 1.038 -0.0524782 1.8495 0.418522L11.394 5.95652C11.5783 6.06171 11.7314 6.21375 11.8379 6.39723C11.9445 6.58071 12.0006 6.78911 12.0006 7.00127C12.0006 7.21344 11.9445 7.42183 11.8379 7.60531C11.7314 7.78879 11.5783 7.94084 11.394 8.04602Z"
                fill="#4166EB"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.95447 11.394L0.416466 1.8495C-0.0530339 1.0395 0.515466 -5.78521e-07 1.46197 -5.37148e-07L12.538 -5.3001e-08C13.483 -1.16938e-08 14.053 1.038 13.582 1.8495L8.04397 11.394C7.93878 11.5783 7.78674 11.7314 7.60325 11.8379C7.41977 11.9445 7.21138 12.0006 6.99922 12.0006C6.78705 12.0006 6.57866 11.9445 6.39518 11.8379C6.2117 11.7314 6.05965 11.5783 5.95447 11.394Z"
                fill="white"
              />
            </svg>
          )}
        </div>
        <p className={styles.question}>{question}</p>
      </div>
      <div className={`${styles.answer} ${show ? styles.showanswer : ""}`}>
        {answer}
      </div>
    </div>
  );
}

export default Faq;
