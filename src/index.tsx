
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./routes/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

console.log("APP_NAME: ", process.env.APP_NAME); // 'URL de la
console.log("APP_URL : ", process.env.APP_URL); // 'URL de la app'
console.log("API_URL : ", process.env.API_URL); // 'URL de la API'

const root = ReactDOM.createRoot(document.getElementById('root')); // 'URL de label de la API'

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
