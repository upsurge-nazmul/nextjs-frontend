import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardLeftPanel from "./DashboardLeftPanel";
import Requests from "./Requests";
import RecentUser from "./RecentUser";
import Message from "./Message";

function NotificationsPage() {
  // 3 types request, message , community
  const { state } = useLocation();
  const [notitype, setnotitype] = useState(state.type);
  const history = useHistory();
  return (
    <div className="notificationsPage">
      <DashboardLeftPanel />
      <div className="contentWrapper">
        <DashboardHeader mode={"Notifications"} />
        <div className="switch">
          <p
            className={`tabs ${state.type === "request" ? "selected" : ""}`}
            onClick={() => {
              if (state.type !== "request")
                history.push("/notifications", { type: "request" });
            }}
          >
            Requests
          </p>
          <p
            className={`tabs ${state.type === "message" ? "selected" : ""}`}
            onClick={() => {
              if (state.type !== "message")
                history.push("/notifications", { type: "message" });
            }}
          >
            Messages
          </p>
          <p
            className={`tabs ${state.type === "community" ? "selected" : ""}`}
            onClick={() => {
              if (state.type !== "community")
                history.push("/notifications", { type: "community" });
            }}
          >
            Community
          </p>
          {state.type === "message" ? (
            <p className="recentHeading">Recent Chats</p>
          ) : null}
        </div>
        <div className="wrapper">
          <div className="content">
            {state.type === "request" ? (
              <>
                <Requests />
                <Requests />
                <Requests />
                <Requests />
                <Requests />
                <Requests />
                <Requests />
                <Requests />
                <Requests />
                <Requests />
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
            <div className="recentSection">
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
