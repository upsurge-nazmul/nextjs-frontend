import React, { useContext, useEffect, useState } from "react";
import { unicoin_value } from "../../../../config";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import XoxoApis from "../../../actions/apis/XoxoApis";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import PartnerSection from "../../../components/Home/PartnerSection";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
import TickSvg from "../../../components/SVGcomponents/TickSvg";
import Toast from "../../../components/Toast";
import Reward from "../../../components/WaitlistDashboard/Reward";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/rewardspage.module.scss";
export default function Rewards({ userdatafromserver, vouchers }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const data = [
    {
      name: "0-200",
      benefits: [
        "Finance master class",
        "Financial dictionary",
        "upsurge cap & bottle",
      ],
    },
    {
      name: "200-400",
      benefits: ["Financial dictionary", "upsurge cap", "upsurge bottle"],
    },
    {
      name: "400+",
      benefits: [
        "Avail discount on joining upsurge",
        "Earn bonus unicoins",
        "Other exciting rewards",
      ],
    },
  ];

  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  const [mode, setmode] = useState("Rewards");
  const [user_unicoin, setuser_unicoin] = useState(
    Number(userdatafromserver.num_unicoins) || 0
  );
  const [user_balance, setuser_balance] = useState(
    Number(userdatafromserver.num_balance) || 0
  );
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
          <PartnerSection dashboard={true} />
          <p className={styles.heading}>Know more about your rewards.</p>
          <div className={styles.featurewrapper}>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Earn UniCoins by money quotient
            </div>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Earn UniCoins by inviting friends
            </div>
            <div className={styles.feature}>
              <TickSvg className={styles.tick} />
              Earn UniCoins by plaing daily quiz
            </div>
          </div>
          <div className={styles.wrapper}>
            {data.map((item, index) => {
              return (
                <div className={styles.pricecontainer} key={"price" + index}>
                  <p className={styles.name}>Benefits for rank</p>
                  <p className={styles.price}>{item.name}</p>
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
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      let res = await DashboardApis.getallvouchers(null, token);
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          vouchers:
            fixVoucherArray(
              res.data.data,
              Number(response.data.data.num_balance)
            ) || [],
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}

function fixVoucherArray(array, balance) {
  let newarray = [];
  let available = [];
  for (let i = 0; i < array.length; i++) {
    if (Number(array[i].data.valueDenominations.split(",")[0]) > balance) {
      newarray.push(array[i]);
    } else {
      available.push(array[i]);
    }
  }
  return [...available, ...newarray];
}
