import Link from "next/link";

import styles from "../../styles/StockSimulator/navigations.module.scss";

export default function Navigation({ options = [], active = "" }) {
  return (
    <div className={styles.navigation}>
      {options.length &&
        options.map((item) => {
          return (
            <Link
              href={`/dashboard/w/stocksimulator/[page]`}
              as={`/dashboard/w/stocksimulator/${item.value}`}
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
