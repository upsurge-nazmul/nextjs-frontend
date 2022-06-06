import React, { useState } from "react";
import HelpHeader from "./HelpHeader";
import image from "../../assets/help/help.png";
import Faq from "./Faq";
import Fab from "./Fab";
import SearchSvg from "../SVGcomponents/SearchSvg";
import LeftPanel from "../LeftPanel";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";
function Help() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const faqs = [
    {
      question: "How old does my child have to be to join upsurge?",
      answer: `It’s never too early to build healthy financial habits! As a parent, you’ll have to open an account first and then add your children. At the moment, our knowledge quests and games are relevant for kids over the age of 10.`,
    },
    {
      question: "How will I create my child’s username?",
      answer: `Once you’ve created your account as a parent, you can assign each child their own login credentials, and share it with them`,
    },
    {
      question: "Is upsurge comliant with GDPR?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "Are my kids personal details safe with upsurge?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "How old does my kid have to be to join upsurge?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "Are there any free courses I can take?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
    {
      question: "Is upsurge comliant with GDPR?",
      answer: `We will not, in any circumstances, share your personal information with other individuals or organizations without your permission, including public organizations, corporations or individuals, except when applicable by law. We do not sell, communicate or divulge your information to any mailing lists. 

          We can offer to add your address to an upsurge mailing list or list server if you request it. In this last case, you may at any time ask us to remove your name from such lists.`,
    },
  ];
  return (
    <div className="helpPage">
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <HelpHeader
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <Fab />
      <div className="frontpage">
        <div className="left">
          <div className="heading">Welcome to upsurge!</div>
          <div className="subheading">What do you need help with?</div>
          <div className="searchbar">
            <input type="text" placeholder="Type your question here . . ." />
            <div className="searchicon">
              <SearchSvg />
            </div>
          </div>
          <div className="green"></div>
          <div className="red"></div>
          <div className="yellow"></div>
          <div className="blue"></div>
        </div>
        <div className="right">
          <div className="back"></div>
          <img src={image.src} alt="" />
        </div>
      </div>

      <div className="faqpage">
        <div className="heading">Frequently Asked Questions</div>
        {faqs.map((item, index) => {
          return (
            <Faq
              key={"faqitem" + index}
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
