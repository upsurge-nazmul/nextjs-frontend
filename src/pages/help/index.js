import React, { useState } from "react";
import HelpHeader from "../../components/Help/HelpHeader";
import image from "../../assets/help/help.png";
import Faq from "../../components/Help/Faq";
import Fab from "../../components/Help/Fab";
import styles from "../../styles/Help/help.module.scss";

function Help() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const faqs = [
    {
      question: "How old does my kid have to be to join Upsurge?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an Upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "Are there any free courses I can take?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an Upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "Is Upsurge comliant with GDPR?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an Upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "Are my kids personal details safe with Upsurge?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an Upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "How old does my kid have to be to join Upsurge?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an Upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "Are there any free courses I can take?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an Upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "Is Upsurge comliant with GDPR?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an Upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
  ];
  return (
    <div className={styles.helpPage}>
      <HelpHeader
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Fab />
      <div className={styles.frontpage}>
        <div className={styles.left}>
          <div className={styles.heading}>Welcome to Upsurge!</div>
          <div className={styles.subheading}>What do you need help with?</div>
          <div className={styles.searchbar}>
            <input type="text" placeholder="Type your question here . . ." />
            <div className={styles.searchicon}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1666 23.5006C14.6811 23.5001 17.1232 22.6583 19.104 21.1093L25.3317 27.337L27.3348 25.3338L21.1072 19.1061C22.657 17.1252 23.4993 14.6825 23.4999 12.1673C23.4999 5.9184 18.4155 0.833984 12.1666 0.833984C5.91767 0.833984 0.833252 5.9184 0.833252 12.1673C0.833252 18.4162 5.91767 23.5006 12.1666 23.5006ZM12.1666 3.66732C16.8543 3.66732 20.6666 7.47957 20.6666 12.1673C20.6666 16.8551 16.8543 20.6673 12.1666 20.6673C7.47884 20.6673 3.66659 16.8551 3.66659 12.1673C3.66659 7.47957 7.47884 3.66732 12.1666 3.66732Z"
                  fill="white"
                  fill-opacity="0.79"
                />
              </svg>
            </div>
          </div>
          <div className={styles.ballsvg}>
            <svg
              width="365"
              viewBox="0 0 365 190"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="320" cy="138" r="45" fill="#4166EB" />
              <circle cx="20.5" cy="162.5" r="20.5" fill="#FF6263" />
              <circle cx="308.5" cy="73.5" r="20.5" fill="#FDCC03" />
              <path
                d="M254.744 152.744C298.087 111.729 299.974 43.343 258.959 -0.000106646L102 148.529C143.015 191.872 211.401 193.759 254.744 152.744Z"
                fill="#17D1BC"
              />
            </svg>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.back}></div>
          <img src={image.src} alt="" />
        </div>
      </div>

      <div className={styles.faqpage}>
        <div className={styles.heading}>Frequently Asked Questions</div>
        {faqs.map((item) => {
          return <Faq question={item.question} answer={item.answer} />;
        })}
      </div>
    </div>
  );
}

export default Help;
