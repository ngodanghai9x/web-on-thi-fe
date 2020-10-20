import axios from 'axios';
import { getCookie } from './utils';

const callApi = function callApi(pathUrl, options) {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = getCookie('_accessToken');
  const domain = 'http://localhost:8888/';
  // const domain = 'http://127.0.0.1:8888/';
  options.mode = 'cors';
  if (accessToken) {
    options.headers = {
      'Authorization': 'Bearer ' + accessToken,
      'TIMESTAMP': new Date().getTime(),
      // 'Accept': '*/*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    };
  } else {
    options.headers = {
      'Content-Type': 'application/json',
      'TIMESTAMP': new Date().getTime(),
      'Accept': '*/*',
    };
  }

  // Object.assign(options.headers, { 'TOKEN': accessToken });
  options.url = domain + String(pathUrl);

  return axios(options)
    .then(
      (response) => {
        // console.log(options.url, "callApi -> response=", response);
        const data = response && response.data ? response.data : {};
        return {
          data: data.body,
          code: Number(data.responseCode),
          // code: data.responseCode,
          message: data.responseEntityMessages && data.responseEntityMessages.length > 0 ? data.responseEntityMessages[0].errorMessage : null,
        };
      },
      (error) => {
        console.log(options.url, "callApi -> error=", error);
        // if (options.method && options.url && (options.method.toUpperCase() !== 'GET' && !String(options.url).includes('get'))) {
        //   window.noti.error('Có lỗi xảy ra, vui lòng thao tác lại');
        // }
        return error;
      },
    )
};

export default callApi;