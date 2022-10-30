import { useDispatch } from "react-redux";
import {getItemWithExpireTime} from "../../service/localStorage"
import React, { useState, useEffect, ReactNode, FC, createContext, useContext } from "react";
import { AuthContext } from "../../App";
import { Link, Navigate, Outlet, Route, useNavigate } from "react-router-dom";

export const LoginPage  = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const client_id = '4c3bebb649e5fd4d455f';
    const callback_uri = `http://${window.location.host}/login/redirect`;
    console.log(callback_uri);
    
    return (
        <div>
            <button onClick={()=>{
                window.location.assign(`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${callback_uri}`);
            }}> login </button>
        </div>
    )
}