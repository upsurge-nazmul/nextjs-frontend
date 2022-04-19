import { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/StockSimulator/simulatorProfile.module.scss";

export default function SimulatorProfile({ avatarUrl }) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  return (
    <div className={styles.left}>
      <div className={styles.avatarblock} onClick={() => {}}>
        <img src={avatarUrl} alt="" className={styles.avatar} />
        <p className={styles.username}>{userdata?.first_name}</p>
      </div>
    </div>
  );
}
