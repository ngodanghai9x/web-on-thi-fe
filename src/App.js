import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import myReducer from './reducers';
import Header from './components/header/Header';
import Content from './components/body/Content';
import Footer from './components/footer/Footer';
import './common.scss';
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(myReducer);

function App() {
  return (
    <div className="App" style={{ paddingTop: 50 }}>
      <Provider store={store} >
        <Router>
          <Header />
          <Content />
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
