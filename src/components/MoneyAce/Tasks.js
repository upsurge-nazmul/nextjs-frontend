import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/tasks.module.scss";
import { useRouter } from "next/dist/client/router";
import { Game_Data } from "../../static_data/Game_Data";
import BackSvg from "../SVGcomponents/MoneyAce/ui/BackSvg";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreItem from "./store/StoreItem";
import NineSlice from "../NineSlice";
import { MainContext } from "../../context/Main";
import MoneyAceTask from "./MoneyAceTask";
export default function Tasks({
  setcurrenttab,
  canvassize,
  settoastdata,
  settasks,
  tasks,
  settaskmodal,
  setstage,
  setgamedata,
  moneyacedata,
  setquiz,
  setcurrenttask,
  currenttask,
}) {
  const [storeitems, setstoreitems] = useState(null);
  const [allitems, setallitems] = useState(null);
  const [carttotal, setcarttotal] = useState(0);
  const [cat, setcat] = useState("Clothes");
  const [mode, setmode] = useState("main");
  const [cats, setcats] = useState([]);
  const [cart, setcart] = useState({});
  const [err, seterr] = useState("");
  const { widthHeight } = useContext(MainContext);
  useEffect(() => {
    const scrollContainer = document.querySelector("#wrapper");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY * 5;
    });
  }, []);
  useEffect(() => {
    x();
    async function x() {
      let res = await MoneyAceApis.getstoreitems({
        id: cat === "Food And Beverages" ? "Food & Beverages" : cat,
      });
      if (res && res.data && res.data.success) {
        setallitems(res.data.data.data);
        setstoreitems(
          res.data.data.data.filter((item) => item.category === "Clothes")
        );
        setcats(res.data.data.categories);
      }
    }
  }, []);
  useEffect(() => {
    if (!allitems) return;
    setstoreitems(
      allitems.filter(
        (item) =>
          item.category ===
          (cat === "Food And Beverages" ? "Food & Beverages" : cat)
      )
    );
  }, [cat]);
  const router = useRouter();
  useEffect(() => {
    seterr("");
  }, [mode]);
  async function handlepay() {
    let res = await MoneyAceApis.buystoreitems({ data: cart });
    if (res && res.data && res.data.success) {
      console.log(res.data.data);
      if (res.data.data.length > 0) {
        settasks((prev) =>
          prev.filter((item) => !res.data.data.includes(item.id))
        );
      }
      settoastdata({ show: true, msg: res.data.message, type: "success" });
      setmode("main");
      setcart({});
      setcarttotal(0);
    } else {
      seterr(res?.data?.message || "Error connecting to server");
    }
  }
  return (
    <div className={styles.virtualstore}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <NineSlice
            width={widthHeight.width * 0.12}
            height={widthHeight.width * 0.035}
            border={0}
            image="https://i.ibb.co/8Y5SZQ9/title-header-1.png"
            imageSize={{ x: 702, y: 195 }}
          >
            <p className={styles.title}>TASKS</p>
          </NineSlice>
        </div>
        <div className={styles.bg}>
          <div className={styles.innerbg}></div>
        </div>
        <div className={styles.taskwrapper}>
          {tasks?.map((item, index) => {
            return (
              <MoneyAceTask
                key={item.id}
                data={item}
                index={index}
                settaskmodal={settaskmodal}
                setstage={setstage}
                setgamedata={setgamedata}
                setcurrenttab={setcurrenttab}
                moneyacedata={moneyacedata}
                settasks={settasks}
                setquiz={setquiz}
                setcurrenttask={setcurrenttask}
                settoastdata={settoastdata}
                currenttask={currenttask}
              />
            );
          })}
        </div>
      </div>

      {mode === "main" && (
        <img
          className={styles.back}
          onClick={() => setcurrenttab("dashboard")}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      )}
    </div>
  );
}
