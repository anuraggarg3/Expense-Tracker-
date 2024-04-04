import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';
import { FirebaseProvider } from './firebase';
import { Provider } from './context/context';
import './index.css';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import MainPage from './Auth/MainPage';
import { BrowserRouter,Route ,Routes,Navigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App';
ReactDOM.render(
  <BrowserRouter>
  <FirebaseProvider>
  <SpeechProvider appId="7c4aee08-1073-4a32-b862-ebe1850e0732" language="en-US">
    <Provider>
    <ToastContainer  className="foo" style={{ width: "350px" }}/>
      <Routes>
      <Route path='/' element={<Signup/>} />
        <Route path="/login" element={<FirebaseProvider><Login/> </FirebaseProvider>} />
        <Route path="/home" element={<App />} />
      </Routes>
    </Provider>
  </SpeechProvider>
  </FirebaseProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
