import styles from "../../styles/schools/partnerSchool.module.scss";

const partnerSchoolData = [
  {
    id: "01",
    color: "#FFDA41",
    text: "Pick a time and category of workshop",
    image: "https://imgcdn.upsurge.in/images/schools/partner-school-1.png",
  },
  {
    id: "02",
    color: "#17D1BC",
    text: "Conduct a pilot workshop",
    image: "https://imgcdn.upsurge.in/images/schools/partner-school-2.png",
  },
  {
    id: "03",
    color: "#FF6263",
    text: "Choose the number of workshops",
    image: "https://imgcdn.upsurge.in/images/schools/partner-school-3.png",
  },
  {
    id: "04",
    color: "#364643",
    text: "Sign up and become a financially enabled school",
    image: "https://imgcdn.upsurge.in/images/schools/partner-school-4.png",
  },
];

const PartnerSchoolSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Become a partner school in four easy steps:
      </h2>
      <div className={styles.gridContainer}>
        {partnerSchoolData.map((data) => (
          <div key={data.id} className={styles.card}>
            <div className={styles.numberWrapper}>
              <div className={styles.numberContainer}>
                <div
                  className={styles.hc}
                  style={{ backgroundColor: data.color }}
                ></div>
                <span>{data.id}</span>
              </div>
              <img
                src={data.image}
                alt="Partner School"
                className={styles.image}
              />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.textWrapper}>
              <p>{data.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.button}>Register Now</button>
    </div>
  );
};

export default PartnerSchoolSection;
