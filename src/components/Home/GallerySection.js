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
        <video className={styles.video} controls autoPlay="false" muted loop>
          <source src="/images/home/upsurge.mp4" type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
};

export default GallerySection;
