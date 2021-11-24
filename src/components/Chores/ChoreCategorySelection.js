import React, { useState } from "react";
import TemplateCard from "./TemplateCard";
import styles from "../../styles/Chores/chorecategoryselection.module.scss";
import DownArrowFilled from "../SVGcomponents/DownArrowFilled";
import BackArrow from "../SVGcomponents/BackArrow";
import { useRouter } from "next/dist/client/router";
import { choretemplates } from "../../helpers/choretemplates";

function ChoreCategorySelection({ setmode }) {
  const [showtemps, setshowtemps] = useState(false);
  const router = useRouter();
  const [showfull, setshowfull] = useState(false);
  const [selectedcat, setselectedcat] = useState("HouseHold");
  return (
    <div className={styles.choreCategorySelection}>
      {!showfull ? (
        <div className={styles.catselection}>
          <h2>Create chore from template</h2>

          <div className={styles.wrapper}>
            {choretemplates.map((item, index) => {
              return (
                <TemplateCard
                  key={"templatecard" + index}
                  name={item.name}
                  image={item.image}
                  selected={selectedcat}
                  setselected={setselectedcat}
                />
              );
            })}
          </div>

          <div className={styles.button} onClick={() => setshowfull(true)}>
            Continue
          </div>
        </div>
      ) : (
        <div className={styles.choreTemplateSelection}>
          <div className={styles.header}>
            <BackArrow onClick={() => setshowfull(false)} />
            <div className={styles.text}>
              <p className={styles.heading}>Create chore from template</p>
              <p className={styles.category}>{selectedcat}</p>
            </div>
          </div>
          <div className={styles.wrapper}>
            {choretemplates[
              choretemplates.findIndex((item) => item.name === selectedcat)
            ].templates.map((item, index) => {
              return (
                <div
                  className={styles.card}
                  key={"templatecardselection" + index}
                >
                  <img src={item.img} alt="" />
                  <div className={styles.text}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.time}>{item.time}</p>
                  </div>
                  <div
                    className={styles.button}
                    onClick={() => {
                      router.push(
                        "/managechore/new?template=" +
                          item.name.replace(/ /g, "-") +
                          "&templatecat=" +
                          selectedcat
                      );
                    }}
                  >
                    Use Template
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChoreCategorySelection;
