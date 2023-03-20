import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import Fb from "../../components/SVGcomponents/Fb";
import Insta from "../../components/SVGcomponents/Insta";
import LinkedIN from "../../components/SVGcomponents/LinkedInSvg";
import styles from "../../styles/waitlist/waitlist.module.scss";
import ConfirmInvoice from "../../components/ConfirmInvoice";
import { useReactToPrint } from "react-to-print";
import PageTitle from "../../components/PageTitle";

export default function Subscribed({ userdatafromserver, req }) {
  const [showauth, setshowauth] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [invoiceData, setInvoiceData] = useState();
  const [plan, setPlan] = useState();
  const pdfRef = useRef(null);
  const router = useRouter();
  const { payment_intent, plan_id, transactionId } = router.query;

  async function fetchPlan() {
    const res = await PaymentsApi.getPlans({ plan_id });
    if (res && res.data && res.data.success) {
      setPlan(res.data.data);
    }
  }

  useEffect(() => {
    fetchPlan();
  }, []);

  async function fetchUpdateSubscription(model) {
    const res = await PaymentsApi.updateSubscription(model);
    if (res && res.data && res.data.success) {
      let info = res.data.data;
      info.h_cgst = 9;
      info.cgst = (info.amount * 9) / 100;
      info.h_sgst = 9;
      info.sgst = (info.amount * 9) / 100;
      info.h_igst = 18;
      info.igst = (info.amount * 18) / 100;
      info.taxable_value = info.amount - (info.amount * 18) / 100;
      setInvoiceData(info);
    }
  }

  async function checkPhonepeStatus(transactionId) {
    const res = await PaymentsApi.checkPhonepeStatus({
      transactionId,
    });
    console.log({ res });
    if (res && res.data && res.data.response.success) {
      if (res.data.response.code === "PAYMENT_SUCCESS") {
        return true;
      }
      return false;
    }
  }

  useEffect(async () => {
    if (payment_intent) {
      const invoiceModel = {
        paymentIntent: payment_intent,
        plan_id,
      };
      fetchUpdateSubscription(invoiceModel);
    } else if (transactionId) {
      if (await checkPhonepeStatus(transactionId)) {
        const invoiceModel = {
          paymentIntent: transactionId,
          plan_id,
        };
        fetchUpdateSubscription(invoiceModel);
      }
    }
  }, [transactionId, payment_intent, plan_id]);

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  const handlerSave = useReactToPrint({
    content: () => pdfRef.current,
  });

  return (
    <div className={styles.waitlist}>
      <PageTitle />
      <Header
        stickyheader={stickyheader}
        showauth={showauth}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      {plan && (
        <div className={styles.container}>
          <div className={styles.green}></div>
          <div className={styles.white}></div>
          <div className={styles.ball4}></div>
          <div className={styles.yellow}></div>
          <p className={styles.heading3}>Subscription Confirmed </p>
          <div className={styles.line}></div>

          <p className={styles.heading2}>Thank you for subscribing!</p>
          <p className={styles.msg}>
            Your payment is successful you can check the invoice and download or
            print the invoice.
          </p>

          <div className={styles.invoiceContainer}>
            <div className={styles.invoiceWrapper}>
              {invoiceData && (
                <ConfirmInvoice
                  data={invoiceData}
                  userData={userdatafromserver}
                  ref={pdfRef}
                />
              )}
            </div>
            <div className={styles.btnContainer}>
              <button onClick={() => handlerSave()} className={styles.btn}>
                Print Invoice
              </button>
              {/* <button onClick={() => handlerSave()} className={styles.btn}>
              Download Invoice
            </button> */}
            </div>
          </div>
          <p className={styles.subheading}>
            To stay up to date at all times, follow us on.
          </p>
          <div className={styles.socials}>
            <a
              href="https://www.facebook.com/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
            >
              <Fb className={styles.social} />
            </a>
            <a
              href="https://www.instagram.com/upsurge.in/"
              target="_blank"
              rel="noreferrer"
            >
              <Insta className={styles.social} />
            </a>
            <a
              href="https://www.linkedin.com/company/upsurgeindia/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedIN className={styles.socialyt} />
            </a>
            {/* <Fb className={styles.social} />
          <Twitter className={styles.social} alt="" />
          <Insta className={styles.social} />
          <YtSvg className={styles.socialyt} />
          <LinkedIN className={styles.socialyt} /> */}
          </div>
          <div className={styles.goback} onClick={() => router.push("/")}>
            Go To Home
          </div>
        </div>
      )}
      <Footer />
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
          userdatafromserver: response.data.data,
          token: token,
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
