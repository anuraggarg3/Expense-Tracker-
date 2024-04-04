import React, { useReducer, createContext ,useContext,useEffect,useState} from 'react';
import contextReducer from './contextReducer';
import { useFirebase } from '../firebase';
const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [data,setdata]=useState([]);
  const firebase = useFirebase();
  const [transactions, dispatch] = useReducer(contextReducer, initialState);
  const deleteTransaction = async(id) => {
    try {
      const usi = JSON.parse(localStorage.getItem('auth'));
      await firebase.deleteListing(id, usi.userID);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
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
  useEffect(() => {
    const fetchData = async () => {
      await firebase.listalldata().then((docs) => {
        setdata(docs.docs);
      });
    };

    fetchData();
  }, [transactions]);
  const arrytransactions=[];
  console.log("setdata",transactions)
  // const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);
  let expensebal=0;
  let incomebal=0;
  const fgh= data.map((transaction) => {
    if (transaction._document.data.value.mapValue.fields.userID.stringValue === usi.userID) {
      if (transaction._document.data.value.mapValue.fields.type.stringValue === 'Expense') {
        expensebal += parseInt(transaction._document.data.value.mapValue.fields.amount.integerValue);
      } else {
        incomebal += parseInt(transaction._document.data.value.mapValue.fields.amount.integerValue);
      }
      const transactionData = {
        amount: parseInt(transaction._document.data.value.mapValue.fields.amount.integerValue),
        category: transaction._document.data.value.mapValue.fields.category.stringValue,
        date: transaction._document.data.value.mapValue.fields.date.stringValue,
        id: transaction._document.data.value.mapValue.fields.id.stringValue,
        type: transaction._document.data.value.mapValue.fields.type.stringValue,
        userID: transaction._document.data.value.mapValue.fields.userID.stringValue,
      };
      arrytransactions.push(transactionData);
    }
  })
  console.log("array",arrytransactions);
  // console.log("incomebal",incomebal);
  // console.log("expensebal",expensebal);
  const balance=incomebal -expensebal;
  return (
    <ExpenseTrackerContext.Provider value={{
      transactions,
      balance,
      deleteTransaction,
      addTransaction,
      arrytransactions,
    }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
