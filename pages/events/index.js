import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../api/eventData';

function Home() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const router = useRouter();

  return (
    <article className="Events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Events
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard
            eventObj={event}
            game={event.game}
            description={event.description}
            date={event.date}
            time={event.time}
            organizer={event.organizer}
            joined={event.joined}
            onUpdate={getAllEvents}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
