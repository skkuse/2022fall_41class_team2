import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/color.css";
import "./styles/font.css";
import "./styles/index.css";
import "./styles/tailwind.css";

import App from './App';
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/index.js';
import rootSaga from './sagas/index';

import './index.css';

const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

const analytics = getAnalytics(app);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  // </React.StrictMode>
);

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//   document.getElementById('root')
// );