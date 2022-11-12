import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../components/Toast";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/Dashboard/gamespage.module.scss";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../context/Main";
import LoginApis from "../../../actions/apis/LoginApis";
import FreeGameApis from "../../../actions/apis/FreeGameApis";
import VideoModal from "../../../components/VideoModal";
import MoneyAceBanner from "../../../components/Dashboard/MoneyAceBanner";
import { Game_Data } from "../../../static_data/Game_Data";
import GameApis from "../../../actions/apis/GameApis";
import { getCookie } from "../../../actions/cookieUtils";
import PageTitle from "../../../components/PageTitle";

import Games from "../../../components/Games";

function GamesPage({ recentgames, userdatafromserver }) {
  return (
    <Games
      {...{
        userdatafromserver,
        recentgames,
        accountType: "",
      }}
    />
  );
}

export default GamesPage;

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
      if (response?.data?.data?.user_type !== "parent")
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/p/games",
          },
        };
      let recentgames = await FreeGameApis.getrecentGames(null, token);
      let gameunicoinrewards = await GameApis.getgameunicoinrewards(
        null,
        token
      );
      return {
        props: {
          userdatafromserver: response.data.data,
          recentgames:
            recentgames && recentgames.data && recentgames.data.success
              ? recentgames.data.data
              : [],
          gameunicoinrewards: gameunicoinrewards?.data?.success
            ? recentgames.data.data
            : [],
          isLogged: true,
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
