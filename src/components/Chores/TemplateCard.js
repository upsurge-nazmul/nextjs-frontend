import React from "react";
import styles from "../../styles/Chores/choretemplatecard.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";

function TemplateCard({ name, image, selected, setselected }) {
  console.log(selected, name);
  return (
    <div className={styles.templateCard} onClick={() => setselected(name)}>
      <div className={styles.circle}>
        {selected === name ? (
          <div className={styles.selectedcircle}>
            <TickSvg />
          </div>
        ) : null}
        <img src={image} alt="" />
      </div>
      <p className={styles.name}>{name}</p>
    </div>
  );
}

export default TemplateCard;
