import styles from "../../styles/Home/highlights-counter.module.scss";
import { MainContext } from "../../context/Main";
import { useContext } from "react";
import { useRouter } from "next/router";

const HighlightsCounter = ({ setshowauth, setauthmode }) => {
  const { userdata } = useContext(MainContext);
  const router = useRouter();
  const data = [
    {
      number: "60,000+",
      heading: "Students",
      class: "students",
    },
    {
      number: "300,000+",
      heading: "Gameplays",
      class: "learning",
    },
    {
      number: "20,000+",
      heading: "hours of fun",
      class: "schools",
    },
    {
      number: "500,000,000+",
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
      {/* <div className={styles.buttonContainer}>
        {router.asPath !== "/pricing" && (
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
        )}
      </div> */}
    </div>
  );
};

export default HighlightsCounter;
