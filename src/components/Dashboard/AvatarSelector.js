import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/GeneralComponents/avatarselector.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";
import KidApis from "../../actions/apis/KidApis";
import { MainContext } from "../../context/Main";
import DashboardApis from "../../actions/apis/DashboardApis";

export default function AvatarSelector({ setshow, tribe = null }) {
  const { userdata, setuserdata } = useContext(MainContext);
  const [availableAvatars, setAvailableAvatars] = useState([]);
  const [selected, setSelected] = useState(null);

  async function fetchAvailableAvatars() {
    const res = await DashboardApis.getallavatars(null);
    if (res && res.data && res.data.success) {
      setAvailableAvatars((prev) => [...prev, ...res.data.data]);
    }
  }

  async function fetchPurchasedAvatars() {
    const res = await KidApis.getavatars(null);
    if (res && res.data && res.data.success) {
      setAvailableAvatars((prev) => [...prev, ...res.data.data]);
    }
  }

  async function setAvatar(img) {
    let response = await DashboardApis.updatechildprofile({
      user_img_url: img,
    });
    if (response && response.data && response.data.success) {
      setuserdata((prev) => ({ ...prev, user_img_url: img }));
    }
  }

  useEffect(() => {
    fetchPurchasedAvatars();
    fetchAvailableAvatars();
  }, []);

  useEffect(() => {
    setSelected(
      userdata?.user_img_url ||
        "https://imgcdn.upsurge.in/images/default-avatar.png"
    );
  }, [userdata]);

  return (
    <div className={styles.avatarselector}>
      <div className={styles.background} onClick={() => setshow(false)} />
      <div className={styles.main}>
        <p className={styles.heading}>
          Select{tribe ? " tribe " : " your "}avatar
        </p>
        <div className={styles.wrapper}>
          {availableAvatars &&
            availableAvatars.map((item) => {
              return (
                <div
                  className={styles.avatar}
                  key={item}
                  onClick={() => {
                    setAvatar(item.img_url);
                    setshow(false);
                  }}
                >
                  {selected === item.img_url && (
                    <div className={styles.selected}>
                      <TickSvg className={styles.tick} />
                    </div>
                  )}
                  <img src={item.img_url} alt="" />
                </div>
              );
            })}
          {/* {avatars.map((avatar) => {
            return (
              <div
                className={styles.avatar}
                key={avatar}
                onClick={() => {
                  setAvatar(
                    (dirlink ? dirlink : "/images/avatars/") +
                      avatar +
                      (extension ? extension : ".png")
                  );
                  setshow(false);
                }}
              >
                {selected ===
                  (dirlink ? dirlink : "/images/avatars/") +
                    avatar +
                    ".png" && (
                  <div className={styles.selected}>
                    <TickSvg className={styles.tick} />
                  </div>
                )}
                <img
                  src={
                    (dirlink ? dirlink : "/images/avatars/") +
                    avatar +
                    (extension ? extension : ".png")
                  }
                  alt=""
                />
              </div>
            );
          })} */}
          <div
            className={styles.avatar}
            key={"default-avatar"}
            onClick={() => {
              setAvatar("https://imgcdn.upsurge.in/images/default-avatar.png");
              setshow(false);
            }}
          >
            {selected ===
              "https://imgcdn.upsurge.in/images/default-avatar.png" && (
              <div className={styles.selected}>
                <TickSvg className={styles.tick} />
              </div>
            )}
            <img
              src={"https://imgcdn.upsurge.in/images/default-avatar.png"}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
