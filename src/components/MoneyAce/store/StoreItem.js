import React, { useEffect, useState } from "react";
import styles from "../../../styles/MoneyAce/storeitem.module.scss";
export default function StoreItem({
  setcart,
  cart,
  setcarttotal,
  data,
  viewonly,
}) {
  const [count, setcount] = useState(cart ? cart[data.name] : 0);
  useEffect(() => {
    if (!cart) return;
    setcount(cart[data.name]?.quantity);
  }, [cart]);

  function additem(type) {
    if (type === "minus") {
      setcarttotal((prev) => (prev - data.price < 0 ? 0 : prev - data.price));
      if (cart[data.name] && cart[data.name].quantity > 0) {
        setcart((prev) => ({
          ...prev,
          [data.name]: {
            ...data,
            quantity:
              prev[data.name].quantity - 1 > 0
                ? prev[data.name].quantity - 1
                : 0,
          },
        }));
      }
    } else {
      setcarttotal((prev) => prev + data.price);
      if (cart[data.name]) {
        setcart((prev) => ({
          ...prev,
          [data.name]: { ...data, quantity: prev[data.name].quantity + 1 || 1 },
        }));
      } else {
        let newdata = { ...data, quantity: 1 };
        setcart((prev) => ({ ...prev, [data.name]: newdata }));
      }
    }
  }

  return (
    <div className={styles.storeitem} key={data.name}>
      <p className={styles.name}>{data.name}</p>
      <div className={styles.imagediv}>
        <p className={styles.price}>₹ {data.price}</p>
        <img src={data.img_url} alt="" />
      </div>
      <div className={styles.row}>
        {!viewonly && (
          <img
            src="https://i.ibb.co/TLFq2mS/minus.png"
            alt=""
            onClick={() => additem("minus")}
          />
        )}
        <input type="text" value={!viewonly ? count : "x" + data.quantity} />
        {!viewonly && (
          <img
            src="https://i.ibb.co/W6VgkX8/plus.png"
            alt=""
            onClick={() => additem()}
          />
        )}
      </div>
    </div>
  );
}
