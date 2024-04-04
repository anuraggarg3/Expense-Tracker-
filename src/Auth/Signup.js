import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid ,Box,Link} from '@mui/material';
import { useFirebase } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import 'react-toastify/dist/ReactToastify.min.css';

function Signup() {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate('/home');
    }
  }, [firebase, navigate]);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const result = await firebase.signupUserWithEmailAndPassword(email, password);
      // console.log('success', result);
      toast.success("Congratualions,Signed Up Successfully!", {
        className: "black-background",
        position: "top-right",
        autoClose: 1000, 
      });
    } catch (error) {
      console.error('Signup error:', error);
      // alert('Enter a valid email ID and password.');
      toast.error("Enter a valid email ID and password.", {
        className: "black-background",
        position: "top-center",
        autoClose: 1000, 
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
        Sign Up
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
          Sign Up
        </Button>
      </Box>
      <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
            <Link onClick={() => navigate('/login')} variant="body2"  style={{ cursor: "pointer" }}  >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
    </Box>
  </Container>
);
}

export default Signup;