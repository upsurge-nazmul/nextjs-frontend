import styles from "./style.module.scss";

export default function WebglView({}) {
  return (
    <div className={styles.view}>
      <div className={styles.fullScreenView}>
        <iframe
          id="iframe"
          className={styles.iframe}
          src={`https://game-test-liard.vercel.app/games/prod/HignAndLow_WebGL/index.html`}
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
}
