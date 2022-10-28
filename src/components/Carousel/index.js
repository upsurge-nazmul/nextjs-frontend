import styles from "../../styles/GeneralComponents/carousel.module.scss";
import NextSvg from "../SVGcomponents/NextSvg";

const CAROUSEL_MOVEMENT = 300;

export default function Carousel({
  children,
  carouselId = "carouselItems",
  themeClr = "#17d1bc",
  themeBg = "#fff",
}) {
  function handlemove(direction) {
    let partnerwrapper = document.getElementById(carouselId);
    if (direction === "right") {
      partnerwrapper.scrollLeft += CAROUSEL_MOVEMENT;
    } else {
      partnerwrapper.scrollLeft -= CAROUSEL_MOVEMENT;
    }
  }

  return (
    <div
      className={styles.carousel}
      style={{
        backgroundColor: themeBg,
      }}
    >
      <div
        style={{
          color: themeClr,
        }}
      >
        <NextSvg
          className={styles.leftarrow}
          onClick={() => handlemove("left")}
        />
      </div>
      <div className={styles.mainContent} id={carouselId}>
        {children}
      </div>
      <div
        style={{
          color: themeClr,
        }}
      >
        <NextSvg
          className={styles.rightarrow}
          onClick={() => handlemove("right")}
        />
      </div>
    </div>
  );
}
