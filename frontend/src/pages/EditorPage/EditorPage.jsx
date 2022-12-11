import styled from "styled-components";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { apiClient } from "../../api/axios";

import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {
  Banner,
  CodeEditor,
  Testcase,
  Problem,
} from "../../modules/organisms/CodeEditor";
import { getTimeDiff } from "../../modules/organisms/AssignmentOverview/AssignmentOverview";
import { COLOR_SET } from "./../../service/GetColor";
import { setTestcaseOff } from './EditorAction';
import { SETTING_BACKGROUND_WHITE } from './../../reducers/SettingReducer';
import { Img } from './../../modules/atoms/Img/index';
=======
import { Img } from "../../modules/atoms";
>>>>>>> f7d4ef3d71afba7175ce6f3a3f2a00dd16be59e4

const Testbox = styled.div`
  background: #000000;
`;

const EditorPageGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [col] 1fr [col] 1fr [col] 1fr;
  grid-template-rows: [row] 1fr [row] 1fr;

  width: 100%;
  height: 97%;
`;

const ProblemWrapper = styled.div`
  grid-column: ${(props) =>
    props.magnified ? "col 1 / span 3" : "col 1 / span 1"};

  grid-row: row 1;
  min-width: 360px;
  max-width: 1800px;
`;
const TestcaseWrapper = styled.div`
  grid-column: ${(props) =>
    props.magnified ? "col 1 / span 3" : "col 1 / span 1"};
  grid-row: row 2;
  min-width: 360px;
  max-width: 1800px;
`;
const CodeEditorWrapper = styled.div`
  grid-column: ${(props) => (props.magnified ? "" : "col 2 / span 2")};
  grid-row: ${(props) => (props.magnified ? "" : "row 1 / span 2")};
`;

const GeneralContainer = styled.div`
  height: 100vh;
  /* TODO: 스크롤바 다크모드 css */
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 9.76px;
    background-color: #d3d3da;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 975.505px;
    background-color: #bfbfbf;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  }
  overflow-y: hidden;
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'750px',
    height:'500px',
    boxShadow: '-2px 8px 99px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    border:'none'
  },
};
// Modal.setAppElement('#yourAppElement');

export const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const monaco = useMonaco();
  const params = useParams();

  const [lecture, setLecture] = useState();
  const [ass, setAss] = useState();
  const [changeRepo, setChangeRepo] = useState(false);

  const settingSelector = useSelector((state) => state.SettingReducer);
  const [editMode, setEditMode] = useState({ edit: true, altMode: "none" });

<<<<<<< HEAD
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const testcaseSelector = useSelector((state) => state.testcaseReducer);
  const repoSelector = useSelector((state) => state.editorReducer);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(()=>{
    if(!modalIsOpen) {
      dispatch(setTestcaseOff());
    }
  }, [modalIsOpen])

  useEffect(()=>{
      if(testcaseSelector.isOnTestcase && testcaseSelector.isError) {
        console.log(testcaseSelector.errorContent);
        openModal();
      }
      else{
        closeModal();
      }
  }, [testcaseSelector.isOnTestcase, testcaseSelector.isError])
=======
  // Magnifier
  const [magnified1, setMagnified1] = useState(false);
