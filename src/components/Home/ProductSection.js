import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import styles from "../../styles/Home/product.module.scss";
import ProductChoresSvg from "../SVGcomponents/ProductChoresSvg";
import ProductGameSvg from "../SVGcomponents/ProductGameSvg";
import ProductPeople from "../SVGcomponents/ProductPeople";
import QuestSvg from "../SVGcomponents/QuestSvg";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { MainContext } from "../../context/Main";
import { AnimatePresence } from "framer-motion";
import ProductModal from "./ProductModal";

const data = [
  {
    title: "Knowledge Quest",
    pushTo: "/products/quest",
    description:
      "Interactive gamified lessons that cover fundamentals of entrepreneurship & personal finance, and include activities, games, stories and quizzes.",
    icon: <QuestSvg className={styles.icon} />,
    cta: "Explore Now",
    color: "#17d1bc",
    image: "https://imgcdn.upsurge.in/images/product-image-1.png",
  },
  {
    pushTo: "/products/games",
    title: "Games Arena",
    description:
      "A platform of our proprietary games where children can get hands-on experience in applying concepts to games and competing with other students.",
    icon: <ProductGameSvg className={styles.icon} />,
    cta: "Play Now",
    color: "#ff6263",
    image: "https://imgcdn.upsurge.in/images/product-image-2.png",
  },
  {
    pushTo: "/products/liveclasses",
    title: "Workshops & School Programs",
    description:
      "Live online & offline workshops, designed and delivered by our experts, on entrepreneurship and personal finance.",
    icon: <ProductPeople className={styles.icon} />,
    cta: "Register Now",
    color: "#4166eb",
    image: "https://imgcdn.upsurge.in/images/product-image-3.png",
  },
  {
    pushTo: "",
    title: "Competition & Internships",
    description:
      "Offline games & competitions to give children the opportunities to gain recognition, build their profiles for higher studies & gain competitive capital.",
    icon: <EmojiEventsIcon className={styles.icon} />,
    cta: "Register Now",
    color: "#fdcc03",
    image: "https://imgcdn.upsurge.in/images/product-image-4.png",
  },
];

function ProductSection() {
  const router = useRouter();
  const [modal, setModal] = useState({
    show: false,
  });
  const { theme } = useContext(MainContext);
  return (
    <section
      className={`${styles.productSection} ${
        theme === "dark" && styles.darkproductSection
      }`}
    >
      <h2 className={styles.heading}>Here&apos;s How we do it?</h2>
      <div className={styles.wrapper}>
        {data.map((item, index) => {
          return (
            <div className={`${styles.pillar}`} key={"pillar" + index}>
              <div className={styles.innerPillar}>
                <div
                  className={styles.iconContainer}
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                <button
                  onClick={() => setModal({ show: true, ...item })}
                  className={styles.button}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
              <button onClick={() => router.push(item.pushTo)}>
                {item.cta}
              </button>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {modal.show && <ProductModal data={modal} setModal={setModal} />}
      </AnimatePresence>
    </section>
  );
}

export default ProductSection;
