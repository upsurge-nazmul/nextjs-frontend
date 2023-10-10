import Image from "next/image";
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
    <section className={styles.timelineSec}>
      <h2 className={styles.heading}>
        Become a money-smart school in four easy steps:
      </h2>
      <div className={styles.container}>
        <ol className={styles.timeline}>
          {partnerSchoolData.map((item, index) => (
            <li key={"step-" + index}>
              <div
                className={`${(index + 1) % 2 ? styles.bottom : styles.top} ${
                  styles.innerCard
                }`}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={item.image}
                    layout="fill"
                    alt={"Upsurge"}
                    className={styles.image}
                  />
                </div>
                <div className={styles.divider}></div>
                <p>{item.text}</p>
              </div>
              <span
                className={`${styles.number} ${
                  (index + 1) % 2 ? styles.spBot : styles.spTop
                }`}
              >
                0{index + 1}
              </span>
            </li>
          ))}
          {/* <li>
            <div className={styles.top}>
              <p>
                Have you tried Physiotherapy, Chiropractor or your GP without
                the pain free results?
              </p>
            </div>
            <span className={`${styles.number} ${styles.spTop}`}>02</span>
          </li>
          <li>
            <div className={styles.bottom}>
              <p>
                Let Physology assess and treat your pain with our trusted
                revolusionary approach.
              </p>
            </div>
            <span className={`${styles.number} ${styles.spBot}`}>03</span>
          </li>
          <li>
            <div className={styles.top}>
              <p>Join our happy family of pain free clients.</p>
            </div>
            <span className={`${styles.number} ${styles.spTop}`}>04</span>
          </li> */}
        </ol>
      </div>
    </section>
  );
};

export default PartnerSchoolSection;
