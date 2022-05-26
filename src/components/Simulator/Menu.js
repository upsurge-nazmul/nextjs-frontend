import { useState } from "react";
import styles from "../../styles/StockSimulator/menu.module.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function Menu({ menuItems = [] }) {
  /**
     * example  menuItems = [
    { name: "Item 1", onClick: () => console.log("item 1 clicked") },
    { name: "Item 2", onClick: () => console.log("item 2 clicked") },
    { name: "Item 3", onClick: () => console.log("item 3 clicked") },
    { name: "Item 4", onClick: () => console.log("item 4 clicked") },
    { name: "Item 5", onClick: () => console.log("item 5 clicked") },
  ],
     */
  const [active, setActive] = useState(false);

  return (
    <div className={styles.menu}>
      <div
        className={styles.menuTitle}
        onClick={() => setActive((prev) => !prev)}
      >
        <MoreHorizIcon />
      </div>
      <div
        className={
          //   active ? styles.activeContent :
          styles.menuContent
        }
      >
        {menuItems.length
          ? menuItems.map((item, i) => {
              return (
                <div key={i} onClick={item.onClick} className={styles.item}>
                  {item.icon}
                  {item.name}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
