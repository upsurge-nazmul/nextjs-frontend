import styles from "../../styles/Buttons/animatedButton.module.scss";

export default function AnimatedButton({ children }) {
  return (
    <>
      <button id="button" class="ready" onclick="clickButton();">
        <div class="message submitMessage">
          <span class="button-text">Submit</span>
        </div>

        <div class="message loadingMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
            <circle class="loadingCircle" cx="2.2" cy="10" r="1.6" />
            <circle class="loadingCircle" cx="9.5" cy="10" r="1.6" />
            <circle class="loadingCircle" cx="16.8" cy="10" r="1.6" />
          </svg>
        </div>

        <div class="message successMessage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11">
            <polyline
              stroke="currentColor"
              points="1.4,5.8 5.1,9.5 11.6,2.1 "
            />
          </svg>
          <span class="button-text">Success</span>
        </div>
      </button>
      <canvas id="canvas"></canvas>
    </>
  );
}
