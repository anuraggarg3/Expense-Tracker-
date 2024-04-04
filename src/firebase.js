
import { initializeApp } from "firebase/app";
import { createContext, useContext, useState, useEffect } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteField,
    where,deleteDoc,
    query,
    doc,
    getDoc
  } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyBCjdWsEZnie_K9uW6-3m1Yyy5wOaCL_aE",
  authDomain: "expensetrack-8266d.firebaseapp.com",
  projectId: "expensetrack-8266d",
  storageBucket: "expensetrack-8266d.appspot.com",
  messagingSenderId: "952225747070",
  appId: "1:952225747070:web:dee14e09d7db801104882f",
  databaseURL:"https://expensetrack-8266d-default-rtdb.firebaseio.com",
};
export const useFirebase=()=>useContext(FirebaseContext);
  const firebaseapp = initializeApp(firebaseConfig);
  const firebaseAuth=getAuth(firebaseapp);
  const firestore=getFirestore(firebaseapp);
  const storage=getStorage(firebaseapp);
  export const FirebaseProvider=(props)=>{
      
      const [user, setUser] = useState(null);
    const [userid,setuserid]=useState(null);
    useEffect(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user){ setUser(user) ; setuserid(user.uid);
        }
        else setUser(null);
      });
    }, []);

    // console.log(userid);
    const authinfo={
        userID:userid
      }
      localStorage.setItem("auth",JSON.stringify(authinfo))
    const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);
    const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

    const isLoggedIn = user ? true : false;
    console.log("isLoggedIn", isLoggedIn);
    const signOutUser = () => signOut(firebaseAuth);
    const handleCreateNewListing = async ( amount,category,date,id,type,userID) => {
        return await addDoc(collection(firestore, "storagedata"), {
            amount,category,date,id,type,userID
        });
      };
      const listalldata = () => {
        return getDocs(collection(firestore, "storagedata"));
      };
      const deleteListing = async (docId, userID) => {
        try {
          const docRef = collection(firestore, "storagedata");
          console.log("Deleting document with ID:", docId);
          console.log("For user:", userID);
      
          const querySnapshot = await getDocs(docRef);
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // console.log("qewrt", data)
            if (data.id === docId && data.userID === userID) {
              console.log("Document found. Deleting...");
               deleteDoc(doc.ref); // Correct usage of deleteDoc
            }
          });
        } catch (error) {
          console.error("Error deleting document:", error);
        }
      };
    return <FirebaseContext.Provider
    value={{
        user,
        userid,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        isLoggedIn,
        handleCreateNewListing,
        listalldata,
        deleteListing,
        signOutUser,
    }}>
        {props.children}
    </FirebaseContext.Provider>
}


