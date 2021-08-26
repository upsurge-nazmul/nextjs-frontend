import React, { useState } from "react";
import TemplateCard from "./TemplateCard";
import kitchenImage from "../../assets/template/kitchen.png";
import gardenImage from "../../assets/template/garden.png";
import groomingImage from "../../assets/template/grooming.png";
import homeworkImage from "../../assets/template/homework.png";
import bathroomImage from "../../assets/template/bathroom.png";
import workoutImage from "../../assets/template/workout.png";
import styles from "../../styles/Chores/chorecategoryselection.module.scss";
import DownArrowFilled from "../SVGcomponents/DownArrowFilled";

function ChoreCategorySelection({ category, setcategory, setmode }) {
  const [showtemps, setshowtemps] = useState(false);
  const templates = [
    { name: "Kitchen", image: kitchenImage },
    { name: "Bathroom", image: bathroomImage },
    { name: "Garden", image: gardenImage },
    { name: "Homework", image: homeworkImage },
    { name: "Grooming", image: groomingImage },
    { name: "Exercise", image: workoutImage },
  ];

  return (
    <div className={styles.choreCategorySelection}>
      <h2>Create chore from template</h2>
      {!showtemps ? (
        <div className={styles.select} onClick={() => setshowtemps(true)}>
          Select a category
          <DownArrowFilled />
        </div>
      ) : (
        <div className={styles.wrapper}>
          {templates.map((item, index) => {
            return (
              <TemplateCard
                key={"templatecard" + index}
                name={item.name}
                image={item.image}
                selected={category}
                setselected={setcategory}
              />
            );
          })}
        </div>
      )}
      <div className={styles.button} onClick={() => setmode("template")}>
        Continue
      </div>
    </div>
  );
}

export default ChoreCategorySelection;
