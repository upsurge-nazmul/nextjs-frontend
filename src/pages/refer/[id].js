import React from "react";
import Home from "../../components/Home";
import LoginApis from "../../actions/apis/LoginApis";
import { HOME_VARIENTS } from "../../static_data/Home_Data";

function ReferPage(props) {
  return <Home {...props} page={HOME_VARIENTS[1]} showNav={false} />;
}

export default ReferPage;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg || "";
      return { props: {} };
    } else {
      return {
        props: {
          isLogged: true,
          userdata: response?.data?.data || null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", userdata: null },
    };
  }
}
