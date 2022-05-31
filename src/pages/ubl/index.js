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
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ubl_sponsor_logos/6-Tho-PSEJ-400x400.jpg",
  ];
  const participationTexts = [
    "Open to all students over the age of 12 - from Class 7 to 12.",
    `Students must make teams of 3 to 5 students from the same school.`,
    `Students will compete in 3 challenges in Round 1 with the top-25 teams moving on to the next round.`,
    `Top 25 teams will be mentored as they develop their business ideas, & will pitch to investors & entrepreneurs for raising funds in the finale!`,
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
  return (
    <div className={styles.ubl}>
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
        <p>{`India’s 1st Business & Entrepreneurship championship for schoolchildren to promote the next generation of innovators & changemakers.`}</p>
        <p>{`100 teams will compete against each other across 3 challenges, & the top-25 most innovative ideas will be given ₹10,000 to develop their ideas. They will then pitch to real entrepreneurs, investors & CXOs and can win prizes worth ₹10,00,000!`}</p>
      </div>
      <UbliPrize className={styles.prize} />

      <div className={styles.challenge}>
        <p className={styles.challengehead}>Challenge your friends across</p>
        <div className={styles.challengeDiv}>
          <div className={styles.challengeItem1}>
            <UblGreen className={styles.challengeSvg} />
            <p>Knowledge Quest</p>
          </div>
          <div className={styles.challengeItem2}>
            <UblYellow className={styles.challengeSvg} />
            <p>Case Challenge</p>
          </div>
        </div>
        <div className={styles.challengeItem3}>
          <UblRed className={styles.challengeSvg} />
          <p>Business Plan Competition</p>
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
            <p className={styles.prizemoney}>₹3,00,000</p>
          </div>
          <div className={styles.prizes}>
            <UblPrize type="silver" className={styles.prizeSvg} />
            <p className={styles.prizetitle}>second Prize</p>
            <p className={styles.prizemoney}>₹2,00,000</p>
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
              Top-25 teams will be given a ₹10,000 grant to develop their
              business idea for 2 weeks.
            </p>
          </div>
          <div className={styles.challengeItem2}>
            <UblYellow className={styles.challengeSvg} />
            <p>
              Top 3 schools with teams scoring the most points will also receive
              awards
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
          <div className={styles.roundHeading}>Round 1</div>
          <div className={styles.round}>
            Each team will participate in 3 challenges and will be awarded
            points based on their performance. The top 25 teams will then
            progress to the next round.
          </div>
          <div className={styles.round}>
            <span>Business Quiz -</span> live online 30-question quiz to be
            answered in 10 minutes by teams to test their business knowledge and
            speed.
          </div>
          <div className={styles.round}>
            <span>Case Study -</span> Each team would be a startup that is
            launching an FMCG brand in the Indian market. The team will have to
            decide the product and brand name, and design the go-to-market
            strategy for their chosen product.
          </div>
          <div className={styles.round}>
            <span>Business Pitch -</span>{" "}
            {`Teams will be required to come up with
            a business idea, evaluate & validate it, and submit a preliminary
            pitch video (maximum 5 minutes) or a presentation on their business
            plan.`}
          </div>
          <div className={styles.roundHeading}>Round 2</div>
          <div className={styles.round}>
            Top 25 teams will be shortlisted based on their performance in Round
            1.
          </div>
          <div className={styles.round}>
            Each shortlisted team to be given the following to develop their
            business idea
            <p>- Access to upsurge’s proprietary learning resources</p>
            <p>- A grant of ₹10,000</p>
            <p>
              - Free mentorship sessions with professionals working at leading
              startups
            </p>
          </div>
          <div className={styles.roundHeading}>Finals</div>
          <div className={styles.round}>
            Final pitch will be held on 9th July in front of a jury of 5 judges
            comprising entrepreneurs, venture capitalists, CXOs and startup
            leaders.
          </div>
          <UblTug className={styles.tug} />
        </div>
      </div>
      <Values insidebenefits />

      <div className={styles.sponsors}>
        <p className={styles.head}>Sponsors</p>
        <div className={styles.sponsor}>
          <img src="https://i.ibb.co/xq11YDB/jcbl-500x500.png" alt="" />
          <p>
            Incepted in 1989 with a vision to manufacture high-quality mobility
            solutions, today, JCBL Limited is a leading and one of the most
            preferred manufacturers of highly customised mobility solutions.
          </p>
        </div>
        <div className={styles.sponsor}>
          <img src={cosponsors[0]} alt="" />
          <p>{`The Global Entrepreneurship Network operates a platform of projects and
programs in 180 countries aimed at making it easier for anyone, anywhere
to start and scale a business.`}</p>
        </div>
        <div className={styles.sponsor}>
          <img src={cosponsors[1]} alt="" />
          <p>{`Established in 2019, Mentor Mpact provides expert admissions counseling
for top global MBA, Undergraduate, Master’s, and Ph.D. programs, along
with profile-building & career development services to students & young
professionals.`}</p>
        </div>
        <div className={styles.sponsor}>
          <img src={cosponsors[2]} alt="" />
          <p>{`Leading startup in the F&B space which makes delicious range of healthy,
clean-label and delicious nut butters, dessers & spreads for all.`}</p>
        </div>
      </div>
    </div>
  );
}
