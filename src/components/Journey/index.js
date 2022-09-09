import styles from "../../styles/Journey/journey.module.scss";
import Banner from "./Banner";
import Pathway from "./Pathway";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import { useState } from "react";
import Tasks from "./Tasks";

const PATH = [
  {
    id: "money",
    name: "Money 101",
    description:
      "Let's kickstart your first fun journey and learn about what money is! ",
    reward: 2000,
    color: "#17d1bc",
    pointer: { top: -20, left: "5%" },
  },
  {
    id: "banking",
    name: "Banking",
    description:
      "Ever wondered why everyone keeps their money in banks? Let's find out!",
    reward: 3000,
    color: "#4066eb",
    pointer: { top: -20, left: "23%" },
  },
  {
    id: "digitalPayments",
    name: "Digital Payments",
    description: `When was the last time you saw anyone paying with cash? 
    Let's find out all the fun ways to make payments in today's world.`,
    reward: 5000,
    color: "#dc517b",
    pointer: { top: -20, left: "40%" },
  },
  {
    id: "moneyManagement",
    name: "Money Management",
    description: `Now that we know what money is and how we use it, 
    let's understand how we should manage money to become wealthy..`,
    reward: 8000,
    color: "#55c5d2",
    pointer: { top: -20, right: "40%" },
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    description: `How to manage your money?
    Let’s learn!`,
    reward: 10000,
    color: "#fdcc03",
    pointer: { top: -20, right: "23%" },
  },
  {
    id: "reward",
    name: "",
    description: "",
    reward: "",
    color: "#ffed8b",
    pointer: { top: -20, right: "5%" },
  },
];

export default function Journey() {
  const [selectedPath, setSelectedPath] = useState(PATH[0]);

  return (
    <div className={styles.journey}>
      {selectedPath ? "" : <Banner highlight={PATH[0]} />}
      <h2 id="milestone" className={styles.mainheading} onClick={() => {}}>
        Journey
        <HeadingArrow />
      </h2>
      <Pathway PATH={PATH} handleClick={setSelectedPath} />
      {selectedPath ? <Banner highlight={selectedPath} /> : ""}
      {selectedPath ? <Tasks highlight={selectedPath} /> : ""}
    </div>
  );
}
