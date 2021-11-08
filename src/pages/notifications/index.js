import React, { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import NotificationRequests from "../../components/Notifications/NotificationRequests";
import RecentUser from "../../components/Notifications/RecentUser";
import Message from "../../components/Notifications/Message";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Notifications/notificationsPage.module.scss";
import LoginApis from "../../actions/apis/LoginApis";
function NotificationsPage() {
  // 3 types request, message , community
  const router = useRouter();
  const state = router.query ?? { type: "request" };
  const [notitype, setnotitype] = useState(state.type);

  return (
    <div className={styles.notificationsPage}>
      <DashboardLeftPanel />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={"Notifications"} />
        <div className={styles.switch}>
          <p
            className={`${styles.tabs} ${
              state.type === "request" ? styles.selected : ""
            }`}
            onClick={() => {
              if (state.type !== "request")
                router.push({
                  asPath: "/notifications",
                  pathname: "/notifications",
                  query: { type: "request" },
                });
            }}
          >
            Requests
          </p>
          <p
            className={`${styles.tabs} ${
              state.type === "message" ? styles.selected : ""
            }`}
            onClick={() => {
              if (state.type !== "message")
                router.push({
                  asPath: "/notifications",
                  pathname: "/notifications",
                  query: { type: "message" },
                });
            }}
          >
            Messages
          </p>
          <p
            className={`${styles.tabs} ${
              state.type === "community" ? styles.selected : ""
            }`}
            onClick={() => {
              if (state.type !== "community")
                router.push({
                  asPath: "/notifications",
                  pathname: "/notifications",
                  query: { type: "community" },
                });
            }}
          >
            Community
          </p>
          {state.type === "message" ? (
            <p className={styles.recentHeading}>Recent Chats</p>
          ) : null}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {state.type === "request" ? (
              <>
                <NotificationRequests />
                <NotificationRequests />
                <NotificationRequests />
                <NotificationRequests />
                <NotificationRequests />
                <NotificationRequests />
                <NotificationRequests />
                <NotificationRequests />
                <NotificationRequests />
                <NotificationRequests />
              </>
            ) : state.type === "message" ? (
              <>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
              </>
            ) : null}
          </div>
          {state.type === "message" ? (
            <div className={styles.recentSection}>
              <RecentUser />
              <RecentUser />
              <RecentUser />
              <RecentUser />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          isLogged: true,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
