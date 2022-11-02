import { useDispatch } from "react-redux";
import {getItemWithExpireTime} from "./localStorage"
import React, { useState, useEffect, ReactNode, FC, createContext, useContext } from "react";
import { AuthContext } from "../App";
import { Link, Navigate, Outlet, Route } from "react-router-dom";

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(getItemWithExpireTime("user"));
    const dispatch = useDispatch();

    useEffect(()=>{
            console.log("get item : " + user);
            setUser(getItemWithExpireTime("user"));
        },
        []
    );

    return (
        <AuthContext.Provider 
            value={user}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const PrivateRoute = ({children, ...props}) => {
    const currentUser = useContext(AuthContext);
    // console.log("++====================++" + currentUser + "++====================++");

    return (
        getItemWithExpireTime("user")?  <Outlet/> 
        // :  <LoginPage /> 
        : <Navigate to={"/auth/login"}/> 
    );
}

export const LoginRoute = ({children, ...props}) => {
    let currentUser = useContext(AuthContext);

    return (
        getItemWithExpireTime("user")? 
        <Navigate to={"/"} /> : <Outlet/> 
    );
}