import { useDispatch } from "react-redux";
import {getItemWithExpireTime} from "../../service/localStorage"
import React, { useState, useEffect, ReactNode, FC, createContext, useContext } from "react";
import { AuthContext } from "../../App";
import { Link, Navigate, Outlet, Route } from "react-router-dom";

export const LoginPage  = () => {
    return <h1>login</h1>
}