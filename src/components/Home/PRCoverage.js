import Image from "next/image";
import styles from "../../styles/Home/pr-coverage.module.scss";

const PRCoverage = () => {
  const data = [
    {
      link: "https://cionews.co.in/gaming-focused-edtech-startup-upsurge-raises-rs-3-cr-in-pre-seed-round/",
      image: "/images/home/logos/cio_news.svg",
      alt: "CIO News logo",
    },
    {
      link: "https://www.edtechreview.in/news/gaming-focused-edtech-platform-upsurge-raises-inr-3-cr-in-pre-seed-round/",
      image: "/images/home/logos/etr.svg",
      alt: "EdTechReview logo",
    },
    {
      link: "https://www.financialexpress.com/money/teach-them-young-the-best-time-and-ways-to-start-teaching-kids-about-money/2983127/",
      image: "/images/home/logos/financial_express.svg",
      alt: "Financial Express logo",
    },
    {
      link: "https://mintgenie.livemint.com/news/personal-finance/teach-them-young-these-tips-can-help-children-become-well-versed-in-money-management-151676547742361",
      image: "/images/home/logos/live_mint.svg",
      alt: "Livemint logo",
    },
    {
      link: "https://startup.outlookindia.com/investors/edtech-start-up-upsurge-raises-pre-seed-funding-from-jcbl-india-news-7242",
      image: "/images/home/logos/outlook.svg",
      alt: "Outlook logo",
    },
    {
      link: "https://startupstorymedia.com/insights-edtech-startup-upsurge-raises-rs-3-cr-from-jcbl-india/",
      image: "/images/home/logos/startup_story.svg",
      alt: "Startup Story logo",
    },
    {
      link: "https://www.vccircle.com/jcblindia-backs-edtech-firm-upsurge",
      image: "/images/home/logos/vcc.svg",
      alt: "VCCIRCLE logo",
    },
    {
      link: "https://yourstory.com/2023/01/indian-startup-news-update-january-20-2023",
      image: "/images/home/logos/yourstory.svg",
      alt: "YOURSTORY logo",
    },
    {
      link: "https://bwdisrupt.businessworld.in/article/Edtech-Startup-upsurge-Snags-Rs-3-Cr-From-JCBL-India/20-01-2023-462744/",
      image: "/images/home/logos/businessworld.svg",
      alt: "Business World logo",
    },
  ];
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Featured In</h2>
      <div className={styles.slider}>
        <div className={styles.logos}>
          {data.map((item, index) => (
           <a
           className={styles.logoContainer}
           key={index}
           href={item.link}
           >
           <img
              src={item.image}
              alt={item.alt}
              className={styles.logo}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PRCoverage;
