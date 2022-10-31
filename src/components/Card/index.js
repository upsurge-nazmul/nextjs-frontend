import BasicCard from "./BasicCard";
import ChallengesCard from "./ChallengesCard";
import EventsCard from "./EventsCard";

export default function Card(props) {
  const { cardType = "basic", data, height = "15vh", width = "15vw" } = props;

  console.log("########", props);

  return (
    <>
      {cardType === "eventCard" ? (
        <EventsCard {...props} />
      ) : cardType === "challengeCard" ? (
        <ChallengesCard {...props} />
      ) : (
        <BasicCard {...props} />
      )}
    </>
  );
}
