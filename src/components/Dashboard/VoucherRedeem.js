import React, { useEffect, useState } from "react";
import styles from "../../styles/ParentStore/voucherpopup.module.scss";
import validator from "validator";
import { useRouter } from "next/dist/client/router";
import DashboardApis from "../../actions/apis/DashboardApis";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";
import Loader from "../Loader";
import CancelIcon from "@mui/icons-material/Cancel";
export default function VoucherRedeem({
  userdata_email,
  userdata_phone,
  quantity,
  setshowpopup,
  prices,
  data,
  setuser_balance,
}) {
  const [email, setemail] = useState(userdata_email || "");
  const [error, seterror] = useState("");
  const [phone, setphone] = useState(userdata_phone || "");
  const [success, setsuccess] = useState(false);
  const [interval, setinterval] = useState(null);
  const [progress, setprogress] = useState(0);
  const router = useRouter();
  useEffect(() => {
    handleUpdateData();
  }, []);
  async function handleUpdateData() {
    seterror("");
    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Invalid phone number");
      return;
    }
    if (quantity < 1) {
      seterror("Quantity must be greater than zero");
      return;
    }
    setinterval(
      setInterval(() => {
        setprogress((prev) => {
          if (prev + 1 > 90) {
            return 90;
          }
          return prev + 1;
        });
      }, 100)
    );
    let res = await DashboardApis.ordervouchers({
      productId: data.productId,
      denomination: prices,
      quantity,
      vendor: "xoxo",
      name: data.name,
      img_url: data.imageUrl,
    });
    setprogress(100);
    clearInterval(interval);
    if (res && res.data.success) {
      console.log(res.data.data);
      if (res.data.data.updated_balance) {
        setuser_balance(res.data.data.updated_balance);
      } else setuser_balance((prev) => prev - prices);
    } else {
      seterror(res?.data?.message || "Error connecting to server");
    }
    setsuccess(true);
  }
  return (
    <div className={styles.waitlistpopup}>
      <div
        className={styles.background}
        onClick={() => setshowpopup(false)}
      ></div>

      <div className={styles.block}>
        {!success ? (
          <>
            <p className={styles.heading}>Processing....</p>
            <Loader progress={progress + "%"} />
            {/* <p className={styles.heading}>
              Please check below information before proceeding.
            </p>
            <input
              type="text"
              placeholder="youremail@gmail.com"
              value={email}
              setvalue={setemail}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <div className={styles.phoneWrapper}>
              <p>+91</p>{" "}
              <input
                type="text"
                placeholder="Phone*"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) setphone(e.target.value);
                }}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.button} onClick={() => handleUpdateData()}>
              Proceed
            </div> */}
          </>
        ) : error ? (
          <div className={styles.approveModalcontainer}>
            <div className={styles.heading}>
              <div className={styles.text}>
                <p>Oops!</p>
                <p className={styles.payment}>
                  {error || `There was some issue, please try again later.`}
                </p>
              </div>
            </div>

            <div className={styles.svgholder}>
              <CancelIcon className={styles.cancelicon} />
              <PaymentSuccessBackground className={styles.backsvg} />
            </div>
            <div className={styles.button} onClick={() => setshowpopup(false)}>
              Done
            </div>
          </div>
        ) : (
          <div className={styles.approveModalcontainer}>
            <div className={styles.heading}>
              <div className={styles.text}>
                <p>Thank You!</p>
                <p className={styles.payment}>Purchase was successful.</p>
              </div>
            </div>

            <div className={styles.svgholder}>
              <PaymentSuccessSvg className={styles.ticksvg} />
              <PaymentSuccessBackground className={styles.backsvg} />
            </div>
            <div className={styles.button} onClick={() => setshowpopup(false)}>
              Done
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
