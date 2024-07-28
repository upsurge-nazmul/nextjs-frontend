import React from "react";
import styles from "../../styles/ManageChore/addassignees.module.scss";

export function AddAssignees({ data, added, setassignees }) {
  return (
    <div className={styles.addassignees}>
      <img
        src={
          data?.user_img_url ||
          "https://imgcdn.upsurge.in/images/default-avatar.png"
        }
        alt=""
        className={styles.userimg}
      />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{data.first_name}</p>
        <p className={styles.points}>
          {data.num_unicoins > process.env.NEXT_PUBLIC_UNICOIN_VALUE
            ? data.num_unicoins / process.env.NEXT_PUBLIC_UNICOIN_VALUE + "K "
            : data.num_unicoins + " "}
          UniCoins
        </p>
      </div>
      {added ? (
        <div
          className={styles.addedbutton}
          onClick={() =>
            setassignees((prev) => prev.filter((item) => item.id !== data.id))
          }
        >
          Remove
        </div>
      ) : (
        <div
          className={styles.addbutton}
          onClick={() => setassignees((prev) => [...prev, data])}
        >
          Add
        </div>
      )}
    </div>
  );
}
