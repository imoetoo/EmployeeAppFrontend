import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import store from './store/index.ts';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//BrowserRouter provides a history context which is needed at the time the routes are created using useRoutes().
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

);


