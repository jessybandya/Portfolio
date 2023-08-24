import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SoftUIControllerProvider } from "./context";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'
import { Provider } from 'react-redux';
import { store, persistor  } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
  <SoftUIControllerProvider>
  <ToastContainer />
    <App />
  </SoftUIControllerProvider>
</BrowserRouter>
  </PersistGate>
  </Provider>
);
