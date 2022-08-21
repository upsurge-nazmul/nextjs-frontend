import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import styles from "../../styles/Team/teamspage.module.scss";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";

const POSITIONS = [
  { id: "productAndGrowth", name: "Product & Growth" },
  { id: "gaming", name: "Gaming" },
  { id: "learning", name: "Learning" },
  { id: "design", name: "Design" },
  { id: "boardOfAdvisors", name: "Board of Advisors" },
  { id: "mentors", name: "Mentors" },
];

function TeamsPage() {
  let data = {
    productAndGrowth: [
      {
        name: "Karan Baweja",
        img_url: "/images/mentors/Karan.jpg",
        position: "Product & Growth",
        link: "https://www.linkedin.com/in/karanbaweja/",
      },
      {
        name: "Anuj Sankla",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Product & Growth",
      },
      {
        name: "Ankur Tandon",
        img_url: "/images/mentors/Ankur.jfif",
        position: "Product & Growth",
      },
      {
        name: "Alok Prateek",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Product & Growth",
      },
      {
        name: "Ritika Dhall",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Product & Growth",
      },
      {
        name: "Parth",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Product & Growth",
      },
    ],
    gaming: [
      {
        name: "Valan Costa",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Gaming",
      },
      {
        name: "Kartheek Raj",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Gaming",
      },
      {
        name: "Ujjwal Saini",
        img_url: "/images/mentors/Ujjwal.png",
        position: "Gaming",
      },
      {
        name: "Firoz Khira",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Gaming",
      },
    ],
    learning: [
      {
        name: "Medha Narayanan",
        img_url: "/images/mentors/Medha.jpg",
        position: "Learning",
        link: "https://www.linkedin.com/in/medhanarayanan/",
      },
      {
        name: "Garima Gaur",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Learning",
      },
      {
        name: "Aarti Gadeok",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Learning",
      },
      {
        name: "Firoz Khira",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Learning",
      },
    ],
    design: [
      {
        name: "Yash Sharma",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Design",
      },
      {
        name: "Sohil Jami",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Design",
      },
      {
        name: "Vansh Jay",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Design",
      },
    ],
    boardOfAdvisors: [
      {
        name: "Varun Jairath",
        img_url: "/images/mentors/Varun.jpg",
        position: "Board of Advisors",
        link: "https://www.linkedin.com/in/varun-jairath-3305047/",
      },
      {
        name: "Anoop Jairath",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Board of Advisors",
      },
      {
        name: "Rishi Aggarwa",
        img_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Djw-ESwGJhydwzAcfHgJ0LDE0ab7m5lp9Q&usqp=CAU",
        position: "Board of Advisors",
      },
      {
        name: "Chandni Singh",
        img_url: "/images/mentors/Chandni.jpg",
        position: "Board of Advisors",
      },
    ],
    mentors: [
      {
        name: "Ayush S",
        img_url: "/images/mentors/Ayush.jpg",
        link: "https://www.linkedin.com/in/sharmaay/",
        position: "Kearney | IIM | IIT",
      },
      {
        name: "Deeksha N",
        img_url: "/images/mentors/Deeksha.jpg",
        link: "https://www.linkedin.com/in/deeksha-narula-b5941932/",
        position: "BCG | IIM",
      },
      {
        name: "Abhinandan G",
        img_url: "/images/mentors/Abhinandan.jpg",
        link: "https://www.linkedin.com/in/abhinandan-gopalsetty-a936a116/",
        position: "Marketing @ BMW | IMI",
      },
      {
        name: "Shruti J",
        img_url: "/images/mentors/Shruti.jpg",
        link: "https://www.linkedin.com/in/shruti-jolly-2217139/",
        position: "Startup Marketing Expert | ISB | x-McKinsey",
      },
      {
        name: "Harsha N",
        img_url: "/images/mentors/Harsha.jpg",
        link: "https://www.linkedin.com/in/harsha8/",
        position: "Industry Leader @ Google | ISB",
      },
      {
        name: "Mayur S",
        img_url: "/images/mentors/Mayur.jpg",
        link: "https://www.linkedin.com/in/mayursingh/",
        position:
          "Sustainability Warrior | Entrepreneur | ISB | Angel Investor",
      },
      {
        name: "Yatin T",
        img_url: "/images/mentors/Yatin.jpg",
        link: "https://www.linkedin.com/in/yatinthakur/",
        position: "GEN India MD | Entrepreneur | Startup India Founder",
      },
      {
        name: "Purnima G",
        img_url: "/images/mentors/Purnima.jpg",
        link: "https://www.linkedin.com/in/purnimagandhi/",
        position: "Temasek | Oxford",
      },
      {
        name: "Amit G",
        img_url: "/images/mentors/Amit.jpg",
        link: "https://www.linkedin.com/in/amit-gupta-42a2ab13/",
        position: "EY | ISB",
      },
    ],
  };
  return (
    <div className={styles.teamPage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.heading}>Meet Us</div>
        <div className={styles.quote}>
          If your actions inspire others to dream more, learn more, do more and
          become more, you are a leader.
        </div>
        <div className={styles.mainContent}>
          {Object.keys(data).map((item) => {
            return (
              <div className={styles.team}>
                <div className={styles.teamTitle}>
                  {POSITIONS.find((pos) => pos.id === item).name}
                </div>
                <div className={styles.teamMembers}>
                  {Object.values(data[item]).map((elem, index) => {
                    return (
                      <div
                        className={
                          elem.link ? styles.memberWithLink : styles.member
                        }
                        key={"teammeber" + index}
                        onClick={
                          elem.link
                            ? () => window.open(elem.link, "_blank")
                            : () => {}
                        }
                      >
                        <div className={styles.imageArea}>
                          <img
                            src={elem.img_url}
                            alt="member image"
                            className={styles.img}
                          />
                          <div className={styles.iconArea}>
                            <LinkedIN className={styles.linkedin} />
                          </div>
                        </div>
                        <div className={styles.name}>{elem.name}</div>
                        <div className={styles.position}>{elem.position}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TeamsPage;
