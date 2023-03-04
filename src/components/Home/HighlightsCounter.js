import styles from "../../styles/Home/highlights-counter.module.scss";
import { MainContext } from "../../context/Main";
import { useContext } from "react";
import { useRouter } from "next/router";

const HighlightsCounter = ({ setshowauth, setauthmode }) => {
  const { userdata } = useContext(MainContext);
  const router = useRouter();
  const data = [
    {
      number: "8500+",
      heading: "Students",
      class: "students",
    },
    {
      number: "4000+",
      heading: "hours of learning",
      class: "learning",
    },
    {
      number: "12",
      heading: "Schools",
      class: "schools",
    },
    {
      number: "3,67,00,000+",
      heading: "Unicoins Earned",
      class: "unicoins",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {data.map((data, index) => (
          <div
            key={index}
            className={`${styles.content} ${styles[data.class]}`}
          >
            <span className={styles.number}>{data.number}</span>
            <h3 className={styles.heading}>{data.heading}</h3>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            if (userdata) {
              if (userdata.is_waiting_active) {
                router.push("/dashboard/w");
              } else if (userdata.user_type === "parent") {
                router.push("/dashboard/p");
              } else {
                router.push("/dashboard/k");
              }
            } else {
              setshowauth(true);
              setauthmode("parentChild");
            }
          }}
          className={styles.signupButton}
        >
          {userdata ? "Go to dashboard" : "Sign up"}
        </button>
      </div>
    </div>
  );
};

export default HighlightsCounter;
