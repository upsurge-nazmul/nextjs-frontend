import React, { useEffect, useState } from "react";
import styles from "../../styles/Home/benefits.module.scss";
import Curve1 from "../SVGcomponents/Curve1";
import Dollar from "../SVGcomponents/Dollar";
import IntroThunderSvg from "../SVGcomponents/IntroThunderSvg";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import StarSvg from "../SVGcomponents/StarSvg";
import BlubSvg from "../SVGcomponents/BulbSvg";
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
  const router = useRouter();
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
    <section className={styles.benefits} id="mainbenefitscontainer">
      <div className={styles.main}>
        <div className={styles.mobile}>
          {data.map((item, index) => {
            return (
              <div className={styles.container} key={"mobilecontainer" + index}>
                <p className={styles.title}>{item.title}</p>
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
                  <img
                    src={"/images/home/benefits/img" + (index + 1) + ".png"}
                    alt=""
                  />
                </div>

                <p className={styles.description}>{item.description}</p>
                <p
                  className={styles.more}
                  onClick={() => {
                    if (index === 0) {
                      router.push("/benefits/financial");
                    } else if (index === 1) {
                      router.push("/benefits/experimential");
                    } else if (index === 2) {
                      router.push("/benefits/entrepreneuership");
                    } else {
                      router.push("/benefits/rewards");
                    }
                  }}
                >{`LEARN MORE ->`}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.left}>
          <div id="movingcontainer" className={styles.container}>
            <div className={styles.prop1} />
            <div className={styles.prop2} />
            <div className={styles.prop3} />
            <div className={styles.prop4} />
            <p
              className={styles.title}
              style={{
                color:
                  currentSection === 1
                    ? "#FDCC03"
                    : currentSection === 2
                    ? "#FF6263"
                    : currentSection === 3
                    ? "#17D1BC"
                    : "#4166EB",
              }}
            >
              Benefits
            </p>

            <div className={styles.allsections}>
              {data.map((item, index) => {
                return (
                  <p
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
                          : index === currentSection
                          ? "#4166EB"
                          : "transparent",
                    }}
                  >
                    {item.title}
                  </p>
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
                <motion.img
                  id="img-1"
                  className="imgsections"
                  src="/images/home/benefits/img1.png"
                  alt=""
                />
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

            <Curve1 className={styles.curve} />
          </div>
          <div className={styles.imgwrapper}>
            <img
              id="img-2"
              className="imgsections"
              src="/images/home/benefits/img2.png"
              alt=""
            />
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
            <img
              id="img-3"
              className="imgsections"
              src="/images/home/benefits/img3.png"
              alt=""
            />
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
              onClick={() => router.push("/benefits/entrepreneuership")}
            >{`LEARN MORE ->`}</p>
          </div>
          <div className={styles.imgwrapper}>
            <img
              id="img-4"
              className="imgsections"
              src="/images/home/benefits/img4.png"
              alt=""
            />
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
        </div>
      </div>
    </section>
  );
}

export default Benefits;
