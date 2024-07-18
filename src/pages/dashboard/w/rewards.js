import React, { useContext, useEffect, useState } from "react";
import { UniCoinValue } from "../../../../config";
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
import UniCoinSvg from "../../../components/SVGcomponents/UniCoinSvg";
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
      name: "1-5",
      benefits: [
        "3 months of free access to upsurge",
        // "Finance master class",
        // "Financial dictionary",
        // "upsurge cap & bottle",
        // "20% discount on yearly subscription",
      ],
    },
    {
      name: "6-25",
      benefits: [
        "Get annual subscription at ₹2399",
        // "Financial dictionary",
        // "upsurge cap",
        // "upsurge bottle",
        // "20% discount on yearly subscription",
      ],
    },
    {
      name: "26-100",
      benefits: [
        "Get annual subscription at ₹2999",
        // "Avail discount on joining upsurge",
        // "Earn bonus unicoins",
        // "Other exciting rewards",
        // "20% discount on yearly subscription",
      ],
    },
    {
      name: "100+",
      benefits: [
        "Get annual subscription at ₹3599",
        // "Avail discount on joining upsurge",
        // "Earn bonus unicoins",
        // "Other exciting rewards",
        // "20% discount on yearly subscription",
      ],
    },
  ];
  const annualpricing = [
    "Quests",
    "Games Arena",
    "Chore Management",
    "Family Fun Games & Activities",
    "2,500 UniCoin Bonus - Redeemable for discount vouchers",
    "Higher Education Counselling Masterclass",
    "1 free session with your choice of an expert from our panel",
    "Rich Dad, Poor Dad - the personal finance bible & more fun goodies!",
    ,
  ];
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  const [mode, setmode] = useState("");
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
              {`At upsurge, everything is a game and you can win rewards everywhere!
Explore our platform and collect as many UniCoins by playing the games, taking the money quotient quiz, completing the quest & inviting your friends.
`}
            </p>
            <p className={styles.description}>
              {`Not only do you stand a chance to win all the prizes below, but you will also retain all the UniCoins you’ve earned when you join upsurge.
`}
            </p>
            {/* <p className={styles.descriptionbold}>
              {`* You can increase your rank by playing games, completing quests, playing money quotient, reading blogs, inviting friends etc.`}
            </p>
            <p className={styles.descriptionbold}>
              {`* All the UniCoins collected during earlyaccess, will be given as bonus on joining upsurge.`}
            </p> */}
          </div>
          <p className={styles.heading} style={{ userSelect: "none" }}>
            Know more about your Early Access rewards.
          </p>
          {/* <div className={styles.featurewrapper}>
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
          </div> */}
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
          <div className={styles.des2}>
            <p className={styles.desheading}>Benefits of annual subscription</p>
            <div className={styles.wrapper}>
              {annualpricing.map((item) => {
                return <p key={item}>{item}</p>;
              })}
            </div>
          </div>
          <div className={styles.des3}>
            <div className={styles.coinbg}>
              <img
                src="https://imgcdn.upsurge.in/images/coinfalling.png"
                alt=""
              />
            </div>
            <p className={styles.desheading}>
              UniCoins
              <UniCoinSvg className={styles.icon} />
            </p>
            <p className={styles.description}>
              UniCoin is the currency you earn throughout upsurge, by completing
              quests, chores & games, & which you can redeem across a catalogue
              of brands like the ones listed below.
            </p>
            <p className={styles.description}>
              We also have a panel of upsurge Gurus, (experts in college
              admissions, career development, fitness, dance, music, etc.) you
              can avail free sessions with using UniCoins.
            </p>
          </div>
          <PartnerSection dashboard={true} />
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
            res && res.data
              ? fixVoucherArray(
                  res.data.data,
                  Number(response.data.data.num_balance)
                ) || []
              : null,
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
