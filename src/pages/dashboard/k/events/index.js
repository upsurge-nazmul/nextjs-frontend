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
        setEvents(
          eventsRes.data.data.filter(
            (f) =>
              new Date(f.expiry).getTime() + 60 * 60 * 24 * 1000 >
              new Date().getTime()
          )
        );
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
            <div className={styles.cardsContainer}>
              {
              (events && events.length || challenges && challenges.length) ? 
              (
                <>
                {events && events.length ? (
                  events.map((item) => (
                    <Card
                      key={item.id}
                      data={item}
                      height={"40vh"}
                      width={"20vw"}
                      cardType={"eventCard"}
                      handleSelect={() => setSelectedEvent(item)}
                    />
                  ))
                  ) : ( "" )}
  
                {challenges && challenges.length ? (
                challenges.map((item) => (
                  <Card
                    key={item.id}
                    data={item}
                    height={"40vh"}
                    width={"20vw"}
                    cardType={"challengeCard"}
                    handleSelect={() => setSelectedChallenge(item)}
                  />
                ))
                ) : ( "" )}
                </>
              ) 
              : (
                <FillSpace
                text={"There are no challenges at this moment"}
                extrastyle={{ margin: 0, minHeight: "30vh" }}
              />
              )
              }
              

            
            </div>
          </div>
        </div>
      </div>
      {selectedEvent && (
        <EventDetails
          data={selectedEvent}
          onOutsideClick={() => setSelectedEvent()}
        />
      )}
      {selectedChallenge && (
        <EventDetails
          data={selectedChallenge}
          onOutsideClick={() => setSelectedChallenge()}
        />
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
