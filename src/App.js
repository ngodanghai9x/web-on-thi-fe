import React from 'react';
import { createStore } from 'redux';
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


const store = createStore(myReducer);

function App(props) {
  return (
    <div className="App" style={{ paddingTop: 50 }}>
      <Provider store={store} >
        <Router>
          <ReactNotification />
          <Header />
          {/* <MainContent /> */}
          <RouterList />
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
