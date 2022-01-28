import { Router, useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import styles from "../../styles/Dashboard/kidcomponent.module.scss";
import Confirmation from "../Confirmation";
import ClockSvg from "../SVGcomponents/ClockSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";
import KidComponentMenu from "./KidComponentMenu";

function KidComponent({ data, setkids, settoastdata, confirmationgiven }) {
  const router = useRouter();
  const [showmenu, setshowmenu] = useState(false);
  const [showConfirmation, setshowConfirmation] = useState(false);

  async function deletechild() {
    let res = await DashboardApis.deletechild({ id: data.id });
    if (res && res.data.success) {
      setkids((prev) => prev.filter((item) => item.id !== data.id));
      settoastdata({ show: true, type: "success", msg: "done" });
    } else {
      settoastdata({
        type: "error",
        show: true,
        msg: res.data.message || "error deleting",
      });
    }
  }
  return (
    <div
      className={styles.kidComponent}
      // onClick={() => router.push("/kidactivity/" + data.id)}
    >
      {showConfirmation && (
        <Confirmation
          settoastdata={settoastdata}
          onConfirm={deletechild}
          onCancel={() => setshowConfirmation(false)}
          heading={"All data related to selected child will be deleted."}
        />
      )}
      <img
        onClick={() => router.push("/dashboard/p/child-activity/" + data.id)}
        src={
          data?.user_img_url || "https://i.ibb.co/v3vVV8r/default-avatar.png"
        }
        alt=""
        className={styles.kidimg}
      />
      <div className={styles.nameandpoints}>
        <p
          className={styles.name}
          onClick={() => router.push("/dashboard/p/child-activity/" + data.id)}
        >
          {data?.first_name}
        </p>
        <p className={styles.points}>
          {data?.points > 1000
            ? Math.floor(data?.points / 1000) + "k"
            : data?.points}
          {" points"}
        </p>
      </div>
      <p className={styles.chore}>{data?.pending_chores}</p>

      <div className={styles.courseProgression}>
        <p className={styles.name}>{data?.current_course || "No course"}</p>
        <div className={styles.progressBar}>
          <div
            className={styles.completion}
            style={{ width: `${data?.course_progress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>
          <ClockSvg />
          <p>{100 - data?.course_progress + "% Left"}</p>
        </div>
      </div>
      <div
        className={styles.more}
        id={data.id + "menu-button"}
        onClick={() => setshowmenu(!showmenu)}
      >
        <MenuSvg />
        {showmenu && (
          <KidComponentMenu
            setkids={setkids}
            data={data}
            settoastdata={settoastdata}
            setshowmenu={setshowmenu}
            setshowConfirmation={setshowConfirmation}
          />
        )}
      </div>
    </div>
  );
}

export default KidComponent;
