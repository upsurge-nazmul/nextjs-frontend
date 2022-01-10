import React, { useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import Toast from "../../../components/Toast";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/Dashboard/payments.module.scss";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import ApproveModal from "../../../components/ParentStore/ApproveModal";
import ChoreApis from "../../../actions/apis/ChoreApis";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
import TickSvg from "../../../components/SVGcomponents/TickSvg";
import { pricing_data } from "../../../static_data/Pricing_Data";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";

export default function Payments({
  isLogged,
  msg,
  choresdata,
  gamesdata,
  kidsdata,
  liveclassdata,
  vouchers,
  userdatafromserver,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("Payments");
  const router = useRouter();
  const [history, sethistory] = useState([]);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showmodal, setshowmodal] = useState(false);

  const [buydata, setbuydata] = useState({
    price: 10,
    type: "rs",
    name: "",
    description: "",
  });
  function handleClick(index) {
    setbuydata({
      price: pricing_data[index].price.replace("₹", ""),
      type: "rs",
      name: pricing_data[index].name,
      description: pricing_data[index].description,
      item: "Subscription",
    });
    setshowmodal(true);
  }
  useEffect(() => {
    if (isLogged === false) {
      console.log(isLogged);
      settoastdata({
        show: true,
        type: "error",
        msg: msg,
      });
      router.push("/");
    }
  }, [isLogged]);

  async function getUserVouchers() {
    let res = await DashboardApis.getuservouchers();
    if (res && res.data.success) {
      sethistory(res.data.data);
    }
  }

  return (
    <div className={styles.payments}>
      <DashboardLeftPanel type="parent" />
      <Toast data={toastdata} />
      <ApproveModal
        showmodal={showmodal}
        setshowmodal={setshowmodal}
        buydata={buydata}
      />
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
            Start your kid’s journey in the <br />
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
            {pricing_data.map((item, index) => {
              return (
                <div className={styles.pricecontainer} key={"price" + index}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.price}>{item.price}</p>
                  <p className={styles.description}>{item.description}</p>
                  <div
                    onClick={() => handleClick(index)}
                    className={`${styles.button} ${
                      index === 1 && styles.secondbtn
                    }
                    ${index === 2 && styles.thirdbtn}`}
                  >
                    Buy
                  </div>
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
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let kidsdata = await getkidsdata(token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(token);
      let vouchers = await getvouchers(token);
      return {
        props: {
          isLogged: true,
          choresdata,
          gamesdata,
          kidsdata,
          liveclassdata,
          vouchers,
          userdatafromserver: response.data.data,
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
async function getkidsdata(token) {
  let response = await DashboardApis.getkids(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getchores(token) {
  let response = await ChoreApis.getpendingchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  }
}
async function getgames(token) {
  let response = await DashboardApis.getgames(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getliveclasses(token) {
  let response = await DashboardApis.getliveclasses(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getvouchers(token) {
  let response = await DashboardApis.getallvouchers(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
