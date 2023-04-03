import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/GeneralComponents/carouselgames.module.scss";

const slidesData = [
  {
    id: 0,
    image: "./images/downloadGames/Money_dash_1.png",
    title: "Money Dash",
    description:
      "A runner game where you have to earn coins without balance dropping to zero. Learn concepts like profit, loss and taxes.",
  },
  {
    id: 1,
    image: "./images/downloadGames/Money_dash_2.png",
    title: "Mini Miner",
    description:
      "A game that lets you buy and sell virtual stocks. Learn concepts like investing mutual funds and more.",
  },
  {
    id: 2,
    image: "./images/downloadGames/Money_dash_3.png",
    title: "Snakes and Ladders",
    description:
      "A version of cult classic. Learn concepts like saving and investing while enjoying the chance based thrill.",
  },
];

export default function CarouselGames({userdata, setshowauth, setauthmode}) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [title, setTitle] = useState(slidesData[0].title);
  const [imageUrl, setImageUrl] = useState(slidesData[0].image);
  const [description, setDescription] = useState(slidesData[0].description);
  const [changeSlide, setChangeSlide] = useState(false);
  const [stopSlide, setStopSlide] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  useEffect(() => {
    if(!stopSlide){
      const newTimeoutId = setTimeout(() => {
        nextSlide();
        setChangeSlide(!changeSlide);
      }, 5000);
      setTimeoutId(newTimeoutId); 
    }
    }, [changeSlide,stopSlide]);
    const nextSlide = () => {
      if(stopSlide){
      }
      else{
          const lastIndex = slidesData.length - 1;
          const shouldResetIndex = currentSlide === lastIndex;
          const index = shouldResetIndex ? 0 : currentSlide + 1;
          const prevIndex = shouldResetIndex ? -1 : currentSlide;
          console.log("index",index);
          setCurrentSlide(index);
          setTitle(slidesData[index]?.title);
          setImageUrl(slidesData[index]?.image);
          setDescription(slidesData[index]?.description);
      }
  };
  const Slide = (id) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setCurrentSlide(id);
    setTitle(slidesData[id]?.title);
    setImageUrl(slidesData[id]?.image);
    setDescription(slidesData[id]?.description);
    setStopSlide(true);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper}>
        <div className={styles.slide}>
          <div className={styles.slideContent}>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>
            <p
                    className={styles.activebutton}
                    onClick={() => {
                      if (!userdata) {
                        setshowauth(true);
                        setauthmode("parentChild");
                      } else if (userdata.user_type === "child") {
                        router.push("/dashboard/k/games");
                      } else if (userdata.user_type === "parent") {
                        router.push("/dashboard/p/games");
                      }
                    }}
                  >
                    Play Now!
                  </p>
            <div className={styles.sliderDots}>
              {slidesData.map((slide) => (
                <div
                  key={slide.id}
                  className={`${styles.sliderDot} ${
                    slide.id === currentSlide ? styles.active : ""
                  }`}
                  onClick={() => {
                    Slide(slide.id);
                }}
                >
                  a
                </div>
              ))}
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={imageUrl} alt={title} className={styles.slideImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
