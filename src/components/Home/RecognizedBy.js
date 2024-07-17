import Image from "next/image";
import styles from "../../styles/Home/recognized-by.module.scss";

const RecognizedBy = () => {
  const data = [
    {
      image: "/images/home/recognizedBy/Amity.png",
      alt: "Amity Logo",
    },
    {
      image: "/images/home/recognizedBy/BITS.jpg",
      alt: "BITS Logo",
    },
    {
      image: "/images/home/recognizedBy/CII.png",
      alt: "CII Logo",
    },
    {
      image: "/images/home/recognizedBy/GEN.png",
      alt: "GEN Logo",
    },
    {
      image: "/images/home/recognizedBy/IIT_Bombay.png",
      alt: "IIT Bombay Logo",
    },
    {
      image: "/images/home/recognizedBy/ISB.png",
      alt: "ISB Logo",
    },
    {
      image: "/images/home/recognizedBy/MeitY.png",
      alt: "MeitY Logo",
    },
    {
      image: "/images/home/recognizedBy/moneycontrol.png",
      alt: "Moneycontrol Logo",
    },
    {
      image: "/images/home/recognizedBy/StartupIndia.png",
      alt: "Startup India Logo",
    },
  ];
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Recognized By</h2>
      <div className={styles.slider}>
        <div className={styles.logos}>
          {data.map((item, index) => (
            <img src={item.image} alt={item.alt} className={styles.logo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecognizedBy;
