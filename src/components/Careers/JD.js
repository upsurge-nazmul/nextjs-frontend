import styles from "../../styles/Careers/jd.module.scss";

const positionData = [
  {
    id: "gameProgrammer",
    position: "Game Programmer",
    location: "Delhi, India",
  },
  {
    id: "gameArtist2D",
    position: "Game Artist - 2D",
    location: "Delhi, India",
  },
  {
    id: "reactJsIntern",
    position: "Reactjs Intern",
    location: "Delhi, India",
  },
  {
    id: "reactNativeIntern",
    position: "React Native Intern",
    location: "Delhi, India",
  },
  {
    id: "uiUxDesigner",
    position: "UI/UX designer",
    location: "Delhi, India",
  },
];

export default function JD({ position }) {
  return (
    <div className={styles.jd}>
      <div className={styles.heading}>upsurge is hiring</div>
      <div className={styles.title}>
        {positionData.find((item) => item.id === position).position}
      </div>
      <iframe
        id="iframe"
        className={styles.iframe}
        src={`/JDs/${position}.html`}
      ></iframe>
    </div>
  );
}
