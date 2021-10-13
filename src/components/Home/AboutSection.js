import React, { useEffect, useState } from "react";
import doodleLeft1 from "../../assets/about/doodle_l_1.png";
import doodleLeft2 from "../../assets/about/doodle_l_2.png";
import doodleLeft3 from "../../assets/about/doodle_l_3.png";
import doodleRight1 from "../../assets/about/doodle_r_1.png";
import doodleRight2 from "../../assets/about/doodle_r_2.png";
import doodleRight3 from "../../assets/about/doodle_r_3.png";
import styles from "../../styles/Home/aboutsection.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
function AboutSection() {
  const quotes = [
    {
      quote:
        "It’s not about having lots of money. It’s about how to manage it.",
      author: "Robert Kiyosaki",
    },
    {
      quote:
        "Too many people spend money they earned, to buy things they don't want, to impress people that they don't like.",
      author: "Will Rogers",
    },
    {
      quote:
        "It's how you deal with failure that determines how you achieve success.",
      author: "David Feherty",
    },
    {
      quote:
        "I never attempt to make money on the stock market. I buy on the assumption that they could close the market the next day and not reopen it for ten years.",
      author: "Warren Buffett",
    },
    {
      quote:
        "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest. You can't win until you do this. ",
      author: "Dave Ramsey",
    },
    {
      quote:
        "Buy when everyone else is selling and hold until everyone else is buying. That’s not just a catchy slogan. It’s the very essence of successful investing.",
      author: "J. Paul Getty",
    },
    {
      quote:
        "If money is your hope for independence, you will never have it. The only real security that a man will have in this world is a reserve of knowledge, experience, and ability.",
      author: "Henry Ford",
    },
    {
      quote:
        "How many millionaires do you know who have become wealthy by investing in savings accounts? I rest my case.",
      author: "Robert G. Allen",
    },
    {
      quote: "Money is a terrible master but an excellent servant.",
      author: "P.T. Barnum",
    },
    {
      quote:
        "Try to save something while your salary is small; it’s impossible to save after you begin to earn more. ",
      author: "Jack Benny",
    },
    {
      quote:
        "The individual investor should act consistently as an investor and not as a speculator.",
      author: "Ben Graham",
    },
    {
      quote:
        "Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas.",
      author: "Paul Samuelson",
    },
    {
      quote: "Every time you borrow money, you're robbing your future self. ",
      author: "Nathan W. Morris",
    },
    {
      quote: "Never spend your money before you have it.",
      author: "Thomas Jefferson",
    },
    {
      quote:
        "The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought, and so broadens the mind.",
      author: "T.T. Munger",
    },
    {
      quote:
        "Don't tell me what you value, show me your budget, and I'll tell you what you value.",
      author: "Joe Biden",
    },
    {
      quote:
        "Before you speak, listen. Before you write, think. Before you spend, earn. Before you invest, investigate. Before you criticize, wait. Before you pray, forgive. Before you quit, try. Before you retire, save. Before you die, give.",
      author: "William A. Ward",
    },
    {
      quote:
        "Without continual growth and progress, such words as improvement, achievement, and success have no meaning.",
      author: "Benjamin Franklin",
    },
    {
      quote:
        "The Stock Market is designed to transfer money from the Active to the Patient.",
      author: "Warren Buffett",
    },
    {
      quote:
        "When buying shares, ask yourself, would you buy the whole company?",
      author: "Rene Rivkin",
    },
    {
      quote:
        "If you have trouble imagining a 20% loss in the stock market, you shouldn’t be in stocks.",
      author: "John Bogle",
    },
    {
      quote:
        "Wealth is like sea-water; the more we drink, the thirstier we become; and the same is true of fame. ",
      author: "Arthur Schopenhauer",
    },
    {
      quote: "An investment in knowledge pays the best interest.",
      author: "Benjamin Franklin ",
    },
    {
      quote:
        "Finance is not merely about making money. It’s about achieving our deep goals and protecting the fruits of our labor. It’s about stewardship and, therefore, about achieving a good society.",
      author: "Robert J. Shiller",
    },
    {
      quote:
        "You must gain control over your money or the lack of it will forever control you.",
      author: "Dave Ramsey",
    },
    {
      quote:
        "I will tell you how to become rich. Close the doors. Be fearful when others are greedy. Be greedy when others are fearful.",
      author: "Warren Buffett",
    },
    {
      quote:
        "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong.",
      author: "George Soros",
    },
    {
      quote: "In investing, what is comfortable is rarely profitable.",
      author: "Robert Arnott",
    },
    {
      quote:
        "Courage taught me no matter how bad a crisis gets ... any sound investment will eventually pay off.",
      author: "Carlos Slim Helu",
    },
    {
      quote: "Returns matter a lot. It's our capital",
      author: "Abigail Johnson",
    },
  ];
  const [randomquotes, setrandomquotes] = useState(quotes);
  useEffect(() => {
    let q = [];
    let alreadadded = [];
    for (let i = 0; i < 6; i++) {
      while (true) {
        const random = Math.floor(Math.random() * quotes.length);
        if (!alreadadded.includes(random)) {
          q.push(quotes[random]);
          alreadadded.push(random);
          break;
        }
      }
    }
    setrandomquotes(q);
  }, []);
  return (
    <section className={styles.about}>
      <img
        className={`${styles.doodle} ${styles.dl1}`}
        src={doodleLeft1.src}
        alt="asdd"
      />
      <img
        className={`${styles.doodle} ${styles.dl2}`}
        src={doodleLeft2.src}
        alt=""
      />
      <img
        className={`${styles.doodle} ${styles.dl3}`}
        src={doodleLeft3.src}
        alt=""
      />
      <img
        className={`${styles.doodle} ${styles.dr1}`}
        src={doodleRight1.src}
        alt=""
      />
      <img
        className={`${styles.doodle} ${styles.dr2}`}
        src={doodleRight2.src}
        alt=""
      />
      <img
        className={`${styles.doodle} ${styles.dr3}`}
        src={doodleRight3.src}
        alt=""
      />
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        width={"100vw"}
      >
        {randomquotes.map((item, index) => {
          return (
            <div className={styles.textContent} key={"quote" + index}>
              <p className={styles.subheading}>“{item?.quote}”</p>
              <div className={styles.subheading2}>- {item?.author}</div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
}

export default AboutSection;
