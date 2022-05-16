import React from "react";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import styles from "../../styles/MoneyAce/taskmodal.module.scss";

export default function TaskModal({
  data,
  settaskmodal,
  currenttask,
  settasks,
  setcurrenttab,
}) {
  async function completetask() {
    let res = await MoneyAceApis.completetask({ id: currenttask });
    if (res && res.data && res.data.success) {
      settaskmodal("");
      settasks((prev) => prev.filter((item) => item.id !== currenttask));
      setcurrenttab("xx");
      setcurrenttab("dashboard");
    } else {
      seterror(res?.data?.message || "Error connecting to server");
    }
  }
  return (
    <div className={styles.taskmodal}>
      <div className={styles.bg} />
      <div className={styles.main}>
        <p className={styles.heading}>
          {data.action_id === "friends"
            ? "Go out with friends"
            : data.action_id === "computer_course"
            ? "Computer course"
            : data.action_id === "fishing_course"
            ? "Fishing course"
            : data.action_id === "charity"
            ? "Donate to charity"
            : data.action_id === "driving"
            ? "Driving course"
            : data.action_id === "birthday"
            ? "Happy birthday"
            : ""}
        </p>
        <div className={styles.divmain}>
          <p className={styles.heading}>
            {data.action_id === "birthday"
              ? `It's your birthday and we have a gift of ₹${data.amount} for you.`
              : `Completing this task will take ₹${data.amount}`}
          </p>
          <div className={styles.btns}>
            <div className={styles.btn} onClick={completetask}>
              <p>{data.action_id === "birthday" ? "Accept" : "Confirm"}</p>
            </div>
            {data.action_id !== "birthday" && (
              <div className={styles.btn} onClick={() => settaskmodal("")}>
                <p>Cancel</p>
              </div>
            )}
          </div>
        </div>
        <img
          className={styles.homebtn}
          onClick={() => settaskmodal("")}
          src="https://i.ibb.co/kmfyw9t/homepng.png"
          alt=""
        />
      </div>
    </div>
  );
}
