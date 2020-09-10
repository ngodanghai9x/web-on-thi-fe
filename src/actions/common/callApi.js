import axios from 'axios';

const callApi = function callApi(pathUrl, options) {
  const accessToken = localStorage.getItem('token');
  const domain = 'http://localhost:8888/';
  options.mode = 'cors';
  options.headers = {
    'Authorization': 'Bearer '+accessToken,
    'Content-Type': 'application/json',
    'TIMESTAMP': new Date().getTime(),
    'Accept': '*/*',
  };
  // Object.assign(options.headers, { 'TOKEN': accessToken });
  options.url = domain + String(pathUrl);

  return axios(options)
    .then(
      (response) => { return response; },
      (error) => { return error; },
    );
};

export default callApi;