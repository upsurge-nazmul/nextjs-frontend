import React, { useEffect, useState } from "react";
import QuoteSvg from "../SVGcomponents/QuoteSvg";
import Image from "next/image";
import styles from "../../styles/Home/testimonial.module.scss";
export default function TestiMonial() {
  const testimonials = [
    {
      quote:
        "I am so glad someone is trying to teach our kids money management. Being a mother of 2 daughters, I want them to be much more financially independent and savvy than I am. Kudos upsurge for taking up this cause!",
      name: "Divya",
      img: "https://i.ibb.co/9vdwJyX/Untitled-design-65.png",
    },
    {
      quote:
        "We were fortunate enough to get access to upsurge for testing, and both my children absolutely loved it. The chore management feature has them competing against each other to finish their chores first and earn more unicoins, and the games have them competing against each other! And of course, they are learning very important money skills that were never taught to us.",
      name: "Sophia",
      img: "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    },
    {
      quote:
        "When I heard that there’s someone teaching personal finance to children, I got in touch with upsurge to get access. While they were under testing, they gave us access and my son has been loving the courses and the games. In fact, some of the games and activities that are meant for the family to play together are currently a favorite in our home.",
      name: "Sonam ",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80",
    },
    {
      quote:
        "My 17-year-old daughter, after going through the knowledge quests and playing the investment games has started investing Rs. 2,500 a month in mutual funds! I couldn’t have imagined this a few months ago!",
      name: "Radha",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80",
    },
    {
      quote:
        "Within a month of starting upsurge, my son has become so involved with household budgets and money in general! He discusses business news with us, and wants to become a electric vehicle entrepreneur in the long term (just like his hero Mr. Musk)",
      name: "Pradeep",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80",
    },
    {
      quote:
        "The Knowledge Quests are designed really well - easy to understand concepts, real examples and fun activities make sure that my daughter is learning and having fun.",
      name: "Mayur",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80",
    },
  ];
  const [currenttestimonial, setcurrenttestimonial] = useState(0);
  const [mouseon, setmouseon] = useState(false);
  const [timeout, settimeout] = useState(null);
  useEffect(() => {
    if (mouseon && timeout) {
      clearTimeout(timeout);
    } else {
      settimeout(
        setTimeout(() => {
          setcurrenttestimonial((currenttestimonial + 1) % testimonials.length);
        }, 3000)
      );
    }
    return () => clearTimeout(timeout);
  }, [currenttestimonial, mouseon]);

  return (
    <div className={styles.testimonial}>
      <div className={styles.left}>
        <QuoteSvg className={styles.quotesvg} />

        <p
          className={styles.quote}
          onMouseOver={() => setmouseon(true)}
          onMouseLeave={() => setmouseon(false)}
        >
          {testimonials[currenttestimonial].quote}
        </p>
        <p className={styles.name}>- {testimonials[currenttestimonial].name}</p>
        <p className={styles.des}>{testimonials[currenttestimonial].des}</p>
        <div className={styles.navbar}>
          {testimonials.map((item, index) => {
            return (
              <div
                className={`${styles.ball} ${
                  index === currenttestimonial ? styles.active : null
                }`}
                key={"testimonial" + index}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.image}>
          <Image
            src={testimonials[currenttestimonial].img}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}
