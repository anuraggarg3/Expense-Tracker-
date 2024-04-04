import React, { useContext, useState,useEffect } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';
import { useFirebase } from '../../../firebase';

const List = () => {
  const classes = useStyles();
  const firebase=useFirebase();
  const [data,setdata]=useState([]);
  const { transactions, deleteTransaction ,arrytransactions} = useContext(ExpenseTrackerContext);
  useEffect(() => {
    const fetchData = async () => {
      await firebase.listalldata().then((docs) => {
        setdata(docs.docs);
      });
    };

    fetchData();
  }, [transactions,arrytransactions]);
  const handleDelete = async (id) => {
      await deleteTransaction(id);
  };
  
  const usi=JSON.parse(localStorage.getItem('auth'));
  console.log("idcv",usi.userID)
  return (
    <MUIList dense={false} className={classes.list}>
    {data.map((transaction) => {
      if (transaction._document.data.value.mapValue.fields.userID.stringValue === usi.userID) {
        return (
          <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={transaction._document.data.value.mapValue.fields.type.stringValue === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={transaction._document.data.value.mapValue.fields.category.stringValue} secondary={`$${transaction._document.data.value.mapValue.fields.amount.integerValue} - ${transaction._document.data.value.mapValue.fields.date.stringValue}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(transaction._document.data.value.mapValue.fields.id.stringValue)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        );
      }
      return null; // Render nothing if userId is not 1
    })}
  </MUIList>
  );
};

export default List;
