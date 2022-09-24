import React, { useEffect, useState } from "react";
import styles from "../../../styles/MoneyAce/storeitem.module.scss";
export default function StoreItem({
  setcart,
  cart,
  setcarttotal,
  data,
  viewonly,
  setmaincount,
}) {
  const [count, setcount] = useState(
    cart && cart[data.name] ? cart[data.name] : 0
  );
  useEffect(() => {
    if (!cart) return;
    setcount(cart[data.name]?.quantity);
  }, [cart]);

  function additem(type) {
    if (type === "minus") {
      if (cart[data.name] && cart[data.name].quantity > 0) {
        setmaincount((prev) => (prev - 1 < 0 ? 0 : prev - 1));
        setcarttotal((prev) => (prev - data.price < 0 ? 0 : prev - data.price));
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
      setmaincount((prev) => prev + 1);
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
            src="https://imgcdn.upsurge.in/images/minus.png"
            alt=""
            onClick={() => additem("minus")}
          />
        )}
        <input
          type="text"
          disabled
          value={!viewonly ? count : "x" + data.quantity}
        />
        {!viewonly && (
          <img
            src="https://imgcdn.upsurge.in/images/plus.png"
            alt=""
            onClick={() => additem()}
          />
        )}
      </div>
    </div>
  );
}
