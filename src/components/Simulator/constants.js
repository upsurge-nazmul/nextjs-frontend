import HomeSvg from "../../components/SVGcomponents/StockSimulator/DashboardSvg";
import CompaniesSvg from "../../components/SVGcomponents/StockSimulator/CompaniesSvg";
import PortfolioSvg from "../../components/SVGcomponents/StockSimulator/PortfolioSvg";
import LeaderboardSvg from "../../components/SVGcomponents/StockSimulator/LeaderboardSvg";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ChallengesSvg from "../../components/SVGcomponents/StockSimulator/ChallengesSvg";

export const MODES = [
  { name: "Home", value: "home", icon: <HomeSvg /> },
  { name: "Companies", value: "companies", icon: <CompaniesSvg /> },
  { name: "Portfolio", value: "portfolio", icon: <PortfolioSvg /> },
  { name: "Challenges", value: "challenges", icon: <ChallengesSvg /> },
  { name: "Competition", value: "competition", icon: <MilitaryTechIcon /> },
  { name: "Leaderboard", value: "leaderboard", icon: <LeaderboardSvg /> },
];
