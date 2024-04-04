

export const useGetUserifo=() =>{
 const {userID,isAuth}=JSON.parse(localStorage.getItem('auth'));
 return {userID,isAuth}
}

