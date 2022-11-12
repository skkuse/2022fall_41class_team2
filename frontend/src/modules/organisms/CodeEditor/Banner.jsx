import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { MonitorIcon, Img } from "../../atoms";
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

  text-color: #ffffff;
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
  saveState,
  danger,
}) => {
  /* saveState는 임시 저장 세 번까지를 구현하려고 넣어보았습니다 @bw-99 어떻게 구현하는지에 따라서 달라질 것 같습니다. */

  return (
    <Bg>
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
      {/* save1 */}
      <div style={{ marginLeft: "47.86px" }}>
        <Save1FuncButton saved={true} />
      </div>
      {/* save2 */}
      <div style={{ marginLeft: "14.86px" }}>
        <Save2FuncButton saved={false} />
      </div>
      {/* save3 */}
      <div style={{ marginLeft: "14.86px" }}>
        <Save3FuncButton saved={true} />
      </div>
    </Bg>
  );
};
