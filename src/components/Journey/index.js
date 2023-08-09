import { useEffect, useRef } from "react";
import styles from "../../styles/Journey/journey.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import JourneyCard from "./JourneyCard";
import CircularProgress from "@mui/material/CircularProgress";

export default function Journey({ data, userPlanType, setShowSubToPremium }) {
  const journeyRef = useRef(null);

  useEffect(() => {
    if (journeyRef?.current) {
      const container = journeyRef.current;

      container.addEventListener("wheel", (event) => {
        event.preventDefault();

        const scrollAmountX = event.deltaX;
        const scrollDirectionX = Math.sign(scrollAmountX);

        container.scrollLeft += scrollDirectionX * 50;

        const scrollAmountY = event.deltaY;
        const scrollDirectionY = Math.sign(scrollAmountY);

        container.scrollLeft += scrollDirectionY * 50;
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
        {data ? (
          data.length &&
          data.map((item) => (
            <JourneyCard
              key={item.questNo}
              data={item}
              userPlanType={userPlanType}
              setShowSubToPremium={setShowSubToPremium}
            />
          ))
        ) : (
          <div
            style={{
              width: "100%",
              minHeight: "144px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress style={{ color: "#4066eb" }} />
          </div>
        )}
      </div>
    </div>
  );
}
