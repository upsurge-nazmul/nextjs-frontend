import styles from "../../styles/Home/video-testimonials.module.scss";

const videos = [
  "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-princi.mp4",
  "https://upsurge-assets-cdn.s3.ap-south-1.amazonaws.com/video/testimonial-child.mov",
];

const VideoTestimonials = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        {videos.map((video, index) => (
          <video
            key={"testimonial-video-" + video}
            className={styles.video}
            controls
            muted
            loop
            preload="none"
            poster="https://imgcdn.upsurge.in/images/gallery-img2.jpg"
          >
            <source src={video} type="video/mp4"></source>
          </video>
        ))}
      </div>
    </div>
  );
};

export default VideoTestimonials;
