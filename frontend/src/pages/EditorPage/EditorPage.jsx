import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react';

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const monaco = useMonaco();

  const settingSelector = useSelector((state) =>
    state.SettingReducer
  );    

  useEffect(() => {
    if (!monaco) return;
  }, [monaco])

  if(settingSelector) {
    return (
      <Editor defaultLanguage={settingSelector.language.toLowerCase()}/>
    );
  }

  return <div></div>
  

};
