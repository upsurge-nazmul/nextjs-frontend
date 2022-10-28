import styles from "../../styles/GeneralComponents/carousel.module.scss";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";

const CAROUSEL_MOVEMENT = 300;

export default function Carousel({ children }) {
  function handlemove(direction) {
    let partnerwrapper = document.getElementById("carouselItems");
    if (direction === "right") {
      partnerwrapper.scrollLeft += CAROUSEL_MOVEMENT;
    } else {
      partnerwrapper.scrollLeft -= CAROUSEL_MOVEMENT;
    }
  }

  return (
    <div className={styles.carousel}>
      <PlayCircleSvg
        className={styles.leftarrow}
        onClick={() => handlemove("left")}
      />
      <div className={styles.mainContent} id={"carouselItems"}>
        {children}
      </div>
      <PlayCircleSvg
        className={styles.rightarrow}
        onClick={() => handlemove("right")}
      />
    </div>
  );
}
