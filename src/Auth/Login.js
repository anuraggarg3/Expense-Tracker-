import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid ,Box,Link} from '@mui/material';
import { useFirebase } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import 'react-toastify/dist/ReactToastify.min.css';

function Login() {
  const firebase=useFirebase();
    const [email, setEmail]=useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const isLoggedIn = firebase.isLoggedIn;
    useEffect(()=>{
      if(firebase.isLoggedIn){
        navigate("/home")
        window.location.reload();
      }
    },[firebase,navigate])

    const createUser=async(e)=>{
      e.preventDefault();
      try {
        console.log("user login");
        const result = await firebase.singinUserWithEmailAndPass(email, password);
        console.log("success", result);
      } catch (error) {
        // Handle error
        console.error("Login error:", error);
      // alert("User not found. Please check your email or sign up.");
      toast.error("User not found.", {
        position: "top-center",
        autoClose: 500, 
      });
      }
    };
  return (
    <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
       Login
      </Typography>
      <Box component="form" onSubmit={createUser} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
          Sign in
        </Button>
      </Box>
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
            <Link onClick={() => navigate('/')} variant="body2"  style={{ cursor: "pointer" }}  >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
    </Box>
  </Container>
  )
}

export default Login
