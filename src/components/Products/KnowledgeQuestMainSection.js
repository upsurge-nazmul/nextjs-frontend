import React, { useState } from "react";
import styles from "../../styles/Products/questmain.module.scss";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";
import Petal2SvgQuest from "../SVGcomponents/Petal2SvgQuest";
import PetalSvgQuest from "../SVGcomponents/PetalSvgQuest";
import Image from "next/image";
import WaitlistPopUp from "../WaitlistPopUp";
import { useRouter } from "next/dist/client/router";

export default function KnowledgeQuestMainSection({
  id,
  email,
  setEmail,
  check,
  error,
  showwaitlistblock,
  settoastdata,
  setshowwaitlistblock,
  authmode,
  setauthmode,
  setshowauth,
  setshowpopup,
}) {
  const [quests, setquests] = useState([
    {
      name: "Money",
      image:
        "https://i.ibb.co/XpQ4TYc/6-L4pbu-K66d3-80-DX634-DY634-CX494-CY497.png",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ]);
  const router = useRouter();
  return (
    <div className={styles.questSection}>
      <div className={styles.container}>
        <div className={styles.heading}>Available Quests</div>
        <div className={styles.wrapper}>
          {quests.map((item) => {
            return (
              <div
                className={styles.quest}
                onClick={() => router.push("/quest/dd")}
              >
                <img src={item.image} alt="" />
                <p className={styles.title}>{item.name}</p>
                <p className={styles.des}>{item.des}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
