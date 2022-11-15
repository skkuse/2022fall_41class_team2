import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { useState } from "react";
import { apiClient } from "../../api/axios";

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const monaco = useMonaco();
  const params = useParams();

  const [ass, setAss] = useState();

  const settingSelector = useSelector((state) => state.SettingReducer);

  useEffect(() => {
    if (!monaco) return;

  }, [monaco]);

  useEffect(() => {
    apiClient.get(`/api/assignments/${params.assignment_id}/`).then((value) => {
      setAss(value.data.data);
    })
  },[])

  if (settingSelector) {
    return (
      <>
        <>HELLOWORLD</>
        {JSON.stringify(ass)}
        <Editor defaultLanguage={settingSelector.language.toLowerCase()} />
      </>
    );
  }

  return <div></div>;
};
