import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/educationhub.module.scss";
import { MainContext } from "../../context/Main";
import { getIndianTime } from "../../helpers/timehelpers";
import { toIndianFormat } from "../../helpers/currency";
import NineSlice from "../NineSlice";
import CourseJobCard from "./CourseJobCard";
export default function EducationHub({
  setcurrenttab,
  canvassize,
  moneyacedata,
  setmoneyacedata,
  settoastdata,
  tasks,
  settaskmodal,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [passbookdata, setpassbookdata] = useState([]);
  useEffect(() => {
    const scrollContainer = document.querySelector("#wrapper");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY * 5;
    });
  }, []);
  const data = [
    {
      name: "Computer Skills",
      image: "https://i.ibb.co/kBRZN5j/computer-skill.png",
      description: "Take a short course on imporving your computer skills",
      type: "course",
      id: "task-20",
      benefits: {
        cost: 200,
        morale: 5,
      },
    },
    {
      name: "About Investment",
      image: "https://i.ibb.co/KKpxZN3/investment.png",
      description: "Take a short course on imporving your investing skills",
      type: "course",
      id: "task-31",
      benefits: {
        cost: 200,
        morale: 5,
      },
    },
    {
      name: "Driving Course",
      image: "https://i.ibb.co/pP58XXn/driving.png",
      description: "Take a short course on imporving your driving skills",
      type: "course",
      id: "task-28",
      benefits: {
        cost: 200,
        morale: 5,
      },
    },
    {
      name: "Fishing Course",
      image: "https://i.ibb.co/q1khNtw/fishing.png",
      description: "Take a short course on imporving your fishing skills",
      type: "course",
      id: "task-24",
      benefits: {
        cost: 200,
        morale: 5,
      },
    },
    {
      name: "Agriculture Course",
      image: "https://i.ibb.co/YLF7B3T/agriculture.png",
      description: "Take a short course on imporving your agriculture skills",
      type: "course",
      id: "agriculture-course",
      benefits: {
        cost: 200,
        morale: 5,
      },
    },
    {
      name: "Apiary Skills",
      image: "https://i.ibb.co/v4qwfWM/apiary.png",
      description: "Learn apiary with ease",
      type: "course",
      id: "apiary-course",
      benefits: {
        cost: 200,
        morale: 5,
      },
    },
    {
      name: "Personal Finance",
      image: "https://i.ibb.co/9t7x4ym/personal-finance.png",
      description: "Learn about managing your personal financial",
      type: "course",
      id: "finance-course",
      benefits: {
        cost: 200,
        morale: 5,
      },
    },
  ];
  function handleClick(id) {
    let task = tasks.filter((item) => item.id === id)[0];
    settaskmodal(task);
  }
  function checkcompleted(id) {
    if (id === "task-20" && moneyacedata.computer_course) {
      return true;
    }
    return false;
  }
  return (
    <div className={styles.educationhub}>
      <div className={styles.main}>
        <div className={styles.heading}>
          <NineSlice
            width={
              widthHeight.width < 860
                ? widthHeight.width * 0.15
                : widthHeight.width * 0.12
            }
            height={
              widthHeight.width < 860
                ? widthHeight.width * 0.05
                : widthHeight.width * 0.035
            }
            border={5}
            image="https://imgcdn.upsurge.in/images/title-header-1.png"
            imageSize={{ x: 702, y: 195 }}
          >
            <p className={styles.title}>Education Hub</p>
          </NineSlice>
        </div>
        <div className={styles.mainbg}>
          <div className={styles.innerbg}></div>
        </div>
        <div className={styles.container} id="wrapper">
          {data.map((item) => {
            return (
              <CourseJobCard
                data={item}
                handleClick={handleClick}
                settoastdata={settoastdata}
                type="Course"
                key={item.id}
                isCompleted={checkcompleted(item.id)}
                isActive={tasks.findIndex((data) => data.id === item.id) !== -1}
              />
            );
          })}
        </div>
        <div
          className={styles.backbutton}
          onClick={() => setcurrenttab("dashboard")}
        >
          <img src="https://i.ibb.co/NxvRf9Z/icon-arrow3-left-0-1.png" alt="" />
        </div>
      </div>
    </div>
  );
}
