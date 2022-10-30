import { useDispatch } from "react-redux";
import {getItemWithExpireTime} from "../../service/localStorage"
import React, { useState, useEffect, ReactNode, FC, createContext, useContext } from "react";
import { AuthContext } from "../../App";
import { Link, Navigate, Outlet, Route, useNavigate, useSearchParams } from "react-router-dom";
import {loginTryAction} from "./LoginAciton"

export const LoginRedirectPage  = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        console.log(code);
        if(code) {
            dispatch(loginTryAction(code, ()=>{navigate("/")}));
        }
    }, [])
    
    
    return (
        <div>
            <h1>redirect</h1>
        </div>
    )
}