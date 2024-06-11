import { clientCredentials } from '../utils/client';

const getGamers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gamers`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getGamers;
