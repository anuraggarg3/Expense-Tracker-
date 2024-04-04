import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import App from '../App'
import { FirebaseProvider } from '../firebase'
import { ToastContainer } from 'react-toastify'
function MainPage() {
  return (
    <div>
      <ToastContainer  className="foo" style={{ width: "350px" }}/>
      <Routes>
      <Route path='/' element={<App/>} />
        <Route path="/login" element={<FirebaseProvider><Login/> </FirebaseProvider>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default MainPage
