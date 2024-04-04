import React, { useReducer, createContext ,useContext} from 'react';
import contextReducer from './contextReducer';
import { useFirebase } from '../firebase';
const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const firebase = useFirebase();
  const [transactions, dispatch] = useReducer(contextReducer, initialState);
  const deleteTransaction = async(id) => {
    try {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      const usi = JSON.parse(localStorage.getItem('auth'));
      await firebase.deleteListing(id, usi.userID);
    } catch (error) {
      console.error("Error deleting from Firebase:", error);
    }
  };
  const usi=JSON.parse(localStorage.getItem('auth'))
  const addTransaction =async (transaction) => {

    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    await firebase.handleCreateNewListing(transaction.amount,transaction.category,transaction.date,
      transaction.id,transaction.type,usi.userID);
  };

  const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
    }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
