import { clientCredentials } from '../utils/client';

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games`, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gametypes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

const updateGames = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${game.id}`, {
    method: 'PUT',
    body: JSON.stringify(game),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getGames, getSingleGame, createGame, getGameTypes, updateGames, deleteSingleGame,
};
