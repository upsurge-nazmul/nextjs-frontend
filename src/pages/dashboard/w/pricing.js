import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
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
        "Knowledge Quests",
        "Games Arena",
        "Chore Management",
        "Family Fun Games & Activities",
      ],
    },
    {
      name: "Half-Yearly",
      price: "₹499",
      description: "per child, per month (billed every 6 months)",
      benefits: [
        "Knowledge Quests",
        "Games Arena",
        "Chore Management",
        "Family Fun Games & Activities",
        "1,000 UniCoins Bonus - Redeemable for discount vouchers",
        "Higher Education Counselling Masterclass",
        ,
      ],
    },
    {
      name: "Yearly",
      price: "₹399",
      description: "per child, per month (billed annually)",
      benefits: [
        "Knowledge Quests",
        "Games Arena",
        "Chore Management",
        "Family Fun Games & Activities",
        "2,500 UniCoin Bonus - Redeemable for discount vouchers",
        "Higher Education Counselling Masterclass",
        "1 free session with your choice of an expert from our panel",
        "Rich Dad, Poor Dad - the personal finance bible & more fun goodies!",
        ,
      ],
    },
  ];
  const [mode, setmode] = useState("");
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  return (
    <div className={styles.leaderboard}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <p className={styles.heading}>
            Start your journey with upsurge today!
          </p>
          <div className={styles.featurewrapper}>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Free 15-day trial
            </div>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Add upto 3 kids
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
          <DashboardFooter />
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
          userdatafromserver: response.data.data,

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
