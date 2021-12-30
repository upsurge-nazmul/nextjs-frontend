import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import TickSvg from "../../../components/SVGcomponents/TickSvg";
import Toast from "../../../components/Toast";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/pricing.module.scss";
export default function Pricing({ userdatafromserver }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const data = [
    {
      name: "Monthly",
      price: "₹599",
      description: "per child, per month",
      benefits: [
        "5 Social Profiles",
        "5 Scheduled Posts Per Profile",
        "400+ Templates",
        "Calendar View",
        "24/7 Support",
      ],
    },
    {
      name: "Half-Yearly",
      price: "₹2,899",
      description: "per child, per month (billed every 6 months)",
      benefits: [
        "10 Social Profiles",
        "25 Scheduled Posts Per Profile",
        "400+ Templates",
        "Calendar View",
        "24/7 VIP Support",
      ],
    },
    {
      name: "Yearly",
      price: "₹4,799",
      description: "per child, per month (billed annually)",
      benefits: [
        "100 Social Profiles",
        "100 Scheduled Posts Per Profile",
        "400+ Templates",
        "Calendar View",
        "24/7 VIP Support",
      ],
    },
  ];
  const [mode, setmode] = useState("Pricing");
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  return (
    <div className={styles.leaderboard}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <p className={styles.heading}>
            Start your kids’ journey in the <br />
            finance world today.
          </p>
          <div className={styles.featurewrapper}>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Free 15-day trial
            </div>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Add upto 5 kids
            </div>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Cancel Anytime
            </div>
          </div>
          <div className={styles.pricewrapper}>
            {data.map((item, index) => {
              return (
                <div className={styles.pricecontainer} key={"price" + index}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.price}>{item.price}</p>
                  <p className={styles.description}>{item.description}</p>
                  <div className={styles.hr} />
                  <div className={styles.benefitswrapper}>
                    {item.benefits.map((benefit, index) => {
                      return <p key={"benefit" + index}>{benefit}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
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
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          isLogged: true,
          msg: "",
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
