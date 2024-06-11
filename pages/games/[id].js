import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getSingleGame } from '../../api/gameData';

function ViewGameDetails() {
  const [gameDetails, setGameDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setGameDetails);
  }, [id]);

  return (
    <Card className="text-center">
      <Card.Header>{gameDetails.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {gameDetails.maker}</Card.Title>
        <Card.Text>{gameDetails.numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {gameDetails.skillLevel}</Card.Footer>
    </Card>
  );
}

export default ViewGameDetails;
