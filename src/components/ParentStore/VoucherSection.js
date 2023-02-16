import React, { useEffect, useState } from "react";
import styles from "../../styles/ParentStore/VoucherSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Reward from "../WaitlistDashboard/Reward";
import Voucher from "./Voucher";
import SearchIcon from "@mui/icons-material/Search";
import SeeMoreCard from "../WaitlistDashboard/SeeMoreCard";
export default function VoucherSection({
  vouchers,
  unicoins,
  email,
  phone,
  kidsdata,
  kid,
  id,
  parent,
  userdatafromserver
}) {
  const [items, setItems] = useState();
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);

  // console.log("@@@@", vouchers);

  useEffect(() => {
    if (vouchers && vouchers.length) {
      if (limit) setItems(vouchers.slice(0, limit));
    }
  }, [limit, vouchers]);

  useEffect(() => {
    if (vouchers && vouchers.length) {
      if (query) {
        setItems(
          vouchers.filter((voucher) => search(voucher.data.name, query))
        );
      } else {
        setItems(vouchers.slice(0, limit));
      }
    }
  }, [query, vouchers]);

  const search = (str1, str2) => {
    return str1.toLowerCase().includes(str2.toLowerCase());
  };

  const onSeeMoreClick = () => setLimit((prev) => Number(prev) + 10);

  return (
    <div className={styles.voucherSection} id={id}>
      <div className={styles.headwrapper}>
        <h2 className={styles.heading}>
          Vouchers <HeadingArrow />
        </h2>
        <div className={styles.inputArea}>
          <div className={styles.inputwrapper}>
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rewards"
            />
            <SearchIcon className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        {items?.map((item, index) => (
          <Reward
            data={item.data}
            key={item.id}
            kid={kid ? true : false}
            unicoins={unicoins}
            email={email}
            parent={parent}
            phone={phone}
            kidsdata={kidsdata}
            userdatafromserver={userdatafromserver}
          />
        ))}
        {!query && <SeeMoreCard handleClick={onSeeMoreClick} />}
        {items?.length === 0 && (
          <p className={styles.noreward}>No Vouchers found</p>
        )}
      </div>
    </div>
  );
}
