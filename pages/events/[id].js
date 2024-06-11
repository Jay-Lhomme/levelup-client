import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getSingleEvent } from '../../api/eventData';

function ViewEventDetails() {
  const [eventDetails, setEventDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEventDetails);
  }, [id]);

  return (
    <Card className="text-center">
      <Card.Header>Game: {eventDetails.game}</Card.Header>
      <Card.Body>
        <Card.Title>Desc: {eventDetails.description}</Card.Title>
        <Card.Text>Date: {eventDetails.date}</Card.Text>
        <Card.Text>Time: {eventDetails.time}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {eventDetails.organizer}</Card.Footer>
    </Card>
  );
}

export default ViewEventDetails;
