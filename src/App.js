import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import myReducer from './reducers';
import Header from './components/header/Header';

import Footer from './components/footer/Footer';
import './common.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './components/body/Register';
import MainContent from './components/body/layout/MainContent';
import UserContent from './components/body/layout/UserContent';

const store = createStore(myReducer);

function App(props) {
  const { pathname } = window.location;
  const getContent = (pathname) => {
    if (pathname.includes('thong-tin-ca-nhan')) {
      return <UserContent />
    }
    if (pathname.includes('admin')) {
      return null;
    }
    return <MainContent />;
  }
  return (
    <div className="App" style={{ paddingTop: 50 }}>
      <Provider store={store} >
        <Router>
          <Header />
          {/* {getContent(pathname)} */}
          <MainContent />
          <Footer />
          {/* <Route exact path="/dang-ky" component={Register} /> */}
        </Router>
      </Provider>
    </div>
  );
}

export default App;
