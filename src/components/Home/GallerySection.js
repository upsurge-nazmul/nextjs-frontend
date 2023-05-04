import styles from "../../styles/Home/gallery.module.scss";

const images = [
  "https://imgcdn.upsurge.in/images/gallery-img1.jpg",
  "https://imgcdn.upsurge.in/images/gallery-img2.jpg",
  "https://imgcdn.upsurge.in/images/gallery-img3.jpg",
];

const GallerySection = () => {
  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.heading}>Gallery</h2>
      <div className={styles.container}>
        {images.map((image, index) => (
          <div key={"gallery-image-" + index} className={styles.card}>
            <img src={image} alt="Upsurge Gallery Image" />
          </div>
        ))}
      </div>
      <div className={styles.videoContainer}>
        <video
          className={styles.video}
          controls
          muted
          loop
          preload="none"
          poster="https://imgcdn.upsurge.in/images/gallery-img2.jpg"
        >
          <source
            src="https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/upsurge-workshops.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>
    </div>
  );
};

export default GallerySection;
