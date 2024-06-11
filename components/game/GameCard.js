// import PropTypes from 'prop-types';
// import React from 'react';
// import { Card } from 'react-bootstrap';

// const GameCard = ({
//   title, //
//   maker,
//   numberOfPlayers,
//   skillLevel,
// }) => (
//   <Card className="text-center">
//     <Card.Header>{title}</Card.Header>
//     <Card.Body>
//       <Card.Title>By: {maker}</Card.Title>
//       <Card.Text>{numberOfPlayers} players needed</Card.Text>
//     </Card.Body>
//     <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
//   </Card>
// );

// GameCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   maker: PropTypes.string.isRequired,
//   numberOfPlayers: PropTypes.number.isRequired,
//   skillLevel: PropTypes.number.isRequired,
// };

// export default GameCard;

import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleGame } from '../../api/gameData';

const GameCard = ({
  gameObj, title, maker, numberOfPlayers, skillLevel, onUpdate,
}) => {
  const router = useRouter();

  const deleteThisGame = () => {
    if (window.confirm(`Do you want to delete the game ${gameObj.title}?`)) {
      deleteSingleGame(gameObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <Button
        variant="info"
        onClick={() => {
          router.push(`/games/${gameObj.id}`);
        }}
      >
        VIEW
      </Button>
      <Button
        onClick={() => {
          router.push(`/games/edit/${gameObj.id}`);
        }}
      >
        EDIT
      </Button>
      <Button variant="danger" onClick={deleteThisGame}>
        DELETE
      </Button>
    </Card>
  );
};

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  gameObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
