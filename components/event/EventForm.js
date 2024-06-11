import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../api/eventData';
import { getGames } from '../../api/gameData';
import getGamers from '../../api/gamerData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  description: '',
  date: '',
  time: '',
  gameId: 0,
  organizerId: 0,
};

const EventForm = ({ obj }) => {
  const [games, setGames] = useState([]);
  const [gamers, setGamers] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    getGames().then(setGames);
    getGamers().then(setGamers);

    if (obj.id) {
      setCurrentEvent({
        game: obj.gameId,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        organizer: obj.organizerId,
      });
    }
  }, [obj]);

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const event = {
        ...currentEvent,
        id: obj.id,
        game: Number(currentEvent.gameId),
        organizer: Number(currentEvent.organizerId),
      };
      updateEvent(event).then(() => router.push(`/event/${obj.id}`));
    } else {
      const event = {
        ...currentEvent,
        userId: user.uid,
        game: Number(currentEvent.gameId),
        organizer: Number(currentEvent.organizerId),
      };
        // Send POST request to your API
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        {/* GAME INPUT  */}
        <FloatingLabel controlId="floatingSelect" label="game">
          <Form.Select
            aria-label="Game"
            name="gameId"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.gameId}
            required
          >
            <option value="">Select a Game</option>
            {
            games.map((game) => (
              <option
                key={game.id}
                value={game.id}
              >
                {game.title}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>

        {/* DESCRIPTION INPUT  */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>

        {/* TIME INPUT  */}
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>

        {/* DATE INPUT  */}
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>

        {/* ORGANIZER INPUT  */}
        <FloatingLabel controlId="floatingSelect" label="organizer">
          <Form.Select
            aria-label="Organizer"
            name="organizerId"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.organizerId}
            required
          >
            <option value="">Select an organizer</option>
            {
            gamers.map((gamer) => (
              <option
                key={gamer.id}
                value={gamer.id}
              >
                {gamer.bio}
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

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    gameId: PropTypes.string,
    organizerId: PropTypes.string,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
