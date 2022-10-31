import BasicCard from "./BasicCard";
import EventsCard from "./EventsCard";

export default function Card(props) {
  const { cardType = "basic", data, height = "15vh", width = "15vw" } = props;

  return (
    <>
      {cardType === "eventCard" ? (
        <EventsCard {...props} />
      ) : (
        <BasicCard {...props} />
      )}
    </>
  );
}
