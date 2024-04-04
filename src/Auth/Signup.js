import React,{useState,useEffect} from 'react'
import { useFirebase } from '../firebase';
import { useNavigate } from 'react-router-dom';
function Signup() {
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
     const result= await firebase.signupUserWithEmailAndPassword(email,password);
      console.log("success",result);
    }
  return (
    <div>
        <h2>Sign UP</h2>
      <label>Email</label>
      <input onChange={(e)=>setemail(e.target.value)} value={email} type='email' required placeholder='Enter your Email'></input>
      <label>password</label>
      <input onChange={(e)=>setpassword(e.target.value)}type='password' required placeholder='Enter your password'></input>
      <button onClick={createuser}>Sign Up</button>
    </div>
  )
}

export default Signup
