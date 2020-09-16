import React from 'react';
import { connect } from 'react-redux';
import * as CommonIcon from 'components/icons/common';



import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import myReducer from './reducers';
import Header from './components/header/Header';

import Footer from './components/footer/Footer';
import './common.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import MainContent from './components/body/layout/MainContent';
import RouterList from './components/router/RouterList';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications-component/dist/theme.css';
import "react-datepicker/dist/react-datepicker.css";
import thunk from 'redux-thunk';
import ChatBot from 'components/chatbot/ChatBot';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
  ),
  // other store enhancers if any
);
const store = createStore(myReducer, enhancer);

// const store = createStore(
//   myReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
//   applyMiddleware(
//     thunk,
//   )
// );

function App(props) {
  return (
    <div className="App">
      <Provider store={store} >
        <Router>
          <ReactNotification />
          <Header />
          {/* <MainContent /> */}
          <RouterList />
          {/* <ChatBot /> */}
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
