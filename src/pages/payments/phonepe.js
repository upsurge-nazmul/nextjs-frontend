import { CircularProgress } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import LoginApis from "../../actions/apis/LoginApis";

export default function PhonepePage({ userToken }) {
  // page should not work without logged in user
  // so pass token either in url or from browser storage
  const router = useRouter();
  const { plan_id, token = "" } = router.query;

  async function paymentInit(verification) {
    const result = await PaymentsApi.getPhonePe(
      {
        plan_id,
        hostURL: window.location.origin,
      },
      verification
    );
    console.log("phonepe result: ", result);
    if (!result) {
      router.push(window.history.go(-1) ?? "/");
    } else if (result && result.status === 400) {
      router.push(window.history.go(-1) ?? "/");
    } else if (result && result.data) {
      // result.data.success === true
      router.push(
        result.data.redirectURL.data.instrumentResponse.redirectInfo.url
      );
    }
  }

  useEffect(() => {
    const verification = token || userToken;
    if (verification) {
      paymentInit(verification);
      window.addEventListener("beforeunload", () => {
        return "Reload Disable";
      });
      return () => {
        window.removeEventListener("beforeunload", () => {
          return "Reload Disable";
        });
      };
    }
  }, [token, userToken]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
}

export async function getServerSideProps({ params, query, req }) {
  let token = query.token || req.cookies.accesstoken;
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
          userToken: token,
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
