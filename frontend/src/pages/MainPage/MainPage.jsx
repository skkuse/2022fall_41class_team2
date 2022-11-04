// 섹션을 모두 합친 메인 화면

import React, { useState, useEffect, ReactNode, FC, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "../../api/axios";
import { AuthContext } from "../../App";
import { getLectureAction } from "./MainAction";

// import Header from "../../modules/organisms/Header";
// import Problem from "../../modules/organisms/Problem";
// import Testcase from "../../modules/organisms/Testcase";
// import Editor from "../../modules/organisms/Editor";
// import Functools from "../../modules/organisms/Functools";
// import Terminal from "../../modules/organisms/Terminal";

export const MainPage= (props)=> {
  const currentUser = useContext(AuthContext);
  const dispatch = useDispatch();

  
  const lectureSelector = useSelector((state) =>
    state.LectureReducer.lectures
  );    

  useEffect(() => {
    // apiClient.get("/api/lectures/").then((val) => {
    //   console.log(val);
    // })

    dispatch(getLectureAction());
  },[]);

  if(lectureSelector) {
    return (
      <div>
        {JSON.stringify(lectureSelector)}
      </div>
    );
  }

  return (
    <div>
      main
      {/* <Header/>
        <Problem/>
        <Testcase/>
        <Editor/>
        <Functools/>
        <Terminal/> */}
    </div>
  );


}


