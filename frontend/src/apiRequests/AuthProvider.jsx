

import {createContext, useState, useEffect} from 'react'

export const AuthContext = createContext()

function AuthProvider({children}) {

    const[user, setUser] = useState(null);
    const[accessToken, setAccessToken] = useState(null);


    useEffect(()=>{
        refreshToken()
    }, []);

    const login = async(email, password)=>{
        const response = await fetch("http://localhost:5500/api/login",{
             method: "POST",
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify({email, password,}),
             credentials: "include"
        });
        const data = await response.json();
        console.log(data)

        if(response.ok && data.user){
            setUser(data.user);
            setAccessToken(data.accessToken);
            alert("Login successful");
        }else{
            console.error("Login failed:", data.message);
            alert("Login failed")
        }
    };

    const refreshToken = async ()=> {
        const response = await fetch("http://localhost:5500/api/refresh",{
            method: "GET",
            credentials: "include"
        });
         
        const data = await response.json();

         if (response.ok && data.accessToken && data.user){
            setUser(data.user)
            setAccessToken(data.accessToken);
            alert("Token refreshed")
         }else{
            alert ("Refresh token expired. Please login again");
            setUser(null);
            setAccessToken(null);
         }
    };
  return (
    <AuthContext.Provider value={{user, accessToken, login, refreshToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
