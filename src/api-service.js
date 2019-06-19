import axios from 'axios';

export const onAuthenticate = (url) => {
  const URL = url;
  return axios(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
