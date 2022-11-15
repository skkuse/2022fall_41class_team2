import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { MonitorIcon, Img } from "../../atoms";
import { useSelector } from 'react-redux';
import {
  ExitButton,
  SettingsButton,
  DuplicateFuncButton,
  ResetFuncButton,
  DownloadFuncButton,
  UploadFuncButton,
  Save1FuncButton,
  Save2FuncButton,
  Save3FuncButton,
} from "../../molecules";
// import { makeMonacoModel } from "./CodeEditor";
import { useDispatch } from 'react-redux';
import { changeRepoAction, createRepoAction, saveRepoListAction } from './../../../pages/EditorPage/EditorAction';
import { apiClient } from './../../../api/axios';

const Wrapper = styled.div`
  height: auto;
  flex: 1;
`;
const Bg = styled.div`
  display: flex;
  align-items: center;

  background: #3c3c3c;

  padding: 0 40.91px 0 52px;

  width: 100%;
  height: 55px;

  color: #ffffff;
`;

const StringWrapper = styled.div`
  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
`;

export const Banner = ({
  lectureName,
  reamainingTime,
  assignmentName,
  assignment,
  saveState,
  danger,
}) => {

  const repoSelector = useSelector((state) => state.editorReducer);
  /* saveState는 임시 저장 세 번까지를 구현하려고 넣어보았습니다 @bw-99 어떻게 구현하는지에 따라서 달라질 것 같습니다. */
  if(!repoSelector) {
    return <></>;
  }


  return (
    <Bg>
      {/* {
        JSON.stringify(`${repoSelector}`)
      } */}
      {/* {
        repoSelector.repoList.length
      } */}
      {/* Exit */}
      <ExitButton />
      {/* Settings */}
      <div style={{ marginLeft: "15px" }}>
        <SettingsButton inverted={true} />
      </div>
      {/* Lecture Name */}
      <div style={{ marginLeft: "83.48px" }}>
        <MonitorIcon></MonitorIcon>
      </div>
      <div style={{ marginLeft: "14px" }}>
        <StringWrapper>{lectureName}</StringWrapper>
      </div>
      <div style={{ marginLeft: "15.75px" }}>
        <Wrapper>
          {/* 남은 시간에 따른 표시 변화 */}
          {danger ? (
            <Img src="/images/danger.svg" alt="timer" />
          ) : (
            <Img src="/images/normal_inverted.svg" alt="timer" />
          )}
        </Wrapper>
      </div>
      <div style={{ marginLeft: "13.51px" }}>
        <StringWrapper>{reamainingTime}</StringWrapper>
      </div>
      <div style={{ margin: "auto" }}>
        <StringWrapper>{assignmentName}</StringWrapper>
      </div>
      {/* Functools */}
      {/* TODO: 각각의 기능 구현 필요 */}
      {/* duplicate */}
      <DuplicateFuncButton />
      {/* reset */}
      <div style={{ marginLeft: "14.86px" }}>
        <ResetFuncButton />
      </div>
      {/* download */}
      <div style={{ marginLeft: "14.86px" }}>
        <DownloadFuncButton />
      </div>
      {/* upload */}
      <div style={{ marginLeft: "14.86px" }}>
        <UploadFuncButton />
      </div>
      <div style={{
        marginLeft: "calc(47.86px - 14.86px)",
        display: "flex",
      }}>
        {/* save1 */}
        <SaveButtonComp repoSelector={repoSelector} index={0} assignment={assignment}/>
        <SaveButtonComp repoSelector={repoSelector} index={1} assignment={assignment}/>
        <SaveButtonComp repoSelector={repoSelector} index={2} assignment={assignment}/>
        {/* <div onClick={() => {
          // const code = changeList2String(repoSelector.selectedModel.getLinesContent());
          // alert(code);
        }} style={{ marginLeft: "14.86px" }}>
          <Save1FuncButton saved={repoSelector.repoList.length == 1} />
        </div> */}
        {/* save2 */}
        {/* <div style={{ marginLeft: "14.86px" }}>
          <Save2FuncButton saved={repoSelector.repoList.length == 2} />
        </div> */}
        {/* save3 */}
        {/* <div style={{ marginLeft: "14.86px" }}>
          <Save3FuncButton saved={repoSelector.repoList.length >= 3} />
        </div> */}

      </div>

    </Bg>
  );
};

const SaveButtonComp = ({repoSelector, index, assignment}) => {
  const dispatch = useDispatch();
  const isSaved = repoSelector.repoList.length - 1 >= index;
  
  return (
    <div style={{ marginLeft: "14.86px" }} onClick={async () => {
      // * 코드 저장
      if(isSaved && repoSelector.selectedModel.id == repoSelector.repoList[index].id) {
        console.log(assignment.id);
        const result = await apiClient.put(`/api/repos/${repoSelector.selectedModel.id}/`,{
          language: repoSelector.selectedModel.content.language,
          code: repoSelector.selectedModel.content.code,
          assignment_id: assignment.id
        })
        console.log(result.data);
      }
      // * 코드 불러오기
      else if(isSaved) {
        // alert("코드 불러오기")
        dispatch(changeRepoAction(repoSelector.repoList[index]));
      }
      // * 저장소 새로 추가
      // TODO: 저장소 새로 추가
      else {
        alert("코드 저장");
        dispatch(createRepoAction())

        // const model = makeMonacoModel({
        //   content: {
        //     code: changeList2String(repoSelector.selectedModel.getLinesContent())
        //   }
        // });

        // dispatch(saveRepoListAction([...repoSelector.repoList, model]));
      }
    }}>
      <Save1FuncButton saved={isSaved} />
    </div>
  );
}


const changeList2String = (lines) => {
  let codeTempList = lines;
  let codeTemp = "";
  codeTempList.forEach(element => {
    if(element == '') {
      codeTemp+= "\n";
    }
    else{
      codeTemp+=element;
    }
  });
  return codeTemp;
}
