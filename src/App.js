import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import { Button, Grid } from '@material-ui/core';
import { Details, Main } from './components';
import { useFirebase } from './firebase';
import useStyles from './styles';
import ExportCSVButton from './Auth/ExportCSVButton';
const App = () => {
  const classes = useStyles();
  const firebase = useFirebase();
  const navigate = useNavigate(); 
  const main = useRef(null);

  const handleLogout = async () => {
    try {
      await firebase.signOutUser(); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
       <Grid container justify="flex-end">
       <ExportCSVButton/>
        <Button style={{ backgroundColor: 'lightgrey', marginRight: '10px' ,marginTop:'5px'}} onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
      <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
