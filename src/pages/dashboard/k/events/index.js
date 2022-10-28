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

const data = [
  {
    id: 1,
    name: "Bones",
    image: "https://i.scdn.co/image/ab67616d0000b273813713582dcc508e7d5073c4",
  },
  {
    id: 2,
    name: "Believer",
    image:
      "https://i1.sndcdn.com/artworks-s3zOCWcV8XQVtQcv-0emq8A-t500x500.jpg",
  },
  {
    id: 3,
    name: "Enemy",
    image:
      "https://i1.sndcdn.com/artworks-38gNae8qY7Gti4D5-zRbpjw-t500x500.jpg",
  },
  {
    id: 4,
    name: "Thunder",
    image:
      "https://www.pluggedin.com/wp-content/uploads/2020/01/Imagine_Dragons__Thunder__Large.jpg.jpeg",
  },
  {
    id: 5,
    name: "Demons",
    image:
      "https://upload.wikimedia.org/wikipedia/en/2/2b/Imagine_Dragons_-_%22Demons%22_%28Official_Single_Cover%29.jpg",
  },
  {
    id: 6,
    name: "Natural",
    image: "https://i.scdn.co/image/ab67616d0000b273da6f73a25f4c79d0e6b4a8bd",
  },
  {
    id: 7,
    name: "Sharks",
    image:
      "https://i0.wp.com/themusicuniverse.com/wp-content/uploads/2022/06/imaginedragonssharks.jpg?fit=800%2C450&ssl=1",
  },
];

export default function Events({ userData }) {
  const { setuserdata } = useContext(MainContext);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    setuserdata(userData);
  }, [userData]);

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
          <Carousel>
            {data.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </Carousel>
        </div>
      </div>
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
