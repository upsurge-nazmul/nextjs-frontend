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
      name: "1-10",
      benefits: [
        "Finance master class",
        "Financial dictionary",
        "upsurge cap & bottle",
        "20% discount on yearly subscription",
      ],
    },
    {
      name: "11-60",
      benefits: [
        "Financial dictionary",
        "upsurge cap",
        "upsurge bottle",
        "20% discount on yearly subscription",
      ],
    },
    {
      name: "61-160",
      benefits: [
        "Avail discount on joining upsurge",
        "Earn bonus unicoins",
        "Other exciting rewards",
        "20% discount on yearly subscription",
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
          <div className={styles.des}>
            <p className={styles.desheading}>upsurge reward program</p>
            <p className={styles.description}>
              {`It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).`}
            </p>
            <p className={styles.descriptionbold}>
              {`* You can increase your rank by playing games, completing knowledge quests, playing money quotient, reading blogs, inviting friends etc.`}
            </p>
            <p className={styles.descriptionbold}>
              {`* All the UniCoins collected during earlyaccess, will be given as bonus on joining upsurge.`}
            </p>
          </div>
          <PartnerSection dashboard={true} />
          <p className={styles.heading} style={{ userSelect: "none" }}>
            Know more about your Early Access rewards.
          </p>
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
        <DashboardFooter />
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
