import Link from "next/link";
import styles from "../../styles/StockSimulator/navigations.module.scss";

export default function Navigation({
  options = [],
  active = "",
  simulatorType,
  type = "waitlist",
}) {
  return (
    <div className={styles.navigation}>
      {options.length &&
        options.map((item, i) => {
          return (
            <Link
              href={`/dashboard/${
                type === "parent" ? "p" : type === "kid" ? "k" : "w"
              }/${simulatorType}/[page]`}
              as={`/dashboard/${
                type === "parent" ? "p" : type === "kid" ? "k" : "w"
              }/${simulatorType}/${item.value}`}
              key={i}
            >
              <div
                key={item.value}
                className={
                  item.value === active ? styles.activeNav : styles.navItem
                }
              >
                <div className={styles.icon}>{item.icon}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
