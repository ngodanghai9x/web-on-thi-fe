import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import myReducer from './reducers';
import Header from './components/header/Header';

import Footer from './components/footer/Footer';
import './common.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import MainContent from './components/body/layout/MainContent';
// import UserContent from './components/body/layout/UserContent';
import RouterList from './components/router/RouterList';
// import UserRouterList from './components/router/UserRouterList';

const store = createStore(myReducer);

function App(props) {
  return (
    <div className="App" style={{ paddingTop: 50 }}>
      <Provider store={store} >
        <Router>
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
