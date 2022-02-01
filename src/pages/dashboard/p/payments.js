import React, { useContext, useEffect, useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getIndianTime } from "../../../helpers/timehelpers";
import PaymentsApi from "../../../actions/apis/PaymentsApi";
import { MainContext } from "../../../context/Main";
export default function Payments({ pricing_details, userdatafromserver }) {
  console.log(userdatafromserver);
  const [mode, setmode] = useState("Payments");
  const router = useRouter();
  const [current_plan, setcurrent_plan] = useState(
    userdatafromserver.plan_name || "Free"
  );
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
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  function handleClick(index) {
    setbuydata({
      price: pricing_data[index].price,
      total: pricing_data[index].total,
      type: "rs",
      name: pricing_data[index].name,
      description: pricing_data[index].description,
      item: "Subscription",
    });
    setshowmodal(true);
  }

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
          {current_plan === "Free" && (
            <p className={styles.heading}>
              Start your kid’s journey in the <br />
              finance world today.
            </p>
          )}
          {current_plan === "Free" && (
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
          )}
          {current_plan !== "Free" && (
            <div className={styles.currentplan}>
              <div className={styles.head}>
                <CheckCircleIcon className={styles.tick} />
                <div className={styles.right}>
                  <p className={styles.text}>CURRENT PLAN</p>
                  <p className={styles.planheading}>{current_plan}</p>
                </div>
                <p className={styles.expiry}>
                  ₹{userdatafromserver.plan_amount || 2994}{" "}
                  {current_plan === "Half-Yearly"
                    ? "per 6 Months"
                    : current_plan === "Yearly"
                    ? "per 12 Months"
                    : "/Month"}
                  , Expires on{" "}
                  {getIndianTime(
                    Number(userdatafromserver.plan_expiry) ||
                      new Date().getTime()
                  )}
                </p>
              </div>
              <div className={styles.hr} />
              <div className={styles.bottom}>
                <div className={styles.left}>
                  <p className={styles.benefitheading}>Current Benefits</p>
                  <ul className={styles.benefitswrapper}>
                    {pricing_data[
                      pricing_data.findIndex(
                        (item) => item.name === current_plan
                      )
                    ].benefits.map((benefit, index) => {
                      return <li key={"benefit" + index}>{benefit}</li>;
                    })}
                  </ul>
                </div>
                <div className={styles.right}>
                  <div
                    className={styles.invoice}
                    onClick={() => {
                      if (userdatafromserver.plan_invoice_id)
                        router.push(
                          "/dashboard/invoice/" +
                            userdatafromserver.plan_invoice_id
                        );
                    }}
                  >
                    Invoice
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={styles.pricewrapper}>
            {pricing_details.map((item, index) => {
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
                    {current_plan !== "Free" && current_plan !== item.name
                      ? current_plan === "Free"
                        ? "Buy"
                        : "Switch"
                      : current_plan === "Free"
                      ? "Buy"
                      : "Renew"}
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
      const pricing_details = await getpricing();
      return {
        props: {
          pricing_details,
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
async function getpricing() {
  let response = await PaymentsApi.getpricing();
  if (response && response.data && response.data.data)
    return response.data.data;
}
