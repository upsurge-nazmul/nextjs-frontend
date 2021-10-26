import React, { useEffect, useState } from "react";
import QuoteSvg from "../SVGcomponents/QuoteSvg";
import styles from "../../styles/Home/testimonial.module.scss";
export default function TestiMonial() {
  const testimonials = [
    {
      quote:
        "Justo lorem neque leo turpis habitant pharetra. Egestas amet sed risus, et. Nisi faucibus cras nullam eu lectus enim. Justo lorem neque leo turpis habitant pharetra. Egestas amet sed risus, et. Nisi faucibus cras nullam eu lectus enim.",
      name: "Aakriti Sethi",
      des: "Mother of a 12 year old",
      img: "https://i.ibb.co/9vdwJyX/Untitled-design-65.png",
    },
    {
      quote:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
      name: "Aakriti Sethi",
      des: "Mother of a 14 year old",
      img: "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    },
    {
      quote:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
      name: "Aakriti Sethi",
      des: "Mother of a 16 year old",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80",
    },
  ];
  const [currenttestimonial, setcurrenttestimonial] = useState(0);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setcurrenttestimonial((currenttestimonial + 1) % testimonials.length);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currenttestimonial]);

  return (
    <div className={styles.testimonial}>
      <div className={styles.left}>
        <QuoteSvg className={styles.quotesvg} />

        <p className={styles.quote}>{testimonials[currenttestimonial].quote}</p>
        <p className={styles.name}>{testimonials[currenttestimonial].name}</p>
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
        <img src={testimonials[currenttestimonial].img} alt="" />
      </div>
    </div>
  );
}
