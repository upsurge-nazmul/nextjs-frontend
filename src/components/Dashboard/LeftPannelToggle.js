import React from "react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import styles from "../../styles/Dashboard/leftpaneltoggle.module.scss";
export default function LeftPannelToggle({
  name,
  items,
  icon,
  currenttab,
  isActive,
}) {
  const [open, setopen] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`${styles.leftpaneltoggle} ${open ? styles.openedpanel : ""} ${
        isActive && styles.activepanel
      }`}
    >
      <div className={styles.top} onClick={() => setopen(!open)}>
        {icon && icon}
        <div className={styles.tabtitle}>{name}</div>
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
