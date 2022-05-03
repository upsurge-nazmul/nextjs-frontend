import React, { useEffect, useState } from "react";
import styles from "../../styles/MoneyAce/vritualstore.module.scss";
import { useRouter } from "next/dist/client/router";
import { Game_Data } from "../../static_data/Game_Data";
import BackSvg from "../SVGcomponents/MoneyAce/ui/BackSvg";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreItem from "./store/StoreItem";
export default function VirtualStore({
  setcurrenttab,
  canvassize,
  settoastdata,
  settasks,
}) {
  const [storeitems, setstoreitems] = useState(null);
  const [allitems, setallitems] = useState(null);
  const [carttotal, setcarttotal] = useState(0);
  const [cat, setcat] = useState("Clothes");
  const [mode, setmode] = useState("main");
  const [cats, setcats] = useState([]);
  const [cart, setcart] = useState({});
  const [err, seterr] = useState("");
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
      {mode === "main" ? (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.cart} onClick={() => setmode("invoice")}>
              <p className={styles.text}>₹ {carttotal}</p>
              <ShoppingCartOutlinedIcon className={styles.carticon} />
              <div className={styles.bggreen}>
                <p>1</p>
              </div>
            </div>
          </div>
          <div className={styles.catwrapper}>
            {cats.map((item) => {
              return (
                <div
                  className={`${styles.cat} ${
                    cat === item && styles.selectedCat
                  }`}
                  key={item + "cat"}
                  onClick={() => setcat(item)}
                >
                  <p> {item}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.wrapper} id="wrapper">
            {storeitems &&
              storeitems.map((data) => {
                return (
                  <StoreItem
                    cart={cart}
                    setcart={setcart}
                    setcarttotal={setcarttotal}
                    data={data}
                    key={data.name}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <div className={styles.invoice}>
          <div className={styles.headRow}>
            <div className={styles.rowitem}>#</div>
            <div className={styles.rowitem}>Name</div>
            <div className={styles.rowitem}>Quantity</div>
            <div className={styles.rowitem}>Price</div>
            <div className={styles.rowitem}>Total</div>
          </div>
          <div className={styles.rows}>
            {Object.keys(cart).map((row, index) => {
              return (
                <div className={styles.row} key={row}>
                  <div className={styles.rowitem}>
                    {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                  </div>
                  <div className={styles.rowitem}>{cart[row].name}</div>
                  <div className={styles.rowitem}>{cart[row].quantity}</div>
                  <div className={styles.rowitem}>{cart[row].price || 0}</div>
                  <div className={styles.rowitem}>
                    ₹{cart[row].price * cart[row].quantity}
                  </div>
                </div>
              );
            })}
            <div className={styles.row}>
              <div className={styles.rowitem}>#</div>
              <div className={styles.rowitem}>Total</div>
              <div className={styles.rowitem}>-</div>
              <div className={styles.rowitem}>-</div>
              <div className={styles.rowitem}>₹{carttotal}</div>
            </div>
          </div>
          {err && <p className={styles.error}>{err}</p>}
          <div className={styles.btn} onClick={handlepay}>
            <p>Pay</p>
          </div>
          <img
            className={styles.home}
            onClick={() => setcurrenttab("dashboard")}
            src="https://i.ibb.co/kmfyw9t/homepng.png"
            alt=""
          />
        </div>
      )}
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
