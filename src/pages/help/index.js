import React, { useState } from "react";
import HelpHeader from "../../components/Help/HelpHeader";
import image from "../../assets/help/help.png";
import Faq from "../../components/Help/Faq";
import Fab from "../../components/Help/Fab";
import styles from "../../styles/Help/help.module.scss";
import BallsSvg from "../../components/SVGcomponents/BallsSvg";
import SearchSvg from "../../components/SVGcomponents/SearchSvg";

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

      <div className={styles.faqpage}>
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
    </div>
  );
}

export default Help;
