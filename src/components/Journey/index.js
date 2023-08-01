import { useEffect, useRef } from "react";
import styles from "../../styles/Journey/journey.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import JourneyCard from "./JourneyCard";

export default function Journey({ data }) {
  const journeyRef = useRef(null);

  useEffect(() => {
    if (journeyRef?.current) {
      const container = journeyRef.current;

      container.addEventListener("wheel", (event) => {
        event.preventDefault();

        const scrollAmount = event.deltaY;
        const scrollDirection = Math.sign(scrollAmount);

        container.scrollLeft += scrollDirection * 50;
      });
    }
  }, [journeyRef]);

  return (
    <div className={styles.journey}>
      <h2 className={styles.mainheading} onClick={() => {}}>
        Journey
        <HeadingArrow />
      </h2>
      <div ref={journeyRef} className={styles.journeyLayout}>
        {data &&
          data.length &&
          data.map((item) => <JourneyCard key={item.questNo} data={item} />)}
      </div>
    </div>
  );
}
