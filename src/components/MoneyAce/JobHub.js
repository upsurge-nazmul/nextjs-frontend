import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/educationhub.module.scss";
import { MainContext } from "../../context/Main";
import { getIndianTime } from "../../helpers/timehelpers";
import { toIndianFormat } from "../../helpers/currency";
import NineSlice from "../NineSlice";
import CourseJobCard from "./CourseJobCard";
export default function JobHub({
  setcurrenttab,
  canvassize,
  moneyacedata,
  setmoneyacedata,
  settoastdata,
  tasks,
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
      name: "Honey & Money",
      image: "https://i.ibb.co/P6nyLX6/bee.png",
      description:
        "Be a be and collect honey. \n 100 drops makes 1 bottle of honey.",
      type: "game",
      id: "task-22",
      benefits: {
        salary: 500,
        stamina: 1,
        morale: 5,
      },
    },
    {
      name: "Go Fishing",
      image: "https://i.ibb.co/q1khNtw/fishing.png",
      description:
        "Go fishing and catch as much fishes. \n watchout for shark attacks",
      type: "game",
      id: "task-25",
      benefits: {
        salary: 500,
        stamina: 1,

        morale: 5,
      },
    },
    {
      name: "Deliver Pizzas",
      image: "https://i.ibb.co/JccFQbs/pizza-deliver.png",
      description: "Earn your pocket money delivering pizzas.",
      type: "game",
      id: "task-30",
      benefits: {
        salary: 500,
        stamina: 1,
        morale: 5,
      },
    },
    {
      name: "Protect Your Farm",
      image: "https://i.ibb.co/MBpfYtC/farm.png",
      description: "Protect your farm from intruders.",
      type: "game",
      id: "farm",
      benefits: {
        salary: 500,
        stamina: 1,

        morale: 5,
      },
    },
    {
      name: "Deliver Newspaper",
      image: "https://i.ibb.co/1LTZRmm/newspaper.png",
      description: "Deliver newspaper to neighbours & earn some money.",
      type: "game",
      id: "news",
      benefits: {
        salary: 500,
        stamina: 1,
        morale: 5,
      },
    },
    {
      name: "Fast Food Service",
      image: "https://i.ibb.co/NTrWPrJ/fast-food.png",
      description: "Sell Fast Foods.",
      type: "game",
      id: "apiary-course",
      benefits: {
        salary: 500,
        stamina: 1,

        morale: 5,
      },
    },
    {
      name: "Take Tution",
      image: "https://i.ibb.co/ZTL1J3R/tution.png",
      description: "Teach & Earn",
      type: "game",
      id: "tutions",
      benefits: {
        salary: 500,
        stamina: 1,

        morale: 5,
      },
    },
  ];

  return (
    <div className={styles.educationhub}>
      <div className={styles.main}>
        <div className={styles.heading}>
          <NineSlice
            width={widthHeight.width * 0.12}
            height={widthHeight.width * 0.035}
            border={5}
            image="https://i.ibb.co/8Y5SZQ9/title-header-1.png"
            imageSize={{ x: 702, y: 195 }}
          >
            <p className={styles.title}>Jobs</p>
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
                key={item.id}
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
