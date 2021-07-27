import React, { useEffect } from "react";

function ProgressVerticle({ questions, current, setcurrent }) {
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--progress",
      `${(current / (questions - 1)) * 100}%`
    );
  }, [current]);
  return (
    <div className="progressBarVerticleWrapper">
      <div className="backgroundbar"></div>
      <div className="backgroundprogressbar grad"></div>
      {Array(questions)
        .fill("")
        .map((item, index) => {
          return (
            <div
              className={`qno ${index <= current ? "completed grad" : ""}`}
              onClick={() => setcurrent(index)}
            >
              <p>{index + 1}</p>
            </div>
          );
        })}
    </div>
  );
}

export default ProgressVerticle;
