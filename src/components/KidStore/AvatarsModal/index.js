import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "../../../styles/KidStore/AvatarsModal.module.scss";
import AvatarList from "./AvatarList";

export default function AvatarsModal({ avatars, showModal, setShowModal }) {
  const [requestMode, setRequestMode] = useState(false);
  const [avatarData, setAvatarData] = useState({
    name: "",
    price: "",
  });

  const onAvatarClick = (data) => {
    setRequestMode(true);
    setAvatarData(data);
  };

  console.log("$$$$$$$$", avatarData);

  return (
    <div className={styles.avatarsModal}>
      <AnimatePresence>
        {showModal ? (
          <div className={styles.container}>
            {requestMode ? (
              <> </>
            ) : (
              <AvatarList avatars={avatars} handleAvatarClick={onAvatarClick} />
            )}
          </div>
        ) : (
          <div />
        )}
      </AnimatePresence>
    </div>
  );
}
