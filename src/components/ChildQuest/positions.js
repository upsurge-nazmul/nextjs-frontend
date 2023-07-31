import mobilePositions from "./mobilePositions";
import tabPositions from "./tabPositions";
import desktopPositions from "./desktopPositions";

export const getPositions = ({
  isMobile = false,
  isTablet = false,
}) => {
  if (isMobile) {
    return mobilePositions;
  } else if (isTablet) {
    return tabPositions;
  } else {
    return desktopPositions;
  }
}