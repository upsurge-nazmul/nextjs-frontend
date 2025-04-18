import { useRef, useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/Buttons/animatedButton.module.scss";

export default function AnimatedButton({ children }) {
  const [button, setButton] = useState();
  const [canvas, setCanvas] = useState();
  const [disabled, setDisabled] = useState(false);
  const [buttonState, setButtonState] = useState("ready");
  const [confetti, setConfetti] = useState([]);
  const [sequins, setSequins] = useState([]);
  const [renderAnim, setRenderAnim] = useState(false);
  const [ctx, setCtx] = useState();
  const canvRef = useRef();

  useEffect(() => {
    setButton(document.getElementById("button"));
    setCanvas(document.getElementById("canvas"));
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, [canvas]);

  useEffect(() => {
    if (canvRef && canvRef.current && canvRef.current.getContext) {
      setCtx(canvRef.current.getContext("2d"));
    }
  }, [canvRef.current]);

  // ammount to add on each button press
  const confettiCount = 20; // big ones
  const sequinCount = 10; // small ones

  // "physics" variables
  const gravityConfetti = 0.3;
  const gravitySequins = 0.55;
  const dragConfetti = 0.075;
  const dragSequins = 0.02;
  const terminalVelocity = 3;

  // colors, back side is darker for confetti flipping
  const colors = [
    { front: "#7b5cff", back: "#6245e0" }, // Purple
    { front: "#b3c7ff", back: "#8fa5e5" }, // Light Blue
    { front: "#5c86ff", back: "#345dd1" }, // Darker Blue
  ];

  // helper function to pick a random number within a range
  const randomRange = (min, max) => Math.random() * (max - min) + min;

  // helper function to get initial velocities for confetti
  // this weighted spread helps the confetti look more realistic
  const initConfettoVelocity = (xRange, yRange) => {
    const x = randomRange(xRange[0], xRange[1]);
    const range = yRange[1] - yRange[0] + 1;
    let y =
      yRange[1] -
      Math.abs(randomRange(0, range) + randomRange(0, range) - range);
    if (y >= yRange[1] - 1) {
      // Occasional confetto goes higher than the max
      y += Math.random() < 0.25 ? randomRange(1, 3) : 0;
    }
    return { x: x, y: -y };
  };

  // Confetto Class
  function Confetto() {
    this.randomModifier = randomRange(0, 99);
    this.color = colors[Math.floor(randomRange(0, colors.length))];
    this.dimensions = {
      x: randomRange(5, 9),
      y: randomRange(8, 15),
    };
    this.position = {
      x: randomRange(
        canvas && canvas.width / 2 - button.offsetWidth / 4,
        canvas && canvas.width / 2 + button.offsetWidth / 4
      ),
      y: randomRange(
        canvas && canvas.height / 2 + button.offsetHeight / 2 + 8,
        canvas && canvas.height / 2 + 1.5 * button.offsetHeight - 8
      ),
    };
    this.rotation = randomRange(0, 2 * Math.PI);
    this.scale = {
      x: 1,
      y: 1,
    };
    this.velocity = initConfettoVelocity([-9, 9], [6, 11]);
  }

  Confetto.prototype.update = function () {
    // apply forces to velocity
    this.velocity.x -= this.velocity.x * dragConfetti;
    this.velocity.y = Math.min(
      this.velocity.y + gravityConfetti,
      terminalVelocity
    );
    this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // set position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // spin confetto by scaling y and set the color, .09 just slows cosine frequency
    this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
  };

  // Sequin Class
  function Sequin() {
    (this.color = colors[Math.floor(randomRange(0, colors.length))].back),
      (this.radius = randomRange(1, 2)),
      (this.position = {
        x: randomRange(
          canvas && canvas.width / 2 - button.offsetWidth / 3,
          canvas && canvas.width / 2 + button.offsetWidth / 3
        ),
        y: randomRange(
          canvas && canvas.height / 2 + button.offsetHeight / 2 + 8,
          canvas && canvas.height / 2 + 1.5 * button.offsetHeight - 8
        ),
      }),
      (this.velocity = {
        x: randomRange(-6, 6),
        y: randomRange(-8, -12),
      });
  }

  Sequin.prototype.update = function () {
    // apply forces to velocity
    this.velocity.x -= this.velocity.x * dragSequins;
    this.velocity.y = this.velocity.y + gravitySequins;

    // set position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  };

  // add elements to arrays to be drawn
  const initBurst = () => {
    // add Confetto/Sequin objects to arrays to draw them
    // let confetti = [];
    // let sequins = [];
    for (let i = 0; i < confettiCount; i++) {
      // confetti.push(new Confetto());
      setConfetti((prev) => [...prev, new Confetto()]);
    }
    for (let i = 0; i < sequinCount; i++) {
      // sequins.push(new Sequin());
      setSequins((prev) => [...prev, new Sequin()]);
    }
    setRenderAnim(true);
  };

  // draws the elements on the canvas
  const render = () => {
    // console.log("@@@@@@", confetti, sequins);
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        // update confetto "physics" values
        confetto.update();

        // get front or back fill color
        ctx.fillStyle =
          confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        // draw confetto
        ctx.fillRect(-width / 2, -height / 2, width, height);

        // reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // clear rectangle where button cuts off
        if (confetto.velocity.y < 0) {
          ctx.clearRect(
            canvas.width / 2 - button.offsetWidth / 2,
            canvas.height / 2 + button.offsetHeight / 2,
            button.offsetWidth,
            button.offsetHeight
          );
        }
      });

      sequins.forEach((sequin, index) => {
        // move canvas to position
        ctx.translate(sequin.position.x, sequin.position.y);

        // update sequin "physics" values
        sequin.update();

        // set the color
        ctx.fillStyle = sequin.color;

        // draw sequin
        ctx.beginPath();
        ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
        ctx.fill();

        // reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // clear rectangle where button cuts off
        if (sequin.velocity.y < 0) {
          ctx.clearRect(
            canvas.width / 2 - button.offsetWidth / 2,
            canvas.height / 2 + button.offsetHeight / 2,
            button.offsetWidth,
            button.offsetHeight
          );
        }
      });

      // remove confetti and sequins that fall off the screen
      // must be done in seperate loops to avoid noticeable flickering
      confetti.forEach((confetto, index) => {
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
      });
      sequins.forEach((sequin, index) => {
        if (sequin.position.y >= canvas.height) sequins.splice(index, 1);
      });

      requestAnimationFrame(render);
    }
  };

  useEffect(() => {
    if (renderAnim) {
      canvRef.current = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(canvRef.current);
    }
  }, [renderAnim]);

  // cycle through button states when clicked
  const clickButton = () => {
    if (!disabled) {
      setDisabled(true);
      // Loading stage
      button.classList.add("loading");
      button.classList.remove("ready");
      setButtonState("loading");
      setTimeout(() => {
        // Completed stage
        button.classList.add("complete");
        button.classList.remove("loading");
        setButtonState("complete");
        setTimeout(() => {
          initBurst();
          setTimeout(() => {
            // Reset button so user can select it again
            setDisabled(false);
            button.classList.add("ready");
            button.classList.remove("complete");
            setButtonState("ready");
            setRenderAnim(false);
          }, 4000);
        }, 320);
      }, 1800);
    }
  };

  // re-init canvas if the window size changes
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;
  };

  // Set up button text transition timings on page load
  const textElements = button && button.querySelectorAll(".buttonText");
  textElements &&
    textElements.forEach((element) => {
      characters = element.innerText.split("");
      let characterHTML = "";
      characters.forEach((letter, index) => {
        characterHTML += `<span class="char${index}" style="--d:${
          index * 30
        }ms; --dr:${(characters.length - index - 1) * 30}ms;">${letter}</span>`;
      });
      element.innerHTML = characterHTML;
    });

  useEffect(() => {
    // resize listenter
    window.addEventListener("resize", () => {
      resizeCanvas();
    });

    // click button on spacebar or return keypress
    document.body.onkeyup = (e) => {
      if (e.keyCode == 13 || e.keyCode == 32) {
        clickButton();
      }
    };

    // kick off the render loop
    // initBurst();
    // render();
  }, []);

  return (
    <div className={styles.buttonArea}>
      <button
        id="button"
        className={`${styles.button} ${
          buttonState === "loading"
            ? styles.loading
            : buttonState === "complete"
            ? styles.complete
            : styles.ready
        }`}
        onClick={clickButton}
      >
        <div className={`${styles.message} ${styles.submitMessage}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 12.2">
            <polyline stroke="currentColor" points="2,7.1 6.5,11.1 11,7.1 " />
            <line stroke="currentColor" x1="6.5" y1="1.2" x2="6.5" y2="10.3" />
          </svg>
          <span className={styles.buttonText}>Submit</span>
        </div>

        <div className={`${styles.message} ${styles.loadingMessage}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
            <circle className={styles.loadingCircle} cx="2.2" cy="10" r="1.6" />
            <circle className={styles.loadingCircle} cx="9.5" cy="10" r="1.6" />
            <circle
              className={styles.loadingCircle}
              cx="16.8"
              cy="10"
              r="1.6"
            />
          </svg>
        </div>

        <div className={`${styles.message} ${styles.successMessage}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11">
            <polyline
              stroke="currentColor"
              points="1.4,5.8 5.1,9.5 11.6,2.1 "
            />
          </svg>
          <span className={styles.buttonText}>Success</span>
        </div>
      </button>
      <canvas id="canvas" className={styles.canvas} ref={canvRef}></canvas>
    </div>
  );
}
