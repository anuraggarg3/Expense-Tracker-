import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import App from '../App'
import { FirebaseProvider } from '../firebase'
function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<FirebaseProvider><Login/> </FirebaseProvider>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default MainPage
