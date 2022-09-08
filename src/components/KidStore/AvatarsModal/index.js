import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "../../../styles/KidStore/AvatarsModal.module.scss";
import AvatarList from "./AvatarList";

export default function AvatarsModal({
  avatars,
}) {
  return (
    <div className={styles.avatarsModal}>
      <AnimatePresence>
          <div className={styles.container}>
              <AvatarList
                avatars={avatars}
              />
          </div>
      </AnimatePresence>
    </div>
  );
}
