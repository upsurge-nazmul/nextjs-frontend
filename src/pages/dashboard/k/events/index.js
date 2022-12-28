import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import Toast from "../../../../components/Toast";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import styles from "../../../../styles/events/events.module.scss";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import PageTitle from "../../../../components/PageTitle";
import Carousel from "../../../../components/Carousel";
import Card from "../../../../components/Card";
import EventsApis from "../../../../actions/apis/EventsApis";
import Modal from "../../../../components/Modal";
import EventDetails from "../../../../components/Events/EventDetails";
import FillSpace from "../../../../components/Dashboard/FillSpace";

export default function Events({ userData }) {
  const { setuserdata } = useContext(MainContext);
  const [events, setEvents] = useState();
  const [challenges, setChallenges] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [selectedChallenge, setSelectedChallenge] = useState();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    setuserdata(userData);
  }, [userData]);

  useEffect(() => {
    async function fetchEventsAndChallenges() {
      let eventsRes = await EventsApis.getAllEvents();
      let chalRes = await EventsApis.getAllChallenges();

      if (eventsRes && eventsRes.data && eventsRes.data.success) {
        setEvents(eventsRes.data.data);
      }
      if (chalRes && chalRes.data && chalRes.data.success) {
        setChallenges(chalRes.data.data);
      }
    }
    fetchEventsAndChallenges();
  }, []);

  return (
    <div className={styles.eventsPage}>
      <PageTitle title={`upsurge | Events & Challenges`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={"Events & Challenges"}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.section}>
            <div className={styles.heading}>Upcoming Events</div>
            {events && events.length ? (
                {events.map((item) => (
                  <Card
                    key={item.id}
                    data={item}
                    height={"40vh"}
                    width={"20vw"}
                    cardType={"eventCard"}
                    handleSelect={() => setSelectedEvent(item)}
                  />
                ))}
              
            ) : (
              <FillSpace
                text={"There are no upcoming events"}
                extrastyle={{ margin: 0, minHeight: "30vh" }}
              />
            )}
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>Challenges</div>
            {challenges && challenges.length ? (
              
                {challenges.map((item) => (
                  <Card
                    key={item.id}
                    data={item}
                    height={"40vh"}
                    width={"20vw"}
                    cardType={"challengeCard"}
                    handleSelect={() => setSelectedChallenge(item)}
                  />
                ))}
                
            ) : (
              <FillSpace
                text={"There are no challaenges at this moment"}
                extrastyle={{ margin: 0, minHeight: "30vh" }}
              />
            )}
          </div>
        </div>
      </div>
      {selectedEvent && (
        <Modal
          onOutsideClick={() => setSelectedEvent()}
          title={selectedEvent.name}
          actions={{
            cancelText: "Cancel",
            isCancel: true,
            handleCancel: () => setSelectedEvent(),
            proceedText: "Register Now",
            isProceed: true,
            handleProceed: () => {
              setSelectedEvent();
            },
          }}
        >
          <EventDetails data={selectedEvent} />
        </Modal>
      )}
      {selectedChallenge && (
        <Modal
          onOutsideClick={() => setSelectedChallenge()}
          title={selectedChallenge.name}
          actions={{
            cancelText: "Cancel",
            isCancel: true,
            handleCancel: () => setSelectedChallenge(),
            proceedText: "Register Now",
            isProceed: true,
            handleProceed: () => {
              setSelectedChallenge();
            },
          }}
        >
          <EventDetails data={selectedChallenge} />
        </Modal>
      )}
    </div>
  );
}

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
          userData: response.data.data,
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
