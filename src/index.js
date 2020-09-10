import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { store } from 'react-notifications-component';
import callApi from './actions/common/callApi';

window.noti = {
  info: (message, duration = 1500) => store.addNotification({
    title: "",
    message,
    type: "info",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration,
      onScreen: true
    }
  }),
  success: (message, duration = 1500) => store.addNotification({
    title: "",
    message,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration,
      onScreen: true
    }
  }),
  error: (message, duration = 1500) => store.addNotification({
    title: "",
    message,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration,
      onScreen: true
    }
  }),
  warning: (message, duration = 1500) => store.addNotification({
    title: "",
    message,
    type: "warning",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration,
      onScreen: true
    }
  }),
};

window.myApp = {
  call: (pathUrl, options) => callApi(pathUrl, options),
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
