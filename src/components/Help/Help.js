import React, { useState } from "react";
import HelpHeader from "./HelpHeader";
import image from "../../assets/help/help.png";
import Faq from "./Faq";
import Fab from "./Fab";
import SearchSvg from "../SVGcomponents/SearchSvg";
import LeftPanel from "../LeftPanel";
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
  console.log(image);
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

      <Fab />
      <div className="frontpage">
        <div className="left">
          <div className="heading">Welcome to Upsurge!</div>
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
