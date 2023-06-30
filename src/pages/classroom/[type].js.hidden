import styles from "../../styles/classroom/classroom.module.scss";
import JoinForm from "../../components/100ms/JoinForm";
import Conference from "../../components/100ms/Conference";
// import "../styles/ms.module.css";
import React, { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  HMSRoomProvider,
} from "@100mslive/react-sdk";
import Header from "../../components/Header/Header";
import { useRouter } from "next/router";
import Footer from "../../components/Home/Footer";
import ConferenceFooter from "../../components/100ms/Footer";

export default function Classroom() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const router = useRouter();
  const type = router.query.type;
  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.container}>
        {isConnected ? (
          <>
            <Conference />
          </>
        ) : (
          <JoinForm type={type} />
        )}
      </div>
      <Footer />
    </div>
  );
}
