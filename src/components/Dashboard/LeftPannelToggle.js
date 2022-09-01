import React from "react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styles from "../../styles/Dashboard/leftpaneltoggle.module.scss";
import HeaderExpandSvg from "../SVGcomponents/HeaderExpandSvg";

export default function LeftPannelToggle({
  name,
  items,
  icon,
  currenttab,
  isActive,
  id,
  setStoryIndex,
}) {
  const [open, setopen] = useState(false);
  const router = useRouter();
  return (
    <div
      id={id}
      className={`${styles.leftpaneltoggle} ${open ? styles.openedpanel : ""} ${
        isActive && styles.activepanel
      }`}
    >
      <div
        className={styles.top}
        onClick={() => {
          if (!open && router.query.showTour) {
            setStoryIndex((prev) => {
              if (prev === 1) return prev + 1;
              return prev;
            });
          }
          setopen(!open);
        }}
      >
        {icon && icon}
        <div className={styles.tabtitle}>
          {name}
          <HeaderExpandSvg
            className={`${open ? styles.reverseexpandicon : styles.expandicon}`}
            clr={"#6d6d6d"}
          />
        </div>
      </div>

      {open && (
        <div className={styles.wrapper}>
          {items.map((item) => {
            return (
              <div
                className={`${styles.subtab}  ${
                  currenttab === item.pushto ? styles.activetab : ""
                }`}
                onClick={() => router.push(item.pushto)}
                key={"toggle" + item.name}
              >
                {item.icon && item.icon}
                <p key={item.name} className={styles.tabtitle}>
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
