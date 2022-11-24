// Landing page
import React from "react";
import styled from "styled-components";

import { Text } from "../../modules/atoms";
import { BannerIcon } from "../../modules/atoms/Icons";

import { LandingPageBanner } from "../../modules/organisms/LandingPageOrganism/LandingPageBanner";
import { AssignmentOverview } from "../../modules/organisms";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLectureAction } from "./../MainPage/MainAction";
import { apiClient } from "./../../api/axios";

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: 0px;
  width: 61%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const OverviewPage = (...restProps) => {
  const dispatch = useDispatch();
  const settingSelector = useSelector((state) => state.SettingReducer);

  const lectureSelector = useSelector((state) => state.LectureReducer.lectures);

  useEffect(() => {
    // 강의 데이터 없을 시 추가하기
    // apiClient.get("/api/lectures/").then((value) => {
    //   if(value.status == 200) {
    //     if(value.data.data.results.length == 0){
    //       apiClient.post("/api/lectures/", {
    //         name: "예시) 소프트웨어공학개론"
    //       }).then((val) => {
    //         if(val.status == 201) {
    //           let lectureId = val.data.id;
    //         }
    //       })
    //     }
    //   }
    // })
    dispatch(getLectureAction());
  }, []);

  // TODO: settingSelector에 따라서 LandingPageScenery의 배경을 바꿔야 함
  const darkMode = true;

  if (lectureSelector) {
    return (
      <>
        {/* Banner */}
        <div style={{ position: "sticky" }}>
          <LandingPageBanner restProps={restProps} darkMode={darkMode} />
        </div>
        {/* List design */}
        <AssignmentOverview darkMode={darkMode} />
      </>
    );
  }

  return <></>;
};
