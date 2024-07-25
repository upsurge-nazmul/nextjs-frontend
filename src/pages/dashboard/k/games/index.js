import React from "react";
import LoginApis from "../../../../actions/apis/LoginApis";
import FreeGameApis from "../../../../actions/apis/FreeGameApis";
import GameApis from "../../../../actions/apis/GameApis";
import Games from "../../../../components/Games";

function GamesPage({
  userdatafromserver,
  gameunicoinrewards,
  allGames,
  recentgames,
}) {
  return (
    <Games
      {...{
        userdatafromserver,
        gameunicoinrewards,
        allGames,
        recentgames,
        accountType: "kid",
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
      let allGames = await GameApis.gamesList();
      let recentgames = await FreeGameApis.getrecentGames(null, token);
      let gameunicoinrewards = await GameApis.getgameunicoinrewards(
        null,
        token
      );
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          token: token,
          allGames: allGames?.data?.success ? allGames.data.data : [],
          gameunicoinrewards: gameunicoinrewards?.data?.success
            ? gameunicoinrewards.data.data
            : [],
          recentgames:
            recentgames && recentgames.data && recentgames.data.success
              ? recentgames.data.data
              : [],
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
