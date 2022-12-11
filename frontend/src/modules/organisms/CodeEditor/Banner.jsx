import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { MonitorIcon, Img } from "../../atoms";
import { useSelector } from "react-redux";
import {
  ExitButton,
  SettingsButton,
  DuplicateFuncButton,
  ResetFuncButton,
  DownloadFuncButton,
  UploadFuncButton,
  SaveFuncButton,
} from "../../molecules";
// import { makeMonacoModel } from "./CodeEditor";
import { useDispatch } from "react-redux";
import {
  changeRepoAction,
  clearSelectedRepoAction,
  createRepoAction,
  readyChangeSelectedRepoAction,
  readyCreateSelectedRepoAction,
  saveRepoListAction,
  updateRepoAction,
} from "./../../../pages/EditorPage/EditorAction";
import { apiClient } from "./../../../api/axios";
import { useNavigate } from "react-router-dom";
import { getTimeDiff } from "../AssignmentOverview/AssignmentOverview";
// import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';

import lifeAudio from "../../../assets/audio/lifelike-126735.mp3";
import dropItAudio from "../../../assets/audio/drop-it-124014.mp3";
import mountainAudio from "../../../assets/audio/mountain-path-125573.mp3";
import calmAudio from "../../../assets/audio/please-calm-my-mind-125566.mp3";
import natureAudio from "../../../assets/audio/the-beat-of-nature-122841.mp3";

import audioIcon from "../../../assets/images/image 32.png";
import prevIcon from "../../../assets/images/image 31.png";
import nextIcon from "../../../assets/images/image 30.png";
import pauseIcon from "../../../assets/images/image 29.png";
import musicIcon from "../../../assets/images/music.svg";
import playIcon from "../../../assets/images/play.svg";
import { COLOR_SET } from './../../../service/GetColor';
import { SettingsButtonBlack } from "../../molecules/SettingsButton";

const SampleAudioList = [
  {
    title: "Lifelike",
    author: "AlexiAction",
    audio: new Audio(lifeAudio),
  },
  {
    title: "Drop It",
    author: "Coma-Media",
    audio: new Audio(dropItAudio),
  },
  {
    title: "Mountain Path",
    author: "Magnetic Trailer",
    audio: new Audio(mountainAudio),
  },
  {
    title: "The Beat of Nature",
    author: "Olexy",
    audio: new Audio(calmAudio),
  },
  {
    title: "Please Calm My Mind",
    author: "Lesfm",
    audio: new Audio(natureAudio),
  },
];

const Wrapper = styled.div`
  height: auto;
  flex: 1;
`;
const Bg = styled.div`
  display: flex;
  align-items: center;

  background: ${(props) => (props.darkMode ? "#30303E" : "#3c3c3c")};

  padding: 0 40.91px 0 52px;

  width: 100%;
  height: 55px;

  color: #ffffff;
`;

