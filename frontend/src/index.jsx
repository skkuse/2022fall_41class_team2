import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import {BrowserRouter as Router} from 'react-router-dom'

import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/index.js';
import rootSaga from './sagas/index';

import './index.css';
// import configInfo from "./firebaseConfig.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: configInfo.apiKey,
//   authDomain: configInfo.authDomain,
//   projectId: configInfo.projectId,
//   storageBucket: configInfo.storageBucket,
//   messagingSenderId: configInfo.messagingSenderId,
//   appId: configInfo.appId,
//   measurementId: configInfo.measurementId
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);