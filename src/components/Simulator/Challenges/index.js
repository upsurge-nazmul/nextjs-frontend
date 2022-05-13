import CryptoChallenges from "./CryptoChallenges";
import StockChallenges from "./StockChallenges";

export default function Challenges(props) {
  return (
    <>
      {props.simulatorType === "cryptosimulator" ? (
        <CryptoChallenges {...{ ...props }} />
      ) : (
        <StockChallenges {...{ ...props }} />
      )}
    </>
  );
}
