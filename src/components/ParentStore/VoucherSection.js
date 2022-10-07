import React, { useEffect, useState } from "react";
import VoucherApis from "../../actions/apis/VoucherApis";
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
}) {
  const [items, setItems] = useState();
  const [query, setquery] = useState("");
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    if (vouchers && vouchers.length) {
      if (limit) setItems(vouchers.slice(0, limit));
    }
  }, [limit]);

  async function SearchVoucher() {
    let res = await VoucherApis.searchvoucher({ query });
    if (res && res.data.success) {
      setItems(res.data.data);
    }
  }

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
              onChange={(e) => setquery(e.target.value)}
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
          />
        ))}
        <SeeMoreCard handleClick={() => setLimit((prev) => Number(prev) + 6)} />
        {items?.length === 0 && (
          <p className={styles.noreward}>No Vouchers found</p>
        )}
      </div>
    </div>
  );
}
