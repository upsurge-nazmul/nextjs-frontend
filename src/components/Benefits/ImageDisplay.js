import { useEffect } from "react";
import styles from "../../styles/Benefits/imageDisplay.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ImageDisplay({
  src = "",
  alt = "",
  frameType = "default",
}) {
  // useEffect(() => {
  //   AOS.init();
  // }, []);

  return (
    <div
      className={styles.displayArea}
      // data-aos="zoom-in"
      // data-aos-duration={500}
      // data-aos-delay={200}
      // data-aos-anchor-placement={"top-center"}
      style={
        frameType === "vertical"
          ? {
              height: "70vh",
              width: "50vh",
            }
          : frameType === "horizontal"
          ? {
              height: "50vh",
              width: "70vh",
            }
          : {
              height: "60vh",
              width: "60vh",
            }
      }
    >
      <img
        src={require("../../assets/whyUpsurge/yellow.svg").default.src}
        alt={"Yellow Star"}
        style={
          frameType === "vertical"
            ? {
                position: "absolute",
                top: "3%",
                left: "87%",
                height: "47px",
                width: "47px",
              }
            : frameType === "horizontal"
            ? {
                position: "absolute",
                top: "-5%",
                left: "55%",
                height: "40px",
                width: "40px",
              }
            : {
                position: "absolute",
                top: "15%",
                left: "75%",
                height: "40px",
                width: "40px",
              }
        }
      />
      <img
        src={require("../../assets/whyUpsurge/blue.svg").default.src}
        alt={"Blue Circle"}
        style={
          frameType === "vertical"
            ? {
                position: "absolute",
                top: "25%",
                left: "4%",
                height: "60px",
                width: "60px",
              }
            : frameType === "horizontal"
            ? {
                position: "absolute",
                top: "20%",
                left: "4%",
                height: "25px",
                width: "25px",
              }
            : {
                position: "absolute",
                top: "50%",
                left: "5%",
                height: "25px",
                width: "25px",
              }
        }
      />
      <img
        src={require("../../assets/whyUpsurge/red.svg").default.src}
        alt={"Red Circle"}
        style={
          frameType === "vertical"
            ? {
                position: "absolute",
                top: "75%",
                left: "83%",
                height: "30px",
                width: "30px",
              }
            : frameType === "horizontal"
            ? {
                position: "absolute",
                top: "88%",
                left: "35%",
                height: "30px",
                width: "30px",
              }
            : {
                position: "absolute",
                top: "80%",
                left: "10%",
                height: "30px",
                width: "30px",
              }
        }
      />
      <img
        src={require("../../assets/whyUpsurge/green.svg").default.src}
        alt={"Green Parabolla"}
        style={
          frameType === "vertical"
            ? {
                position: "absolute",
                top: "80%",
                left: "2%",
                height: "50px",
                width: "50px",
              }
            : frameType === "horizontal"
            ? {
                position: "absolute",
                top: "94%",
                left: "55%",
                height: "50px",
                width: "50px",
              }
            : {
                position: "absolute",
                top: "75%",
                left: "85%",
                height: "50px",
                width: "50px",
              }
        }
      />
      <div className={styles.layer1}>
        <div className={styles.layer2}>
          <div className={styles.layer3}>
            <img src={src} alt={alt} className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
}
