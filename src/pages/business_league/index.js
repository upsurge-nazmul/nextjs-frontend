import React, { useState } from "react";
import UblBanner from "../../components/SVGcomponents/UBL/UblBanner";
import UbliPrize from "../../components/SVGcomponents/UBL/UbliPrize";
import UblGreen from "../../components/SVGcomponents/UBL/UblGreen";
import UblYellow from "../../components/SVGcomponents/UBL/UblYellow";
import UblRed from "../../components/SVGcomponents/UBL/UblRed";
import UblTug from "../../components/SVGcomponents/UBL/UblTug";
import styles from "../../styles/ubl/ubl.module.scss";
import Values from "../../components/Home/Values";
import UblPrize from "../../components/SVGcomponents/UBL/UblPrize";
import UblForm from "../../components/Ubl/UblForm";
import Toast from "../../components/Toast";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import Terms from "../../components/Home/Terms";
import FaqSection from "../../components/Home/FaqSection";
import Footer from "../../components/Home/Footer";
import Seo from "../../components/Seo";
import Link from "next/link";
import Mentors from "../../components/Ubl/Mentors";

export default function UblPage() {
  const [showform, setshowform] = useState(false);
  const [showterm, setshowterm] = useState(false);
  const [done, setdone] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  const cosponsors = [
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_sponsor_logos/GEN.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_sponsor_logos/MM-logo.png",
    // "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_sponsor_logos/6-Tho-PSEJ-400x400.jpg",
  ];
  const participationTexts = [
    "Open to all students over the age of 12 - from Class 7 to 12.",
    `Students must compete in teams of 3 to 5 children.`,
    `Students will compete in 3 challenges in Round 1 with the top-25 teams moving on to the next round.`,
    `Up to the top 25 teams will be mentored as they develop their business ideas, & will pitch to investors & entrepreneurs for raising funds in the finale!`,
  ];
  const studentsWillGet = [
    "Certificates of Recognition.",
    `Access to upsurge - India’s 1st educational gaming platform.`,
    `Masterclasses on Business Plans & Career Development.`,
    `Vouchers & Offers from our partners.`,
  ];
  const student_imgs = [
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_students/certificate.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_students/upsurgeround.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_students/blackboard.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_students/percentage-1.png",
  ];
  const imgs = [
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_des_imgs/7.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_des_imgs/team-1.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_des_imgs/competing.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_des_imgs/idea.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_students/upsurgeround.png",
  ];
  const faqs = [
    {
      question: "Do you need school approval for UBL? ",
      answer:
        "No, while you can register as independent teams, we do need all members to be of the same school. Please feel free speak to your school administrators about the Upsurge Summer Bootcamp, and we can speak with them too if needed!",
    },
    {
      question: "How old do members have to be?",
      answer:
        "Teams can be made with 3 to 5 members. Members can be between 12 and 18, but should be currently enrolled in the same school. Team can have members of different ages.",
    },
    {
      question: "When can we register till?",
      answer: "Last date of registrations is June 20, 2022",
    },
    {
      question: "When & how will the competitions be held?",
      answer:
        "Knowledge Quests - online team-based quiz- will be held on Zoom/Google Meet on June 26, 2022. The last date to submit the case study & initial business idea will be July 3, 2022",
    },
    {
      question: "How will the teams for Round 2 choosen?",
      answer: `Teams that score the highest aggregate points from the quiz, case competition & business idea will be selected for Round 2, where we will guide them on developing their business idea for 2-3 weeks.`,
    },
    {
      question: "How can we know more?",
      answer: `Please feel free to contact us at hello@upsurge.in or 8287433304.`,
    },
  ];
  return (
    <div className={styles.ubl}>
      <Seo title="upsurge business league" />
      {showterm && <Terms termmode="term" setshowterm={setshowterm} />}
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      {showform && (
        <UblForm
          setshowform={setshowform}
          settoastdata={settoastdata}
          setshowterm={setshowterm}
          showterm={showterm}
          setdone={setdone}
          done={done}
        />
      )}
      <div className={styles.banner}>
        <UblBanner className={styles.bannerbg} />

        <div className={styles.center}>
          <div className={styles.sponsor}>
            Lead Sponsor
            <img
              className={styles.sponsorlogo}
              src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_sponsor_logos/jcbl-500x500.png"
              alt=""
            />
          </div>
          <p className={styles.herotext}>UPSURGE</p>
          <p className={styles.herotext}>BUSINESS</p>
          <p className={styles.herotext}>LEAGUE</p>
          <p className={styles.bluehero}>2022</p>
          <div className={styles.button} onClick={() => setshowform(true)}>
            Register Now
          </div>
        </div>
      </div>
      <div className={styles.des1}>
        <p>{`India’s 1st Business & Entrepreneurship championship for teenagers to promote the next generation of innovators & changemakers.`}</p>
      </div>
      <UbliPrize className={styles.prize} />
      <div className={styles.challenge}>
        <p className={styles.challengehead}>Challenge your friends across</p>
        <div className={styles.challengeDiv}>
          <div className={styles.challengeItem1}>
            <UblGreen className={styles.challengeSvg} />
            <p>{`Knowledge Quiz & Quests`}</p>
          </div>
          {/* <div className={styles.challengeItem2}>
            <UblYellow className={styles.challengeSvg} />
            <p>Case Challenge</p>
          </div> */}
          <div className={styles.challengeItem3}>
            <UblRed className={styles.challengeSvg} />
            <p>Business Plan Competition</p>
          </div>
        </div>
      </div>
      <div className={styles.cosponsors}>
        <p className={styles.head}>Co-Sponsors</p>
        <div className={styles.cosponsorwrapper}>
          {cosponsors.map((item) => {
            return <img src={item} alt="" key={item} />;
          })}
        </div>
      </div>
      <div className={styles.participation}>
        <p className={styles.head}>Event Information</p>
        <div className={styles.participationWrapper}>
          {participationTexts.map((item, index) => {
            return (
              <div key={item} className={styles.participationtextwrapper}>
                {index === 0 && <UblGreen className={styles.abstract1} />}
                {index === participationTexts.length - 1 && (
                  <UblYellow className={styles.abstract2} />
                )}

                <div className={styles.participationtext}>
                  <img src={imgs[index]} alt="" />

                  <p>{item}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.button} onClick={() => setshowform(true)}>
          Register Now
        </div>
      </div>
      <div className={styles.prizes}>
        <p className={styles.head}>Prizes and rewards</p>
        <div className={styles.wrapper}>
          <div className={styles.prizes}>
            <UblPrize type="gold" className={styles.prizeSvg} />
            <p className={styles.prizetitle}>First Prize</p>
            <p className={styles.prizemoney}>₹2,00,000</p>
          </div>
          <div className={styles.prizes}>
            <UblPrize type="silver" className={styles.prizeSvg} />
            <p className={styles.prizetitle}>second Prize</p>
            <p className={styles.prizemoney}>₹1,50,000</p>
          </div>
          <div className={styles.prizes}>
            <UblPrize type="bronze" className={styles.prizeSvg} />
            <p className={styles.prizetitle}>third Prize</p>
            <p className={styles.prizemoney}>₹1,00,000</p>
          </div>
        </div>
        <p className={styles.head}>Students will get</p>
        <div className={styles.challengeDiv}>
          <div className={styles.challengeItem1}>
            <UblGreen className={styles.challengeSvg} />
            <p>
              Upto 25 top teams will be given a ₹10,000 grant to develop their
              business idea for 2 weeks.
            </p>
          </div>
          <div className={styles.challengeItem2}>
            <UblYellow className={styles.challengeSvg} />
            <p>
              ₹1,00,000 cash prize for the schools with best performing teams
            </p>
          </div>
        </div>
        <div className={styles.participationWrapper}>
          {studentsWillGet.map((item, index) => {
            return (
              <div key={item} className={styles.participationtextwrapper}>
                {index === 0 && <UblGreen className={styles.abstract1} />}
                {index === participationTexts.length - 1 && (
                  <UblYellow className={styles.abstract2} />
                )}

                <div className={styles.participationtext}>
                  <img src={student_imgs[index]} alt="" />
                  <p>{item}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.roadmap}>
        <p className={styles.head}>Competition Roadmap</p>
        <div className={styles.roadmapWrapper}>
          <div className={styles.midline}></div>
          <div className={styles.roundHeading}>
            Registrations closes by October 25, 2022.
          </div>
          <div className={styles.round}>
            Each team will participate in 3 challenges and will be awarded
            points based on their performance. Up to 25 top teams will then
            progress to the next round.
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>
              October 30, 2022- Knowledge Quests- Live Business & Startups Quiz
            </p>
            {`90-minute online quiz which will test students on their knowledge of money & entrepreneurship, and their problem-solving skills - but not based on memory or clicking a button quickly. Teams will be given a problem to solve, & will be free to use whatever resources they want, especially google!`}
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>
              {`Meanwhile, you’ll also get to participate in interesting webinars
              & workshops that’ll help you prep for UBL 2022 (details in the
              section below)`}
            </p>
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>
              November 6, 2022- Business Idea Pitch
            </p>{" "}
            {`Teams will be required to come up with a business idea, evaluate & validate it, and submit a preliminary pitch video (maximum 5 minutes) or a presentation on their business plan.`}
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>November 6, 2022- Case Study</p>{" "}
            {
              "Each team will have to submit a go-to-market/launch strategy for their selected business idea based on the frameworks we will teach them about. The team will have to decide the product and brand name, and design the go-to-market strategy for their chosen product."
            }
          </div>
          <div className={styles.roundHeading}>
            Round 2 - Teams announced by November 13, 2022
          </div>
          <div className={styles.round}>
            Up to 25 top teams will be shortlisted based on their performance in
            Round 1.
          </div>
          <div className={styles.round}>
            Each shortlisted team will be given the following to develop their
            business idea
            <p>- Access to upsurge’s proprietary learning resources</p>
            <p>- A grant of ₹10,000</p>
            <p>
              - Free mentorship sessions with experts working at leading
              startups to understand business functions
            </p>
          </div>
          <div className={styles.roundHeading}>Finals - December 3, 2022</div>
          <div className={styles.round}>
            {`Final pitch will be held in front of a jury comprising
            entrepreneurs, venture capitalists, CXOs and startup leaders. Teams
            will present their plans & progress made, and best teams will
            receive investments of up to ₹3,00,000 from our incubator.`}
          </div>
          <UblTug className={styles.tug} />
        </div>
      </div>
      <div className={styles.roadmap}>
        <div className={styles.roadmapWrapper}>
          <div className={styles.midline}></div>
          <div className={styles.roundHeading}>Workshops & Webinars</div>
          <div className={styles.round}>
            LIVE interactive sessions with industry experts & leaders to prepare
            you for your first business plan and go-to-market strategy. Only on
            our Discord channel.
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>Sunday, Sep 11</p>
            How to make your first business plan? Decoding a food business
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>Sunday, Sep 18</p>5 freelancing tips
            for teens to earn money online
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>Sunday, Sep 25</p>
            Secret tips to build a go-to-market plan for your business REPEATED
            IN SEPT/OCT
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>Sunday, Oct 2</p>
            Go-to-market plan for a ecommerce business
          </div>
          <div className={styles.round}>
            <p style={{ fontWeight: 600 }}>Sunday, Oct 9</p>0 to 1: Decoding a
            food business plan from scratch
          </div>
        </div>
      </div>
      <Values insidebenefits />
      <Mentors />
      <div className={styles.sponsors}>
        <p className={styles.head}>Sponsors</p>
        <div className={styles.sponsor}>
          <a
            target="_blank"
            href="https://www.jcbl.com/"
            rel="noopener noreferrer"
          >
            <img src="https://i.ibb.co/xq11YDB/jcbl-500x500.png" alt="" />
          </a>
          <p>
            Incepted in 1989 with a vision to manufacture high-quality mobility
            solutions, today, JCBL Limited is a leading and one of the most
            preferred manufacturers of highly customised mobility solutions.
          </p>
        </div>
        <div className={styles.sponsor}>
          <a
            target="_blank"
            href="https://www.genglobal.org/"
            rel="noopener noreferrer"
          >
            <img src={cosponsors[0]} alt="" />
          </a>

          <p>{`The Global Entrepreneurship Network operates a platform of projects and
programs in 180 countries aimed at making it easier for anyone, anywhere
to start and scale a business.`}</p>
        </div>
        <div className={styles.sponsor}>
          <a
            target="_blank"
            href="https://mentormpact.com/"
            rel="noopener noreferrer"
          >
            <img src={cosponsors[1]} alt="" />
          </a>
          <p>{`Established in 2019, Mentor Mpact provides expert admissions counseling for top global undergraduate & MBA programs, along with profile-building & career development services to students. They have helped over 1,000 students get 3,000 admits across 20 countries!.`}</p>
        </div>
        
      </div>
      <FaqSection customfaq={faqs} />
      <Footer />
    </div>
  );
}
