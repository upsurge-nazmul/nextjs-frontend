import React from "react";
import styles from "../../styles/GeneralComponents/avatarselector.module.scss";
import TickSvg from "../SVGcomponents/TickSvg";
import KidApis from "../../actions/apis/KidApis";
export default function AvatarSelector({
  avatars,
  setvalue,
  value,
  setshow,
  dirlink,
  extension,
  tribe,
}) {
  const [purchasedAvatars, setPurchasedAvatars] = React.useState([]);

  async function fetchPurchasedAvatars() {
    const res = await KidApis.getavatars(null);
    if (res && res.data && res.data.success) {
      setPurchasedAvatars(res.data.data);
    }
  }

  React.useEffect(() => {
    fetchPurchasedAvatars();
  }, []);

  return (
    <div className={styles.avatarselector}>
      <div className={styles.background} onClick={() => setshow(false)} />
      <div className={styles.main}>
        <p className={styles.heading}>
          Select{tribe ? " tribe " : " your "}avatar
        </p>
        <div className={styles.wrapper}>
          {purchasedAvatars &&
            purchasedAvatars.map((item) => {
              return (
                <div
                  className={styles.avatar}
                  key={item}
                  onClick={() => {
                    setvalue(item.img_url);
                    setshow(false);
                  }}
                >
                  {value === item.img_url && (
                    <div className={styles.selected}>
                      <TickSvg className={styles.tick} />
                    </div>
                  )}
                  <img src={item.img_url} alt="" />
                </div>
              );
            })}
          {avatars.map((avatar) => {
            return (
              <div
                className={styles.avatar}
                key={avatar}
                onClick={() => {
                  setvalue(
                    (dirlink ? dirlink : "/images/avatars/") +
                      avatar +
                      (extension ? extension : ".png")
                  );
                  setshow(false);
                }}
              >
                {value ===
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
          })}
          <div
            className={styles.avatar}
            key={"default-avatar"}
            onClick={() => {
              setvalue("https://imgcdn.upsurge.in/images/default-avatar.png");
              setshow(false);
            }}
          >
            {value ===
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
