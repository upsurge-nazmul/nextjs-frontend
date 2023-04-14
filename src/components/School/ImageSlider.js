import styles from "../../styles/schools/imageSlider.module.scss";
import { isMobile, isTablet, isDesktop } from "react-device-detect";
import { useRef } from "react";

const ImageSlider = ({ images }) => {
  const imgList = useRef(null);

  return (
    <div className={styles.wrapperContainer}>
      <button
        onClick={() => {
          imgList.current.scrollBy(
            isDesktop ? -750 : isMobile ? -300 : isTablet && -450,
            0
          );
        }}
        id="scroll-left"
        className={`${styles.scrollButton} ${styles.scrollLeftButton}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <ul
        ref={imgList}
        className={`${styles.sliderWrapper}`}
        id="financial-wrapper"
      >
        {images.map((image, index) => (
          <li key={"financial-literacy-" + index}>
            <img
              src={image}
              alt="Financial Literacy"
              className={styles.image}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          imgList.current.scrollBy(
            isDesktop ? 750 : isMobile ? 300 : isTablet && 450,
            0
          );
        }}
        id="scroll-right"
        className={`${styles.scrollButton} ${styles.scrollRightButton}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default ImageSlider;
