import LoginApis from "../../../../actions/apis/LoginApis";

import HomeSvg from "../../../../components/SVGcomponents/StockSimulator/DashboardSvg";
import CompaniesSvg from "../../../../components/SVGcomponents/StockSimulator/CompaniesSvg";
import PortfolioSvg from "../../../../components/SVGcomponents/StockSimulator/PortfolioSvg";
import LeaderboardSvg from "../../../../components/SVGcomponents/StockSimulator/LeaderboardSvg";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ChallengesSvg from "../../../../components/SVGcomponents/StockSimulator/ChallengesSvg";

import Simulator from "../../../../components/Simulator";

const MODES = [
  { name: "Home", value: "home", icon: <HomeSvg /> },
  { name: "Companies", value: "companies", icon: <CompaniesSvg /> },
  { name: "Portfolio", value: "portfolio", icon: <PortfolioSvg /> },
  { name: "Challenges", value: "challenges", icon: <ChallengesSvg /> },
  { name: "Competition", value: "competition", icon: <MilitaryTechIcon /> },
  { name: "Leaderboard", value: "leaderboard", icon: <LeaderboardSvg /> },
];

export default function StockSimulator({ userdatafromserver, token }) {
  return (
    <Simulator
      {...{
        userData: userdatafromserver,
        token,
        modes: MODES,
        simulatorType: "stocksimulator",
      }}
    />
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
        props: {
          isLogged: false,
          msg,
        },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          userdatafromserver:
            response && response.data && response.data.data
              ? response.data.data
              : [],
          token,
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
