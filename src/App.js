import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import myReducer from './reducers';
import Header from './components/header/Header';
import Content from './components/body/Content';
import Footer from './components/footer/Footer';
import './common.scss';

const store = createStore(myReducer);

function App() {
  return (
    <div className="App">
      <Provider store = {store} >
        <Header />
        <Content />
      </Provider>
    </div>
  );
}

export default App;
