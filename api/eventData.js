import { clientCredentials } from '../utils/client';

const getEvents = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    headers: {
      Authorization: `${userId}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
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

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const deleteSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

const updateEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp))
    .catch(reject);
});

const signUpEvent = (event, user) => new Promise((resolve, reject) => {
  fetch(`/api/events/${event.id}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user.uid, // Ensure `user.uid` is the correct `uid` from the user context
    }),
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const leaveEvent = (eventId, userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}/leave`, {
    method: 'DELETE',
    headers: {
      Authorization: `${userId}`,
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to join event');
      }
      return resp.json();
    })
    .then(() => {
      getEvents().then(resolve);
    })
    .catch(reject);
});

const joinEvent = (eventId, userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}/signup`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers: {
      Authorization: `${userId}`,
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to join event');
      }
      return resp.json();
    })
    .then(() => {
      getEvents().then(resolve);
    })
    .catch(reject);
});

const joinEvent2 = (event, user) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event.id}/signup`, {
    method: 'POST',
    body: JSON.stringify({ userId: user.id }),
    headers: {
      Authorization: `${user.id}`,
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to join event');
      }
      return resp.json();
    })
    .then(() => {
      getEvents().then(resolve);
    })
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteSingleEvent,
  signUpEvent,
  joinEvent,
  joinEvent2,
  leaveEvent,
};
