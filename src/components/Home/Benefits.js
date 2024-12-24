import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Home/benefits.module.scss";
import Curve1 from "../SVGcomponents/Curve1";
import Dollar from "../SVGcomponents/Dollar";
import IntroThunderSvg from "../SVGcomponents/IntroThunderSvg";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import StarSvg from "../SVGcomponents/StarSvg";
import BlubSvg from "../SVGcomponents/BulbSvg";
import { MainContext } from "../../context/Main";
import { assetsVideo } from "../../utils/utils";

const data = [
  {
    title: "Kickstart your financial journey",
    description:
      "Financial literacy is a life-skill and the earlier you start, the easier it will be to achieve your financial goals. Through our games, courses and workshops, all designed by experts, you will understand money, saving, investing and entrepreneurship like never before!",
    img: "https://storage.googleapis.com/upsurge-assets-cdn/images/benefits/benefit1.png",
  },
  {
    title: "Learning by doing",
    description:
      "We believe that learning is most effective when it’s through play! Our games, activities and quizzes will instill healthy money habits that will last a lifetime.",
    img: "https://storage.googleapis.com/upsurge-assets-cdn/images/benefits/benefit2.png",
  },
  {
    title: "Develop an entrepreneurial mindset.",
    description:
      "Develop the necessary skills and knowledge to understand and evaluate the fundamentals of business and starting-up, and (hopefully) be the next unicorn founder.",
    img: "https://storage.googleapis.com/upsurge-assets-cdn/images/benefits/benefit3.png",
  },
  {
    title: "Earn real rewards",
    description:
      "As adults, when we do any job well, we get rewarded. Then why should it be any different for students? You get rewarded with Unicoins for jobs well done, which can be redeemed for books, games, vouchers and educational courses from your favorite brands.",
    img: "https://storage.googleapis.com/upsurge-assets-cdn/images/benefits/benefit4.png",
  },
  {
    title: "Develop 21st century skills & knowledge",
    description: `While jobs & roles change, the skills needed to succeed remain the same. Our games help you gain confidence & excel by developing your critical thinking and problem-solving skills.`,
    img: "https://storage.googleapis.com/upsurge-assets-cdn/images/benefits/benefit5.png",
  },
];

