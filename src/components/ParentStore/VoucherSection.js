import React, { useEffect, useState } from "react";
import VoucherApis from "../../actions/apis/VoucherApis";
import styles from "../../styles/ParentStore/VoucherSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Reward from "../WaitlistDashboard/Reward";
import Voucher from "./Voucher";
import SearchIcon from "@mui/icons-material/Search";
import SeeMoreCard from "../WaitlistDashboard/SeeMoreCard";
import DashboardApis from "../../actions/apis/DashboardApis";
export default function VoucherSection({
  token,
  unicoins,
  email,
  phone,
  kidsdata,
  kid,
  id,
  parent,
}) {
  const [items, setitems] = useState();
  const [query, setquery] = useState("");
  const [voucerLimit, setVoucherLimit] = useState(20);
  const [showSeeMore, setShowSeeMore] = useState(true);

  async function SearchVoucher() {
    let res = await VoucherApis.searchvoucher({ query });
    if (res && res.data.success) {
      setitems(res.data.data);
    }
  }

  useEffect(() => {
    setitems();
    async function fetchVouchers() {
      let response = await DashboardApis.getallvouchers(
        { limit: voucerLimit },
        token
      );
      if (response && response.data && response.data.data) {
        setitems(response.data.data);
        if (voucerLimit > response.data.data.length) setShowSeeMore(false);
      }
    }
    if (voucerLimit) fetchVouchers();
  }, [voucerLimit]);

  const onSeeMoreClick = () => {
    setVoucherLimit((prev) => Number(prev) + 10);
  };

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
        {items &&
          items.length &&
          items.map((item, index) => (
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
        {showSeeMore && <SeeMoreCard handleClick={onSeeMoreClick} />}
        {items?.length === 0 && (
          <p className={styles.noreward}>No Vouchers found</p>
        )}
      </div>
    </div>
  );
}
