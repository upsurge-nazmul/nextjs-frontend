import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "../../../styles/KidStore/AvatarsModal.module.scss";
import AvatarList from "./AvatarList";
import RequestView from "./RequestView";

export default function AvatarsModal({
  avatars,
  showModal,
  setShowModal,
  availableUnicoins,
}) {
  const [requestMode, setRequestMode] = useState(false);
  const [avatarData, setAvatarData] = useState({
    name: "",
    price: "",
  });

  const onAvatarClick = (data) => {
    setRequestMode(true);
    setAvatarData(data);
  };

  return (
    <div className={styles.avatarsModal}>
      <AnimatePresence>
        {showModal ? (
          <div className={styles.container}>
            {requestMode ? (
              <RequestView
                data={avatarData}
                availableUnicoins={availableUnicoins}
                setShowModal={setShowModal}
                setRequestMode={setRequestMode}
              />
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