>>>>>>> f7d4ef3d71afba7175ce6f3a3f2a00dd16be59e4

  useEffect(() => {
    if (!monaco) return;
  }, [monaco]);

  useEffect(() => {
    if (!location.state) {
      return;
    }
    setLecture(location.state.lecture);
    apiClient.get(`/api/assignments/${params.assignment_id}/`).then((value) => {
      setAss(value.data.data);
      // * 테케 없으면 새로 추가
      if (!value.data.data.testcases.length) {
        apiClient
          .post("/api/testcases/", {
            input: "[0,1,10]",
            output: "100",
            assignment_id: params.assignment_id,
            is_hidden: false,
          })
          .then((value) => {
            console.log(value);
            apiClient
              .get(`/api/assignments/${params.assignment_id}/`)
              .then((value) => {
                setAss(value.data.data);
              });
          })
          .then((value) => {
            apiClient
              .get(`/api/assignments/${params.assignment_id}/`)
              .then((value) => {
                setAss(value.data.data);
              });
          });
      } else {
        setAss(value.data.data);
      }
    });
  }, []);

  if (!ass) {
    return <></>;
  }
  // TODO: settingSelector에 따라서 LandingPageScenery의 배경을 바꿔야 함
  const darkMode = false;
  return (
    <GeneralContainer>
      <Helmet
        bodyAttributes={{
          style: `background : ${
            COLOR_SET["MAIN_BACKGROUND"][settingSelector.backgroundColor]
          }`,
        }}
      />
      {/* <button onClick={openModal}>Open Modal</button> */}
      {/* {
        JSON.stringify(testcaseSelector)
      } */}
    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        // contentLabel="Example Modal"
      >
        {/* <h2 >에러 발생</h2> */}
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", 
            margin: '30px 0'
          }}>
          <div style={{margin:"0 10px"}}>
            <Img src="/images/error.svg" alt="error indicator" />
          </div>
            <div
          style={{
            fontFamily: 'Gmarket Sans TTF',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '22px',
            lineHeight: '25px',
            textAlign: 'center',
            color: '#000000',
          }}
          >에러 발생</div>
          <div style={{margin:"0 10px"}}>
            <Img src="/images/error.svg" alt="error indicator" />
          </div>
        </div>
        
        {/* <button onClick={closeModal}>close</button> */}
        {repoSelector.selectedModel && <Editor
          width='700px'
          height='350px'
          options={{
            readOnly: true,
            lineNumbers: ((lineNumber)=>{
              return testcaseSelector.errorContent.line -6 +lineNumber;
            }),
            scrollBeyondLastLine:false,
            scrollbar:{
              alwaysConsumeMouseWheel: false, // defaults is true, false enables the behavior you describe
            }
          }}
              language={repoSelector.selectedModel.content.language.toLowerCase()}
              theme={settingSelector.backgroundColor === SETTING_BACKGROUND_WHITE ? 'light': 'vs-dark'}
              value={(repoSelector.selectedModel.content.code.split("\n").map((line, findex) => {
                let index = findex + 1;
                if(Math.abs(index - testcaseSelector.errorContent.line)  <= 5) {
                  console.log(line);
                  return line;
                }
              }).join(""))}
            />}
          {
            repoSelector.selectedModel && testcaseSelector.isOnTestcase && testcaseSelector.isError &&
            <div style={{
              position:"absolute", 
              top: `calc(19px * 6 + 40px + 60px)`, 
              zIndex: 100, }}>
              <div style={{backgroundColor:"rgba(249, 86, 86, 0.1)", width: "100%",  height:"19px", maxWidth: '688px',}}>
              </div>
              {
                testcaseSelector.errorContent.content.split("\n").map((line, index) => {
                  return (
                    <div style={{paddingLeft:"83px", backgroundColor:"rgba(204, 229, 198, 1.0)", width: "100vw", maxWidth: '688px',}}>
                      {line}
                    </div>
                  )
                })
              }
            </div>
          }
        
      </Modal>

      {/* Banner */}
      <Banner
        lectureName={lecture.name}
        reamainingTime={`${new Date(ass.deadline)}`}
        assignmentName={ass.name}
        assignment={ass}
        darkMode={darkMode}
        changeRepo={changeRepo}
        setChangeRepo={setChangeRepo}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      {/* Problem section*/}
      <EditorPageGrid>
        <ProblemWrapper
          magnified={magnified1}
          style={{ marginLeft: "25px", marginTop: "25px" }}
        >
          {/* scroll test */}
          <Problem
            prob={ass.question}
            restr={ass.constraints}
            darkMode={darkMode}
            magnified={magnified1}
            setMagnified={setMagnified1}
          />
        </ProblemWrapper>
        {/* TestCase */}
        <TestcaseWrapper
          style={{ marginLeft: "25px", marginTop: "10px" }}
          magnified={magnified1}
        >
          <Testcase
            // // TODO: 오브젝트 형태로 변경해서 표시
            bodyContent={`테스트케이스 1>
            input: [1,2,3,4]
            output: [소공개]`}
            testCases={ass.testcases}
            darkMode={darkMode}
          />
        </TestcaseWrapper>

        {/* Editor */}
        <CodeEditorWrapper
          style={{
            marginTop: "25px",
            marginRight: "25px",
          }}
          magnified={magnified1}
        >
          <CodeEditor
            assignment={ass}
            darkMode={darkMode}
            changeRepo={changeRepo}
            setChangeRepo={setChangeRepo}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </CodeEditorWrapper>
      </EditorPageGrid>
    </GeneralContainer>
  );
};
