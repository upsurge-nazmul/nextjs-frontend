import styles from "../../styles/Home/values.module.scss";
import IconWithBg from "../SVGcomponents/IconWithBG";

const DATA = [
  {
    id: 1,
    title: "Understanding Money",
    description: `Understand how ‘money’ works in the 21st century`,
    iconClr: "#4066eb",
    iconBorder: "#c6d2ff",
  },
  {
    id: 2,
    title: "Managing Money",
    description: "Learn to wisely manage money & be fiscally responsible",
    iconClr: "#17d1bc",
    iconBorder: "#91fed1",
  },
  {
    id: 3,
    title: "Practice Investing",
    description: "Practice profitable Investing & multiply their money",
    iconClr: "#fdcc03",
    iconBorder: "#feefad",
  },
  {
    id: 4,
    title: "Develop a Growth Mindset",
    description: "Develop an entrepreneurial & growth mindset",
    iconClr: "#ff6263",
    iconBorder: "#ffc8c8",
  },
];

export default function Values() {
  return (
    <div className={styles.valuesArea}>
      <div className={styles.valuesContent}>
        <div className={styles.left}>
          <img
            src={require("../../assets/home/values/personBg.svg").default.src}
            alt={"Person"}
            className={styles.personBg}
          />
          <img
            src={require("../../assets/home/values/person.svg").default.src}
            alt={"Person"}
            className={styles.person}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.rightTop}>
            <div className={styles.valuesTitle}>
              Through Upsurge, we aim to help kids with
            </div>
          </div>
          <div className={styles.rightBottom}>
            {DATA.map((item) => {
              return (
                <div className={styles.valueItem} key={item.id}>
                  <div className={styles.valueBanner}>
                    <IconWithBg
                      bgClr={item.iconClr}
                      borderClr={item.iconBorder}
                    >
                      <img
                        src={
                          require(`../../assets/home/values/bolt.svg`).default
                            .src
                        }
                        alt={"Person"}
                      />
                    </IconWithBg>
                  </div>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemDesctiption}>
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
