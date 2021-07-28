import React, { useState } from "react";
import TemplateCard from "./TemplateCard";
import kitchenImage from "../../assets/template/kitchen.png";
import gardenImage from "../../assets/template/garden.png";
import groomingImage from "../../assets/template/grooming.png";
import homeworkImage from "../../assets/template/homework.png";
import bathroomImage from "../../assets/template/bathroom.png";
import workoutImage from "../../assets/template/workout.png";
import styles from "../../styles/Chores/chorecategoryselection.module.scss";

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
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.3962 0H0.603751C0.100078 0 -0.18116 0.639064 0.130759 1.07535L8.52701 12.7751C8.76734 13.11 9.2301 13.11 9.47299 12.7751L17.8692 1.07535C18.1812 0.639064 17.8999 0 17.3962 0Z"
              fill="#787878"
            />
          </svg>
        </div>
      ) : (
        <div className={styles.wrapper}>
          {templates.map((item) => {
            return (
              <TemplateCard
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
