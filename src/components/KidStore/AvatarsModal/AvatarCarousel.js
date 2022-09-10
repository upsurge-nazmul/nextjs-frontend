import React, { useState } from "react";
import PlayCircleSvg from "../../SVGcomponents/PlayCircleSvg";
import styles from "../../../styles/KidStore/AvatarCarousel.module.scss";
import Avatar from "./Avatar";
import RequestView from "./RequestView";
import { useContext } from "react";
import { MainContext } from "../../../context/Main";
function AvatarCarousel(avatars) {
  const { userdata } = useContext(MainContext);
  const [avatar, setAvatar] = useState(avatars);
  const [requestMode, setRequestMode] = useState(false);
  const [avatarData, setAvatarData] = useState({
    name: "",
    price: "",
  });
  const onAvatarClick = (data) => {
    setRequestMode(true);
    setAvatarData(data);
  };
  function handlemove(direction) {
    let partnerwrapper = document.getElementById("Avatarwrapper");
    if (direction === "right") {
      partnerwrapper.scrollLeft += 300;
    } else {
      partnerwrapper.scrollLeft -= 300;
    }
  }
  return (
    <div className={styles.carouselContainer} style={{ margin: 0 }}>
      {requestMode ? (
        <RequestView
          data={avatarData}
          availableUnicoins={userdata?.num_unicoins || 0}
          setRequestMode={setRequestMode}
        />
      ) : (
        <>
          <PlayCircleSvg
            className={styles.leftarrow}
            onClick={() => handlemove("left")}
          />
          <div
            className={styles.wrapper}
            style={{ overflowX: "hidden" }}
            id="Avatarwrapper"
          >
            {avatar.avatars.map((item, index) => (
              <Avatar
                key={"avatatr" + index}
                data={item}
                handleAvatarClick={onAvatarClick}
              />
            ))}

            {avatar?.length === 0 && (
              <p className={styles.noreward}>No rewards found</p>
            )}
          </div>
          <PlayCircleSvg
            className={styles.rightarrow}
            onClick={() => handlemove("right")}
          />
        </>
      )}
    </div>
  );
}

export default AvatarCarousel;
