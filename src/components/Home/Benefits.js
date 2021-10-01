import React, { useEffect, useState } from "react";
import styles from "../../styles/Home/benefits.module.scss";

function Benefits() {
  const data = [
    {
      title: "Kickstart your child’s financial journey.",
      description:
        "Money lessons through games,courses and live classes designed by experts.",
    },
    {
      title: "Learning by doing",
      description:
        "Engaging games,quizzes and activities will teach your kids money habits that will last a lifetime.",
    },
    {
      title: "Developing entrepreneurial mindsets.",
      description:
        "Equip your children with the necessary skills to set them on the path of becoming future entrepreneurs.",
    },
    {
      title: "Earn real rewards",
      description:
        "Whenever your child completes a task successfully, they get rewarded with Unicoins, which can be redeemed for books, games, vouchers and educational courses.",
    },
  ];
  const [scroll, setscroll] = useState(150);
  const [currentSection, setcurrentSection] = useState(0);
  const [sections, setsections] = useState([]);
  useEffect(() => {
    let sections = document.getElementsByClassName("imgsections");
    if (sections.length > 0) {
      setsections(Array.from(sections));
      setcurrentSection(0);
      console.log(Array.from(sections));
    }
  }, []);
  function isInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.scrollY + window.innerHeight &&
      left < window.scrollX + window.innerWidth &&
      top + height > window.scrollY &&
      left + width > window.scrollX
    );
  }
  function getheight(el) {
    var top = el.offsetTop;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
    }
    return top;
  }
  useEffect(() => {
    let remove = (window.onscroll = function (ev) {
      let container = document.getElementById("mainbenefitscontainer");
      let right = document.getElementById("rightsection");
      let moving = document.getElementById("movingcontainer");
      if (
        window.scrollY > container.offsetTop + 150 &&
        window.scrollY <= getheight(sections[sections.length - 1])
      ) {
        moving.style.setProperty(
          "--margin",
          `calc(${window.scrollY}px - 170vh)`
        );
      }
      for (let i = 0; i < sections.length; i++) {
        const item = sections[i];
        if (isInViewport(item)) {
          setcurrentSection(i);
        } else {
          item.classList.remove("animateimg");
        }
      }
    });

    return () => remove;
  }, []);
  function hanldemove(index) {
    setcurrentSection(index);
    sections[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
  return (
    <section className={styles.benefits} id="mainbenefitscontainer">
      <div className={styles.main}>
        <div className={styles.left}>
          <div id="movingcontainer" className={styles.container}>
            <p className={styles.title}>{data[currentSection].title}</p>
            <p className={styles.description}>
              {data[currentSection].description}
            </p>
            <p className={styles.more}>LEARN MORE -></p>
            <div className={styles.allsections}>
              {data.map((item, index) => {
                return (
                  <p
                    onClick={() => hanldemove(index)}
                    className={
                      index === currentSection ? styles.selected : styles.normal
                    }
                  >
                    {item.title}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div id="rightsection" className={styles.right}>
          <img
            id="img-1"
            className="imgsections"
            src="/images/home/benefits/img1.png"
            alt=""
          />
          <img
            id="img-2"
            className="imgsections"
            src="/images/home/benefits/img2.png"
            alt=""
          />
          <img
            id="img-3"
            className="imgsections"
            src="/images/home/benefits/img3.png"
            alt=""
          />
          <img
            id="img-4"
            className="imgsections"
            src="/images/home/benefits/img4.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Benefits;
