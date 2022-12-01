import React from "react";
import Home from "../../components/Home";
import { HOME_VARIENTS } from "../../static_data/Home_Data";

function ReferPage(props) {
  return <Home {...props} page={HOME_VARIENTS[1]} showNav={false} />;
}

export default ReferPage;