const StringWrapper = styled.div`
  width: 180px;
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
  darkMode,
  changeRepo,
  setChangeRepo,
  editMode,
  setEditMode
}) => {
  const [audio] = useState(SampleAudioList);
  const [audioIndex, setAudioIndex] = useState(0);
  const settingSelector = useSelector((state) => state.SettingReducer);
  const [musicOptionOn, setMusicOptionOn] = useState(false);

  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  // useEffect(()=>{
  //   for (const key in audio) {
  //     console.log("add");
  //     audio[key].audio.addEventListener('onended',()=>{
  //       console.log("ended!");
  //       nextSong();
  //     });
  //   }
  // }, []);

  useEffect(()=>{
    for (const key in audio) {
      console.log("added");
      audio[key].audio.addEventListener('onended',()=>{
        console.log("ended!");
        nextSong();
      });
      audio[key].audio.onended = () => {
        console.log("ended!");
        nextSong();
      }
      console.log(audio[key].audio.onended);
    }

    return ()=>{
      for (const key in audio) {
        audio[key].audio.currentTime = 0;
        audio[key].audio.pause();
      }
    } 
  }, [])

  useEffect(()=>{
    if(musicOptionOn) {
      setPlaying(true);
    }
  },[musicOptionOn])

  useEffect(() => {
    if (playing) {
      for (const key in audio) {
        if (key != audioIndex) {
          audio[key].audio.currentTime = 0;
          audio[key].audio.pause();
        } else {
          audio[key].audio.play();
        }
      }
    } else {
      for (const key in audio) {
        audio[key].audio.currentTime = 0;
        audio[key].audio.pause();
      }
    }
    
    // playing ? audio[audioIndex].audio.play() : audio[audioIndex].audio.pause();
  }, [playing]);

  // useEffect(() => {
  //   setPlaying(true);
  // }, [audioIndex])

  const repoSelector = useSelector((state) => state.editorReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [remainTime, setRemainTime] = useState(
    getTimeDiff(new Date(assignment.deadline), new Date())
  );

  useEffect(() => {
    setInterval(() => {
      setRemainTime(getTimeDiff(new Date(assignment.deadline), new Date()));
    }, 1000);
  }, []);

  const findByLanguageUsed = (contents) => {
    const userLanguage =
    repoSelector.selectedModel.content.language.toLowerCase();
    return contents.find((content) => content.language == userLanguage);
  };
  
  const prevSong = ()=>{
    setPlaying(false);
    let newIndex = 0;
    if (audioIndex > 1) {
      newIndex = audioIndex - 1;
    } else {
      newIndex = SampleAudioList.length - 1;
    }
    setAudioIndex(newIndex);
    setTimeout(() => {
      setPlaying(true);
    }, 100);
  }

  const nextSong = ()=>{
    console.log("next song!");
    setPlaying(false);
    let newIndex = 0;
    if (audioIndex >= SampleAudioList.length - 1) {
      newIndex = 0;
    } else {
      newIndex = audioIndex + 1;
    }
    setAudioIndex(newIndex);
    setTimeout(() => {
      setPlaying(true);
    }, 100);
  }

  /* saveState는 임시 저장 세 번까지를 구현하려고 넣어보았습니다 @bw-99 어떻게 구현하는지에 따라서 달라질 것 같습니다. */
  if (!repoSelector) {
    return <></>;
  }

  return (
    <Bg style={{backgroundColor: `${COLOR_SET['EDITOR_BANNER'][settingSelector.backgroundColor]}`}}>
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
        <SettingsButtonBlack />
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
        <StringWrapper>{remainTime}</StringWrapper>
      </div>
      <div style={{ margin: "auto" }}>
        <StringWrapper>{assignmentName}</StringWrapper>
      </div>
      {
        musicOptionOn?
        <div
          style={{
            width: "200px",
            height: "40px",
            background:
              "linear-gradient(90deg, #3A3989 0%, rgba(58, 57, 137, 0) 100%)",
            border: "1px solid #FFFFFF",
            borderRadius: "1000px",
            display: "flex",
            alignItems: "center",
            marginRight: "17px",
          }}
        >
          <div style={{ marginLeft: "10px", marginTop: "3px" }}>
            <img
              src={audioIcon}
              style={{ width: "25px", height: "25px", objectFit: "cover" }}
              onClick={()=>{
                setMusicOptionOn(false);
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent:"flex-start",
              alignItems: "center",
              marginLeft: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "Gmarket Sans TTF",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "12px",
                color: "#FFFFFF",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "70px",
                textAlign: "center"
              }}
            >
              {SampleAudioList[audioIndex].title}
            </div>

            <div
              style={{
                marginTop:"2px",
                fontFamily: "Gmarket Sans TTF",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "10px",
                color: "#FFFFFF",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "70px",
                textAlign: "center"
              }}
            >
              {SampleAudioList[audioIndex].author}
            </div>
          </div>

          

          <div style={{ display: "flex", margin: "0 13px" }}>
            <img
              src={prevIcon}
              style={{ width: "13px", height: "14px" }}
              onClick={() => {
                prevSong();
              }}
            />
            <img
              src={playing? pauseIcon: playIcon}
              style={{ width: "13px", height: "14px", margin: "0 10px" }}
              onClick={toggle}
            />
            <img
              src={nextIcon}
              style={{ width: "13px", height: "14px" }}
              onClick={() => {
                nextSong();
              }}
            />
          </div>
        </div>
      :
        <div 
        onClick={()=>{
          setMusicOptionOn(true);
        }}
        style={{
          width: "200px",
          marginRight: "17px",
          // marginRight: "80px",
        }}>
          <img src={musicIcon} style={{
              width: '34px',
              height: '34px'
            }} />
        </div>
      }

      

      

      {/* Functools */}
      {/* duplicate */}
      <div
        onClick={() => {
          navigator.clipboard.writeText(
            repoSelector.selectedModel.content.code
          );
        }}
      >
        <DuplicateFuncButton />
      </div>

      {/* reset */}
      <div
        style={{ marginLeft: "14.86px" }}
        onClick={() => {
          console.log(assignment.contents);
          const skeletonCode = findByLanguageUsed(
            assignment.contents
          ).skeleton_code;
          console.log(skeletonCode);
          dispatch(updateRepoAction(skeletonCode));
        }}
      >
        <ResetFuncButton />
      </div>
      {/* download */}
      <div
        style={{ marginLeft: "14.86px" }}
        onClick={() => {
          const file = new Blob([repoSelector.selectedModel.content.code], {
            type: "text/plain;charset=utf-8}",
          });

          const element = document.createElement("a");
          element.href = URL.createObjectURL(file);
          element.download = `${assignment.name}.txt`;

          document.body.appendChild(element);
          element.click();
        }}
      >
        <DownloadFuncButton />
      </div>
      {/* upload */}
      <div style={{ marginLeft: "14.86px" }} onClick={() => {}}>
        <UploadFuncButton />
      </div>
      <div
        style={{
          marginLeft: "calc(47.86px - 14.86px)",
          display: "flex",
        }}
      >
        {/* save */}
        <SaveButtonComp
          repoSelector={repoSelector}
          index={0}
          assignment={assignment}
          changeRepo={changeRepo}
          setChangeRepo={setChangeRepo}
          setEditMode={setEditMode}
        />
        <SaveButtonComp
          repoSelector={repoSelector}
          index={1}
          assignment={assignment}
          changeRepo={changeRepo}
          setChangeRepo={setChangeRepo}
          setEditMode={setEditMode}
        />
        <SaveButtonComp
          repoSelector={repoSelector}
          index={2}
          assignment={assignment}
          changeRepo={changeRepo}
          setChangeRepo={setChangeRepo}
          setEditMode={setEditMode}
        />
      </div>
    </Bg>
  );
};

const SaveButtonComp = ({
  repoSelector,
  index,
  assignment,
  changeRepo,
  setChangeRepo,
  setEditMode
}) => {
  const dispatch = useDispatch();
  const isSaved = repoSelector.repoList.length - 1 >= index;
  const settingSelector = useSelector((state) => state.SettingReducer);
  
  const findByLanguageUsed = (contents) => {
    const userLanguage =
    repoSelector.selectedModel.content.language.toLowerCase();
    return contents.find((content) => content.language == userLanguage);
  };

  const findByLanguageDefault = (contents) => {
    const userLanguage =
    settingSelector.language.toLowerCase();
    return contents.find((content) => content.language == userLanguage);
  };

  // * change repo
  useEffect(() => {
    if (
      repoSelector &&
      repoSelector.repoChangeInfo &&
      repoSelector.repoChangeInfo.isChanging &&
      isSaved &&
      repoSelector.selectedModel.id != repoSelector.repoList[index].id &&
      repoSelector.repoChangeInfo.prevId == index
    ) {
      dispatch(changeRepoAction(repoSelector.repoList[index]));
    }
  });

  // * create repo
  useEffect(() => {
    if (
      repoSelector &&
      repoSelector.repoCreateInfo &&
      repoSelector.repoCreateInfo.isCreating &&
      !isSaved &&
      repoSelector.repoCreateInfo.prevId == index
    ) {
      const skeletonCode = findByLanguageDefault(assignment.contents).skeleton_code;
      apiClient
        .post(`/api/repos/`, {
          language: settingSelector.language.toLowerCase(),
          code: skeletonCode,
          assignment_id: assignment.id,
        })
        .then((result) => {
          dispatch(createRepoAction(result.data.data));
        });
    }
  });

  return (
    <div
      style={{ marginLeft: "14.86px" }}
      onClick={async () => {
        setEditMode({ edit: true, altMode:  "none" });
        // * 코드 저장
        if (
          isSaved &&
          repoSelector.selectedModel.id === repoSelector.repoList[index].id
        ) {
          console.log(assignment.id);
          const result = await apiClient.put(
            `/api/repos/${repoSelector.selectedModel.id}/`,
            {
              language: settingSelector.language.toLowerCase(),
              code: repoSelector.selectedModel.content.code,
              assignment_id: assignment.id,
            }
          );
          console.log(result.data);
        }
        // * 코드 불러오기
        else if (isSaved) {
          dispatch(readyChangeSelectedRepoAction(index));
          // // setChangeRepo(true);
          // setTimeout(() => {
          //   dispatch(changeRepoAction(repoSelector.repoList[index]));
          //   // setChangeRepo(false);
          // }, 100);
        }
        // * 저장소 새로 추가
        else {
          // alert("코드 추가");
          dispatch(readyCreateSelectedRepoAction(index));
        }
      }}
    >
      <SaveFuncButton slot={index} saved={isSaved} 
      isSelected={
        repoSelector.selectedModel && repoSelector.repoList[index]? 
        repoSelector.selectedModel.id === repoSelector.repoList[index].id : 
        false} 
        />
    </div>
  );
};

const changeList2String = (lines) => {
  let codeTempList = lines;
  let codeTemp = "";
  codeTempList.forEach((element) => {
    if (element == "") {
      codeTemp += "\n";
    } else {
      codeTemp += element;
    }
  });
  return codeTemp;
};
