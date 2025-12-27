import EventCard from "./EventCard";
import '../styles/EventList.css'
// this is the whole section for the event cards

const EventList = () => {
  return (
      <div className='event-list-container'>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
  );
};
export default EventList;