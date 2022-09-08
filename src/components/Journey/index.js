import styles from "../../styles/Journey/journey.module.scss";
import Banner from "./Banner";
import Pathway from "./Pathway";
import HeadingArrow from "../SVGcomponents/HeadingArrow";

const PATH = [
  {
    id: "money101",
    name: "Money 101",
    description: "What is money? Know all that you need to know about money.",
    reward: 2000,
    color: "#17d1bc",
  },
  {
    id: "banking",
    name: "Banking",
    description: "What is money? Know all that you need to know about money.",
    reward: 3000,
    color: "#17d1bc",
  },
  {
    id: "digitalPayments",
    name: "Digital Payments",
    description: "What is money? Know all that you need to know about money.",
    reward: 5000,
    color: "#17d1bc",
  },
  {
    id: "personalFinance",
    name: "Personal Finance",
    description: "What is money? Know all that you need to know about money.",
    reward: 8000,
    color: "#17d1bc",
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    description: "What is money? Know all that you need to know about money.",
    reward: 10000,
    color: "#17d1bc",
  },
];

export default function Journey() {
  return (
    <div className={styles.journey}>
      <Banner PATH={PATH} />
      <h2 id="milestone" className={styles.mainheading} onClick={() => {}}>
        Journey
        <HeadingArrow />
      </h2>
      <Pathway PATH={PATH} />
    </div>
  );
}