function Benefits() {
  const [scroll, setscroll] = useState(150);
  const [currentSection, setcurrentSection] = useState(0);
  const [timeout, settimeout] = useState(true);
  const [sections, setsections] = useState([]);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { theme } = useContext(MainContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => {
        if (prev === data.length - 1) {
          return 0;
        }
        return ++prev;
      });
    }, 4000);
    return () => clearInterval(intervalId);
  }, [index]);

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
    let heightdiff = window.innerHeight * 0.6;
    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.scrollY + window.innerHeight - heightdiff &&
      left < window.scrollX + window.innerWidth &&
      top + height > window.scrollY &&
      left + width > window.scrollX
    );
  }
  function getheight(el) {
    if (!el) {
      return 0;
    }
    var top = el.offsetTop;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
    }
    return top;
  }
  useEffect(() => {
    if (sections.length === 0) return;
    const handlescroll = () => {
      for (let i = 0; i < sections.length; i++) {
        const item = sections[i];
        if (isInViewport(item)) {
          setcurrentSection(i);
        } else {
          item.classList.remove("animateimg");
        }
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, [sections]);
  function hanldemove(index) {
    var element = sections[index];
    var headerOffset = window.innerHeight * 0.25;
    var elementPosition = getheight(element);
    var offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    // sections[index].scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    //   inline: "nearest",
    // });
  }
  return (
    <section
      className={`${styles.benefits} ${
        theme === "dark" && styles.darkbenefits
      }`}
      id="mainbenefitscontainer"
    >
      <div className={styles.main}>
        <div className={styles.mobile}>
          <h2
            className={styles.title}
            style={{
              color: "#000000",
              fontSize: "36px",
              marginBottom: "15px",
            }}
          >
            Why upsurge?
          </h2>
          <div className={styles.mobileContainer}>
            <div key={index} className={styles.container} id="benefit">
              <div className={styles.imgwrapper}>
                {index === 0 ? (
                  <>
                    <IntroThunderSvg className={styles.thunder} />
                    <Dollar className={styles.dollar} />
                  </>
                ) : index === 1 || index === 3 ? (
                  <StarSvg className={styles.thunder} />
                ) : (
                  <BlubSvg className={styles.thunder} />
                )}
                <div className={styles.lb1}></div>
                <div className={styles.lb2}></div>
                <div className={styles.lb3}></div>
                <div className={styles.lb4}></div>
                <div className={styles.wrap}>
                  <img
                    src={data[index].img}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>

              <h3 className={styles.title}>{data[index].title}</h3>
              <p
                className={styles.more}
                onClick={() => {
                  if (index === 0) {
                    router.push("/benefits/financial");
                  } else if (index === 1) {
                    router.push("/benefits/experimential");
                  } else if (index === 2) {
                    router.push("/benefits/entrepreneurship");
                  } else if (index === 3) {
                    router.push("/benefits/rewards");
                  } else {
                    router.push("/benefits/rewards");
                  }
                }}
              >{`Learn More`}</p>
            </div>
            <div className={styles.dotContainer}>
              {data.map((_, i) => (
                <div
                  key={"dot-" + i}
                  onClick={() => setIndex(i)}
                  className={`${
                    index === i ? styles.active : styles.inactive
                  } ${styles.dot}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.left}>
          <div id="movingcontainer" className={styles.container}>
            {/* <div className={styles.prop1} />
            <div className={styles.prop2} />
            <div className={styles.prop3} />
            <div className={styles.prop4} /> */}
            <h2
              className={styles.title}
              style={{
                color:
                  currentSection === 1
                    ? "#FDCC03"
                    : currentSection === 2
                    ? "#FF6263"
                    : currentSection === 3
                    ? "#17D1BC"
                    : currentSection === 4
                    ? "#FFA733"
                    : "#4166EB",
              }}
            >
              Why upsurge?
            </h2>

            <div className={styles.allsections}>
              {data.map((item, index) => {
                return (
                  <h3
                    key={"benefitsSection" + index}
                    onClick={() => hanldemove(index)}
                    className={
                      index === currentSection ? styles.selected : styles.normal
                    }
                    style={{
                      backgroundColor:
                        index === currentSection && currentSection === 1
                          ? "#FDCC03"
                          : index === currentSection && currentSection === 2
                          ? "#FF6263"
                          : index === currentSection && currentSection === 3
                          ? "#17D1BC"
                          : index === currentSection && currentSection === 4
                          ? "#FFA733"
                          : index === currentSection
                          ? "#4166EB"
                          : "transparent",
                    }}
                  >
                    {item.title}
                  </h3>
                );
              })}
            </div>
          </div>
        </div>
        <div id="rightsection" className={styles.right}>
          {" "}
          <div className={styles.imgwrapper}>
            {
              <>
                <div className={styles.wrap}>
                  <img
                    id="img-1"
                    className="imgsections"
                    src={data[0].img}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <IntroThunderSvg className={styles.thunder} />
                <Dollar className={styles.dollar} />
                <div className={styles.lb1}></div>
                <div className={styles.lb2}></div>
                <div className={styles.lb3}></div>
                <div className={styles.lb4}></div>
                <p className={styles.description}>{data[0]?.description}</p>
                <p
                  className={styles.more}
                  style={{
                    color: "#4166EB",
                  }}
                  onClick={() => router.push("/benefits/financial")}
                >{`LEARN MORE ->`}</p>
              </>
            }
          </div>
          <div className={styles.imgwrapper}>
            <div className={styles.wrap}>
              <img
                id="img-2"
                className="imgsections"
                src={data[1].img}
                objectFit="contain"
                alt=""
                layout="fill"
              />
            </div>

            <StarSvg className={styles.thunder} />
            <div className={styles.lb1}></div>
            <div className={styles.lb2}></div>
            <div className={styles.lb3}></div>
            <div className={styles.lb4}></div>
            <p className={styles.description}>{data[1]?.description}</p>
            <p
              className={styles.more}
              style={{ color: "#FDCC03" }}
              onClick={() => router.push("/benefits/experimential")}
            >{`LEARN MORE ->`}</p>
          </div>
          <div className={styles.imgwrapper}>
            <div className={styles.wrap}>
              <img
                id="img-3"
                className="imgsections"
                src={data[2].img}
                objectFit="contain"
                alt=""
                layout="fill"
              />
            </div>
            <BlubSvg className={styles.thunder} />
            <div className={styles.lb1}></div>
            <div className={styles.lb2}></div>
            <div className={styles.lb3}></div>
            <div className={styles.lb4}></div>
            <p className={styles.description}>{data[2]?.description}</p>
            <p
              className={styles.more}
              style={{
                color: "#FF6263",
              }}
              onClick={() => router.push("/benefits/entrepreneurship")}
            >{`LEARN MORE ->`}</p>
          </div>
          <div className={styles.imgwrapper}>
            <div className={styles.wrap}>
              <img
                id="img-4"
                className="imgsections"
                src={data[3].img}
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>

            <StarSvg className={styles.thunder} clr="#fdcc03" />
            <div className={styles.lb1}></div>
            <div className={styles.lb2}></div>
            <div className={styles.lb3}></div>
            <div className={styles.lb4}></div>
            <p className={styles.description}>{data[3]?.description}</p>
            <p
              className={styles.more}
              style={{
                color: "#17D1BC",
              }}
              onClick={() => router.push("/benefits/rewards")}
            >{`LEARN MORE ->`}</p>
          </div>
          <div className={styles.imgwrapper}>
            <div className={styles.wrap}>
              <img
                id="img-5"
                className="imgsections"
                src={data[4].img}
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>

            <StarSvg className={styles.thunder} clr="#fdcc03" />
            <div className={styles.lb1}></div>
            <div className={styles.lb2}></div>
            <div className={styles.lb3}></div>
            <div className={styles.lb4}></div>
            <p className={styles.description}>{data[4]?.description}</p>
            <p
              className={styles.more}
              style={{
                color: "#FFA733",
              }}
              onClick={() => router.push("/benefits/skills")}
            >{`LEARN MORE ->`}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
