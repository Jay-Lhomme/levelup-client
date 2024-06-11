import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteSingleEvent, joinEvent, leaveEvent } from '../../api/eventData';

const EventCard = ({
  eventObj, game,
  description,
  date,
  time,
  organizer, joined, onUpdate,
}) => {
  const router = useRouter();

  const deleteThisEvent = () => {
    if (window.confirm(`Do you want to delete the event ${eventObj.game}?`)) {
      deleteSingleEvent(eventObj.id).then(() => onUpdate());
    }
  };

  const joinThisEvent = () => {
    if (window.confirm(`Do you want to join the event ${eventObj.game}?`)) {
      joinEvent(eventObj.id, eventObj.userId).then(() => onUpdate());
    }
  };

  const leaveThisEvent = () => {
    if (window.confirm(`Do you want to leave the event ${eventObj.game}?`)) {
      leaveEvent(eventObj.id, eventObj.userId).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{game}</Card.Header>
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{time}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{organizer}</Card.Footer>
      {(joined === true)
        ? <Button variant="warning" onClick={joinThisEvent}>JOIN</Button>
        : <Button variant="warning" onClick={leaveThisEvent}>LEAVE</Button>}

      <Button
        variant="info"
        onClick={() => {
          router.push(`/events/${eventObj.id}`);
        }}
      >
        VIEW
      </Button>
      <Button
        onClick={() => {
          router.push(`/events/edit/${eventObj.id}`);
        }}
      >
        EDIT
      </Button>
      <Button variant="danger" onClick={deleteThisEvent}>
        DELETE
      </Button>
    </Card>
  );
};

EventCard.propTypes = {
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  joined: PropTypes.bool.isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
