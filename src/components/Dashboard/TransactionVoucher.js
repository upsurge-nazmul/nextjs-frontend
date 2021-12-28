import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/Dashboard/transactionvoucher.module.scss";
import VoucherCode from "./VoucherCode";
export default function TransactionVoucher({ data, settoastdata }) {
  const [showcode, setshowcode] = useState(false);
  console.log(data);
  return (
    <div key={data.id} className={styles.voucher}>
      {showcode && (
        <VoucherCode
          data={data.response.vouchers[0]}
          setshowcode={setshowcode}
          settoastdata={settoastdata}
        />
      )}

      <div className={styles.imgwrapper}>
        <Image src={data?.img_url} layout="fill" objectFit="contain" />
      </div>
      <div className={styles.data}>
        <p className={styles.name}>{data?.name}</p>
        <p className={styles.vendor}>Vendor : {data?.vendor}</p>
        <p className={styles.status}>
          Status : {data?.response.deliveryStatus}
        </p>
        <p className={styles.time}>
          Date :{" "}
          {new Date(Number(data?.timestamp)).getDate() +
            "-" +
            new Date(Number(data?.timestamp)).getMonth() +
            "-" +
            new Date(Number(data?.timestamp)).getFullYear() +
            " " +
            new Date(Number(data?.timestamp)).getHours() +
            ":" +
            new Date(Number(data?.timestamp)).getMinutes()}
        </p>
      </div>
      <div
        className={styles.details}
        onClick={() => {
          if (data?.response.deliveryStatus !== "delivered") {
            settoastdata({
              show: true,
              msg: "Order delivery is pending",
              type: "error",
            });
          } else setshowcode(true);
        }}
      >
        View Code
      </div>
    </div>
  );
}
