import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';
import { FirebaseProvider } from './firebase';
import { Provider } from './context/context';
import App from './App';
import './index.css';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import MainPage from './Auth/MainPage';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
  <FirebaseProvider>
  <SpeechProvider appId="7c4aee08-1073-4a32-b862-ebe1850e0732" language="en-US">
    <Provider>
      {/* <App /> */}

      <MainPage/>
    </Provider>
  </SpeechProvider>
  </FirebaseProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
