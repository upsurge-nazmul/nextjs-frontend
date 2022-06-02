import React, { useEffect, useState } from "react";
import VoucherApis from "../../actions/apis/VoucherApis";
import styles from "../../styles/ParentStore/VoucherSection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import Reward from "../WaitlistDashboard/Reward";
import Voucher from "./Voucher";
import SearchIcon from "@mui/icons-material/Search";
export default function VoucherSection({
  vouchers,
  unicoins,
  email,
  phone,
  kidsdata,
  kid,
}) {
  const [items, setitems] = useState(vouchers);
  const [query, setquery] = useState("");
  async function SearchVoucher() {
    let res = await VoucherApis.searchvoucher({ query });
    if (res && res.data.success) {
      setitems(res.data.data);
    }
  }
  useEffect(() => {
    if (!query) {
      setitems(vouchers);
    } else {
      SearchVoucher();
    }
  }, [query]);
  return (
    <div className={styles.VoucherSection}>
      <div className={styles.headwrapper}>
        <h2 className={styles.heading}>Rewards</h2>

        <div className={styles.inputwrapper}>
          <input
            type="text"
            onChange={(e) => setquery(e.target.value)}
            placeholder="Search rewards"
          />
          <SearchIcon className={styles.icon} />
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
            phone={phone}
            kidsdata={kidsdata}
          />
        ))}
        {items?.length === 0 && (
          <p className={styles.noreward}>No rewards found</p>
        )}
      </div>
    </div>
  );
}
