import React,{useEffect, useState} from 'react'
import { useFirebase } from '../firebase';
import { useNavigate } from 'react-router-dom';
function Login() {
  const firebase=useFirebase();
    const [email, setemail]=useState("");
    const [password, setpassword] = useState("");
    const navigate=useNavigate();
    useEffect(()=>{
      if(firebase.isLoggedIn){
        navigate("/")
      }
    },[firebase,navigate])

    const createuser=async(e)=>{
      e.preventDefault();
      try {
        console.log("user login");
        const result = await firebase.singinUserWithEmailAndPass(email, password);
        console.log("success", result);
      } catch (error) {
        // Handle error
        console.error("Login error:", error);
      alert("User not found. Please check your email or sign up.");
      }
    };
  return (
    <div>
        <h2>Login</h2>
      <label>Email</label>
      <input onChange={(e)=>setemail(e.target.value)} value={email} type='email' required placeholder='Enter your Email'></input>
      <label>password</label>
      <input onChange={(e)=>setpassword(e.target.value)}type='password' required placeholder='Enter your password'></input>
      <button onClick={createuser}>Login</button>
    </div>
  )
}

export default Login
