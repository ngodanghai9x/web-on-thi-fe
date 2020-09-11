import axios from 'axios';

const callApi = function callApi(pathUrl, options) {
  const accessToken = localStorage.getItem('token');
  const domain = 'http://localhost:8888/';
  options.mode = 'cors';
  options.headers = {
    // 'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
    'TIMESTAMP': new Date().getTime(),
    'Accept': '*/*',
  };
  // Object.assign(options.headers, { 'TOKEN': accessToken });
  options.url = domain + String(pathUrl);

  return axios(options)
    .then(
      (response) => {
        console.log("callApi -> response=", response);
        const data = response && response.data ? response.data : {};
        return {
          data,
          code: data.responseCode,
          message: data.responseEntityMessages && data.responseEntityMessages.length > 0 ? data.responseEntityMessages[0].errorMessage : null,
        };
      },
      (error) => {
        console.log("callApi -> error=", error);
        window.noti.error('Có lỗi xảy ra, vui lòng thao tác lại');
        return error;
      },
    )
};

export default callApi;