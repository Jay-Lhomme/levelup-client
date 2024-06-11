import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createGame, getGameTypes, updateGames } from '../../api/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 1,
};

const GameForm = ({ obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getGameTypes().then(setGameTypes);

    if (obj.id) {
      setCurrentGame({
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: Number(obj.numberOfPlayers),
        skillLevel: Number(obj.skillLevel),
        gameType: Number(obj.gameTypeId),
      });
    }
  }, [obj]);

  // useEffect(() => {
  //   getGameTypes().then(setGameTypes);

  //   if (obj.id) {
  //     // Validate and convert numberOfPlayers and skillLevel to numbers
  //     const numberOfPlayers = Number(obj.numberOfPlayers);
  //     const skillLevel = Number(obj.skillLevel);

  //     // Check if the conversion results in valid numbers
  //     if (!Number.isNaN(numberOfPlayers) && !Number.isNaN(skillLevel)) {
  //       setCurrentGame({
  //         maker: obj.maker,
  //         title: obj.title,
  //         numberOfPlayers,
  //         skillLevel,
  //         gameType: Number(obj.gameTypeId),
  //       });
  //     } else {
  //       // Handle invalid or missing numeric values
  //       console.error('Invalid or missing numeric values for numberOfPlayers or skillLevel.');
  //     }
  //   }
  // }, [obj]);

  // const handleSubmit = (e) => {
  //   // Prevent form from being submitted
  //   e.preventDefault();
  //   if (obj.id) {
  //     const game = {
  //       maker: currentGame.maker,
  //       title: currentGame.title,
  //       numberOfPlayers: Number(currentGame.numberOfPlayers),
  //       skillLevel: Number(currentGame.skillLevel),
  //       gameType: Number(currentGame.gameTypeId),
  //       id: obj.id,
  //     };
  //     updateGames(game).then(() => router.push(`/game/${obj.id}`));
  //   } else {
  //   // Send POST request to your API
  //     const game = {
  //       maker: currentGame.maker,
  //       title: currentGame.title,
  //       numberOfPlayers: Number(currentGame.numberOfPlayers),
  //       skillLevel: Number(currentGame.skillLevel),
  //       gameType: Number(currentGame.gameTypeId),
  //       userId: user.uid,
  //     };
  //     createGame(game).then(() => router.push('/games'));
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const game = {
        ...currentGame,
        id: obj.id,
        gameType: Number(currentGame.gameTypeId),
      };
      updateGames(game).then(() => router.push(`/game/${obj.id}`));
    } else {
      const game = {
        ...currentGame,
        userId: user.uid,
        gameType: Number(currentGame.gameTypeId),
      };
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>numberOfPlayers</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>skillLevel</Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>

        <FloatingLabel controlId="floatingSelect" label="gameType">
          <Form.Select
            aria-label="Gametype"
            name="gameTypeId"
            onChange={handleChange}
            className="mb-3"
            value={currentGame.gameTypeId}
            required
          >
            <option value="">Select a Gametype</option>
            {
            gameTypes.map((gameType) => (
              <option
                key={gameType.id}
                value={gameType.id}
              >
                {gameType.label}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    maker: PropTypes.string,
    title: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
    gameTypeId: PropTypes.string,
  }),
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
